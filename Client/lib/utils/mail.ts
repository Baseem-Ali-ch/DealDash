import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Verify Your Email Address",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Verify Your Email Address</title>
      <style type="text/css">
        @media screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 15px !important;
          }
          .button {
            padding: 12px 20px !important;
            font-size: 16px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1f2937 !important;
            color: #d1d5db !important;
          }
          .container {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
          }
          .header {
            color: #f3f4f6 !important;
          }
          .content {
            color: #d1d5db !important;
          }
          .button {
            background-color: #3b82f6 !important;
            border-color: #3b82f6 !important;
            color: #ffffff !important;
          }
          .button:hover {
            background-color: #2563eb !important;
            border-color: #2563eb !important;
          }
          .footer {
            color: #9ca3af !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; color: #4b5563; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
        <tr>
          <td align="center">
            <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px; margin: 0 auto;">
              <!-- Logo -->
              <tr>
                <td style="text-align: center; padding-bottom: 24px;">
                  <div style="display: inline-block; background: linear-gradient(to right, #3b82f6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    DealDash
                  </div>
                </td>
              </tr>
              <!-- Header -->
              <tr>
                <td style="text-align: center; padding-bottom: 24px;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #1f2937; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    Welcome to DealDash!
                  </h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="text-align: center; padding-bottom: 24px;">
                  <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 24px;">
                    Thank you for signing up! Please verify your email address to activate your account.
                  </p>
                  <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 24px;">
                    Click the button below to confirm your email:
                  </p>
                </td>
              </tr>
              <!-- Button -->
              <tr>
                <td style="text-align: center; padding-bottom: 24px;">
                  <a
                    href="${verificationUrl}"
                    style="display: inline-block; padding: 14px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; font-weight: 500; border-radius: 8px; font-size: 16px; line-height: 1; transition: all 0.2s; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);"
                    onmouseover="this.style.backgroundColor='#2563eb'; this.style.transform='translateY(-1px)'"
                    onmouseout="this.style.backgroundColor='#3b82f6'; this.style.transform='translateY(0)'"
                  >
                    Verify Email
                  </a>
                </td>
              </tr>
              <!-- Alternative Link -->
              <tr>
                <td style="text-align: center; padding-bottom: 24px;">
                  <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px;">
                    If the button doesn't work, copy and paste this link:
                  </p>
                  <a 
                    href="${verificationUrl}" 
                    style="color: #3b82f6; text-decoration: none; font-size: 14px; word-break: break-all; border-bottom: 1px solid #3b82f6;"
                  >
                    ${verificationUrl}
                  </a>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 20px;">
                    If you didn't create an account with DealDash, you can safely ignore this email.
                  </p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                    Need help? 
                    <a 
                      href="${process.env.NEXT_PUBLIC_APP_URL}/contact" 
                      style="color: #3b82f6; text-decoration: none; border-bottom: 1px solid #3b82f6;"
                    >
                      Contact our support team
                    </a>
                  </p>
                  <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} DealDash. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Send email error:", error);
    return false;
  }
}
