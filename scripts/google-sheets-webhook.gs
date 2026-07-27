/**
 * Paste this into Extensions → Apps Script in your Google Sheet, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the web app URL in GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * Sheet row 1 headers (recommended):
 * Timestamp | Full Name | Email | Phone | Device Type | Description
 */
function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Donations") ||
      SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.full_name || "",
      data.email || "",
      data.phone || "",
      data.device_type || "",
      data.description || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
