import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // 1. Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App Password from Google
      },
    });

    // 2. Email options
    const mailOptions = {
      from: `"Harmoney" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Failed to send email: ", error);
  }
};
