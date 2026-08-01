import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { esc, emailWrapper, detailRow, logoAttachment, ctaButton } from "@/app/lib/emailTemplate";

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

    const adminRows = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Submitted At", submittedAt],
    ].map(([l, v]) => detailRow(l, v)).join("");

    const adminContent = `
      <div style="margin-bottom:24px;">
        <h1 style="color:#f1f5f9;font-size:20px;font-weight:700;margin:0 0 8px;">💬 New Travel Inquiry</h1>
        <p style="color:#94a3b8;font-size:14px;margin:0;">Someone submitted the contact form on the website.</p>
      </div>

      <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">${adminRows}</table>
      </div>

      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Message</p>
        <p style="color:#f1f5f9;font-size:13px;margin:0;line-height:1.6;">${esc(message).replace(/\n/g, "<br/>")}</p>
      </div>

      ${ctaButton(`mailto:${email}`, "Reply to Customer →")}`;

    const customerContent = `
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(245,158,11,0.1);margin:0 auto 16px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">🌍</div>
        <h1 style="color:#f1f5f9;font-size:22px;font-weight:700;margin:0 0 8px;">Thanks for Reaching Out!</h1>
        <p style="color:#94a3b8;font-size:14px;margin:0;">Hello <strong style="color:#f1f5f9;">${esc(name)}</strong>, we have received your inquiry.</p>
      </div>

      <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${detailRow("Phone", phone)}
          ${detailRow("Email", email)}
          ${detailRow("Submitted At", submittedAt)}
        </table>
      </div>

      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Your Message</p>
        <p style="color:#f1f5f9;font-size:13px;margin:0;line-height:1.6;">${esc(message).replace(/\n/g, "<br/>")}</p>
      </div>

      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#fbbf24;font-size:13px;font-weight:700;margin:0 0 8px;">📌 What Happens Next?</p>
        <p style="color:#d1d5db;font-size:13px;margin:0;line-height:1.6;">
          Our travel consultant will review your inquiry and get back to you shortly with the best options for your trip.
        </p>
      </div>

      ${ctaButton(`tel:${(businessPhone.match(/[0-9+]+/) || [""])[0]}`, "Call Us Now →")}

      <p style="color:#94a3b8;font-size:13px;text-align:center;margin:24px 0 0;">
        Thank you for choosing <strong style="color:#f59e0b;">Cholo Jai Dure Tour &amp; Travels</strong>.<br/>
        Let's plan your next adventure! ✈️
      </p>`;

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
        html: emailWrapper(adminContent),
        attachments: logoAttachment(),
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
        html: emailWrapper(customerContent),
        attachments: logoAttachment(),
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
