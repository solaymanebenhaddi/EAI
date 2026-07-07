import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, type, msg } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nom et téléphone requis' }, { status: 400 });
    }

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });

    const projectTypes: Record<string, string> = {
      archi: 'Architecture',
      bim: 'BIM Consulting',
      coord: 'Coordination',
      etude: 'Études',
    };

    const projectTypeName = type ? projectTypes[type] || type : 'Non spécifié';

    // Premium HTML Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #111625; padding: 30px; text-align: center; }
        .header h1 { color: #A9B28D; margin: 0; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #888c96; margin: 8px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
        .content { padding: 40px 30px; color: #333333; }
        .title { font-size: 20px; font-weight: 600; margin-bottom: 25px; color: #111625; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #888888; font-weight: bold; margin-bottom: 5px; }
        .value { font-size: 16px; color: #111625; font-weight: 500; }
        .message-box { background-color: #f9f9f6; border-left: 4px solid #A9B28D; padding: 20px; margin-top: 30px; border-radius: 0 4px 4px 0; }
        .message-box .label { color: #111625; margin-bottom: 10px; }
        .message-box .value { font-size: 15px; line-height: 1.6; color: #444444; white-space: pre-wrap; font-weight: 400; }
        .footer { background-color: #111625; padding: 20px; text-align: center; color: #666666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ELAOUAD</h1>
          <p>Nouvelle Demande de Projet</p>
        </div>
        
        <div class="content">
          <div class="title">Détails du Contact</div>
          
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="50%" valign="top">
                <div class="field">
                  <div class="label">Nom complet</div>
                  <div class="value">${name}</div>
                </div>
              </td>
              <td width="50%" valign="top">
                <div class="field">
                  <div class="label">Téléphone</div>
                  <div class="value">${phone}</div>
                </div>
              </td>
            </tr>
          </table>

          <div class="field" style="margin-top: 10px;">
            <div class="label">Type d'expertise souhaitée</div>
            <div class="value" style="color: #A9B28D;">${projectTypeName}</div>
          </div>

          <div class="message-box">
            <div class="label">Description du projet</div>
            <div class="value">${msg ? msg.replace(/</g, "&lt;").replace(/>/g, "&gt;") : 'Aucune description fournie.'}</div>
          </div>
        </div>
        
        <div class="footer">
          Cet e-mail a été envoyé depuis le formulaire de contact du site ELAOUAD.<br>
          ${new Date().toLocaleString('fr-FR')}
        </div>
      </div>
    </body>
    </html>
    `;

    // Only attempt to send if SMTP credentials are provided, otherwise simulate success locally
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const info = await transporter.sendMail({
        from: `"ELAOUAD Site Web" <${process.env.SMTP_USER}>`, 
        to: 'contact@eai-construction.com', 
        subject: `Nouvelle demande de projet : ${name} - ${projectTypeName}`, 
        html: htmlTemplate, 
      });
      return NextResponse.json({ success: true, messageId: info.messageId });
    } else {
      console.warn("SMTP credentials not configured. Simulating successful email send locally.");
      console.log("Email content preview:");
      console.log(`Name: ${name}, Phone: ${phone}, Type: ${projectTypeName}`);
      console.log(`Message: ${msg}`);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, simulated: true });
    }
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
