# Claude Code — End-to-End Automated Test Session
# Executive AI Advantage Summit Website

**Date context:** April 9, 2026
**Project folder:** `/Users/scottmagnacca/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design`
**Live site to test:** https://executive-ai-advantage-summit.netlify.app
**Google Sheet (registrations):** https://docs.google.com/spreadsheets/d/1RHtpqWJMbQPhTTBzF2HU5hzg9SISutY_m40UU_vCleE/edit
**Sheet tab to verify:** `Summit_Registrations`

---

## YOUR MISSION

Run a full end-to-end quality audit of the live website using THREE different user personas. For each persona, use the browser preview/Chrome MCP tools available to you to:

1. Navigate the live site from top to bottom
2. Take screenshots at key sections
3. Evaluate visuals, animations, text, scroll behavior, and UX
4. Submit a real test registration through the form
5. Verify the submission lands in the Google Sheet

Produce a detailed report at the end covering all findings, pass/fail for each test item, and a prioritized list of issues to fix.

---

## TOOLS TO USE

- **`mcp__Claude_Preview__*`** or **`mcp__Claude_in_Chrome__*`** — for browser automation (screenshots, scrolling, clicking, form-filling)
- **`mcp__c1fc4002-5f49-5f9d-a4e5-93c4ef5d6a75__google_drive_fetch`** — to verify the Google Sheet received the registration
- **Bash** — for any local checks (git status, function logs via netlify CLI)
- **Read** — to read source files if you need to cross-reference code vs. what you see

---

## THE THREE TEST PERSONAS

Run the full test flow once per persona. Use real-feeling (but obviously fake) names and test email addresses so Scott can identify them in the sheet.

### Persona 1 — "The Skeptical Financial Advisor"
- **Name:** James Thornton
- **Email:** james.thornton.test@mailinator.com
- **Mindset:** Skeptical, data-driven. Scrolls slowly and reads carefully. Will scrutinize credentials, testimonials, and the 56% wage premium stat.
- **Focus areas:** Hero section credibility, testimonials section, book author section, agenda details.
- **Behavior:** Reads everything before clicking. Scrolls all the way down before considering the form.

### Persona 2 — "The Busy Entrepreneur"
- **Name:** Priya Sharma
- **Email:** priya.sharma.test@mailinator.com
- **Mindset:** Time-pressured, mobile-first thinking. Skims fast. Responds to visuals and bold claims.
- **Focus areas:** Hero CTA button, value cards, video section, registration form speed.
- **Behavior:** Scrolls quickly, looks for the CTA, submits the form early.

### Persona 3 — "The Curious Sales Professional"
- **Name:** Marcus Webb
- **Email:** marcus.webb.test@mailinator.com
- **Mindset:** Engaged and curious. Watches videos, reads the agenda, checks what's in it for them.
- **Focus areas:** Video section, agenda (Day 1/2/3), qualify section, form.
- **Behavior:** Moderate scroll pace, watches/interacts with video thumbnails, reads the qualify checklist.

---

## TEST CHECKLIST — Run For Each Persona

### SECTION 1: Visual & Branding
- [ ] Announce bar visible and gold gradient renders correctly
- [ ] Hero background (dark green gradient) loads properly
- [ ] Scott's headshot photo loads and is well-framed
- [ ] Gold border around photo is visible and pulsing
- [ ] "3 Days. 90 Minutes." headline is readable and styled correctly
- [ ] Countdown timer is running (numbers updating)
- [ ] Hero CTA button visible with gold glow border
- [ ] Marquee ticker scrolling smoothly beneath hero

### SECTION 2: Animations & Scroll Behavior
- [ ] Hero float stats (56% / 4,127+) count up on page load (slowly — ~7–9 seconds)
- [ ] "Master AI When It Actually Matters" headline pulses with gold when scrolled into view
- [ ] Value cards (ROI-First, Decision Intelligence, Prompting) appear ONE AT A TIME, 7 seconds apart
- [ ] "Reserve My Free Seat Now" gold button in value section has visible green glow border
- [ ] Book section elements fade in one at a time at reading pace (image first, then paragraphs ~2.5s apart)
- [ ] Video section heading fades in on scroll
- [ ] Each video gets a gold border animation when scrolled into view
- [ ] Agenda Day 1, Day 2, Day 3 each fade in individually as you scroll
- [ ] Testimonials appear one by one (upper-left → upper-right → lower-left → lower-right), ~7 seconds apart
- [ ] Qualify checklist items fade in sequentially
- [ ] Registration form has gold border pulsing (brighten over 3s, fade over 3s, pause 5s, repeat)

