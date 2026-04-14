#!/usr/bin/env python3
"""
Summit Registration Paths — editorial layout, NOT a flowchart.
Three sovereign cards side by side. Premium, minimal, high-craft.
"""
from PIL import Image, ImageDraw, ImageFont
import math

FONTS = "/Users/scottmagnacca/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/b422844e-9397-493a-a66a-db24b5fed1d4/ca567695-09db-43d8-8b5b-6b6176138446/skills/canvas-design/canvas-fonts"
OUTPUT = "/Users/scottmagnacca/Documents/Claude/Projects/Cowork-Replicate AI Advantage Summit website design/summit-registration-paths.png"

W, H = 1600, 900

BG       = (13, 22, 13)
GOLD     = (238, 175, 0)
WHITE    = (255, 255, 255)
DIM      = (200, 210, 195)
MUTED    = (118, 138, 115)
SILVER   = (158, 175, 192)
GREEN_A  = (130, 205, 80)    # Path 3 accent
GOLD_A   = (238, 175, 0)     # Path 1 accent
SILVER_A = (158, 175, 192)   # Path 2 accent

img  = Image.new('RGB', (W, H), BG)
draw = ImageDraw.Draw(img, 'RGBA')

def lf(name, sz):
    try:    return ImageFont.truetype(f"{FONTS}/{name}", sz)
    except: return ImageFont.load_default()

# Font palette
ft_masthead  = lf("BigShoulders-Bold.ttf",    11)
ft_eyebrow   = lf("InstrumentSans-Regular.ttf",11)
ft_title     = lf("BigShoulders-Bold.ttf",    48)
ft_price_xl  = lf("BigShoulders-Bold.ttf",    72)
ft_price_sm  = lf("BigShoulders-Bold.ttf",    22)
ft_card_h    = lf("BigShoulders-Bold.ttf",    22)
ft_card_sub  = lf("InstrumentSans-Regular.ttf",13)
ft_detail    = lf("InstrumentSans-Regular.ttf",12)
ft_detail_b  = lf("InstrumentSans-Bold.ttf",   12)
ft_pill      = lf("WorkSans-Bold.ttf",         11)
ft_italic    = lf("Lora-Italic.ttf",           13)
ft_footer_h  = lf("BigShoulders-Bold.ttf",    18)
ft_footer_s  = lf("InstrumentSans-Regular.ttf",12)
ft_divider   = lf("InstrumentSans-Regular.ttf",11)
ft_badge     = lf("WorkSans-Bold.ttf",         10)
ft_num       = lf("BigShoulders-Bold.ttf",    13)

