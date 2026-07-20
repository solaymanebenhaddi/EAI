import { NextResponse } from "next/server";
import { transporter, mailOptions, generateEmailTemplate, escapeHtml } from "@/lib/mail";

export const runtime = "nodejs";

// Basic in-memory rate limiting (Note: resets on serverless cold starts)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

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

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Trop de requêtes. Veuillez patienter." }, { status: 429 });
    }

    const body = await req.json();

    // Check honeypot
    if (body.honeypot) {
      // Silently accept it but don't send email
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = body.name?.trim()?.slice(0, 100);
    const email = body.email?.trim()?.slice(0, 100);
    const phone = body.phone?.trim()?.slice(0, 20);
    const city = body.city?.trim()?.slice(0, 100);
    const category = body.category?.trim()?.slice(0, 100);
    const type = body.type?.trim()?.slice(0, 100);
    const msg = body.msg?.trim()?.slice(0, 2000) || "Aucun message";

    if (!name || !email || !phone || !city || !category || !type) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs obligatoires." }, { status: 400 });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Veuillez saisir une adresse e-mail valide." }, { status: 400 });
    }

    // Phone validation
    const phoneVal = phone.replace(/[\s\-\.\(\)]/g, '');
    if (!/^(?:(?:\+|00)212|0)[5-7]\d{8}$/.test(phoneVal)) {
      return NextResponse.json({ error: "Veuillez saisir un numéro de téléphone marocain valide." }, { status: 400 });
    }

    const innerHtml = `
      <p>Une nouvelle demande de contact a été soumise depuis le site.</p>
      <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Nom:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(name)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #8a9a5b;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(phoneVal)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Ville:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(city)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Catégorie:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(category)}</td></tr>
        <tr><td style="border-bottom: 1px solid #eee;"><strong>Type:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(type)}</td></tr>
      </table>
      <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #8a9a5b; border-radius: 4px;">
        <p style="margin-top: 0; font-weight: bold; color: #1a1a1a;">Message:</p>
        <p style="margin-bottom: 0;">${escapeHtml(msg).replace(/\n/g, "<br>")}</p>
      </div>
    `;

    const htmlContent = generateEmailTemplate("Nouvelle demande de contact", innerHtml);
    const textContent = `
Nouvelle demande de contact (EAI Construction)
Nom: ${name}
Email: ${email}
Téléphone: ${phoneVal}
Ville: ${city}
Catégorie: ${category}
Type: ${type}
Message:
${msg}
    `;

    // Send the notification email to the team
    await transporter.sendMail({
      from: mailOptions.from,
      to: process.env.CONTACT_EMAIL_TO || "contact@eai-construction.com",
      replyTo: email,
      subject: `Nouvelle demande de contact — ${name}`,
      text: textContent,
      html: htmlContent,
    });

    // Send confirmation email to the visitor (do not wait for it or fail if it fails)
    const confirmationInnerHtml = `
      <p>Bonjour ${escapeHtml(name)},</p>
      <p>Nous avons bien reçu votre demande de contact et nous vous en remercions.</p>
      <p>Notre équipe l'étudiera avec attention et reviendra vers vous très prochainement.</p>
      <p style="margin-top: 20px;"><strong>Récapitulatif de votre demande :</strong></p>
      <ul style="color: #666; line-height: 1.8;">
        <li><strong>Projet :</strong> ${escapeHtml(category)} - ${escapeHtml(type)}</li>
        <li><strong>Ville :</strong> ${escapeHtml(city)}</li>
      </ul>
      <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe ELAOUAD Architecture & Ingénierie</strong></p>
    `;
    const confirmationHtml = generateEmailTemplate("Confirmation de réception", confirmationInnerHtml);

    transporter.sendMail({
      from: mailOptions.from,
      to: email,
      subject: `Confirmation de réception de votre demande — ELAOUAD`,
      text: `Bonjour ${name},\n\nNous avons bien reçu votre demande de contact et nous vous en remercions.\nNotre équipe l'étudiera et reviendra vers vous très prochainement.\n\nCordialement,\nL'équipe ELAOUAD Architecture & Ingénierie`,
      html: confirmationHtml,
    }).catch(console.error);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de l’envoi. Veuillez réessayer." }, { status: 500 });
  }
}
