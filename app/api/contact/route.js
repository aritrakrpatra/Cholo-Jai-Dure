import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s]{7,20}$/;

function firstDefinedValue(values) {
  for (const value of values) {
    const normalized = String(value || "").trim();
    if (normalized) {
      return normalized;
    }
  }
  return "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const name = payload?.name?.trim() || "";
    const phone = payload?.phone?.trim() || "";
    const email = payload?.email?.trim() || "";
    const message = payload?.message?.trim() || "";

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const smtpHost = firstDefinedValue([
      process.env.SMTP_HOST,
      process.env.EMAIL_HOST,
      process.env.MAIL_HOST,
    ]);
    const smtpPort = Number(process.env.SMTP_PORT || 0) || undefined;
    const smtpSecure =
      String(process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
      smtpPort === 465;
    const smtpUser = firstDefinedValue([
      process.env.SMTP_USER,
      process.env.SMTP_USERNAME,
      process.env.GMAIL_USER,
      process.env.EMAIL_USER,
      process.env.MAIL_USER,
    ]);
    const smtpPass = firstDefinedValue([
      process.env.SMTP_PASS,
      process.env.SMTP_PASSWORD,
      process.env.GMAIL_APP_PASSWORD,
      process.env.EMAIL_PASS,
      process.env.MAIL_PASS,
    ])
      .trim()
      .replace(/\s+/g, "");
    const smtpTo = process.env.CONTACT_RECEIVER_EMAIL || "cholojaiduretourandtravels@gmail.com";
    const smtpFrom = (process.env.SMTP_FROM || smtpUser).trim();

    if (!smtpUser || !smtpPass) {
      const missing = [];
      if (!smtpUser) {
        missing.push("SMTP_USER");
      }
      if (!smtpPass) {
        missing.push("SMTP_PASS");
      }

      return NextResponse.json(
        {
          message: `Server email is not configured. Missing: ${missing.join(", ")}. Add values in Vercel Project Settings -> Environment Variables and redeploy.`,
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport(
      smtpHost
        ? {
            host: smtpHost,
            port: smtpPort || 587,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
    );

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const businessPhone = process.env.CONTACT_BUSINESS_PHONE || "7501307766 / 7478167607";

    await Promise.all([
      transporter.sendMail({
        from: `Cholo Jai Dure Website <${smtpFrom}>`,
        to: smtpTo,
        replyTo: email,
        subject: `New Travel Inquiry from ${name}`,
        text: [
          "New inquiry received from website.",
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Submitted At: ${submittedAt}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
      }),
      transporter.sendMail({
        from: `Cholo Jai Dure Tour & Travels <${smtpFrom}>`,
        to: email,
        subject: "We received your inquiry | Cholo Jai Dure",
        text: [
          `Hello ${name},`,
          "",
          "Thank you for contacting Cholo Jai Dure Tour & Travels.",
          "We have received your inquiry and our team will contact you shortly.",
          "",
          "Your submitted details:",
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Submitted At: ${submittedAt}`,
          "",
          "Your message:",
          message,
          "",
          `For urgent support, call us at ${businessPhone}.`,
          "",
          "Regards,",
          "Cholo Jai Dure Tour & Travels",
        ].join("\n"),
        html: `
          <h2>Thank You for Your Inquiry</h2>
          <p>Hello ${escapeHtml(name)},</p>
          <p>Thank you for contacting <strong>Cholo Jai Dure Tour &amp; Travels</strong>.</p>
          <p>We have received your inquiry and our team will contact you shortly.</p>
          <p><strong>Your submitted details:</strong></p>
          <ul>
            <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
            <li><strong>Email:</strong> ${escapeHtml(email)}</li>
            <li><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</li>
          </ul>
          <p><strong>Your message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
          <p>For urgent support, call us at ${escapeHtml(businessPhone)}.</p>
          <p>Regards,<br />Cholo Jai Dure Tour &amp; Travels</p>
        `,
      }),
    ]);

    return NextResponse.json(
      { message: "Inquiry sent successfully. A confirmation email has been sent to you." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact-api] Failed to send inquiry", error);
    return NextResponse.json(
      { message: "Unable to send inquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}
