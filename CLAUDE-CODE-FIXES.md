# Claude Code Pickup — Bug Fixes + Animation Timing Adjustments
## Executive AI Advantage Summit v7 → v8

**Date:** April 8, 2026  
**Current commit:** `372ed0f` (v7 complete)  
**Task:** Fix 5 missed items + slow all animations by 20%  
**Duration:** ~8–10 minutes  
**File:** `src/index.html` (~65 KB)

---

## ✅ Pre-Flight Location Validation

Run this FIRST:

```bash
pwd && ls -la src/index.html && git remote -v | head -1
```

Expected:
```
/Users/scottmagnacca/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design
-rw-r--r--  1 [user]  staff  65000 Apr  8 [time] src/index.html
origin	https://github.com/smagnacca/Executive-AI-Advantage-Summit.git (fetch)
```

**If any check fails → STOP. Do NOT proceed.**

---

## 🐛 5 Missed Items to Fix

### 1. "3 Days. 90 Minutes" — Enhance Visual Hierarchy

**Current:**
```html
<h1><span style="font-weight:900;font-size:0.88em;opacity:0.9;">3 Days. 90 Minutes.</span><br><span class="shimmer-gold" style="font-weight:900;">Close the AI Skills Gap.</span></h1>
```

**Issue:** "3 Days. 90 Minutes" is SMALLER (0.88em) and less prominent — should be equal or larger visual weight

**Fix:**
- Remove `font-size:0.88em` (make it normal/100% size)
- Keep opacity at normal (remove opacity:0.9)
- Make it bold (already 900) + add subtle color accent (gold or white)
- "Close the AI Skills Gap" remains shimmer + bold

**Result:** Both lines are equally prominent, visual hierarchy improved

---

### 2. "🎯 Why This Event" — Convert to Button/Badge with Glow

**Current:**
```html
<div class="eyebrow">🎯 Why This Event</div>
```

**Issue:** Just plain text eyebrow — not visually prominent like a button

