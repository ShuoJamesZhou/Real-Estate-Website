const sanitizeHtml = require("sanitize-html");

function sanitizePlainText(raw) {
  if (raw == null) return "";
  const stripped = sanitizeHtml(String(raw), { allowedTags: [], allowedAttributes: {} });
  return stripped.replace(/\r\n/g, "\n").trim();
}

module.exports = { sanitizePlainText };

