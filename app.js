const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message,subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail to you (Admin)
const adminMail = {
  from: `"Portfolio Contact" <${email}>`,
  to: process.env.ADMIN_EMAIL,
  subject: `📬 New Inquiry from ${name} - ${subject}`,
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #1e40af; margin-bottom: 10px;">🚀 New Contact Form Submission</h2>
      
      <p style="font-size: 16px; margin: 6px 0;"><strong>👤 Name:</strong> ${name}</p>
      <p style="font-size: 16px; margin: 6px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
      <p style="font-size: 16px; margin: 6px 0;"><strong>📝 Subject:</strong> ${subject}</p>
      <p style="font-size: 16px; margin: 6px 0;"><strong>💬 Message:</strong></p>
      <div style="padding: 10px; background-color: #fff; border: 1px solid #ddd; border-radius: 4px; margin-top: 4px;">
        ${message.replace(/\n/g, '<br>')}
      </div>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 14px; color: #6b7280;">
        This message was sent via your portfolio contact form at <a href="https://lovemaluja.dev" style="color: #1e40af; text-decoration: none;">lovemaluja.dev</a>.
      </p>
    </div>
  `
};


  // Mail to User
const userMail = {
  from: `"Love Maluja | Web Developer" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Thank You for Reaching Out 🙏",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #1e40af;">Hey ${name},</h2>

      <p style="font-size: 16px; color: #333;">Thank you for getting in touch! 😊</p>
      <p style="font-size: 16px; color: #333;">I’ve received your message and will get back to you shortly. If it's urgent, feel free to reply to this email directly.</p>

      <p style="font-size: 16px; margin-top: 24px;">Looking forward to connecting with you!</p>

      <p style="margin-top: 30px; font-size: 16px; color: #1f2937;">
        Warm regards,<br>
        <strong>Love Maluja</strong><br>
        Full Stack Web Developer<br>
        <a href="mailto:malujalove9@gmail.com" style="color: #1e40af;">malujalove9@gmail.com</a><br>
        <a href="https://portfoliolove-gamma.vercel.app/" target="_blank" style="color: #1e40af;">https://portfoliolove-gamma.vercel.app/</a>
      </p>

      <hr style="margin-top: 30px; border-color: #ddd;" />
      <p style="font-size: 12px; color: #6b7280;">
        This is an automated message confirming your form submission on my portfolio. I appreciate your interest!
      </p>
    </div>
  `
};


  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);
    res.json({ message: "✅ Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to send message." });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
