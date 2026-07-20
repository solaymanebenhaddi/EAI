import { NextResponse } from "next/server";
import { transporter, mailOptions, generateEmailTemplate, escapeHtml } from "@/lib/mail";

export const runtime = "nodejs";

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3; // stricter for file uploads

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Trop de requêtes. Veuillez patienter." }, { status: 429 });
    }

    const formData = await req.formData();
    
    // Check honeypot
    const honeypot = formData.get("honeypot");
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = (formData.get("name") as string)?.trim()?.slice(0, 100);
    const email = (formData.get("email") as string)?.trim()?.slice(0, 100);
    const phone = (formData.get("phone") as string)?.trim()?.slice(0, 20);
    const experience = (formData.get("experience") as string)?.trim()?.slice(0, 50);
    const linkedin = (formData.get("linkedin") as string)?.trim()?.slice(0, 200) || "Non fourni";
    const portfolio = (formData.get("portfolio") as string)?.trim()?.slice(0, 200) || "Non fourni";
    const message = (formData.get("message") as string)?.trim()?.slice(0, 2000) || "Aucun message";
    const jobId = (formData.get("jobId") as string)?.trim()?.slice(0, 100) || "Spontanée";
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email || !phone || !experience || !cvFile) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs obligatoires et joindre votre CV." }, { status: 400 });
    }

    // Validation email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Veuillez saisir une adresse e-mail valide." }, { status: 400 });
    }

    // File validation
    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Le fichier CV ne doit pas dépasser 5 Mo." }, { status: 400 });
    }
    
    if (!ALLOWED_MIME_TYPES.includes(cvFile.type)) {
      return NextResponse.json({ error: "Le fichier CV doit être au format PDF, DOC ou DOCX." }, { status: 400 });
    }

    const fileExt = cvFile.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !['pdf', 'doc', 'docx'].includes(fileExt)) {
      return NextResponse.json({ error: "Le fichier CV doit être au format PDF, DOC ou DOCX." }, { status: 400 });
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    const innerHtml = `
      <p>Une nouvelle candidature a été soumise depuis le site.</p>
      <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Poste:</strong></td><td style="border-bottom: 1px solid #eee; font-weight: bold; color: #8a9a5b;">${escapeHtml(jobId)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Nom:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(name)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #8a9a5b;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(phone)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Expérience:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(experience)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>LinkedIn:</strong></td><td style="border-bottom: 1px solid #eee;"><a href="${escapeHtml(linkedin)}" style="color: #8a9a5b;">${escapeHtml(linkedin)}</a></td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Portfolio:</strong></td><td style="border-bottom: 1px solid #eee;"><a href="${escapeHtml(portfolio)}" style="color: #8a9a5b;">${escapeHtml(portfolio)}</a></td></tr>
      </table>
      <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #8a9a5b; border-radius: 4px;">
        <p style="margin-top: 0; font-weight: bold; color: #1a1a1a;">Lettre de motivation / Message :</p>
        <p style="margin-bottom: 0;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      </div>
      <p style="margin-top: 20px;"><em>Le CV du candidat est joint à cet email.</em></p>
    `;

    const htmlContent = generateEmailTemplate(`Candidature : ${jobId}`, innerHtml);

    const textContent = `
Nouvelle candidature (EAI Construction)
Poste: ${jobId}
Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Expérience: ${experience}
LinkedIn: ${linkedin}
Portfolio: ${portfolio}
Message:
${message}
    `;

    // Send internal notification
    await transporter.sendMail({
      from: mailOptions.from,
      to: process.env.CAREERS_EMAIL_TO || "contact@eai-construction.com",
      replyTo: email,
      subject: `Nouvelle candidature — ${jobId} — ${name}`,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBuffer,
          contentType: cvFile.type,
        }
      ]
    });

    // Send confirmation email to candidate
    const confirmationInnerHtml = `
      <p>Bonjour ${escapeHtml(name)},</p>
      <p>Nous vous confirmons la bonne réception de votre candidature pour le poste de <strong>${escapeHtml(jobId)}</strong>.</p>
      <p>Notre équipe RH étudiera votre profil avec la plus grande attention. Si votre profil correspond à nos attentes et à nos besoins actuels, nous reviendrons vers vous très prochainement pour convenir d'un entretien.</p>
      <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe RH d'ELAOUAD Architecture & Ingénierie</strong></p>
    `;
    const confirmationHtml = generateEmailTemplate("Confirmation de candidature", confirmationInnerHtml);

    transporter.sendMail({
      from: mailOptions.from,
      to: email,
      subject: `Confirmation de réception de votre candidature — ELAOUAD`,
      text: `Bonjour ${name},\n\nNous vous confirmons la bonne réception de votre candidature pour le poste "${jobId}".\nNotre équipe RH étudiera votre profil avec attention. Si votre profil correspond à nos besoins, nous vous contacterons prochainement.\n\nCordialement,\nL'équipe ELAOUAD Architecture & Ingénierie`,
      html: confirmationHtml,
    }).catch(console.error);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Careers Form Error:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de l’envoi. Veuillez réessayer." }, { status: 500 });
  }
}
