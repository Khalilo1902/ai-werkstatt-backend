import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import transporter from "./nodemailer/transporter";
import Contact from "../model/contactSchema";

export const postContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, workshopName, phone, email, postalCode, agreedToPrivacyPolicy } = req.body;

  try {
    // Save contact to database
    const newContact = new Contact({
      name,
      workshopName,
      phone,
      email,
      postalCode,
      agreedToPrivacyPolicy,
    });
    await newContact.save();

    // Define the logo URL
    const logoUrl = `${process.env.PORT}/webkraft.png`; // e.g., "https://ai-werkstatt.vercel.app/webkraft.png"

    // Email options with an elegant, dark-themed template
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #d1d5db; }
            a { color: #60a5fa; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body style="background-color: #1f2937 ;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 30px auto; background-color: #111827; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);">
            <!-- Header -->
            <tr style="background-color: #1e40af; padding: 30px; text-align: center ;">
              <td style="background-color: #1e40af; padding: 30px; text-align: center ;">
                <img src="${logoUrl}" alt="AI-Werkstatt Logo" style="max-width: 120px; height: auto; display: block; margin: 0 auto 15px;" />
                <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">Kontaktanfrage</h1>
                <p style="font-size: 16px; color: #bfdbfe;">Empfangen von  <strong>${name}</strong></p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 30px; background-color: #1f2937;">
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td style="font-size: 16px; padding: 10px 0; border-bottom: 1px solid #374151; color: #d1d5db;">
                      <strong style="color: #60a5fa; display: inline-block; min-width: 130px;">Name</strong> 
                      <span>${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; padding: 10px 0; border-bottom: 1px solid #374151; color: #d1d5db;">
                      <strong style="color: #60a5fa; display: inline-block; min-width: 130px;">Email</strong> 
                      <a href="mailto:${email}" style="color: #60a5fa;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; padding: 10px 0; border-bottom: 1px solid #374151; color: #d1d5db;">
                      <strong style="color: #60a5fa; display: inline-block; min-width: 130px;">Telefon</strong> 
                      <span>${phone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; padding: 10px 0; border-bottom: 1px solid #374151; color: #d1d5db;">
                      <strong style="color: #60a5fa; display: inline-block; min-width: 130px;">Werkstatt</strong> 
                      <span>${workshopName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; padding: 10px 0; border-bottom: 1px solid #374151; color: #d1d5db;">
                      <strong style="color: #60a5fa; display: inline-block; min-width: 130px;">Postleitzahl</strong> 
                      <span>${postalCode}</span>
                    </td>
                  </tr>
                 
                </table>
                <!-- Call to Action -->
                <div style="text-align: center; margin-top: 25px;">
                  <a href="mailto:${email}" style="display: inline-block; padding: 12px 28px; background-color: #60a5fa; color: #ffffff; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none; box-shadow: 0 3px 8px rgba(96, 165, 250, 0.3);">
                    Antworten an ${name}
                  </a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding: 20px; text-align: center; font-size: 13px; color: #9ca3af; background-color: #111827; border-top: 1px solid #374151;">
                <p>Bereitgestellt von<a href="https://ai-werkstatt.vercel.app/" style="color: #60a5fa;">AI Werkstatt</a></p>
                <p style="margin-top: 5px;">© ${new Date().getFullYear()} AI-Werkstatt. Alle Rechte vorbehalten..</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});