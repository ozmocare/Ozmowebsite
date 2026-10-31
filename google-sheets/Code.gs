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
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
