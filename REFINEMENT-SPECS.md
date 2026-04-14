# Animation Refinement Specs — Executive AI Advantage Summit

**Status:** Ready for implementation  
**Date:** April 8, 2026  
**Target:** `src/index.html`

---

## 1. "Scott's Track Record Includes" Section

### Change
- **Make text BOLD** (increased font-weight)
- **Add pulse/glow effect** in complementary color (suggest gold #EEAF00 or green #006644)
- Glow animation: similar to CTA pulse (2.5s infinite)

### Location
Find: `.hero-photo-overlay` or similar heading above the 3 badges section

---

## 2. Fidelity Investments Logo → Text Brand

### Change
- Remove actual Fidelity logo (or hide it)
- Replace with **"Fidelity Investments"** in text
- **Font:** Playfair Display (matching your accent font) or Inter bold
- **Color:** Match Fidelity brand green (similar to your --green-deep #006644)
- Style like a branded text mark, not an image

### Note
User will provide guidance if exact Fidelity brand font/color needed

---

## 3. Harvard University Logo → Branded Text

### Change
- Remove Harvard logo image
- Replace with **"Harvard"** in text
- **Font:** Use Harvard's brand font (Crimson Text or similar serif)
- **Color:** Harvard Crimson (#A6192E or similar red/burgundy)
- Style as premium text badge

### Note
Keep premium feel, match Harvard brand guidelines

---

## 4. Badge Text Updates

### Current → Updated

| Current | New | Effect |
|---------|-----|--------|
| `4,000+ Advisors Trained` | `4,127+ Advisors Trained` | Count-up animation (0 → 4,127) |
| `Published Author` | `Published Author`<br>`4 new updated books in print` | Keep same, add second line |
| `56% Wage Premium` | `Earn a 56% Wage Premium` | Count-up: 0% → 56% (prefix "Earn a") |

### Location
Hero section stat badges + book section badges

---

## 5. Bio Line Consistency

### Current
```
"Harvard Influence Science · 4,000+ Advisors Trained"
```

### Updated
```
"Harvard ALM in Psychology · 4,127+ Advisors Trained"
```

### Details
- Change "Harvard Influence Science" → "Harvard ALM in Psychology"
- Change "4,000+" → "4,127+"
- Keep same styling (color, font size, layout)

### Location
Hero photo overlay bottom text

---

## 6. Hero Main Headline Enhancement

### Current
```
3 Days. 90 Minutes.
Close the AI Skills Gap.
```

### Treatment
**Make this stand out with:** 
- Enhanced visual hierarchy (larger, bolder, more prominent)
- Possible: Add shimmer effect to entire phrase (not just part)
- Possible: Add glow/shadow for depth
- Suggest: Keep "3 Days. 90 Minutes." normal, make "Close the AI Skills Gap" extra bold + shimmer

### Note
User can advise on preferred treatment

---

## 7. Dynamic Countdown Timer

### Current
```
14 : 20 : 01 : 17
DAYS : HOURS : MIN : SEC
April 23–25, 2026
11:00 AM PT / 2:00 PM ET
```

### Logic
1. **If event date/time is scheduled:** Use that date
2. **If no event scheduled:** Generate random mid-week date (Tue-Thu) ~60 days in future
3. **Dynamic:** Timer recalculates on each page load
4. **Format:** Keep existing display (DD:HH:MM:SS)

### Event Details (CONFIRMED)
**Date:** Wednesday, June 18, 2026 (mid-June, mid-week)  
**Time:** 11:00 AM PT / 2:00 PM ET (same as current showing)  
**Duration:** Single day (or 3-day event starting June 18?)  

**Note for Claude Code:** If single-day event, show:
```
0 : 0 : 0 : [seconds until June 18, 2026 11:00 AM PT]
DAYS : HOURS : MIN : SEC
June 18, 2026
11:00 AM PT / 2:00 PM ET
```

If multi-day (Jun 18-20), show:
```
[days] : [hours] : [min] : [sec]
DAYS : HOURS : MIN : SEC
June 18–20, 2026
11:00 AM PT / 2:00 PM ET
```

---

## 8. CTA Button Enhancements

### Current
`Reserve My Free Seat →`

### Changes
- **Make button BIGGER** (increase padding, font size)
- **Add prominent glow** (enhanced pulse effect, brighter shadow)
- Suggest: glow color = gold (#EEAF00) or green (#006644)
- Animation: Pulsing every 2.5s

### Location
Hero section primary CTA

---

## 9. Book Section Text Update

### Current (below book image)
```
4,000+Advisors Trained 56%Wage Premium 3 DaysTo Transform
```

### Updated (with count-up)
```
4,127+ Advisors Trained
56% Wage Premium
3 Days To Transform
```

### Details
- **Line breaks** for readability
- **Count-up animations** enabled on all 3 stats
- Same styling (font, color) as existing

### Location
Book image section

---

## 10. Remove Graphic Badges

### Current
Three badges under book image:
- Hybrid Advisor badge (graphic)
- Storyselling badge (graphic)
- Credentials badge (graphic)

### Change
**REMOVE these graphic badges entirely**

### Location
`.book-section` or similar → find badge container and hide/remove

---

## 11. Scott's Bio Typewriter Effect

### Current (static)
```
"I learned how businesses are built at one of the world's top entrepreneurial universities. I learned the science of why people say yes at Harvard. But my real education came from cold calls, lost deals, and the relentless grind of hitting quota. I wasn't just studying strategy — I was living it on the front lines.

When AI emerged, I didn't see a threat. I saw an unprecedented opportunity. An unfair advantage that everyone has access to, but very few know how to effectively apply.

I've since trained 4,000+ financial advisors across North America on AI adoption. This summit distills everything into 3 focused days."
```

### Treatment
- **Type out at normal reading speed** when section scrolls into view
- **Keep font size, style, color unchanged**
- **18ms per character** (same pace as testimonials)
- **No CSS animation-delay** (JS-driven only)
- Update "4,000+" → "4,127+" in last paragraph

### Location
Guide bio section (Scott's full bio below headshot)

---

## 12. "4,000 Advisors Trained" → "4,127 Advisors Trained"

### Replace All
Find and update every instance:
- `4,000+` → `4,127+`
- `4,000 advisors trained` → `4,127 advisors trained`
- `4,000+ Advisors Trained` → `4,127+ Advisors Trained`

### Locations
1. Hero float stat badge
2. Hero photo overlay text
3. Book section text
4. Bio text section
5. Final CTA section
6. Any other instances

---

## Implementation Rules

✅ **MUST MAINTAIN:**
- All existing structure (no layout changes)
- All existing colors (unless noted above)
- All existing fonts (unless noted above)
- Form fields (First Name, Last Name, Email)
- Registration system (Netlify Function)
- Responsive design (mobile/tablet/desktop)

✅ **BEFORE COMMIT:**
- `node --check src/index.html` (syntax validation)
- Verify all count-up animations trigger on scroll
- Verify typewriter text types at reading pace (not too fast)
- Verify buttons glow correctly
- Verify no console errors

✅ **GIT WORKFLOW:**
```bash
cd ~/Documents/Claude/Projects/Cowork-Replicate\ AI\ Advantage\ Summit\ website\ design
git add src/index.html
git commit -m "refine: update badge copy, add count-ups, typewriter bio, enhance CTA"
git push origin main
```

---

## USER PREFERENCES (CONFIRMED ✅)

1. ✅ **Headline treatment:** Extra bold + gold shimmer (enhance existing)
   - "Close the AI Skills Gap" gets bold weight + metallic-shimmer animation
   - Keep existing gold color flow (#EEAF00 → #DDD055 → #FDE68A)

2. ✅ **Button glow color:** Green (#006644) with gold border glow
   - Primary glow: Green (brand color)
   - Secondary/border accent: Gold (#EEAF00) 
   - Creates premium dual-tone glow effect on CTA buttons

3. ✅ **Fidelity text styling:** Follow Fidelity brand standards
   - Font: Match Fidelity Investments brand (use their official font/weight)
   - Color: Fidelity green (use their official brand green, similar to #006644)
   - Style as premium text mark (not image)

4. ✅ **Harvard text styling:** Crimson Text serif + Harvard red (#A6192E)
   - Font: Crimson Text (Harvard's official serif font, import from Google Fonts)
   - Color: Harvard Crimson (#A6192E)
   - Premium, recognizable brand treatment

---

**Status:** Ready for Claude Code when user confirms above.
