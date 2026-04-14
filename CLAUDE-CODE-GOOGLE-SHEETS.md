# Claude Code Pickup — Google Sheets Setup + "AI Summit" Tab
## Executive AI Advantage Summit Registration System

**Date:** April 8, 2026  
**Current commit:** `20f202a` (v8 complete)  
**Task:** Set up Google Sheets integration + add "AI Summit" tab to existing sheet  
**Duration:** ~10–15 minutes  
**Files involved:** `netlify/functions/submit-registration.js` (read-only verification), Netlify environment config (user manual), Google Sheets (user manual)

---

## ✅ Pre-Flight Location Validation

Run this FIRST:

```bash
pwd && ls -la netlify/functions/submit-registration.js && git remote -v | head -1
```

Expected:
```
/Users/scottmagnacca/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design
-rw-r--r--  1 [user]  staff  4179 Apr  8 [time] netlify/functions/submit-registration.js
origin	https://github.com/smagnacca/Executive-AI-Advantage-Summit.git (fetch)
```

**If any check fails → STOP. Do NOT proceed.**

---

## 📋 Task Overview

This is a **USER-ASSISTED** task. Claude Code will:
1. ✅ Verify the Netlify Function code is correctly configured
2. ✅ Provide step-by-step instructions for user to set up Google Cloud + Google Sheets
3. ✅ Verify environment variable format
4. ✅ Add "AI Summit" tab to existing Google Sheet (via API call after env vars are set)

### What Claude Code WILL do:
- ✅ Read `netlify/functions/submit-registration.js` and confirm it's ready
- ✅ Output clear copy/paste instructions for user to set up Google Cloud
- ✅ Output clear copy/paste instructions for user to set up Google Sheets
- ✅ Provide a checklist for user to verify Netlify environment variables are set
- ✅ Once user confirms env vars are set, make API call to add "AI Summit" tab

### What Claude Code will NOT do:
- ❌ Access Netlify dashboard (user must set env vars manually)
- ❌ Access Google Cloud console (user must create project + service account)
- ❌ Access Google Sheets (user must create sheet + share with service account)

---

## 🔍 Step 1: Verify Netlify Function Code

**Action:** Read `netlify/functions/submit-registration.js`

