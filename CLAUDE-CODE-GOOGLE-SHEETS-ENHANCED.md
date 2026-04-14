# Claude Code Pickup — Google Sheets Setup + Immediate Email + "AI Summit" Tab
## Executive AI Advantage Summit Registration System — COMPLETE SETUP

**Date:** April 8, 2026  
**Current commit:** `20f202a` (v8 complete)  
**Task:** Set up Google Sheets + Email notifications + "AI Summit" tab + verify immediate data capture  
**Duration:** ~10–15 minutes  
**Files involved:** `netlify/functions/submit-registration.js`, Netlify Forms config (user manual), Google Sheets setup (user manual)

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

If any check fails → STOP. Do NOT proceed.

---

## 📋 Complete Registration Flow (What Will Happen)

When someone submits the form at https://executive-ai-advantage-summit.netlify.app:

1. **Immediate (0 seconds):** Form submits to Netlify Function
2. **Immediate (0-1 seconds):** 
   - ✅ Data written to Google Sheets `Summit_Registrations` tab
   - ✅ Email notification sent to YOU with all contact info
3. **Immediate (1-2 seconds):** 
   - ✅ User sees success message on page
   - ✅ Form clears (ready for next person)

---

## 🔍 Step 1: Verify Netlify Function Code

Action: Read `netlify/functions/submit-registration.js`