**Fix:**
- Convert to styled badge/button element
- Add **glow effect** (similar to CTA glow: green #006644 + gold #EEAF00 dual-tone)
- Increase padding/size (make it stand out)
- Style: Premium button feel (not just text)
- Pulse animation: 2.5s infinite (matches other buttons)

**Result:** "Why This Event" becomes a visually prominent, glowing section marker

---

### 3. Verify All CTA Buttons Have Dual Glow (Green + Gold)

**Current state:** "Reserve My Free Seat" buttons may only have single glow

**Fix:**
- Find ALL `.cta-btn` instances on page
- Verify each has `box-shadow` with BOTH colors:
  - Primary: `rgba(0,102,68,0.6)` (green #006644)
  - Secondary: `rgba(238,175,0,0.3)` (gold #EEAF00)
  - Example: `0 0 40px rgba(0,102,68,0.6), 0 0 60px rgba(238,175,0,0.3)`
- Pulse animation on all CTAs (2.5s infinite)

**Locations to check:**
- Hero "Reserve My Free Seat"
- Mid-page CTAs
- Final CTA section

---

### 4. Count-Up Animation on "Earn a 56% Wage Premium"

**Current:**
```html
<span class="num grad-text" data-target="56" data-suffix="%" data-prefix="Earn a ">0%</span>
```

**Issue:** Unclear if this is actually animating 0% → 56% on scroll, or just displaying static

**Fix:**
- Verify JS `initCountUpAnimations()` is targeting this element
- Ensure it counts from 0 → 56 over 3–4 seconds (see timing section below)
- Ensure "Earn a " prefix displays correctly during animation
- Trigger: When hero section scrolls into view (IntersectionObserver)

---

### 5. Testimonials — Verify Typewriter Effect on Scroll

**Current state:** Testimonial quotes may not be scrolling into view + typewriter triggering

**Issue:** Typewriter effect may be applied to static text, not triggering on IntersectionObserver

**Fix:**
- Find testimonial quote elements (`.testimonial-quote` or similar)
- Verify each has `data-typewriter="true"` attribute
- Verify `initTypewriterAnimations()` runs on IntersectionObserver trigger
- Speed: 18ms per character (baseline, will be slowed by 20% per global instruction)
- Stagger between testimonials: 300ms apart
- Trigger: When testimonial section scrolls into view

---

## ⏱️ Animation Timing Adjustments (GLOBAL — Slow by 20%)

**User requirement:** Slow down ALL animations, typing, and effects by 20%

**Current → New timing:**

| Animation | Current | Slowed by 20% | New Duration |
|-----------|---------|---------------|--------------|
| Shimmer text | 2.5s | +20% | 3.0s |
| Pulse glow (CTAs) | 2.5s | +20% | 3.0s |
| Count-up duration | 2.5s | +20% | 3.0s |
| Mesh gradient | 12s | +20% | 14.4s |
| Typewriter char | 18ms | +20% | 21.6ms ≈ 22ms |
| Testimonial stagger | 300ms | +20% | 360ms |
| Scroll reveals (fade) | 0.7s | +20% | 0.84s |
| Scroll stagger (cards) | 100ms | +20% | 120ms |
| Parallax shift | subtle | +20% | subtle (no change) |
| Book shine | 2.5s | +20% | 3.0s |
| Float animations | 3s | +20% | 3.6s |
| Stat flash | 0.4s | +20% | 0.48s ≈ 0.5s |

**Implementation:**
- Update all `@keyframes` durations in `<style>` section
- Update all inline animation timing in JS (count-up, typewriter, etc.)
- Update all CSS `animation:` properties with new durations
- Update all JS `duration`, `delay`, `interval` values

---

## ⏱️ Count-Up Timing — 3-4 Seconds Per Stat Section

**User requirement:** All stats count up gradually over 3–4 seconds when scrolling to that section

**Current state:** Count-ups may be 2.5s or inconsistent

**Fix:**
- All count-up animations: **3.5 seconds** (middle of 3-4s range)
- Trigger: IntersectionObserver when section enters viewport
- Easing: `ease-in-out` (smooth acceleration/deceleration)
- Affected stats:
  1. Hero "56% Wage Premium" (0% → 56%)
  2. Hero "4,127+ Advisors Trained" (0 → 4,127)
  3. Book section "4,127+ Advisors Trained" (0 → 4,127)
  4. Book section "56% Wage Premium" (0% → 56%)
  5. Book section "3 Days To Transform" (0 → 3)

**Each stat should:**
- Start at 0 when section scrolls into view
- Count up to target value over 3.5 seconds
- Display final value cleanly (no overshooting)
- Not restart on repeated scrolls (only once per page load, or reset on scroll back up)

---

## 🛠️ Implementation Rules

✅ **CRITICAL:**
1. Validate location FIRST (pwd check)
2. Update ALL animation timings consistently (20% slower)
3. Verify count-up animations: 3.5s duration, triggered on scroll
4. Verify typewriter: 22ms/char (slowed from 18ms)
5. Verify all buttons have dual green/gold glow
6. Test "Why This Event" glow on live site
7. Validate syntax: `node --check src/index.html` before commit

✅ **BEFORE COMMIT:**
- "3 Days. 90 Minutes" is equal visual weight to "Close the AI Skills Gap"
- "Why This Event" appears as glowing button/badge
- All CTA buttons pulse with green/gold dual glow
- "Earn a 56% Wage Premium" counts from 0% → 56%
- Testimonials typewriter when scrolled into view
- All animations are 20% slower (feel premium, not rushed)
- All count-ups are 3.5s duration
- No console errors
- Responsive design unchanged
- Form intact

✅ **GIT WORKFLOW:**
```bash
cd ~/Documents/Claude/Projects/Cowork-Replicate\ AI\ Advantage\ Summit\ website\ design

# Validate location
pwd && ls -la src/index.html

# Make changes to src/index.html

# Syntax check
node --check src/index.html

# Commit
git add src/index.html
git commit -m "fix: resolve missed items, adjust animation timing (20% slower), verify count-ups (3-4s)"

# Push to GitHub
git push origin main
```

---

## ✨ Success Criteria (After Push)

✅ "3 Days. 90 Minutes" is equal size/prominence to "Close the AI Skills Gap"
✅ "Why This Event" appears as glowing button/badge (not plain text)
✅ All CTA buttons glow with dual green + gold effect
✅ "Earn a 56% Wage Premium" animates 0% → 56% on scroll
✅ Testimonials typewriter when scrolled into view
✅ All animations are 20% slower (premium feel)
✅ All count-ups take 3.5 seconds (not faster)
✅ Typewriter: 22ms per character (not 18ms)
✅ Mesh gradient: 14.4s loop (not 12s)
✅ Pulse glow: 3.0s cycle (not 2.5s)
✅ No console errors
✅ Live on Netlify (1–2 min auto-deploy)

---

## 📝 Notes for Claude Code

- This is v7 → v8 (bug fix + timing adjustment pass)
- All 5 missed items are clearly identified
- Timing adjustment is global (20% slower across ALL animations)
- Count-up duration standardized to 3.5 seconds
- Typewriter slowed to 22ms/char
- Test thoroughly: scroll through page, verify each animation timing feels premium (not rushed)

---

Prepared by: Cowork (Scott's session)
For execution by: Claude Code CLI
Status: ✅ Ready for immediate execution

After pasting: Run location validation first, then proceed. Report back when complete.
