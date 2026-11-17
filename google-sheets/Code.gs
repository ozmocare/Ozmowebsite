/**
 * OZMO website → Google Sheet lead capture.
 *
 * Paste this whole file into Extensions → Apps Script of the OZMO leads spreadsheet,
 * set SECRET below, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the web app URL and the same SECRET
 * into Vercel as GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_SECRET.
 * Full steps: google-sheets/README.md
 */

// Must match GOOGLE_SHEETS_SECRET in Vercel. Use a long random string.
const SECRET = "CHANGE-ME-to-a-long-random-string";
const SHEET_NAME = "Leads";
// The OZMO leads spreadsheet: the long ID in its link (docs.google.com/spreadsheets/d/<ID>/edit).
// Leads always go here, even if this script was created from a different file.
const SPREADSHEET_ID = "PASTE-THE-SHEET-ID-HERE";
// Who gets an email for every new lead. Separate several addresses with commas.
// Leave empty ("") to turn the emails off.
const NOTIFY_EMAILS = "PASTE-EMAIL@example.com";

// Column order in the sheet. Keys are the fields the website sends.
const COLUMNS = [
  ["Received (IST)", "submitted_at"],
  ["Form", "form"],
  ["Name", "name"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["Branch", "branch"],
  ["Interested in", "service"],
  ["Call back time", "callback"],
  ["City (franchise)", "city"],
  ["Budget (franchise)", "budget"],
  ["Message", "message"],
  ["UTM source", "utm_source"],
  ["UTM medium", "utm_medium"],
  ["UTM campaign", "utm_campaign"],
  ["Keyword", "utm_term"],
  ["Ad content", "utm_content"],
  ["Google Ads click ID", "gclid"],
  ["Page", "page"],
  ["Status", null], // for the OZMO team: New / Called / Joined / Not interested
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return reply({ ok: false, error: "unauthorized" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet();
      const row = COLUMNS.map(([, key]) => (key ? safe(data[key]) : "New"));
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    notifyNewLead(data); // after the row is saved; a failed email never loses the lead
    return reply({ ok: true, tab: SHEET_NAME, sheet: SpreadsheetApp.openById(SPREADSHEET_ID).getName() });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Emails the OZMO team a summary of the new lead, with tap-to-call and WhatsApp links. */
function notifyNewLead(data) {
  if (!NOTIFY_EMAILS || NOTIFY_EMAILS.indexOf("@example.com") !== -1) return;
  try {
    const esc = (v) =>
      String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const name = String(data.name || "Someone").trim();
    const phone = String(data.phone || "").replace(/[^\d+]/g, "");
    const digits = phone.replace(/\D/g, "");
    const waNumber = digits.length === 10 ? "91" + digits : digits;
    const fields = [
      ["Name", data.name],
      ["Phone", data.phone],
      ["Email", data.email],
      ["Branch", data.branch],
      ["Interested in", data.service],
      ["Call back time", data.callback],
      ["Message", data.message],
      ["Form", data.form],
      ["Source", [data.utm_source, data.utm_campaign].filter(Boolean).join(" / ")],
      ["Received", data.submitted_at],
    ].filter(([, v]) => v);

    const rows = fields
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-weight:600">${esc(v)}</td></tr>`)
      .join("");
    const sheetUrl = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit";
    const button = (href, label, bg) =>
      `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:6px;background:${bg};color:#111;font-weight:700;text-decoration:none">${label}</a>`;
    const html =
      `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">` +
      `<h2 style="margin:0 0 12px">New website lead</h2>` +
      `<table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>` +
      (phone ? button("tel:" + phone, "Call " + esc(data.phone), "#fcee00") : "") +
      (waNumber ? button("https://wa.me/" + waNumber, "WhatsApp", "#25d366") : "") +
      button(sheetUrl, "Open leads sheet", "#e5e5e5") +
      `</div>`;
    const text = fields.map(([k, v]) => k + ": " + v).join("\n") + "\n\nLeads sheet: " + sheetUrl;

    MailApp.sendEmail({
      to: NOTIFY_EMAILS,
      subject: "New lead: " + name + (data.branch ? " – " + data.branch : ""),
      body: text,
      htmlBody: html,
      name: "OZMO Website Leads",
    });
  } catch (err) {
    console.error("Lead email failed: " + err);
  }
}

/** Run once from the editor (▶ Run → testEmail) to approve email permission and send a sample. */
function testEmail() {
  notifyNewLead({
    name: "Test Lead",
    phone: "9876543210",
    branch: "Dugri",
    service: "Gym",
    form: "Test",
    submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  });
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#fcee00");
  }
  return sheet;
}

// Store everything as text, and neutralise values that a spreadsheet would treat as a formula.
function safe(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /^[=+\-@]/.test(s) || /^\d{6,}$/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor (▶ Run → testSetup) to create the header row and check permissions. */
function testSetup() {
  getSheet();
}
