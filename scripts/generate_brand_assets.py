#!/usr/bin/env python3
"""
Open Gaming Forensic Lab (OGFL) - Production Brand Asset Generator
Generates YouTube-certified brand assets adhering strictly to:
- UI_DESIGN_SPEC.md (Forensic Minimalism & Industrial CAD Precision)
- YouTube Safe Area Dimensions (2560x1440 Banner, 1546x423 Center Safe Zone)
- 800x800 Avatar & 150x150 Transparent Watermark
- Episode Thumbnails (16:9 1920x1080)
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND_DIR = os.path.join(BASE_DIR, "assets", "brand")
THUMB_DIR = os.path.join(BRAND_DIR, "thumbnails")
os.makedirs(THUMB_DIR, exist_ok=True)

# Color Palette (from UI_DESIGN_SPEC.md)
GRAPHITE_NOIR = (8, 9, 12)          # #08090C
GRAPHITE_SURFACE = (18, 22, 31)     # #12161F
CYAN_GLOW = (0, 240, 255)           # #00F0FF (Forensic Cyan)
ACID_CRIMSON = (255, 42, 85)        # #FF2A55 (Alert Acid Red)
COLD_WHITE = (244, 246, 248)        # #F4F6F8
CAD_LINE_DIM = (25, 45, 65)         # Grid lines
TEXT_MUTED = (140, 160, 185)

MONO_FONT_PATH = "/System/Library/Fonts/SFNSMono.ttf"
SANS_FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def generate_avatar():
    """Generates 800x800 high-precision forensic reticle avatar."""
    size = 800
    img = Image.new("RGBA", (size, size), GRAPHITE_NOIR + (255,))
    draw = ImageDraw.Draw(img)

    # 1. Subtle CAD grid
    grid_step = 40
    for x in range(0, size, grid_step):
        draw.line([(x, 0), (x, size)], fill=(0, 240, 255, 18), width=1)
    for y in range(0, size, grid_step):
        draw.line([(0, y), (size, y)], fill=(0, 240, 255, 18), width=1)

    cx, cy = size // 2, size // 2 - 25

    # 2. Concentric Forensic Reticle Rings
    radii = [320, 270, 220, 160, 100]
    for r in radii:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 240, 255, 60), width=1)

    # Segmented Main Ring
    r_main = 270
    draw.arc([cx - r_main, cy - r_main, cx + r_main, cy + r_main], start=15, end=75, fill=CYAN_GLOW + (255,), width=3)
    draw.arc([cx - r_main, cy - r_main, cx + r_main, cy + r_main], start=105, end=165, fill=CYAN_GLOW + (255,), width=3)
    draw.arc([cx - r_main, cy - r_main, cx + r_main, cy + r_main], start=195, end=255, fill=CYAN_GLOW + (255,), width=3)
    draw.arc([cx - r_main, cy - r_main, cx + r_main, cy + r_main], start=285, end=345, fill=CYAN_GLOW + (255,), width=3)

    # Crimson Warning Arcs
    r_alert = 220
    draw.arc([cx - r_alert, cy - r_alert, cx + r_alert, cy + r_alert], start=-35, end=35, fill=ACID_CRIMSON + (255,), width=2)
    draw.arc([cx - r_alert, cy - r_alert, cx + r_alert, cy + r_alert], start=145, end=215, fill=ACID_CRIMSON + (255,), width=2)

    # Crosshairs & Sub-millimeter Ticks
    draw.line([(cx - 350, cy), (cx + 350, cy)], fill=CYAN_GLOW + (120,), width=1)
    draw.line([(cx, cy - 350), (cx, cy + 350)], fill=CYAN_GLOW + (120,), width=1)

    for deg in range(0, 360, 10):
        rad = math.radians(deg)
        length = 12 if deg % 30 == 0 else 6
        color = CYAN_GLOW + (200,) if deg % 30 == 0 else (0, 240, 255, 70)
        x1 = cx + (r_main - length) * math.cos(rad)
        y1 = cy + (r_main - length) * math.sin(rad)
        x2 = cx + r_main * math.cos(rad)
        y2 = cy + r_main * math.sin(rad)
        draw.line([(x1, y1), (x2, y2)], fill=color, width=1)

    # Central Forensic Diamond & Sensor Node
    d = 45
    draw.polygon([(cx, cy - d), (cx + d, cy), (cx, cy + d), (cx - d, cy)], outline=CYAN_GLOW + (255,), fill=(0, 240, 255, 30))
    draw.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=ACID_CRIMSON + (255,))

    # Corner brackets (Viewfinder frame)
    bracket_len = 50
    margin = 50
    corners = [
        (margin, margin, 1, 1),
        (size - margin, margin, -1, 1),
        (margin, size - margin, 1, -1),
        (size - margin, size - margin, -1, -1)
    ]
    for x, y, dx, dy in corners:
        draw.line([(x, y), (x + dx * bracket_len, y)], fill=CYAN_GLOW + (200,), width=2)
        draw.line([(x, y), (x, y + dy * bracket_len)], fill=CYAN_GLOW + (200,), width=2)

    # Typography
    font_bold = get_font(MONO_FONT_PATH, 76)
    font_sub = get_font(MONO_FONT_PATH, 22)
    font_micro = get_font(MONO_FONT_PATH, 14)

    # Monolithic OGFL
    text_logo = "OGFL"
    bbox = font_bold.getbbox(text_logo)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy + 195), text_logo, font=font_bold, fill=COLD_WHITE + (255,))

    # Sub-label
    sub_text = "OPEN GAMING FORENSIC LAB"
    bbox_sub = font_sub.getbbox(sub_text)
    tw_sub = bbox_sub[2] - bbox_sub[0]
    draw.text((cx - tw_sub // 2, cy + 285), sub_text, font=font_sub, fill=CYAN_GLOW + (255,))

    # Telemetry Footnote
    foot_text = "SYS: ACTIVE // CALIBRATION 2026.10 // 0xFA99"
    bbox_f = font_micro.getbbox(foot_text)
    tw_f = bbox_f[2] - bbox_f[0]
    draw.text((cx - tw_f // 2, size - 42), foot_text, font=font_micro, fill=(100, 130, 160, 200))

    out_path = os.path.join(BRAND_DIR, "channel_avatar_800x800.png")
    img.save(out_path, "PNG")
    print(f"Generated Avatar: {out_path}")

def generate_watermark():
    """Generates 150x150 transparent watermark / subscribe button."""
    size = 150
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background rounded container with high contrast border
    draw.rounded_rectangle([4, 4, size - 4, size - 4], radius=12, fill=(8, 9, 12, 235), outline=CYAN_GLOW + (255,), width=2)

    # Concentric reticle
    cx, cy = size // 2, size // 2 - 12
    r = 38
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 240, 255, 140), width=1)
    draw.line([(cx - 48, cy), (cx + 48, cy)], fill=CYAN_GLOW + (180,), width=1)
    draw.line([(cx, cy - 48), (cx, cy + 48)], fill=CYAN_GLOW + (180,), width=1)

    # Laser core
    draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=ACID_CRIMSON + (255,))

    font_w = get_font(MONO_FONT_PATH, 24)
    font_sub = get_font(MONO_FONT_PATH, 11)

    draw.text((cx - 32, cy + 44), "OGFL", font=font_w, fill=COLD_WHITE + (255,))
    draw.text((cx - 39, cy + 70), "AUDIT PASS", font=font_sub, fill=CYAN_GLOW + (255,))

    out_path = os.path.join(BRAND_DIR, "channel_watermark_150x150.png")
    img.save(out_path, "PNG")
    print(f"Generated Watermark: {out_path}")

def generate_banner():
    """
    Generates YouTube Standard Banner (2560x1440).
    Safe Zone: 1546 x 423 px centered (X: 507 -> 2053, Y: 508 -> 931).
    All essential branding, titles, and icons are strictly kept within the Safe Zone.
    The outer canvas is richly detailed with exploded CAD blueprints and telemetry.
    """
    W, H = 2560, 1440
    img = Image.new("RGBA", (W, H), GRAPHITE_NOIR + (255,))

    # Blend generated concept image as high-tech backdrop
    concept_path = os.path.join(BRAND_DIR, "ogfl_banner_concept.jpg")
    if os.path.exists(concept_path):
        bg = Image.open(concept_path).convert("RGBA")
        # Resize to fill banner width
        bg = bg.resize((W, int(W * 9 / 16)), Image.Resampling.LANCZOS)
        # Center crop / paste
        paste_y = (H - bg.height) // 2
        img.paste(bg, (0, paste_y))

    # Add dark vignette / gradient to ensure text readability in safe zone
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d_overlay = ImageDraw.Draw(overlay)

    # Safe Zone Y coords: 508 to 931
    safe_y1, safe_y2 = 508, 931
    safe_x1, safe_x2 = 507, 2053

    # Darken safe area with semi-transparent frosted bar
    d_overlay.rectangle([0, safe_y1 - 40, W, safe_y2 + 40], fill=(8, 9, 12, 190))
    # Border lasers for safe area
    d_overlay.line([(0, safe_y1 - 40), (W, safe_y1 - 40)], fill=(0, 240, 255, 60), width=1)
    d_overlay.line([(0, safe_y2 + 40), (W, safe_y2 + 40)], fill=(0, 240, 255, 60), width=1)

    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Fonts
    f_badge = get_font(MONO_FONT_PATH, 16)
    f_title = get_font(MONO_FONT_PATH, 68)
    f_slogan = get_font(MONO_FONT_PATH, 28)
    f_telemetry = get_font(MONO_FONT_PATH, 16)
    f_specs = get_font(MONO_FONT_PATH, 14)

    # Content within Safe Area (507 to 2053)
    content_x = safe_x1 + 60
    base_y = safe_y1 + 55

    # Badge: CERTIFIED FORENSIC INDEPENDENCE
    badge_text = "[ CERTIFIED FORENSIC INDEPENDENCE // ZERO GACHA SPONSORSHIPS ]"
    draw.text((content_x, base_y), badge_text, font=f_badge, fill=CYAN_GLOW + (255,))

    # Channel Title
    title_text = "OPEN GAMING FORENSIC LAB"
    draw.text((content_x, base_y + 35), title_text, font=f_title, fill=COLD_WHITE + (255,))

    # Slogan / North Star
    slogan_text = "Deconstructing the $100 Billion Mobile Illusion."
    draw.text((content_x, base_y + 125), slogan_text, font=f_slogan, fill=ACID_CRIMSON + (255,))

    # Pillars
    pillar_text = "ALGORITHM AUDITING  •  PATENT DECOMPILATION  •  ETHICAL INDIE ANCHOR"
    draw.text((content_x, base_y + 185), pillar_text, font=f_telemetry, fill=(180, 205, 230, 255))

    # Right side HUD Telemetry in Safe Zone
    hud_x = safe_x2 - 460
    draw.rounded_rectangle([hud_x, base_y, hud_x + 420, base_y + 240], radius=8, fill=(12, 16, 24, 210), outline=CYAN_GLOW + (180,), width=1)

    draw.text((hud_x + 20, base_y + 18), "TELEMETRY DOCKET: 2026-Q4", font=f_specs, fill=CYAN_GLOW + (255,))
    draw.line([(hud_x + 20, base_y + 40), (hud_x + 400, base_y + 40)], fill=(0, 240, 255, 60), width=1)

    specs = [
        ("TARGET JURISDICTION", "USPTO / WIPO / FTC"),
        ("METHODOLOGY", "REVERSE COMPILATION & SEC 10-K"),
        ("AUDITED PATENTS", "US20160001182A1 / US20170259177A1"),
        ("EVIDENCE VAULT", "OPEN SOURCE / GITHUB SHA-256"),
        ("SCHEDULE", "BI-WEEKLY 4K INVESTIGATIONS"),
    ]
    cur_y = base_y + 55
    for label, val in specs:
        draw.text((hud_x + 20, cur_y), label, font=f_specs, fill=TEXT_MUTED + (255,))
        draw.text((hud_x + 230, cur_y), val, font=f_specs, fill=COLD_WHITE + (255,))
        cur_y += 32

    # Draw Safe Area Corner Alignment Markers
    corner_size = 20
    for cx, cy in [(safe_x1, safe_y1), (safe_x2, safe_y1), (safe_x1, safe_y2), (safe_x2, safe_y2)]:
        draw.line([(cx - corner_size, cy), (cx + corner_size, cy)], fill=CYAN_GLOW + (100,), width=1)
        draw.line([(cx, cy - corner_size), (cx, cy + corner_size)], fill=CYAN_GLOW + (100,), width=1)

    out_path = os.path.join(BRAND_DIR, "channel_banner_2560x1440.png")
    img.save(out_path, "PNG")
    print(f"Generated Banner: {out_path}")

def generate_thumbnails():
    """Generates 1920x1080 high CTR Master Thumbnails for EP01, EP02, EP03."""
    episodes = [
        {
            "filename": "ep01_thumbnail_master.jpg",
            "kicker": "USPTO US20160001182A1 EXPOSED",
            "main_headline": "RIGGED BY\nPATENT",
            "sub": "THE $100B MATCHMAKING ILLUSION",
            "alert": "DYNAMIC DIFFICULTY DECOMPILED",
            "color": ACID_CRIMSON
        },
        {
            "filename": "ep02_thumbnail_master.jpg",
            "kicker": "PRNG SEED REVERSE AUDIT",
            "main_headline": "GACHA ODDS\nARE A LIE",
            "sub": "DECOMPILING THE PITY SYSTEM",
            "alert": "PULL PROBABILITY DECAY DETECTED",
            "color": CYAN_GLOW
        },
        {
            "filename": "ep03_thumbnail_master.jpg",
            "kicker": "BLOOMBERG CAPITAL TOPO",
            "main_headline": "THE $99.99\nTRAP",
            "sub": "HOW MOBILE CASINOS BYPASS LAWS",
            "alert": "SEC 10-K & FTC ARBITRAGE EXPOSED",
            "color": (255, 170, 0) # Warning Amber
        }
    ]

    concept_thumb_path = os.path.join(BRAND_DIR, "ogfl_thumb_concept.jpg")
    base_bg = None
    if os.path.exists(concept_thumb_path):
        base_bg = Image.open(concept_thumb_path).convert("RGBA").resize((1920, 1080), Image.Resampling.LANCZOS)

    for ep in episodes:
        W, H = 1920, 1080
        if base_bg:
            img = base_bg.copy()
        else:
            img = Image.new("RGBA", (W, H), GRAPHITE_NOIR + (255,))

        # Overlay high-contrast vignette on right side for punchy typography
        grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d_grad = ImageDraw.Draw(grad)
        # Gradient on right side (from x=900 to 1920)
        for x in range(850, 1920):
            alpha = int(220 * ((x - 850) / (1920 - 850)) ** 1.3)
            d_grad.line([(x, 0), (x, H)], fill=(8, 9, 12, alpha), width=1)

        img = Image.alpha_composite(img, grad)
        draw = ImageDraw.Draw(img)

        f_kicker = get_font(MONO_FONT_PATH, 26)
        f_headline = get_font(MONO_FONT_PATH, 110)
        f_sub = get_font(MONO_FONT_PATH, 34)
        f_badge = get_font(MONO_FONT_PATH, 22)

        tx = 1050
        ty = 160

        # Kicker Badge
        kicker_text = f"[ {ep['kicker']} ]"
        draw.text((tx, ty), kicker_text, font=f_kicker, fill=CYAN_GLOW + (255,))

        # Main Headline (Two lines, massive weight)
        lines = ep['main_headline'].split("\n")
        line_y = ty + 60
        for line in lines:
            # Drop shadow
            draw.text((tx + 4, line_y + 4), line, font=f_headline, fill=(0, 0, 0, 255))
            draw.text((tx, line_y), line, font=f_headline, fill=COLD_WHITE + (255,))
            line_y += 120

        # Sub-headline
        draw.text((tx, line_y + 20), ep['sub'], font=f_sub, fill=ep['color'] + (255,))

        # Alert Tag box
        box_y = line_y + 90
        bbox_alert = f_badge.getbbox(ep['alert'])
        aw = bbox_alert[2] - bbox_alert[0]
        draw.rounded_rectangle([tx, box_y, tx + aw + 40, box_y + 55], radius=6, fill=(18, 24, 34, 240), outline=ep['color'] + (255,), width=2)
        draw.text((tx + 20, box_y + 14), ep['alert'], font=f_badge, fill=COLD_WHITE + (255,))

        # Bottom Forensic Stamp
        draw.text((tx, H - 100), "OPEN GAMING FORENSIC LAB // CASE DOCKET", font=f_kicker, fill=(110, 140, 170, 200))

        out_path = os.path.join(THUMB_DIR, ep['filename'])
        img.convert("RGB").save(out_path, "JPEG", quality=96)
        print(f"Generated Thumbnail: {out_path}")

def generate_svg_logo():
    """Generates infinite-resolution SVG logo for vector CAD workflows."""
    svg_code = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#08090C" />
  <defs>
    <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00F0FF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background Glow -->
  <circle cx="400" cy="360" r="320" fill="url(#cyanGlow)" />
  <!-- Grid -->
  <g stroke="#00F0FF" stroke-opacity="0.08" stroke-width="1">
    <line x1="80" y1="360" x2="720" y2="360" />
    <line x1="400" y1="40" x2="400" y2="680" />
    <circle cx="400" cy="360" r="100" fill="none" />
    <circle cx="400" cy="360" r="220" fill="none" stroke-dasharray="8 8" />
    <circle cx="400" cy="360" r="280" fill="none" />
  </g>
  <!-- Main Laser Ring -->
  <circle cx="400" cy="360" r="280" fill="none" stroke="#00F0FF" stroke-width="3" stroke-dasharray="140 30" />
  <!-- Warning Red Arc -->
  <path d="M 180 360 A 220 220 0 0 1 620 360" fill="none" stroke="#FF2A55" stroke-width="3" />
  <!-- Center Sensor Diamond -->
  <polygon points="400,310 450,360 400,410 350,360" fill="rgba(0,240,255,0.15)" stroke="#00F0FF" stroke-width="2" />
  <circle cx="400" cy="360" r="8" fill="#FF2A55" />
  <!-- Typography -->
  <text x="400" y="580" text-anchor="middle" font-family="SF Mono, JetBrains Mono, monospace" font-size="78" font-weight="800" fill="#F4F6F8" letter-spacing="8">OGFL</text>
  <text x="400" y="630" text-anchor="middle" font-family="SF Mono, JetBrains Mono, monospace" font-size="20" font-weight="600" fill="#00F0FF" letter-spacing="4">OPEN GAMING FORENSIC LAB</text>
  <text x="400" y="730" text-anchor="middle" font-family="SF Mono, JetBrains Mono, monospace" font-size="13" fill="#6482A0" letter-spacing="2">DECONSTRUCTING THE $100B MOBILE ILLUSION</text>
</svg>'''
    out_path = os.path.join(BRAND_DIR, "ogfl_logo.svg")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg_code)
    print(f"Generated Vector SVG: {out_path}")

if __name__ == "__main__":
    generate_avatar()
    generate_watermark()
    generate_banner()
    generate_thumbnails()
    generate_svg_logo()
    print("ALL PRODUCTION BRAND ASSETS SUCCESSFULLY GENERATED.")
