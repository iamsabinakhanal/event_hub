import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER?.trim();
const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

function getEmailConfigError(): string | null {
  if (!emailUser) {
    return "Missing EMAIL_USER environment variable";
  }

  if (!emailPassword || emailPassword === "your_app_password_here") {
    return "Missing or placeholder EMAIL_PASSWORD. Use a valid Gmail App Password.";
  }

  return null;
}

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const configError = getEmailConfigError();
    if (configError) {
      return {
        success: false,
        error: configError,
      };
    }

    // Verify transporter connection
    await transporter.verify();

    const mailOptions = {
      from: emailUser,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || "",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Send contact form notification email to admin
export async function sendContactFormEmail(contactData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || emailUser;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
        ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${contactData.subject}</p>
      </div>

      <div style="background-color: #fff9e6; padding: 20px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Message:</h3>
        <p style="white-space: pre-wrap; color: #555;">${contactData.message}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #999; font-size: 12px; text-align: center;">
        This is an automated email from your Event Hub contact form.
      </p>
    </div>
  `;

  return sendEmail({
    to: adminEmail || "",
    subject: `New Contact Form: ${contactData.subject}`,
    html: htmlContent,
  });
}

// Send confirmation email to customer
export async function sendCustomerConfirmationEmail(customerData: {
  name: string;
  email: string;
  subject: string;
}) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">We Received Your Message</h2>
      
      <p>Hi ${customerData.name},</p>
      
      <p>Thank you for contacting Event Hub! We have received your message and will get back to you as soon as possible.</p>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 4px; margin: 20px 0;">
        <p><strong>Subject:</strong> ${customerData.subject}</p>
        <p style="color: #666; font-size: 14px;">Our team typically responds within 24 hours.</p>
      </div>

      <p>If you have any urgent matters, please call us at: <strong>+977 9822800399</strong></p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #999; font-size: 12px;">
        Thank you for choosing Event Hub!<br>
        Best regards,<br>
        Event Hub Team
      </p>
    </div>
  `;

  return sendEmail({
    to: customerData.email,
    subject: "We Received Your Message - Event Hub",
    html: htmlContent,
  });
}
