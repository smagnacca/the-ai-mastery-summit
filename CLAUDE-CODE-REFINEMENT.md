# Claude Code Pickup — Refinement Pass 2
## Executive AI Advantage Summit Site Enhancements

**Date:** April 8, 2026  
**Previous commit:** `7f89cb1` (Animation pass complete)  
**Task:** 12 specific refinements based on visual review + brand consistency  
**Duration:** ~6–8 minutes  
**File:** `src/index.html` (61.8 KB → ~63.5 KB expected)

---

## ✅ Pre-Flight Validation

```bash
# Run this FIRST to confirm correct location:
pwd && ls -la src/index.html && git remote -v | head -1

# Expected output:
# /Users/[username]/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design
# -rw-r--r--  1 [user]  staff  63076 Apr  8 [time] src/index.html
# origin	https://github.com/smagnacca/Executive-AI-Advantage-Summit.git (fetch)
```

**If any check fails → STOP. Do NOT proceed.**

---

## 📋 12 Refinements (In Priority Order)

### 1. "Scott's Track Record Includes" — Bold + Glow

**Current:** Regular text above 3 badges  
**Change:**
- Make text **bold** (font-weight: 700–800)
- Add **pulse/glow animation** in gold (#EEAF00)
- Glow effect: similar to existing `pulse-glow` animation
- Duration: 2.5s infinite

**Location:** Find heading above badge section in guide/bio area

---

### 2. Fidelity Investments Logo → Branded Text

**Current:** Fidelity logo image  
**Change:**
- Remove image, replace with text: `"Fidelity Investments"`
- **Font:** Follow Fidelity brand standards (suggest: Inter bold or Fidelity's official brand font)
- **Color:** Fidelity brand green (similar to #006644)
- Style as premium text mark (not image)

**Location:** Likely near testimonials or credential section

---

### 3. Harvard Logo → Crimson Text + Harvard Red

**Current:** Harvard logo image  
**Change:**
- Remove image, replace with text: `"Harvard"`
- **Font:** Crimson Text (import from Google Fonts if not already imported)
- **Color:** Harvard Crimson (#A6192E)
- Premium serif style, recognizable Harvard branding

**Location:** Near Fidelity credit/credentials

---

### 4. Badge Text — Update Copy + Add Count-Up Animations

**Update all badge text:**

| Old | New | Animation |
|-----|-----|-----------|
| `4,000+ Advisors Trained` | `4,127+ Advisors Trained` | Count-up: 0 → 4,127 |
| `Published Author` | `Published Author`<br>`4 new updated books in print` | Keep static, add second line |
| `56% Wage Premium` | `Earn a 56% Wage Premium` | Count-up: 0% → 56%, prefix "Earn a" |

**Count-up triggers:** When section scrolls into view (IntersectionObserver)  
**Animation speed:** 2.5s per count-up animation  
**Locations:** Hero badges + book section badges

---

### 5. Bio Line Consistency

**Current:**
```
"Harvard Influence Science · 4,000+ Advisors Trained"
```

**Update to:**
```
"Harvard ALM in Psychology · 4,127+ Advisors Trained"
```

**Location:** Hero photo overlay bottom text (below Scott's name)

---

### 6. Hero Main Headline — Enhance Visual Hierarchy

**Current:**
```
3 Days. 90 Minutes.
Close the AI Skills Gap.
```

**Enhancement:**
- Make `"3 Days. 90 Minutes."` **bold** (increased font-weight)
- Make `"Close the AI Skills Gap"` **extra bold** + apply **gold shimmer** animation
- Shimmer: existing `metallic-shimmer` animation (2.5s infinite)
- Effect: Creates strong visual hierarchy, "Gap" line stands out most

**Location:** Hero h1 section

---

### 7. Dynamic Countdown Timer (CRITICAL)

**Current setup:**
```
14 : 20 : 01 : 17
DAYS : HOURS : MIN : SEC
April 23–25, 2026
11:00 AM PT / 2:00 PM ET
```

**Update to (EVENT CONFIRMED):**
- **Date:** Wednesday, June 18, 2026
- **Time:** 11:00 AM PT / 2:00 PM ET
- **Duration:** Assume single-day event (or ask if multi-day)

**Countdown logic:**
1. Calculate target: June 18, 2026 11:00 AM PT
2. Current time: Calculate days/hours/mins/secs remaining
3. Update display: DD:HH:MM:SS format
4. Recalculate on every page load (dynamic)

**Display format:**
```
[DD] : [HH] : [MM] : [SS]
DAYS : HOURS : MIN : SEC
June 18, 2026
11:00 AM PT / 2:00 PM ET
```

**Location:** Hero countdown section

---

### 8. CTA Button Enhancements — "Reserve My Free Seat"

**Current:** Normal size, standard glow  
**Changes:**
- **Increase size:** Larger padding (suggest: 22px 50px instead of 18px 40px)
- **Increase font:** Slightly larger font-size
- **Enhanced glow:** 
  - Primary glow color: **Green (#006644)** — matches brand
  - Secondary/border accent: **Gold (#EEAF00)** — dual-tone effect
  - Pulse animation: 2.5s infinite (enhance box-shadow)
  - Suggest box-shadow like: `0 0 40px rgba(0,102,68,0.6), 0 0 60px rgba(238,175,0,0.3)`

**Location:** Primary CTA button in hero section

---

### 9. Book Section Stats — Update Text + Enable Count-Ups

**Current:**
```
4,000+Advisors Trained 56%Wage Premium 3 DaysTo Transform
```

**Update to (with line breaks + count-ups):**
```
4,127+ Advisors Trained
56% Wage Premium
3 Days To Transform
```

**Details:**
- Add line breaks for readability
- Enable count-up animations on all 3 stats
- Same styling (font, color, size) as existing
- Trigger: When section scrolls into view

**Location:** Below book cover image in book section

---

### 10. Remove Graphic Badges

**Current:** 3 graphic badges under book image:
- Hybrid Advisor badge
- Storyselling badge
- Credentials badge

**Change:** REMOVE entirely (display: none or delete HTML)

**Location:** Find `.book-section` or similar → badge container

---

### 11. Scott's Bio — Typewriter Effect

**Current (static text):**
```
"I learned how businesses are built at one of the world's top entrepreneurial universities. I learned the science of why people say yes at Harvard. But my real education came from cold calls, lost deals, and the relentless grind of hitting quota. I wasn't just studying strategy — I was living it on the front lines.

When AI emerged, I didn't see a threat. I saw an unprecedented opportunity. An unfair advantage that everyone has access to, but very few know how to effectively apply.

I've since trained 4,000+ financial advisors across North America on AI adoption. This summit distills everything into 3 focused days."
```

**Update & Treatment:**
- Update `4,000+` → `4,127+` in last paragraph
- **Type out at reading pace** when section scrolls into view
- **Speed:** 18ms per character (same as testimonials)
- **Keep:** Font size, weight, color, style (no changes except animation)
- **Trigger:** IntersectionObserver on section
- **No CSS animation-delay:** JS-driven staggered typewriter only

**Location:** Guide bio section (Scott's full bio below headshot)

---

### 12. Replace All "4,000" with "4,127"

**Find & replace every instance:**
- `4,000+` → `4,127+`
- `4,000 advisors` → `4,127 advisors`
- `4,000+ Advisors Trained` → `4,127+ Advisors Trained`

**Locations to check:**
1. Hero float stat badge
2. Hero photo overlay text
3. Book section text
4. Bio text section
5. Final CTA section
6. Any other instances (grep to verify)

---

## 🛠️ Implementation Rules

✅ **CRITICAL (No Exceptions):**
1. Validate file location FIRST (pwd check)
2. IntersectionObserver ONLY for scroll triggers (no setTimeout)
3. Count-up animations: Use existing JS pattern (stat-flash style)
4. Typewriter: 18ms per char, no CSS animation-delay
5. Button glow: Green (#006644) + gold (#EEAF00) dual-tone
6. Crimson Text font: Must import from Google Fonts if not present
7. Validate all changes with `node --check src/index.html` before commit

✅ **BEFORE COMMIT:**
- All count-up animations trigger correctly on scroll
- Typewriter text types at natural reading pace (not too fast/slow)
- Button glow effects work smoothly
- Countdown timer shows correct June 18 date/time
- No console errors
- No layout shifts
- Form fields intact (First Name, Last Name, Email)
- Responsive design unchanged

✅ **GIT WORKFLOW:**
```bash
cd ~/Documents/Claude/Projects/Cowork-Replicate\ AI\ Advantage\ Summit\ website\ design

# Validate location
pwd && ls -la src/index.html

# Make changes to src/index.html

# Syntax check BEFORE commit
node --check src/index.html

# Commit with clear message
git add src/index.html
git commit -m "refine: update badges (4,127), brand text (Fidelity/Harvard), enhance CTA glow, typewriter bio, dynamic countdown"

# Push to GitHub (Netlify auto-deploys)
git push origin main
```

---

## 📊 Expected File Size Changes

- Before: 61.8 KB (from animation pass)
- After: ~63.5 KB (adding more CSS for fonts + JS for typewriter/count-ups)

---

## ✨ Success Criteria (After Push)

✅ Countdown shows June 18, 2026 11:00 AM PT  
✅ "Close the AI Skills Gap" is bold + shimmers  
✅ "Scott's Track Record Includes" is bold + glows  
✅ "Fidelity Investments" appears as text (Fidelity green)  
✅ "Harvard" appears as text (Crimson Text, Harvard red #A6192E)  
✅ All badges show 4,127+ (not 4,000+)  
✅ Count-up animations trigger on scroll (0 → 4,127, 0% → 56%)  
✅ CTA button is bigger + glows green/gold  
✅ Scott's bio types out at reading pace on scroll  
✅ Graphic badges under book are removed  
✅ Book section shows count-up stats  
✅ No console errors  
✅ Live on Netlify (1–2 min auto-deploy)

---

## 📝 Notes for Claude Code

- This is refinement pass #2 (animation pass #1 was successful)
- All changes maintain existing structure, colors (except Fidelity/Harvard branding), fonts
- Form registration system stays intact
- Responsive design unchanged
- Be thorough with count-up animations (timing matters for UX)
- Typewriter effect should feel natural (not robotic)
- Test countdown math carefully (June 18, 2026 at 11:00 AM PT)

---

**Prepared by:** Cowork (Scott's session)  
**For execution by:** Claude Code CLI  
**Status:** ✅ Ready for immediate execution

Copy this prompt → paste into Claude Code terminal → sit back!