Verify:
1. ✅ `SHEET_TAB` is set to `"Summit_Registrations"` (line 5)
2. ✅ Function captures: Timestamp, First Name, Last Name, Email, Source, Status + 6 tracking fields (lines 80–92)
3. ✅ JWT auth implemented (Google Sheets API authentication)
4. ✅ Expects `GOOGLE_SHEET_ID` environment variable (line 4)
5. ✅ Expects `GOOGLE_SERVICE_ACCOUNT_JSON` environment variable (line 77)
6. ✅ Returns success/error response to frontend
7. ✅ Code is production-ready (same pattern as Scott's `practical-ai-skills-iq` project)

Report: "✅ Netlify Function verified and ready for production"

If all verified: Proceed to Step 2

---

## 📚 Step 2: Output Setup Instructions for User

Action: Output the following instructions in CLEAR, COPY/PASTE format.

---

### PART A: Google Cloud Setup (User Must Do)

**These steps create the backend authentication that allows the Netlify Function to write to Google Sheets and send emails.**

---

#### STEP 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click **Select a Project** (top-left)
3. Click **NEW PROJECT**
4. Name it: `Executive AI Advantage Summit`
5. Click **CREATE**
6. Wait for project to be created (1-2 min)

---

#### STEP 2: Enable Google Sheets API

1. Go to: https://console.cloud.google.com/apis/library
2. Search for: `Google Sheets API`
3. Click on the result
4. Click **ENABLE**
5. Wait for activation (30 sec)

---

#### STEP 3: Create Service Account

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click **CREATE SERVICE ACCOUNT**
3. Fill in:
   - Service account name: `summit-registration`
   - Service account ID: `summit-registration` (auto-filled)
   - Description: `Registers event attendees to Google Sheets and sends notifications`
4. Click **CREATE AND CONTINUE**
5. Skip optional steps, click **DONE**

---

#### STEP 4: Create & Download JSON Key

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click the `summit-registration` service account
3. Click the **KEYS** tab
4. Click **ADD KEY** → **Create new key**
5. Choose **JSON**
6. Click **CREATE**
7. A JSON file downloads automatically
8. **SAVE THIS FILE SOMEWHERE SAFE** (you'll need it in the next part)
9. **Open the JSON file and copy the `"client_email"` value** (you'll need this for Step 7)

---

### PART B: Google Sheets Setup (User Must Do)

**This creates the actual Google Sheet where registration data will be stored.**

---

#### STEP 5: Create Google Sheet

1. Go to: https://sheets.google.com/
2. Click **+ Create new spreadsheet**
3. Name it: `Executive AI Advantage Summit Registrations`
4. In the first tab (currently "Sheet1"), rename it to: `Summit_Registrations`
   - Right-click the tab → **Rename** → type `Summit_Registrations` → press Enter

---

#### STEP 6: Add Headers to Summit_Registrations Tab

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

(Just type these in manually, one per cell, or copy/paste as tab-separated values)

---

#### STEP 7: Share Sheet with Service Account

1. From the JSON file you downloaded in STEP 4, find the `"client_email"` value (it looks like: `summit-registration@[project-id].iam.gserviceaccount.com`)
2. Copy that email address
3. In your Google Sheet, click **Share** (top-right)
4. Paste the service account email address
5. Make sure **Editor** access is selected (dropdown)
6. Click **Share**
7. Close the share dialog

---

#### STEP 8: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. Find and copy the SHEET_ID from this URL format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit...`
3. Copy just the long string of characters (the `[SHEET_ID]` part)
4. Save this value somewhere safe (you'll need it in the next part)

---

### PART C: Netlify Setup for Email Notifications (User Must Do)

**This enables Netlify Forms to send you an email every time someone registers.**

---

#### STEP 9: Enable Email Notifications in Netlify

1. Go to: https://app.netlify.com/
2. Select site: `executive-ai-advantage-summit`
3. Go to: **Site Settings** → **Forms**
4. Look for **Form notifications**
5. Click **Add notification**
6. Choose: **Email notification**
7. Enter your email address (the one where you want to receive registration notifications)
8. Click **Save**

**What happens:** Every time someone submits the registration form, you'll get an email with their contact info.

---

### PART D: Netlify Environment Variables (User Must Do)

**These variables tell the Netlify Function where your Google Sheet is and how to authenticate.**

---

#### STEP 10: Set Environment Variables in Netlify Dashboard

1. Go to: https://app.netlify.com/
2. Select site: `executive-ai-advantage-summit`
3. Go to: **Site Settings** → **Build & Deploy** → **Environment**
4. Click **Edit variables**
5. Add two new variables:

**Variable 1:**
- Key: `GOOGLE_SHEET_ID`
- Value: [Paste the SHEET_ID from STEP 8]

**Variable 2:**
- Key: `GOOGLE_SERVICE_ACCOUNT_JSON`
- Value: [Open the JSON file from STEP 4]
  - Copy the ENTIRE contents (from the first `{` to the last `}`)
  - Paste as a single-line string (no line breaks)
  - If it spans multiple lines, that's normal — Netlify handles it

6. Click **Save**

---

#### STEP 11: Trigger Redeploy

1. In Netlify Dashboard, go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete (2-3 min)
4. When build shows "Published", you're ready to test!

---

### PART E: Test the Complete Flow (User Does This)

**Verify everything works end-to-end.**

---

#### STEP 12: Submit a Test Registration

1. Go to: https://executive-ai-advantage-summit.netlify.app
2. Scroll to the registration form
3. Fill in test data:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `your-email@example.com` (use YOUR actual email)
4. Click **Reserve My Seat**
5. You should see a success message on the page

---

#### STEP 13: Verify Email Notification

1. Check your inbox (the email you set up in STEP 9)
2. You should receive an email from Netlify with the subject line containing the registration
3. Email should show:
   - First Name: Test
   - Last Name: User
   - Email: your-email@example.com
   - Timestamp of submission

**If you don't see the email in 1-2 minutes:**
- Check your spam folder
- Go back to Netlify → Forms → check "Submissions" to see if it was captured
- If captured in Netlify but no email, re-check the email notification setting in STEP 9

---

#### STEP 14: Verify Google Sheets Update

1. Go to your Google Sheet: `Executive AI Advantage Summit Registrations`
2. Click the `Summit_Registrations` tab
3. Scroll down to see if a new row was added with:
   - Timestamp (current date/time)
   - First Name: Test
   - Last Name: User
   - Email: your-email@example.com
   - Source: Executive AI Advantage Summit (executive-ai-advantage-summit.netlify.app)
   - Status: Registered

**If the row is NOT there:**
- Check Netlify Function logs: Dashboard → **Logs** → **Functions**
- Look for errors about GOOGLE_SHEET_ID or permissions
- If service account doesn't have access, re-share the sheet (STEP 7)

---

**Once user confirms email + Sheets update work → proceed to Step 3**

---

## 🔗 Step 3: Add "AI Summit" Tab to Google Sheet (Claude Code Does This)

**Prerequisites:** User must have completed all STEPS 1-14 and confirmed:
- Email notification received ✅
- Google Sheet updated with test registration ✅

Action: Make API call to add "AI Summit" tab to the existing Google Sheet

Implementation:

1. Get `GOOGLE_SHEET_ID` from user (from STEP 8)
2. Get `GOOGLE_SERVICE_ACCOUNT_JSON` from environment (already set in Netlify)
3. Use Google Sheets API to add a new sheet named "AI Summit":
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

4. Add headers to the new "AI Summit" tab (A1:J1):
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

5. Verify both tabs now exist in the sheet:
   - `Summit_Registrations` (active registrations)
   - `AI Summit` (attendee tracking + engagement)

Expected output:
```
✅ Location validation passed
✅ Netlify Function code verified and ready
✅ "AI Summit" tab successfully added to Google Sheet
✅ Headers configured on "AI Summit" tab
✅ Both tabs ready: Summit_Registrations (live data) + AI Summit (tracking)
✅ Registration system fully operational
```

---

## 📝 Verification Checklist (User Must Confirm Before Step 3)

Before Claude Code proceeds with adding the "AI Summit" tab, user must confirm:

- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Service Account created (`summit-registration`)
- [ ] JSON key downloaded and saved
- [ ] client_email copied from JSON file
- [ ] Google Sheet created (`Executive AI Advantage Summit Registrations`)
- [ ] Tab renamed to `Summit_Registrations`
- [ ] Headers added to Summit_Registrations (A1:K1)
- [ ] Sheet shared with service account email (Editor access)
- [ ] Sheet ID copied (from URL)
- [ ] Email notification enabled in Netlify (STEP 9)
- [ ] GOOGLE_SHEET_ID set in Netlify
- [ ] GOOGLE_SERVICE_ACCOUNT_JSON set in Netlify
- [ ] Netlify redeploy triggered and completed
- [ ] Test registration submitted (STEP 12)
- [ ] Email notification received (STEP 13) ✅
- [ ] Google Sheet updated with test data (STEP 14) ✅
- [ ] Ready for Claude Code to add "AI Summit" tab

---

## 🛠️ Implementation Notes for Claude Code

**What you're doing:**
- Verifying the Netlify Function is production-ready
- Outputting clear, copy/paste-ready setup instructions
- Waiting for user to complete all manual steps
- Adding the "AI Summit" tab via Google Sheets API once env vars are confirmed

**Critical:**
1. Provide all instructions (PART A/B/C/D/E) in CLEAR, COPY/PASTE format
2. Do NOT try to automate Google Cloud setup (user must do manually)
3. Do NOT try to automate Google Sheets creation (user must do manually)
4. Do NOT set Netlify env vars (user must do manually)
5. WAIT for user to confirm email + sheets update work (STEP 13 + 14)
6. Only add "AI Summit" tab after user confirms both work

**Testing notes:**
- Netlify Forms sends email notification (built-in, no code needed)
- Google Sheets API writes data immediately (function does this)
- Email goes to address configured in Netlify → Forms → notifications
- Google Sheet updates within 1-2 seconds of form submission

---

## ✨ Success Criteria

✅ User completes all manual setup steps (STEPS 1-11)  
✅ Test registration submitted (STEP 12)  
✅ Email notification received to configured inbox (STEP 13)  
✅ Google Sheet automatically updated with test data (STEP 14)  
✅ "AI Summit" tab added to Google Sheet (Claude Code does this)  
✅ Both tabs ready: `Summit_Registrations` (live data) + `AI Summit` (tracking)  
✅ Ready for real registrations (complete end-to-end flow working)  

---

## 📝 Notes for Claude Code

- This is a COMPREHENSIVE SETUP (not a partial one)
- User handles: Google Cloud, Google Sheets, Netlify config
- Claude Code handles: Verification + adding "AI Summit" tab
- Email notifications are automatic (Netlify Forms)
- Google Sheets writes are automatic (Netlify Function)
- After this, all registrations are captured immediately in both places

---

Prepared by: Cowork (Scott's session)  
For execution by: Claude Code CLI (user-assisted)  
Status: ✅ Ready for immediate execution

After pasting: Run location validation first, then output PART A/B/C/D/E instructions. Wait for user confirmation that email + sheets updates work (STEP 13 + 14) before proceeding to Step 3.
