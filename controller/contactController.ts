import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import transporter from "./nodemailer/transporter";
import contactSchema from "../model/contactSchema";

export const postContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, workshopName, phone, email, postalCode, agreedToPrivacyPolicy } = req.body;

    try {
     
      const newContact = new contactSchema({
        name,
        workshopName,
        phone,
        email,
        postalCode,
        agreedToPrivacyPolicy,
      });
      await newContact.save();

     
      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,  
        to: process.env.EMAIL_USER,                    
        subject: `New Contact Request from ${name}`,    
        replyTo: email,                                
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; background-color: #f4f7fa; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0056b3; padding: 20px; color: #ffffff; border-radius: 8px 8px 0 0;">
              <h2 style="font-size: 28px; font-weight: 600; text-align: center;">New Contact Request</h2>
              <p style="font-size: 16px; text-align: center;">You have received a new contact request from <strong>${name}</strong></p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Name:</strong> ${name}
              </p>
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a>
              </p>
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Phone:</strong> ${phone}
              </p>
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Workshop Name:</strong> ${workshopName}
              </p>
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Postal Code:</strong> ${postalCode}
              </p>
              <p style="font-size: 16px; color: #555; margin-bottom: 8px;">
                <strong>Privacy Policy Agreement:</strong> ${agreedToPrivacyPolicy ? 'Agreed' : 'Not Agreed'}
              </p>
            </div>
            <div style="padding: 20px; text-align: center; font-size: 14px; color: #777; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
              <p>Sent from your contact form at <a href="https://yourwebsite.com" style="color: #0056b3; text-decoration: none;">khalil-dev.me</a></p>
            </div>
          </div>
        `,  
      };
      
      

      
      await transporter.sendMail(mailOptions);
      res.status(200).send('Message sent successfully'); 
    } catch (error) {
      console.error('Error sending email:', error);  
      res.status(500).send('Error sending message');  
    }
});
