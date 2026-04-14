#!/usr/bin/env node
/**
 * setup-google-sheet.js
 * One-time setup script: creates Summit_Registrations + AI Summit tabs
 * with correct headers in the Google Sheet.
 *
 * Usage:
 *   GOOGLE_SHEET_ID="your_sheet_id" GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}' node setup-google-sheet.js
 *
 * Or with a local .env file:
 *   echo 'GOOGLE_SHEET_ID=xxx' > .env.local
 *   echo 'GOOGLE_SERVICE_ACCOUNT_JSON=...' >> .env.local
 *   node -e "require('fs').readFileSync('.env.local','utf8').split('\n').forEach(l=>{const[k,...v]=l.split('=');if(k)process.env[k]=v.join('=')})" setup-google-sheet.js
 */

const { createSign } = require("crypto");

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// --- JWT auth (zero dependencies, same pattern as submit-registration.js) ---
function makeJWT(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email, scope: SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
  })).toString("base64url");
  const sigInput = `${header}.${payload}`;
  const sign = createSign("RSA-SHA256");
  sign.update(sigInput);
  return `${sigInput}.${sign.sign(sa.private_key, "base64url")}`;
}

async function getToken(sa) {
  const jwt = makeJWT(sa);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token error: " + JSON.stringify(data));
  return data.access_token;
}

// --- Sheets API helpers ---
async function getSheetMeta(token) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not read sheet metadata: " + await res.text());
  return res.json();
}

async function createTab(token, title) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title, gridProperties: { rowCount: 1000, columnCount: 26 } } } }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    if (err.includes("already exists")) return console.log(`  Tab "${title}" already exists — skipping create.`);
    throw new Error(`Failed to create tab "${title}": ` + err);
  }
  console.log(`  ✅ Created tab: "${title}"`);
}

async function setHeaders(token, tabName, headers) {
  const range = `${encodeURIComponent(tabName)}!A1:${String.fromCharCode(64 + headers.length)}1`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [headers] }),
    }
  );
  if (!res.ok) throw new Error(`Failed to set headers on "${tabName}": ` + await res.text());
  console.log(`  ✅ Headers set on "${tabName}" (${headers.length} columns)`);
}

// --- Main ---
async function main() {
  if (!SHEET_ID) {
    console.error("❌ GOOGLE_SHEET_ID is not set. Set it as an env var and re-run.");
    process.exit(1);
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.error("❌ GOOGLE_SERVICE_ACCOUNT_JSON is not set. Set it as an env var and re-run.");
    process.exit(1);
  }

  const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  console.log(`\n🔐 Authenticating as: ${sa.client_email}`);
  const token = await getToken(sa);
  console.log("  ✅ Google Sheets access token obtained\n");

  // Get existing tabs
  const meta = await getSheetMeta(token);
  const existingTabs = meta.sheets.map(s => s.properties.title);
  console.log(`📋 Existing tabs: ${existingTabs.join(", ") || "(none)"}\n`);

  // --- Summit_Registrations tab ---
  console.log('📌 Setting up "Summit_Registrations" tab...');
  if (!existingTabs.includes("Summit_Registrations")) {
    await createTab(token, "Summit_Registrations");
  } else {
    console.log('  Tab "Summit_Registrations" already exists — updating headers.');
  }
  await setHeaders(token, "Summit_Registrations", [
    "Timestamp", "First Name", "Last Name", "Email",
    "Source", "Status",
    "Confirmation Email Sent", "Day 1 Reminder Sent",
    "Day 2 Reminder Sent", "Day 3 Reminder Sent",
    "Post-Event Follow-up Sent",
  ]);

  // --- AI Summit tab ---
  console.log('\n📌 Setting up "AI Summit" tab...');
  if (!existingTabs.includes("AI Summit")) {
    await createTab(token, "AI Summit");
  } else {
    console.log('  Tab "AI Summit" already exists — updating headers.');
  }
  await setHeaders(token, "AI Summit", [
    "Timestamp", "First Name", "Last Name", "Email",
    "Attendee Status", "Session Attended",
    "Email Engagement", "Post-Event Survey Response",
    "Feedback Rating (1-5)", "Next Steps",
  ]);

  console.log(`\n✅ Google Sheet setup complete!`);
  console.log(`   Sheet ID: ${SHEET_ID}`);
  console.log(`   Open it: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
  console.log(`\n   Tabs ready:`);
  console.log(`   • Summit_Registrations — live registrations (11 columns, A–K)`);
  console.log(`   • AI Summit            — attendee tracking (10 columns, A–J)`);
  console.log(`\n   Next: Set GOOGLE_SHEET_ID + GOOGLE_SERVICE_ACCOUNT_JSON in Netlify env vars,`);
  console.log(`   then trigger a redeploy. Registration form will be fully live.`);
}

main().catch(err => {
  console.error("\n❌ Setup failed:", err.message);
  process.exit(1);
});
