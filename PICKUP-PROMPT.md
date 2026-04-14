# Executive AI Advantage Summit — Pickup Prompt

## Quick Context
**Site:** https://executive-ai-advantage-summit.netlify.app  
**GitHub:** https://github.com/smagnacca/Executive-AI-Advantage-Summit (private)  
**Local folder:** `~/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design/`  
**Main file:** `src/index.html` (single-file site — all HTML, CSS, JS embedded)  
**Status:** v9 — fully live, registration system end-to-end complete  
**Last commit:** `1789285` (setup-google-sheet.js + updated docs)

---

## What's Complete

### Site (v8)
- Full single-page registration site with Scott's content, animations, testimonials
- Hero: headshot, countdown to June 18 2026, animated stat counters (count-up)
- 3 YouTube videos: Storyselling AI (featured), 3 Types of People, Invisible Sign
- Book showcase with animated floating cover
- 4 Fidelity leadership testimonials (typewriter effect on scroll)
- Scott bio with typewriter effect on all paragraphs
- 3-day agenda cards slide in from left on scroll
- Animated mesh gradient hero background
- All animations 20% slower than original (v8 timing)
- Responsive: mobile / tablet / desktop

### Registration System (v9 — Fully Live)
```
User fills form → POST /api/register (Netlify Function)
  → netlify/functions/submit-registration.js
  → JWT auth (zero-dependency, RS256)
  → Appends row to Summit_Registrations tab in Google Sheet
  → 200 { success: true }
  + Netlify Forms captures every submission → email to scott.magnacca1@gmail.com
```

**Google Sheet:** `1RHtpqWJMbQPhTTBzF2HU5hzg9SISutY_m40UU_vCleE`  
**Service account:** `emailbot@email-robot-491000.iam.gserviceaccount.com`  
**JSON saved at:** `~/.claude/tokens/google-service-account.json`

**Tabs:**
- `Summit_Registrations` — 11 cols (A–K): live registration capture
- `AI Summit` — 10 cols (A–J): post-event attendee tracking

**Netlify env vars (set, scoped to functions):**
- `GOOGLE_SHEET_ID` ✅
- `GOOGLE_SERVICE_ACCOUNT_JSON` ✅ (secret)

**Netlify Forms:** enabled ✅  
**Email notification:** scott.magnacca1@gmail.com ✅

---

## Design Reference
- **Colors:** Forest green `#006644`, gold `#EEAF00`, cream `#FFFDF5`
- **Fonts:** Inter (body) + Playfair Display (accent) + Crimson Text (Harvard branding)
- **Brand text:** "Fidelity Investments" in `#006644` Inter bold; "Harvard University" in Crimson Text `#A6192E`
- **Counts:** 4,127+ everywhere
- **Event date:** June 18, 2026

---

## Files & Docs
- `src/index.html` — entire site (HTML + CSS + JS)
- `netlify/functions/submit-registration.js` — registration → Google Sheets
- `setup-google-sheet.js` — one-time utility: creates tabs + headers (reusable pattern)
- `CHANGELOG.md` — v1–v9 history
- `SETUP.md` — Google Sheets setup guide + column reference
- `~/.claude/tokens/google-service-account.json` — service account JSON (global, reuse in any project)

---

## Potential Next Steps

### High Priority
- **Test live form** — submit a registration, verify row appears in `Summit_Registrations` and email arrives at scott.magnacca1@gmail.com

### Medium Priority
- **Replace Unsplash placeholders** with custom branded graphics:
  - 3 value card images (ROI-First AI, Decision Intelligence, Prompting as Power Skill)
  - 3 agenda day images (Day 1, Day 2, Day 3 infographics)
- **Add Google Analytics** — GA4 property + tracking code in `<head>`, `sign_up` event on form submit

### Optional / Future
- **Email automation** — Zapier/Make: new `Summit_Registrations` row → add contact to ConvertKit/ActiveCampaign
- **Post-event workflow** — use `AI Summit` tab for attendee tracking, session notes, follow-up status
- **A/B test CTAs** — current: "Reserve My Seat (Free)" — test alternatives
- **Add social proof counter** — live registration count pulled from sheet row count

---

## Funnel Context
- **Top:** 60-second AI quiz → lead capture
- **Authority:** scottmagnacca.com
- **→ This event:** Free 3-day summit (value delivery, relationship building)
- **Bottom:** 4daycourse.netlify.app → paid high-ticket course

---

## Git Status
- **Branch:** main
- **Local ↔ Remote:** in sync at `1789285`
- **Untracked (stale, safe to delete):** `CLAUDE-CODE-*.md`, `REFINEMENT-SPECS.md`
