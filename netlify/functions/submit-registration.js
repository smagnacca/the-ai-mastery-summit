const { createSign } = require("crypto");

// Google Sheets config — uses same service account as other Scott projects
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const SHEET_TAB = "Summit_Registrations";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// JWT auth — zero dependencies (same pattern as practical-ai-skills-iq)
function makeJWT(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");
  const sigInput = `${header}.${payload}`;
  const sign = createSign("RSA-SHA256");
  sign.update(sigInput);
  const sig = sign.sign(serviceAccount.private_key, "base64url");
  return `${sigInput}.${sig}`;
}

async function getAccessToken(serviceAccount) {
  const jwt = makeJWT(serviceAccount);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get access token: " + JSON.stringify(data));
  return data.access_token;
}

async function appendRow(token, values) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_TAB)}!A1:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error("Sheets append failed: " + err);
  }
  return res.json();
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const { firstName, lastName, email } = body;

    if (!email) return { statusCode: 400, headers, body: JSON.stringify({ error: "Email required" }) };
    if (!firstName) return { statusCode: 400, headers, body: JSON.stringify({ error: "First name required" }) };

    const timestamp = new Date().toISOString();
    const source = "Executive AI Advantage Summit (executive-ai-advantage-summit.netlify.app)";

    // If Google Sheets is configured, append row
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON && SHEET_ID) {
      const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      const token = await getAccessToken(sa);

      const row = [
        timestamp,             // A: Timestamp
        firstName || "",       // B: First Name
        lastName || "",        // C: Last Name
        email,                 // D: Email
        "Registered",          // E: Attendee Status
        "",                    // F: Session Attended (filled post-event)
        "",                    // G: Email Engagement
        "",                    // H: Post-Event Survey
        "",                    // I: Feedback Rating
        "",                    // J: Next Steps
        source,                // K: Registration Source
      ];

      await appendRow(token, row);
      console.log(`Registration captured: ${firstName} ${lastName} <${email}>`);
    } else {
      console.log(`[NO SHEETS] Registration received: ${firstName} ${lastName} <${email}> — GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT_JSON not set`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Registration confirmed" }),
    };
  } catch (err) {
    console.error("submit-registration error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Registration failed. Please try again." }),
    };
  }
};
