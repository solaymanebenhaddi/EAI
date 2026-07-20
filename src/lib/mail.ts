import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const mailOptions = {
  from: {
    name: process.env.SMTP_FROM_NAME || "ELAOUAD Architecture & Ingénierie",
    address: process.env.SMTP_USER || "contact@eai-construction.com",
  },
};

export const escapeHtml = (unsafe: string) => unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

export function generateEmailTemplate(title: string, contentHtml: string) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1a1a1a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 40px 30px; text-align: center; border-bottom: 4px solid #8a9a5b;">
              <!-- Text-based ELAOUAD Logo -->
              <div style="margin-bottom: 10px;">
                <span style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -1px; text-transform: uppercase; margin: 0; line-height: 1;">ELAOUAD</span><br/>
                <span style="font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); letter-spacing: 2px; text-transform: uppercase; margin-top: 5px; display: inline-block;">Architecture et Ingénierie</span>
              </div>
            </td>
          </tr>

          <!-- Title Area -->
          <tr>
            <td style="padding: 40px 40px 10px 40px;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px;">${title}</h2>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; font-size: 15px; line-height: 1.6; color: #4a4a4a;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 30px 40px; border-top: 1px solid #eeeeee; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888888; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                ELAOUAD Architecture & Ingénierie
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #aaaaaa; line-height: 1.5;">
                Casablanca, Maroc<br/>
                +212 666 798 536 &nbsp;|&nbsp; +212 688 018 863 &nbsp;|&nbsp; +212 520 198 738<br/>
                <a href="https://eai-construction.com" style="color: #8a9a5b; text-decoration: none;">eai-construction.com</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