### SECTION 3: Content & Copy
- [ ] No broken images (headshot, book cover, value card images)
- [ ] "This Free Event Is Built For You" — confirm "If" is NOT at the end of the headline
- [ ] All 5 qualify checklist items are present
- [ ] Testimonials: 4 cards present (John R., Farrell D., Tai B., Troy B.)
- [ ] Agenda: 3 days with correct titles (AI Skills Gap Audit / ROI-First AI + Decision Intelligence / Prompting as a Power Skill)
- [ ] Footer present with Terms, Privacy Policy, Contact, About links
- [ ] No placeholder text or broken HTML visible anywhere

### SECTION 4: Registration Form & Lead Capture (CRITICAL)
- [ ] Form fields render correctly (First Name, Last Name, Email)
- [ ] Form validation works — try submitting with empty fields, confirm error
- [ ] Submit with persona's name and test email
- [ ] Button shows "Registering..." loading state after submit
- [ ] Button changes to "✓ You're Registered! Check Your Email." on success
- [ ] Enrolled count increments by 1 after successful submission
- [ ] **VERIFY IN GOOGLE SHEET:** Open the Summit_Registrations tab and confirm the row appeared with:
  - Correct timestamp
  - Correct first name, last name, email
  - "Registered" in the Attendee Status column (col E)
  - Row appears within 30 seconds of form submit

### SECTION 5: Performance & UX
- [ ] Page loads without console errors (check browser console)
- [ ] No layout breaks or overflow issues
- [ ] Sticky nav appears after scrolling past hero
- [ ] Sticky nav "Reserve My Free Seat Now" link scrolls to form
- [ ] Social proof popup appears (bottom-left, ~6 seconds after page load)

---

## WHAT TO REPORT

After all 3 persona tests, produce a structured report with:

### 1. Overall Health Score
Rate the site 1–10 across: Visual Design | Animation Quality | Content Clarity | Registration Flow

### 2. Pass/Fail Summary Table
| Test Item | Persona 1 | Persona 2 | Persona 3 |
|-----------|-----------|-----------|-----------|
| [each checklist item above] | ✅/❌ | ✅/❌ | ✅/❌ |

### 3. Google Sheet Verification
Confirm whether all 3 test rows (James, Priya, Marcus) appeared in the Summit_Registrations tab. Screenshot the sheet rows if possible.

### 4. Issues Found
List any bugs, visual glitches, broken elements, or UX problems — prioritized by severity (Critical / High / Medium / Low).

### 5. Standout Positives
Note what's working exceptionally well — things Scott should be proud of or that would particularly impress a visitor.

### 6. Recommended Fixes
For each issue found, suggest the exact fix (file, line, change needed).

---

## CONTEXT & BACKGROUND

This is a landing page for the "Executive AI Advantage Summit" — a free 3-day virtual event (June 18, 2026) hosted by Scott Magnacca. Target audience: financial advisors, sales professionals, entrepreneurs.

**Tech stack:**
- Pure HTML/CSS/JS in `src/index.html` — no build step
- Netlify hosting (auto-deploys from GitHub main branch)
- Netlify Function (`netlify/functions/submit-registration.js`) → Google Sheets via JWT auth
- Netlify Form (`summit-registration`) → email notification to Scott

**Recent changes (v13, just deployed):**
- Sequential scroll animations added throughout (value cards, testimonials, agenda days, book section, qualify items)
- Google Sheets env vars (`GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON`) were just set in Netlify — first time the registration pipeline is fully live
- Column order fix in the Netlify function (Attendee Status now correctly gets "Registered")

**This is the FIRST live test of the full registration pipeline.** The sheet result verification is the most critical part of this test run.

---

## HOW TO START

1. Open the browser to https://executive-ai-advantage-summit.netlify.app
2. Take a full-page screenshot to establish baseline
3. Begin Persona 1 (James Thornton) — slow scroll, read everything
4. Run through the full checklist
5. Submit the form, verify sheet
6. Repeat for Persona 2 (Priya), then Persona 3 (Marcus)
7. Write the report

Good luck — be thorough and honest. If something looks off, say so.