def ct(x, y, text, font, color, anchor="lt"):
    bb = draw.textbbox((0,0), text, font=font)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    if anchor == "center":
        draw.text((x - tw//2, y - th//2), text, font=font, fill=color)
    elif anchor == "ct":   # center-top
        draw.text((x - tw//2, y), text, font=font, fill=color)
    else:
        draw.text((x, y), text, font=font, fill=color)
    return tw, th

def rr(x1,y1,x2,y2, r=10, fill=None, outline=None, ow=1):
    draw.rounded_rectangle([x1,y1,x2,y2], radius=r, fill=fill, outline=outline, width=ow)

# ── SUBTLE TEXTURE: sparse diagonal grain ──
for i in range(0, W+H, 60):
    draw.line([(i,0),(0,i)], fill=(255,255,255,4), width=1)
for i in range(0, W+H, 60):
    draw.line([(W-i,0),(W,i)], fill=(255,255,255,3), width=1)

# ── TOP + BOTTOM GOLD LINES ──
draw.rectangle([0, 0, W, 2], fill=GOLD)
draw.rectangle([0, H-2, W, H], fill=GOLD)

# ── GLOBAL HEADER ──
TITLE_Y = 30
ct(W//2, TITLE_Y,     "THE AI MASTERY SUMMIT",                    ft_title,   GOLD,    "ct")
ct(W//2, TITLE_Y+54,  "Choose your experience  ·  June 18, 2026", ft_eyebrow, MUTED,   "ct")

# Thin separator line
draw.line([(80, TITLE_Y+74), (W-80, TITLE_Y+74)], fill=(50,78,50), width=1)

# ══════════════════════════════════════════════════
# THREE CARD COLUMNS
# ══════════════════════════════════════════════════
CARD_TOP    = TITLE_Y + 90
CARD_BOTTOM = H - 90
CARD_H      = CARD_BOTTOM - CARD_TOP

# Column left edges / widths (3 equal-ish, center wider)
GAP   = 24
SIDE_W = 390
CTR_W  = 1600 - 2*SIDE_W - 4*GAP - 80   # ~398px center
L1 = 40                    # Path 3 left
L2 = L1 + SIDE_W + GAP    # Path 1 left (center)  -> 454
L3 = L2 + CTR_W + GAP*2   # Path 2 left           -> ~912... let me recalculate

# Actually let's fix the math precisely
L1  = 40
W1  = 370     # Path 3 width
L2  = L1 + W1 + GAP   # = 434
W2  = 1600 - 2*L1 - 2*W1 - 4*GAP  # = 1600 - 80 - 740 - 96 = 684... too wide

# Simpler: 3 equal columns with larger center
PAD   = 40
GAP   = 20
W_TOT = W - 2*PAD   # 1520
W_SIDE = 350
W_CTR  = W_TOT - 2*W_SIDE - 2*GAP  # 1520 - 700 - 40 = 780

L1  = PAD                       # 40  → 40+350 = 390
L2  = PAD + W_SIDE + GAP        # 410 → 410+780 = 1190
L3  = PAD + W_SIDE + GAP + W_CTR + GAP  # 1210 → 1210+350 = 1560
R1  = L1 + W_SIDE
R2  = L2 + W_CTR
R3  = L3 + W_SIDE

C1  = (L1+R1)//2
C2  = (L2+R2)//2
C3  = (L3+R3)//2

# Card backgrounds
# Path 3 — VIP $49 (left) — subtle green tint
rr(L1, CARD_TOP, R1, CARD_BOTTOM, r=16,
   fill=(18,34,12), outline=(130,205,80,90), ow=1)

# Path 1 — Free (center) — prominent gold border
rr(L2, CARD_TOP, R2, CARD_BOTTOM, r=16,
   fill=(20,38,18), outline=GOLD, ow=2)

# Path 2 — $9.99 Fast-Track (right) — silver tint
rr(L3, CARD_TOP, R3, CARD_BOTTOM, r=16,
   fill=(17,30,24), outline=(158,175,192,80), ow=1)

# ── PATH EYEBROWS (top of each card) ──
EY = CARD_TOP + 22

# Badge pills
def pill(cx, y, text, bg, border, txt_col):
    bb = draw.textbbox((0,0), text, font=ft_badge)
    tw = bb[2]-bb[0]
    px, py = 10, 5
    rr(cx-tw//2-px, y, cx+tw//2+px, y+bb[3]-bb[1]+py*2,
       r=20, fill=bg, outline=border, ow=1)
    ct(cx, y+py, text, ft_badge, txt_col, "ct")
    return bb[3]-bb[1]+py*2+4

pill(C1, EY, "PATH 3  ·  PRE-REGISTRATION", (20,40,12), (130,205,80), (155,225,100))
pill(C2, EY, "PATH 1  ·  MOST POPULAR",      (40,30,0),  GOLD,         GOLD)
pill(C3, EY, "PATH 2  ·  POST-REGISTRATION", (18,32,26), (158,175,192),(175,190,205))

# ── LARGE PRICE / FREE LABEL ──
PRICE_Y = EY + 42

ct(C1, PRICE_Y,     "$49",  ft_price_xl, (190,228,65), "ct")
ct(C1, PRICE_Y+78,  "one time", ft_eyebrow, MUTED, "ct")

ct(C2, PRICE_Y,     "FREE", ft_price_xl, GOLD, "ct")
ct(C2, PRICE_Y+78,  "no credit card needed", ft_eyebrow, MUTED, "ct")

ct(C3, PRICE_Y,     "$9.99", ft_price_xl, SILVER, "ct")
ct(C3, PRICE_Y+78,  "one time · post-registration", ft_eyebrow, MUTED, "ct")

# ── CARD TITLES ──
CTITLE_Y = PRICE_Y + 100

ct(C1, CTITLE_Y, "VIP PASS", ft_card_h, (190,228,65), "ct")
ct(C2, CTITLE_Y, "FREE SEAT", ft_card_h, GOLD,         "ct")
ct(C3, CTITLE_Y, "VIP FAST-TRACK", ft_card_h, SILVER,  "ct")

# Thin separator under title
SEP_Y = CTITLE_Y + 28
draw.line([(L1+20, SEP_Y), (R1-20, SEP_Y)], fill=(130,205,80,60), width=1)
draw.line([(L2+20, SEP_Y), (R2-20, SEP_Y)], fill=(238,175,0,60),  width=1)
draw.line([(L3+20, SEP_Y), (R3-20, SEP_Y)], fill=(158,175,192,60),width=1)

# ── BENEFIT ITEMS ──
BENE_Y = SEP_Y + 18

def benefit_row(x, y, icon, text, col, w_avail):
    ix, iy = x + 18, y
    draw.text((ix, iy), icon, font=ft_detail, fill=col)
    draw.text((ix+22, iy), text, font=ft_detail, fill=DIM)
    bb = draw.textbbox((0,0), text, font=ft_detail)
    return bb[3]-bb[1]+10

# Path 3 benefits
y3 = BENE_Y
for icon, txt in [
    ("📚", "Autographed signed book"),
    ("🎯", "Implementation Workshop"),
    ("🎟", "Full summit access"),
    ("✉️", "Confirmation + next steps"),
    ("📅", "June 18 · 11AM PT / 2PM ET"),
]:
    y3 += benefit_row(L1, y3, icon, txt, (130,205,80), W_SIDE)

# Path 1 benefits
y1 = BENE_Y
for icon, txt in [
    ("🎟", "3-day virtual event access"),
    ("📖", "Free Chapter 1 of Storyselling"),
    ("🎯", "3 AI frameworks for your role"),
    ("🧠", "56% wage premium roadmap"),
    ("✅", "Instant email confirmation"),
    ("📅", "June 18 · 11AM PT / 2PM ET"),
]:
    y1 += benefit_row(L2, y1, icon, txt, GOLD, W_CTR)

# Path 2 benefits
y2 = BENE_Y
for icon, txt in [
    ("⚡", "Private VIP Zoom Room"),
    ("🎤", "Exclusive Q&A with Scott"),
    ("📦", "Fast-track summit materials"),
    ("🎟", "Summit access (required first)"),
    ("📅", "June 18 · 11AM PT / 2PM ET"),
]:
    y2 += benefit_row(L3, y2, icon, txt, SILVER, W_SIDE)

# ── WHEN DOES IT APPEAR? ──
WHEN_Y = max(y1, y2, y3) + 12

def when_tag(cx, lx, rx, y, text, col):
    rr(lx+16, y, rx-16, y+28, r=6, fill=(255,255,255,8), outline=(col[0],col[1],col[2],50), ow=1)
    ct(cx, y+5, text, ft_divider, (col[0],col[1],col[2],160), "ct")

when_tag(C1, L1, R1, WHEN_Y, "Visible on main page before you register",    (130,205,80))
when_tag(C2, L2, R2, WHEN_Y, "Default path  ·  Click any 'Reserve' button", (238,175,0))
when_tag(C3, L3, R3, WHEN_Y, "Offered automatically 1.8s after free sign-up",(158,175,192))

# ── CTA ROW ──
CTA_Y = WHEN_Y + 44

# Path 3 CTA button
rr(L1+20, CTA_Y, R1-20, CTA_Y+42, r=10,
   fill=(130,205,80,22), outline=(130,205,80,180), ow=1)
ct(C1, CTA_Y+10, "Add VIP Pass →", ft_pill, (160,230,100), "ct")

# Path 1 CTA button (gold filled)
rr(L2+20, CTA_Y, R2-20, CTA_Y+42, r=10,
   fill=GOLD, outline=None)
ct(C2, CTA_Y+10, "Reserve My Free Seat →", ft_pill, (14,22,14), "ct")

# Path 2 CTA (shown as modal notice)
rr(L3+20, CTA_Y, R3-20, CTA_Y+42, r=10,
   fill=(158,175,192,18), outline=(158,175,192,120), ow=1)
ct(C3, CTA_Y+10, "Appears automatically after sign-up", ft_pill, SILVER, "ct")

# ── FOOTER ──
FOOT_Y = CARD_BOTTOM + 14
ct(W//2, FOOT_Y,    "All three paths include full summit access on June 18, 2026", ft_footer_s, MUTED, "ct")
ct(W//2, FOOT_Y+18, "VIP Pass is the only path visible before registration  ·  Fast-Track appears only after free sign-up", ft_footer_s, (80,100,78), "ct")

img.convert('RGB').save(OUTPUT, "PNG", quality=96)
print(f"Saved → {OUTPUT}")
