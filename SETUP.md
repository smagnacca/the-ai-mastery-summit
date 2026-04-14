# Setup Guide — Executive AI Advantage Summit

## Registration System Overview

The registration form submits to a Netlify Function (`/api/register`) that writes to Google Sheets.
Two env vars are required in the Netlify dashboard: `GOOGLE_SHEET_ID` + `GOOGLE_SERVICE_ACCOUNT_JSON`.

**Netlify Forms** are already enabled and configured to email `scott.magnacca1@gmail.com` on every submission.

---

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g. "Executive AI Advantage Summit")
3. Enable the **Google Sheets API**
   - APIs & Services → Library → search "Google Sheets API" → Enable

---

## Step 2: Create a Service Account

1. APIs & Services → Credentials → **Create Credentials** → Service Account
2. Name: `summit-registration` | Description: "Registers event attendees to Google Sheet"
3. Click Create and Continue, skip optional steps, click Done

---

## Step 3: Download the JSON Key

1. Click the newly created service account → **Keys** tab
2. **Add Key** → Create new key → **JSON** → Create
3. A JSON file downloads — keep it safe

---

## Step 4: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet — name it anything (e.g. "Executive AI Advantage Summit Registrations")
3. Rename the default tab to **`Summit_Registrations`** (exact, case-sensitive)
4. In row 1, add these 11 headers (A1:K1):

   ```
   Timestamp | First Name | Last Name | Email | Source | Status | Confirmation Email Sent | Day 1 Reminder Sent | Day 2 Reminder Sent | Day 3 Reminder Sent | Post-Event Follow-up Sent
   ```

5. Share the sheet with the service account email (find `"client_email"` in your JSON file)
   - Share → paste the email → **Editor** access → Send

6. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

**Shortcut:** Instead of manually adding headers, run `setup-google-sheet.js` after setting env vars (see below).

---

## Step 5: Set Netlify Environment Variables

1. [Netlify Dashboard](https://app.netlify.com/) → **executive-ai-advantage-summit** → Site Configuration → Environment Variables
2. Add two variables:

   | Key | Value |
   |-----|-------|
   | `GOOGLE_SHEET_ID` | Your Sheet ID from Step 4 |
   | `GOOGLE_SERVICE_ACCOUNT_JSON` | Entire JSON file content (from `{` to `}`) as one line |

3. Save

---

## Step 6: Redeploy

Netlify Dashboard → Deploys → **Trigger Deploy** → Deploy Site

---

## Step 7: Set Up Sheet Headers (Optional Shortcut)

Instead of manually adding row 1 headers, run the setup script:

```bash
GOOGLE_SHEET_ID="your_sheet_id" \
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}' \
node setup-google-sheet.js
```

This creates two tabs:
- **`Summit_Registrations`** — 11 columns (A–K): live registration capture
- **`AI Summit`** — 10 columns (A–J): post-event attendee tracking

---

## Step 8: Test the Registration Form

1. Go to https://executive-ai-advantage-summit.netlify.app
2. Scroll to registration form → submit test data
3. Verify:
   - New row appears in Google Sheet (`Summit_Registrations` tab)
   - Email notification arrives at scott.magnacca1@gmail.com

---

## Google Sheet Column Reference

### Summit_Registrations (live registrations — 11 columns)

| Col | Header | Source |
|-----|--------|--------|
| A | Timestamp | Auto (ISO 8601) |
| B | First Name | Form input |
| C | Last Name | Form input |
| D | Email | Form input |
| E | Source | Auto ("Executive AI Advantage Summit (...)") |
| F | Status | Auto ("Registered") |
| G | Confirmation Email Sent | Manual / automation |
| H | Day 1 Reminder Sent | Manual / automation |
| I | Day 2 Reminder Sent | Manual / automation |
| J | Day 3 Reminder Sent | Manual / automation |
| K | Post-Event Follow-up Sent | Manual / automation |

### AI Summit (post-event tracking — 10 columns)

| Col | Header |
|-----|--------|
| A | Timestamp |
| B | First Name |
| C | Last Name |
| D | Email |
| E | Attendee Status |
| F | Session Attended |
| G | Email Engagement |
| H | Post-Event Survey Response |
| I | Feedback Rating (1-5) |
| J | Next Steps |

---

## Email Notifications

Already configured: Netlify sends an email to `scott.magnacca1@gmail.com` on every form submission.

To change/add addresses: Netlify Dashboard → Site Configuration → Notifications → Email → edit.

---

## Optional: Email Automation

To connect registrations to ConvertKit / ActiveCampaign:

1. Use **Zapier** or **Make**
2. Trigger: New row in `Summit_Registrations` Google Sheet
3. Action: Create contact in your email platform
4. Map: First Name, Last Name, Email

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `403 Forbidden` | Service account not shared on sheet | Re-share sheet with service account email (Editor access) |
| `Sheet ID not found` | Wrong or missing `GOOGLE_SHEET_ID` | Check URL, re-save in Netlify |
| `Invalid service account JSON` | JSON has line breaks | Paste as single-line string |
| Registrations not in sheet | Env vars set but something else wrong | Check Netlify → Logs → Functions |

---

## File Structure

```
executive-ai-advantage-summit/
├── src/
│   └── index.html                 (main site — all HTML, CSS, JS embedded)
├── netlify/
│   └── functions/
│       └── submit-registration.js (Netlify Function → Google Sheets)
├── netlify.toml                   (build config + function routing)
├── setup-google-sheet.js          (one-time setup utility — creates tabs + headers)
├── CHANGELOG.md                   (version history)
├── PICKUP-PROMPT.md               (context for resuming work)
└── SETUP.md                       (this file)
```
