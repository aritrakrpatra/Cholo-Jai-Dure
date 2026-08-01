// Shared eye-catching HTML email building blocks used by booking-status
// and enquiry (contact) emails, so every outgoing mail shares one brand look.

// Vercel serverless functions don't bundle the `public/` folder into
// `/var/task`, so reading "cjd logo.jpg" via fs on the server throws ENOENT
// in production even though it works locally. Point the <img> at the
// publicly hosted static asset instead of attaching/reading it from disk.
function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
}

const LOGO_URL = `${getBaseUrl()}/cjd%20logo.jpg`;

export function esc(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function fmtDate(dateStr) {
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

export function fmtDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  } catch {
    return iso;
  }
}

// Kept as a no-op for backward compatibility — callers still pass
// `attachments: logoAttachment()`, but the logo is now a remote <img>
// (see LOGO_URL) so no filesystem attachment is needed anymore.
export function logoAttachment() {
  return [];
}

/**
 * Wraps body content in the branded dark card layout with a colored top
 * accent bar and optional hero banner (icon + title + subtitle).
 */
export function emailWrapper(content, options = {}) {
  const { accent = "#f59e0b", hero } = options;

  const heroBlock = hero
    ? `
        <tr>
          <td align="center" style="background:linear-gradient(135deg,${accent}22,${accent}05);padding:32px 32px 8px;">
            <div style="width:64px;height:64px;border-radius:50%;background:${accent}1f;margin:0 auto 14px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">${hero.icon || "✨"}</div>
            <h1 style="color:#f1f5f9;font-size:22px;font-weight:700;margin:0 0 6px;">${esc(hero.title || "")}</h1>
            ${hero.subtitle ? `<p style="color:#94a3b8;font-size:14px;margin:0 0 8px;">${hero.subtitle}</p>` : ""}
          </td>
        </tr>`
    : "";

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
          <td align="center" style="background:#1e293b;border-radius:16px 16px 0 0;padding:28px 32px;border-bottom:3px solid ${accent};">
            <div style="display:inline-flex;align-items:center;gap:12px;">
              <div style="height:44px;display:inline-flex;align-items:center;justify-content:center;">
                <img src="${LOGO_URL}" alt="Cholo Jai Dure logo" style="height:44px;width:auto;display:block;border-radius:8px;" />
              </div>
              <div>
                <div style="color:${accent};font-size:18px;font-weight:700;letter-spacing:0.5px;">Cholo Jai Dure</div>
                <div style="color:#94a3b8;font-size:11px;">Tour &amp; Travels</div>
              </div>
            </div>
          </td>
        </tr>
        ${heroBlock}
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

export function detailRow(label, value) {
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

export function ctaButton(href, label, accent = "#f59e0b") {
  return `
    <div style="text-align:center;">
      <a href="${esc(href)}" style="display:inline-block;background:${accent};color:#0f172a;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.5px;">
        ${esc(label)}
      </a>
    </div>`;
}