**Verify:**
1. ✅ `SHEET_TAB` is set to `"Summit_Registrations"` (line 5)
2. ✅ Function captures: Timestamp, First Name, Last Name, Email, Source, Status, 11 tracking fields (lines 80–92)
3. ✅ JWT auth is implemented (no dependencies needed)
4. ✅ Function expects `GOOGLE_SHEET_ID` environment variable (line 4)
5. ✅ Function expects `GOOGLE_SERVICE_ACCOUNT_JSON` environment variable (line 77)
6. ✅ Code is production-ready (same pattern as Scott's other projects)

**If all verified:** Proceed to Step 2

---

## 📚 Step 2: Output Setup Instructions for User

**Action:** Output the following instructions in clear, copy/paste format.

**What to output:**

### PART A: Google Cloud Setup (User Must Do)

---

**STEP 1: Create Google Cloud Project**

1. Go to: https://console.cloud.google.com/
2. Click **Select a Project** (top-left)
3. Click **NEW PROJECT**
4. Name it: `Executive AI Advantage Summit`
5. Click **CREATE**
6. Wait for project to be created (1-2 min)

**STEP 2: Enable Google Sheets API**

1. Go to: https://console.cloud.google.com/apis/library
2. Search for: `Google Sheets API`
3. Click on the result
4. Click **ENABLE**
5. Wait for activation (30 sec)

**STEP 3: Create Service Account**

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click **CREATE SERVICE ACCOUNT**
3. Fill in:
   - Service account name: `summit-registration`
   - Service account ID: `summit-registration` (auto-filled)
   - Description: `Registers event attendees to Google Sheets`
4. Click **CREATE AND CONTINUE**
5. Skip optional steps, click **DONE**

**STEP 4: Create & Download JSON Key**

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click the `summit-registration` service account
3. Click the **KEYS** tab
4. Click **ADD KEY** → **Create new key**
5. Choose **JSON**
6. Click **CREATE**
7. A JSON file downloads automatically
8. **SAVE THIS FILE SOMEWHERE SAFE** — you'll need it in next step

---

### PART B: Google Sheets Setup (User Must Do)

---

**STEP 5: Create Google Sheet**

1. Go to: https://sheets.google.com/
2. Click **+ Create new spreadsheet**
3. Name it: `Executive AI Advantage Summit Registrations`
4. In the first tab (currently "Sheet1"), rename to: `Summit_Registrations`
   - Right-click tab → Rename → type `Summit_Registrations`

**STEP 6: Add Headers to Sheet**

In row 1, add these headers (one per cell, A1 through K1):

```
A1: Timestamp
B1: First Name
C1: Last Name
D1: Email
E1: Source
F1: Status
G1: Confirmation Email Sent
H1: Day 1 Reminder Sent
I1: Day 2 Reminder Sent
J1: Day 3 Reminder Sent
K1: Post-Event Follow-up Sent
```

**STEP 7: Share Sheet with Service Account**

1. From the JSON file you downloaded in STEP 4, copy the value for `"client_email"` (it looks like `summit-registration@[project-id].iam.gserviceaccount.com`)
2. In Google Sheets, click **Share** (top-right)
3. Paste the email address from step 1
4. Make sure **Editor** access is selected
5. Click **Share**

**STEP 8: Get Sheet ID**

1. Look at the URL of your Google Sheet
2. Extract the SHEET_ID from: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit...`
3. Copy just the `[SHEET_ID]` part (long string of characters)
4. Save this somewhere — you'll need it next

---

### PART C: Netlify Environment Variables (User Must Do)

---

**STEP 9: Set Environment Variables in Netlify**

1. Go to: https://app.netlify.com/
2. Select site: `executive-ai-advantage-summit`
3. Go to: **Site Settings** → **Build & Deploy** → **Environment**
4. Click **Edit variables**
5. Click **Add a variable**

**Variable 1:**
- Key: `GOOGLE_SHEET_ID`
- Value: [Paste the SHEET_ID from STEP 8]

**Variable 2:**
- Key: `GOOGLE_SERVICE_ACCOUNT_JSON`
- Value: [Open the JSON file from STEP 4, copy the ENTIRE contents from `{` to `}`, paste as single-line string]

6. Click **Save**

**STEP 10: Trigger Redeploy**

1. In Netlify Dashboard, go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete (2-3 min)

---

**Once user confirms all steps are done → proceed to Step 3**

---

## 🔗 Step 3: Add "AI Summit" Tab to Google Sheet (Claude Code Does This)

**Prerequisites:** User must have completed STEP 9 (set Netlify env vars) and STEP 10 (redeploy)

**Action:** Make API call to add "AI Summit" tab to the existing Google Sheet

**Implementation:**

1. Get `GOOGLE_SHEET_ID` from user
2. Get `GOOGLE_SERVICE_ACCOUNT_JSON` from user (or read from Netlify env vars if accessible)
3. Use Google Sheets API to add a new sheet:
   ```json
   {
     "requests": [
       {
         "addSheet": {
           "properties": {
             "title": "AI Summit",
             "gridProperties": {
               "rowCount": 1000,
               "columnCount": 26
             }
           }
         }
       }
     ]
   }
   ```

4. Set up headers in the new "AI Summit" sheet:
   ```
   A1: Timestamp
   B1: First Name
   C1: Last Name
   D1: Email
   E1: Attendee Status (Registered/Confirmed/Attended/No-show)
   F1: Session Attended (Day 1/Day 2/Day 3/All 3 Days)
   G1: Email Engagement (Opens/Clicks/Unsubscribe)
   H1: Post-Event Survey Response
   I1: Feedback Rating (1-5)
   J1: Next Steps
   ```

5. Verify tabs now exist:
   - `Summit_Registrations` (original registrations)
   - `AI Summit` (attendee tracking + engagement)

**Expected output:**
```
✅ "AI Summit" tab successfully added to Google Sheet
✅ Headers configured: Timestamp, First Name, Last Name, Email, Attendee Status, Session Attended, Email Engagement, Survey Response, Feedback Rating, Next Steps
✅ Ready to track event attendees and engagement
```

---

## 📝 Verification Checklist (User Must Confirm)

Before Claude Code proceeds with Step 3, user must confirm:

- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Service Account created (`summit-registration`)
- [ ] JSON key downloaded and saved
- [ ] Google Sheet created with name `Executive AI Advantage Summit Registrations`
- [ ] Tab renamed to `Summit_Registrations`
- [ ] Headers added to `Summit_Registrations` tab (A1:K1)
- [ ] Sheet shared with service account email (Editor access)
- [ ] Sheet ID copied (from URL)
- [ ] GOOGLE_SHEET_ID env var set in Netlify
- [ ] GOOGLE_SERVICE_ACCOUNT_JSON env var set in Netlify (full JSON as single-line string)
- [ ] Netlify redeploy triggered and completed
- [ ] Ready for Claude Code to add "AI Summit" tab

---

## 🛠️ Implementation Notes for Claude Code

**Critical:**
1. Provide Part A/B/C instructions in CLEAR, COPY/PASTE format
2. Do NOT try to automate Google Cloud setup (user must do this)
3. Do NOT try to automate Google Sheets creation (user must do this)
4. Once user confirms all env vars are set in Netlify, make API call for "AI Summit" tab
5. Verify both tabs exist before reporting success

**Testing (after "AI Summit" tab is created):**
1. Make a test registration via form at https://executive-ai-advantage-summit.netlify.app
2. Verify row appears in `Summit_Registrations` tab
3. Verify `AI Summit` tab is ready for manual data entry

---

## ✨ Success Criteria

✅ User completes all manual Google Cloud + Sheets setup steps  
✅ GOOGLE_SHEET_ID environment variable set in Netlify  
✅ GOOGLE_SERVICE_ACCOUNT_JSON environment variable set in Netlify  
✅ Netlify redeploy complete  
✅ "AI Summit" tab added to Google Sheet  
✅ Headers configured on "AI Summit" tab  
✅ Both `Summit_Registrations` and `AI Summit` tabs ready  
✅ Ready to test form submission  

---

## 📝 Notes for Claude Code

- This is a user-assisted integration task
- Your role is to: verify code, provide instructions, add the "AI Summit" tab via API
- User's role is to: set up Google Cloud, create sheet, set Netlify env vars
- Do not proceed with Step 3 until user confirms Step 9 & 10 are complete
- If user gets stuck on any Google Cloud steps, provide troubleshooting tips from SETUP.md

---

Prepared by: Cowork (Scott's session)
For execution by: Claude Code CLI (user-assisted)
Status: ✅ Ready for immediate execution

After pasting: Run location validation first, then output Part A/B/C instructions. Wait for user confirmation before proceeding to Step 3.
