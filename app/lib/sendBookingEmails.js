import nodemailer from "nodemailer";

const LOGO_CID = "cjdLogo";
const LOGO_FILE_PATH = `${process.cwd()}/public/cjd logo.jpg`;

function esc(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fmtDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function fmtDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  } catch {
    return iso;
  }
}

function createTransporter() {
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || 0) || undefined;
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;

  if (!user || !pass) throw new Error("SMTP credentials not configured.");

  return nodemailer.createTransport(
    host
      ? { host, port: port || 587, secure, auth: { user, pass } }
      : { service: "gmail", auth: { user, pass } }
  );
}

function logoAttachment() {
  return [{ filename: "cjd logo.jpg", path: LOGO_FILE_PATH, cid: LOGO_CID }];
}

// ─── HTML template helpers ───────────────────────────────────────────────────

function emailWrapper(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cholo Jai Dure</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td align="center" style="background:#1e293b;border-radius:16px 16px 0 0;padding:28px 32px;border-bottom:2px solid #f59e0b;">
            <div style="display:inline-flex;align-items:center;gap:12px;">
              <div style="height:44px;display:inline-flex;align-items:center;justify-content:center;">
                <img src="cid:${LOGO_CID}" alt="Cholo Jai Dure logo" style="height:44px;width:auto;display:block;border-radius:8px;" />
              </div>
              <div>
                <div style="color:#f59e0b;font-size:18px;font-weight:700;letter-spacing:0.5px;">Cholo Jai Dure</div>
                <div style="color:#94a3b8;font-size:11px;">Tour &amp; Travels</div>
              </div>
            </div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#1e293b;padding:32px;border-radius:0 0 16px 16px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td align="center" style="padding:24px 0;">
            <p style="color:#475569;font-size:12px;margin:0;">
              © ${new Date().getFullYear()} Cholo Jai Dure Tour &amp; Travels · All rights reserved
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #334155;width:40%;">
        <span style="color:#94a3b8;font-size:13px;">${esc(label)}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #334155;">
        <span style="color:#f1f5f9;font-size:13px;font-weight:600;">${esc(String(value || "—"))}</span>
      </td>
    </tr>`;
}

function statusBadge(status) {
  const map = {
    pending: { bg: "#451a03", color: "#fbbf24", label: "Pending" },
    contacted: { bg: "#0c2340", color: "#60a5fa", label: "Contacted" },
    confirmed: { bg: "#052e16", color: "#4ade80", label: "Confirmed" },
    payment_pending: { bg: "#431407", color: "#fb923c", label: "Payment Pending" },
    paid: { bg: "#022c22", color: "#34d399", label: "Paid" },
    cancelled: { bg: "#450a0a", color: "#f87171", label: "Cancelled" },
  };
  const s = map[status] || map.pending;
  return `<span style="background:${s.bg};color:${s.color};padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.5px;">${s.label}</span>`;
}

function statusLabel(status) {
  const labels = {
    pending: "Pending",
    contacted: "Contacted",
    confirmed: "Confirmed",
    payment_pending: "Payment Pending",
    paid: "Paid",
    cancelled: "Cancelled",
  };
  return labels[status] || "Updated";
}

// ─── Customer confirmation email ─────────────────────────────────────────────

function buildCustomerEmailHtml(booking) {
  const rows = [
    ["Booking ID", booking.bookingId],
    ["Package", booking.packageName],
    ["Travel Date", fmtDate(booking.travelDate)],
    ["Adults", booking.adults],
    ["Children", booking.children || 0],
    ["Total Travelers", booking.totalTravelers],
    ["Pickup Location", booking.pickupLocation || "Not specified"],
    ["Booked On", fmtDateTime(booking.createdAt)],
  ].map(([l, v]) => detailRow(l, v)).join("");

  const content = `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="width:64px;height:64px;border-radius:50%;background:rgba(74,222,128,0.1);margin:0 auto 16px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">✅</div>
      <h1 style="color:#f1f5f9;font-size:22px;font-weight:700;margin:0 0 8px;">Booking Request Received!</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0;">Hello <strong style="color:#f1f5f9;">${esc(booking.customerName)}</strong>, we have received your booking request.</p>
    </div>

    <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
      <div style="text-align:center;margin-bottom:16px;">
        <span style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your Booking ID</span>
        <div style="color:#f59e0b;font-size:26px;font-weight:800;letter-spacing:2px;margin-top:4px;">${esc(booking.bookingId)}</div>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>

    <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#fbbf24;font-size:13px;font-weight:700;margin:0 0 8px;">📌 Important Note</p>
      <p style="color:#d1d5db;font-size:13px;margin:0;line-height:1.6;">
        This is a <strong>booking request only</strong>. Your booking is not yet confirmed.
        Our travel consultant will contact you shortly to confirm your booking and provide payment details.
      </p>
    </div>

    <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#f1f5f9;font-size:13px;font-weight:700;margin:0 0 12px;">📞 Need Help? Contact Us</p>
      <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">
        📱 Phone: <span style="color:#f1f5f9;">${esc(process.env.CONTACT_BUSINESS_PHONE || "7501307766 / 7478167607")}</span>
      </p>
      <p style="color:#94a3b8;font-size:13px;margin:0;">
        ✉️ Email: <span style="color:#f1f5f9;">${esc(process.env.CONTACT_RECEIVER_EMAIL || "cholojaiduretourandtravels@gmail.com")}</span>
      </p>
    </div>

    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:0;">
      Thank you for choosing <strong style="color:#f59e0b;">Cholo Jai Dure Tour &amp; Travels</strong>.<br/>
      We look forward to making your journey unforgettable! 🌟
    </p>`;

  return emailWrapper(content);
}

// ─── Admin notification email ─────────────────────────────────────────────────

function buildAdminEmailHtml(booking) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const adminLink = `${baseUrl}/admin/bookings/${booking.id}`;

  const rows = [
    ["Booking ID", booking.bookingId],
    ["Package", booking.packageName],
    ["Customer Name", booking.customerName],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["WhatsApp", booking.whatsapp || "Not provided"],
    ["City", booking.city || "Not provided"],
    ["Travel Date", fmtDate(booking.travelDate)],
    ["Adults", booking.adults],
    ["Children", booking.children || 0],
    ["Total Travelers", booking.totalTravelers],
    ["Pickup Location", booking.pickupLocation || "Not specified"],
    ["Special Requests", booking.specialRequests || "None"],
    ["Booked On", fmtDateTime(booking.createdAt)],
  ].map(([l, v]) => detailRow(l, v)).join("");

  const content = `
    <div style="margin-bottom:24px;">
      <h1 style="color:#f1f5f9;font-size:20px;font-weight:700;margin:0 0 8px;">🔔 New Booking Request</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0;">A new booking has been submitted on the website.</p>
      <div style="margin-top:12px;">${statusBadge(booking.bookingStatus)}</div>
    </div>

    <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>

    ${booking.specialRequests ? `
    <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Special Requests</p>
      <p style="color:#f1f5f9;font-size:13px;margin:0;line-height:1.6;">${esc(booking.specialRequests)}</p>
    </div>` : ""}

    <div style="text-align:center;">
      <a href="${esc(adminLink)}" style="display:inline-block;background:#f59e0b;color:#0f172a;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.5px;">
        View Booking in Dashboard →
      </a>
    </div>`;

  return emailWrapper(content);
}

function buildCustomerStatusUpdateEmailHtml(booking, previousStatus) {
  const content = `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="width:64px;height:64px;border-radius:50%;background:rgba(74,222,128,0.1);margin:0 auto 16px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">📣</div>
      <h1 style="color:#f1f5f9;font-size:22px;font-weight:700;margin:0 0 8px;">Booking Status Updated</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0;">Hi <strong style="color:#f1f5f9;">${esc(booking.customerName)}</strong>, your booking status has changed.</p>
    </div>

    <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
      <div style="text-align:center;margin-bottom:16px;">
        <span style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Booking ID</span>
        <div style="color:#f59e0b;font-size:24px;font-weight:800;letter-spacing:2px;margin-top:4px;">${esc(booking.bookingId)}</div>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${detailRow("Package", booking.packageName)}
        ${detailRow("Travel Date", fmtDate(booking.travelDate))}
        ${detailRow("Previous Status", statusLabel(previousStatus))}
        ${detailRow("Current Status", statusLabel(booking.bookingStatus))}
        ${detailRow("Updated On", fmtDateTime(booking.updatedAt))}
      </table>
      <div style="margin-top:16px;text-align:center;">${statusBadge(booking.bookingStatus)}</div>
    </div>

    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:0;line-height:1.6;">
      Our team will contact you if any further action is needed.
    </p>`;

  return emailWrapper(content);
}

function buildAdminStatusUpdateEmailHtml(booking, previousStatus) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const adminLink = `${baseUrl}/admin/bookings/${booking.id}`;

  const content = `
    <div style="margin-bottom:24px;">
      <h1 style="color:#f1f5f9;font-size:20px;font-weight:700;margin:0 0 8px;">🔄 Booking Status Changed</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0;">A booking status was updated in the admin dashboard.</p>
      <div style="margin-top:12px;">${statusBadge(booking.bookingStatus)}</div>
    </div>

    <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${detailRow("Booking ID", booking.bookingId)}
        ${detailRow("Package", booking.packageName)}
        ${detailRow("Customer", booking.customerName)}
        ${detailRow("Customer Email", booking.email)}
        ${detailRow("Previous Status", statusLabel(previousStatus))}
        ${detailRow("Current Status", statusLabel(booking.bookingStatus))}
        ${detailRow("Updated On", fmtDateTime(booking.updatedAt))}
      </table>
    </div>

    <div style="text-align:center;">
      <a href="${esc(adminLink)}" style="display:inline-block;background:#f59e0b;color:#0f172a;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.5px;">
        Open Booking in Dashboard →
      </a>
    </div>`;

  return emailWrapper(content);
}

// ─── Exported send functions ──────────────────────────────────────────────────

export async function sendCustomerBookingEmail(booking) {
  const transporter = createTransporter();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpFrom = (process.env.SMTP_FROM || smtpUser).trim();

  await transporter.sendMail({
    from: `Cholo Jai Dure Tour & Travels <${smtpFrom}>`,
    to: booking.email,
    subject: `Booking Request Received — ${booking.bookingId} | Cholo Jai Dure`,
    html: buildCustomerEmailHtml(booking),
    attachments: logoAttachment(),
    text: [
      `Hello ${booking.customerName},`,
      "",
      "Thank you for choosing Cholo Jai Dure Tour & Travels.",
      "We have received your booking request.",
      "",
      `Booking ID: ${booking.bookingId}`,
      `Package: ${booking.packageName}`,
      `Travel Date: ${fmtDate(booking.travelDate)}`,
      `Travelers: ${booking.totalTravelers} (Adults: ${booking.adults}, Children: ${booking.children || 0})`,
      "",
      "This is a booking REQUEST only. Our team will contact you shortly to confirm.",
      "",
      `Contact us: ${process.env.CONTACT_BUSINESS_PHONE || "7501307766 / 7478167607"}`,
      "",
      "Regards,",
      "Cholo Jai Dure Tour & Travels",
    ].join("\n"),
  });
}

export async function sendAdminBookingEmail(booking) {
  const transporter = createTransporter();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpFrom = (process.env.SMTP_FROM || smtpUser).trim();
  const adminTo = process.env.CONTACT_RECEIVER_EMAIL || "cholojaiduretourandtravels@gmail.com";

  await transporter.sendMail({
    from: `Cholo Jai Dure Website <${smtpFrom}>`,
    to: adminTo,
    replyTo: booking.email,
    subject: `New Booking: ${booking.bookingId} — ${booking.packageName} | ${booking.customerName}`,
    html: buildAdminEmailHtml(booking),
    attachments: logoAttachment(),
    text: [
      `New Booking Received`,
      `Booking ID: ${booking.bookingId}`,
      `Package: ${booking.packageName}`,
      `Customer: ${booking.customerName}`,
      `Email: ${booking.email}`,
      `Phone: ${booking.phone}`,
      `Travel Date: ${fmtDate(booking.travelDate)}`,
      `Travelers: ${booking.totalTravelers}`,
      `Booked On: ${fmtDateTime(booking.createdAt)}`,
    ].join("\n"),
  });
}

export async function sendCustomerStatusUpdateEmail(booking, previousStatus) {
  const transporter = createTransporter();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpFrom = (process.env.SMTP_FROM || smtpUser).trim();

  await transporter.sendMail({
    from: `Cholo Jai Dure Tour & Travels <${smtpFrom}>`,
    to: booking.email,
    subject: `Booking ${booking.bookingId} Status: ${statusLabel(booking.bookingStatus)} | Cholo Jai Dure`,
    html: buildCustomerStatusUpdateEmailHtml(booking, previousStatus),
    attachments: logoAttachment(),
    text: [
      `Hello ${booking.customerName},`,
      "",
      "Your booking status has been updated.",
      `Booking ID: ${booking.bookingId}`,
      `Package: ${booking.packageName}`,
      `Previous Status: ${statusLabel(previousStatus)}`,
      `Current Status: ${statusLabel(booking.bookingStatus)}`,
      `Updated On: ${fmtDateTime(booking.updatedAt)}`,
      "",
      "Regards,",
      "Cholo Jai Dure Tour & Travels",
    ].join("\n"),
  });
}

export async function sendAdminStatusUpdateEmail(booking, previousStatus) {
  const transporter = createTransporter();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpFrom = (process.env.SMTP_FROM || smtpUser).trim();
  const adminTo = process.env.CONTACT_RECEIVER_EMAIL || "cholojaiduretourandtravels@gmail.com";

  await transporter.sendMail({
    from: `Cholo Jai Dure Website <${smtpFrom}>`,
    to: adminTo,
    replyTo: booking.email,
    subject: `Booking Status Updated: ${booking.bookingId} -> ${statusLabel(booking.bookingStatus)}`,
    html: buildAdminStatusUpdateEmailHtml(booking, previousStatus),
    attachments: logoAttachment(),
    text: [
      "Booking Status Changed",
      `Booking ID: ${booking.bookingId}`,
      `Package: ${booking.packageName}`,
      `Customer: ${booking.customerName}`,
      `Customer Email: ${booking.email}`,
      `Previous Status: ${statusLabel(previousStatus)}`,
      `Current Status: ${statusLabel(booking.bookingStatus)}`,
      `Updated On: ${fmtDateTime(booking.updatedAt)}`,
    ].join("\n"),
  });
}
