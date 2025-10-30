import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'puahtzefoong@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>New Message</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #fafafa;">

            <!-- Main Container -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa;">
              <tr>
                <td style="padding: 40px 20px;">

                  <!-- Content Wrapper -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); overflow: hidden;">

                    <!-- Header -->
                    <tr>
                      <td style="padding: 48px 40px 32px 40px; background-color: #ffffff; border-bottom: 1px solid rgba(0, 0, 0, 0.06);">
                        <h1 style="margin: 0; padding: 0; font-size: 32px; font-weight: 600; line-height: 1.2; letter-spacing: -0.025em; color: #262626;">
                          New Message
                        </h1>
                        <p style="margin: 8px 0 0 0; padding: 0; font-size: 16px; font-weight: 400; line-height: 1.5; color: #737373;">
                          You have received a new message from your portfolio website
                        </p>
                      </td>
                    </tr>

                    <!-- Contact Information Card -->
                    <tr>
                      <td style="padding: 40px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 10px; overflow: hidden;">
                          <tr>
                            <td style="padding: 28px 32px;">

                              <!-- Section Label -->
                              <p style="margin: 0 0 20px 0; padding: 0; font-size: 11px; font-weight: 600; line-height: 1; letter-spacing: 0.08em; text-transform: uppercase; color: #a3a3a3;">
                                Contact Details
                              </p>

                              <!-- Name -->
                              <div style="margin-bottom: 20px;">
                                <p style="margin: 0 0 6px 0; padding: 0; font-size: 12px; font-weight: 500; line-height: 1; letter-spacing: 0.01em; color: #737373;">
                                  Name
                                </p>
                                <p style="margin: 0; padding: 0; font-size: 16px; font-weight: 500; line-height: 1.4; color: #262626;">
                                  ${name}
                                </p>
                              </div>

                              <!-- Email -->
                              <div style="margin-bottom: 20px;">
                                <p style="margin: 0 0 6px 0; padding: 0; font-size: 12px; font-weight: 500; line-height: 1; letter-spacing: 0.01em; color: #737373;">
                                  Email Address
                                </p>
                                <p style="margin: 0; padding: 0;">
                                  <a href="mailto:${email}" style="font-size: 16px; font-weight: 500; line-height: 1.4; color: #262626; text-decoration: none; border-bottom: 1px solid rgba(38, 38, 38, 0.2); padding-bottom: 1px; transition: border-color 0.2s ease;">
                                    ${email}
                                  </a>
                                </p>
                              </div>

                              <!-- Timestamp -->
                              <div>
                                <p style="margin: 0 0 6px 0; padding: 0; font-size: 12px; font-weight: 500; line-height: 1; letter-spacing: 0.01em; color: #737373;">
                                  Received
                                </p>
                                <p style="margin: 0; padding: 6px 10px; font-family: 'SF Mono', 'Monaco', 'Courier New', monospace; font-size: 13px; font-weight: 400; line-height: 1.4; color: #525252; background-color: #f5f5f5; border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 6px; display: inline-block;">
                                  ${new Date().toLocaleString('en-US', {
                                    dateStyle: 'full',
                                    timeStyle: 'short',
                                    timeZone: 'Asia/Singapore'
                                  })}
                                </p>
                              </div>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Message Card -->
                    <tr>
                      <td style="padding: 0 40px 40px 40px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 10px; overflow: hidden;">
                          <tr>
                            <td style="padding: 28px 32px;">

                              <!-- Section Label -->
                              <p style="margin: 0 0 20px 0; padding: 0; font-size: 11px; font-weight: 600; line-height: 1; letter-spacing: 0.08em; text-transform: uppercase; color: #a3a3a3;">
                                Message
                              </p>

                              <!-- Message Content -->
                              <div style="margin: 0; padding: 20px 0 0 0; border-top: 1px solid rgba(0, 0, 0, 0.06);">
                                <p style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; line-height: 1.7; color: #404040; white-space: pre-wrap; word-wrap: break-word;">
${message}</p>
                              </div>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Quick Action Banner -->
                    <tr>
                      <td style="padding: 0 40px 40px 40px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 10px;">
                          <tr>
                            <td style="padding: 20px 24px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td style="vertical-align: middle;">
                                    <p style="margin: 0; padding: 0; font-size: 13px; font-weight: 500; line-height: 1.5; color: #525252;">
                                      Click reply to respond to <strong style="color: #262626;">${name}</strong>
                                    </p>
                                  </td>
                                  <td align="right" style="vertical-align: middle;">
                                    <a href="mailto:${email}" style="display: inline-block; padding: 8px 16px; font-size: 13px; font-weight: 600; line-height: 1; color: #262626; background-color: #ffffff; border: 1.5px solid #262626; border-radius: 6px; text-decoration: none; transition: all 0.15s ease;">
                                      Reply
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px 40px 40px 40px; background-color: #ffffff; border-top: 1px solid rgba(0, 0, 0, 0.06);">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td align="center">
                              <p style="margin: 0; padding: 0; font-size: 12px; font-weight: 400; line-height: 1.5; color: #a3a3a3;">
                                Sent from your portfolio website contact form
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                  <!-- End Content Wrapper -->

                </td>
              </tr>
            </table>
            <!-- End Main Container -->

          </body>
        </html>
      `,
      text: `
NEW CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have received a new message from your portfolio website.

CONTACT DETAILS
───────────────────────────────────────────────────────────────────

Name:     ${name}
Email:    ${email}
Received: ${new Date().toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Asia/Singapore'
})}

MESSAGE
───────────────────────────────────────────────────────────────────

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to ${email} to respond.

Sent from your portfolio website contact form
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
