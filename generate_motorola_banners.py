import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

WIDTH = 1920
HEIGHT = 1080

def get_font(name, size, fallback="Helvetica"):
    paths = [
        f"/System/Library/Fonts/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/System/Library/Fonts/Supplemental/{name}.ttf",
        f"/System/Library/Fonts/{fallback}.ttc",
        f"/Library/Fonts/{fallback}.ttf"
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_card_tag = get_font("Menlo", 11)
font_card_title = get_font("HelveticaNeue", 20, "Arial")
font_card_sub = get_font("Menlo", 13)
font_telemetry = get_font("Menlo", 12)

def create_dark_slate_canvas(glow_center=(1450, 520), glow_color=(0, 160, 255), glow_radius=650):
    # Deep obsidian navy slate base
    base = Image.new("RGBA", (WIDTH, HEIGHT), (6, 11, 20, 255))
    draw = ImageDraw.Draw(base)
    
    # Left-to-right subtle linear gradient (keeps left zone dark & readable for HTML banner text)
    for x in range(WIDTH):
        factor = x / WIDTH
        r = int(5 + 9 * factor)
        g = int(9 + 13 * factor)
        b = int(18 + 26 * factor)
        draw.line([(x, 0), (x, HEIGHT)], fill=(r, g, b, 255))
        
    # Radial ambient spotlight behind product
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    cx, cy = glow_center
    for r in range(glow_radius, 0, -12):
        alpha = int(40 * (1.0 - (r / glow_radius)**1.4))
        gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(glow_color[0], glow_color[1], glow_color[2], alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    base = Image.alpha_composite(base, glow)
    
    # Precision telemetry grid on the right side
    grid = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    griddraw = ImageDraw.Draw(grid)
    for x in range(880, WIDTH, 64):
        griddraw.line([(x, 0), (x, HEIGHT)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, HEIGHT, 64):
        griddraw.line([(880, y), (WIDTH, y)], fill=(255, 255, 255, 8), width=1)
        
    # Technical coordinate ticks & crosshairs
    for (px, py) in [(1050, 220), (1700, 220), (1150, 750), (1750, 750)]:
        griddraw.line([(px - 8, py), (px + 8, py)], fill=(0, 229, 255, 80), width=1)
        griddraw.line([(px, py - 8), (px, py + 8)], fill=(0, 229, 255, 80), width=1)
        
    # Concentric orbital telemetry rings (completely intact circles)
    for rad in [280, 420, 560]:
        griddraw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(0, 229, 255, 22), width=1)
        
    base = Image.alpha_composite(base, grid)
    return base

def draw_pedestal(base, y_start=820, y_end=1040, center_x=1440, width=860, glow_col=(0, 229, 255)):
    ped = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(ped)
    
    x0 = center_x - width // 2
    x1 = center_x + width // 2
    
    # Perspective trapezoid stage
    polygon = [
        (x0 + 70, y_start),
        (x1 - 70, y_start),
        (x1 + 100, y_end),
        (x0 - 100, y_end)
    ]
    draw.polygon(polygon, fill=(12, 19, 32, 230))
    
    # Glowing rim line on top edge
    draw.line([(x0 + 70, y_start), (x1 - 70, y_start)], fill=(glow_col[0], glow_col[1], glow_col[2], 180), width=2)
    draw.line([(x0 + 70, y_start + 2), (x1 - 70, y_start + 2)], fill=(0, 140, 255, 90), width=3)
    
    # Radial surface glow on stage
    for r in range(width // 2, 0, -25):
        alpha = int(35 * (1.0 - r / (width // 2)))
        draw.ellipse([center_x - r, y_start - 35, center_x + r, y_start + 45], fill=(glow_col[0], glow_col[1], glow_col[2], alpha))
        
    ped = ped.filter(ImageFilter.GaussianBlur(1))
    return Image.alpha_composite(base, ped)

def draw_spec_card(img, x, y, title, subtitle, tag="● LIVE SYSTEM", width=360, height=78):
    card = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    
    # Frosted glass panel with rounded corners and subtle border
    draw.rounded_rectangle([x, y, x + width, y + height], radius=12, fill=(10, 18, 30, 215), outline=(255, 255, 255, 45), width=1)
    
    # Left accent beacon bar
    draw.rounded_rectangle([x, y + 8, x + 3, y + height - 8], radius=2, fill=(0, 229, 255, 230))
    
    # Tag / Live Indicator
    draw.text((x + 16, y + 10), tag, fill=(16, 185, 129, 240) if "●" in tag else (0, 229, 255, 220), font=font_card_tag)
    
    # Card Headline
    draw.text((x + 16, y + 26), title, fill=(255, 255, 255, 245), font=font_card_title)
    
    # Card Subtitle
    draw.text((x + 16, y + 50), subtitle, fill=(148, 163, 184, 220), font=font_card_sub)
    
    return Image.alpha_composite(img, card)

def place_product_with_reflection(canvas, product_path, dest_x, dest_y, target_h, flip_reflection=True):
    if not os.path.exists(product_path):
        print("Missing:", product_path)
        return canvas
        
    prod = Image.open(product_path).convert("RGBA")
    w, h = prod.size
    aspect = w / h
    new_h = target_h
    new_w = int(new_h * aspect)
    prod = prod.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Contact shadow on pedestal
    shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sx = dest_x + new_w // 2
    sy = dest_y + new_h - 12
    sdraw.ellipse([sx - int(new_w * 0.45), sy - 14, sx + int(new_w * 0.45), sy + 22], fill=(0, 0, 0, 210))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    canvas = Image.alpha_composite(canvas, shadow)
    
    # Inverted reflection fading down
    if flip_reflection:
        refl = prod.transpose(Image.FLIP_TOP_BOTTOM)
        refl_h = int(new_h * 0.35)
        refl = refl.crop((0, 0, new_w, refl_h))
        
        alpha_mask = Image.new("L", (new_w, refl_h), 0)
        for ry in range(refl_h):
            val = int(85 * (1.0 - (ry / refl_h)**0.85))
            for rx in range(new_w):
                orig_a = refl.getpixel((rx, ry))[3]
                alpha_mask.putpixel((rx, ry), min(orig_a, val))
        refl.putalpha(alpha_mask)
        canvas.paste(refl, (dest_x, dest_y + new_h - 8), refl)
        
    # Product paste
    canvas.paste(prod, (dest_x, dest_y), prod)
    return canvas

# =========================================================================
# BANNER 1: Mission-Critical Tactical Transceivers (NX-5200 & NX-5300)
# =========================================================================
print("Generating Banner 1: Tactical Defense Transceivers...")
b1 = create_dark_slate_canvas(glow_center=(1440, 520), glow_color=(0, 160, 255), glow_radius=680)
b1 = draw_pedestal(b1, y_start=820, y_end=1040, center_x=1440, width=880)

# Authentic Kenwood NX-5200 and NX-5300 Handheld Transceivers
b1 = place_product_with_reflection(b1, "public/storage/media/products/1559993134_nx5200.jpg", dest_x=1120, dest_y=230, target_h=610)
b1 = place_product_with_reflection(b1, "public/storage/media/products/1559996280_nx5300.jpg", dest_x=1380, dest_y=240, target_h=600)

# Motorola-style technical spec callout cards
b1 = draw_spec_card(b1, 1480, 160, "KENWOOD NX-5200 / NX-5300", "MULTI-DIGITAL P25 & DMR TIER III", tag="● MISSION READY", width=380, height=78)
b1 = draw_spec_card(b1, 1540, 390, "MIL-STD-810H & IP68", "SUBMERSIBLE 2M • ULTRA-RUGGED", tag="● CERTIFIED", width=340, height=78)
b1 = draw_spec_card(b1, 1420, 880, "AES-256 ENCRYPTION", "HARDWARE-SECURED VOICE & GPS", tag="● TACTICAL SECURE", width=360, height=78)


# =========================================================================
# BANNER 2: Enterprise Mobile Fleet & Command Consoles (NX-3720 & Handheld)
# =========================================================================
print("Generating Banner 2: Enterprise Fleet Dispatch Consoles...")
b2 = create_dark_slate_canvas(glow_center=(1440, 520), glow_color=(0, 210, 255), glow_radius=680)
b2 = draw_pedestal(b2, y_start=820, y_end=1040, center_x=1440, width=880, glow_col=(0, 210, 255))

# Real Kenwood Mobile Transceiver & Heavy-duty Mic + Tactical Handheld
b2 = place_product_with_reflection(b2, "public/storage/media/products/1559996863_nx3720_mt.jpg", dest_x=1140, dest_y=380, target_h=460)
b2 = place_product_with_reflection(b2, "public/storage/media/products/1559989450_nx3220_ht.jpg", dest_x=1520, dest_y=250, target_h=590)

b2 = draw_spec_card(b2, 1450, 160, "KENWOOD NX-3720 MOBILE", "50W HIGH-POWER RF TRANSCEIVER", tag="● FLEET DISPATCH", width=380, height=78)
b2 = draw_spec_card(b2, 1520, 380, "INTEGRATED GPS & AVL", "REAL-TIME FLEET TELEMETRY", tag="● LIVE TRACKING", width=340, height=78)
b2 = draw_spec_card(b2, 1380, 880, "CRITICAL VOICE & DATA", "SUB-300MS CALL SETUP • FULL DUPLEX", tag="● ZERO-INTERRUPT", width=370, height=78)


# =========================================================================
# BANNER 3: Nationwide PoC & 5G Mission-Critical Broadband (ST-500R 5G & ST-920M)
# =========================================================================
print("Generating Banner 3: 5G & Broadband PoC Systems...")
b3 = create_dark_slate_canvas(glow_center=(1440, 520), glow_color=(56, 189, 248), glow_radius=680)
b3 = draw_pedestal(b3, y_start=820, y_end=1040, center_x=1440, width=880, glow_col=(56, 189, 248))

# Real Sanchar STELE ST-500R 5G smart terminal, ST-920M vehicle console, ST-32R
b3 = place_product_with_reflection(b3, "public/storage/media/products/1707161461_ST-920M_ttt.png", dest_x=1080, dest_y=400, target_h=440)
b3 = place_product_with_reflection(b3, "public/storage/media/products/1707159410_ST-500R_5g.png", dest_x=1400, dest_y=240, target_h=600)
b3 = place_product_with_reflection(b3, "public/storage/media/products/1707158524_ST-32R_ttt.png", dest_x=1600, dest_y=320, target_h=520)

b3 = draw_spec_card(b3, 1440, 160, "STELE ST-500R 5G & ST-920M", "3GPP MISSION-CRITICAL PTT (MC-PTT)", tag="● 5G NATIONWIDE", width=380, height=78)
b3 = draw_spec_card(b3, 1540, 390, "CARRIER-GRADE BROADBAND", "PAN-INDIA GROUP DISPATCH & SOS", tag="● LIVE GIS MAPPING", width=350, height=78)
b3 = draw_spec_card(b3, 1380, 880, "INSTANT TALKGROUP ACCESS", "UNLIMITED DISTANCE SECURE COMMS", tag="● MISSION READY", width=360, height=78)


# =========================================================================
# BANNER 4: Indian Railways Transit & High-Speed Cab Radios (Teltronic & NXR-1800)
# =========================================================================
print("Generating Banner 4: Indian Railways Cab Radio & Telemetry...")
b4 = create_dark_slate_canvas(glow_center=(1440, 520), glow_color=(0, 180, 255), glow_radius=700)

# Blend Sanchar's actual Indian Railways locomotive corridor photo into the right side with deep dark fade
if os.path.exists("public/storage/media/products/1709450016_LTTE-R.jpeg"):
    rail_bg = Image.open("public/storage/media/products/1709450016_LTTE-R.jpeg").convert("RGBA")
    # Resize and crop to right half
    rw, rh = rail_bg.size
    rail_bg = rail_bg.resize((1200, int(1200 * rh / rw)), Image.Resampling.LANCZOS)
    if rail_bg.height < HEIGHT:
        rail_bg = rail_bg.resize((int(HEIGHT * rail_bg.width / rail_bg.height), HEIGHT), Image.Resampling.LANCZOS)
    rail_bg = rail_bg.crop((0, 0, 1100, HEIGHT))
    
    # Grade to deep navy cinematic tone
    enhancer = ImageEnhance.Color(rail_bg)
    rail_bg = enhancer.enhance(0.4)
    bright = ImageEnhance.Brightness(rail_bg)
    rail_bg = bright.enhance(0.35)
    
    # Mask to fade from x: 850 (0% opacity) to 1200 (60% opacity)
    fade_mask = Image.new("L", (rail_bg.width, HEIGHT), 0)
    for fx in range(rail_bg.width):
        alpha = int(90 * min(1.0, max(0.0, (fx - 150) / 450)))
        for fy in range(HEIGHT):
            fade_mask.putpixel((fx, fy), alpha)
    rail_bg.putalpha(fade_mask)
    b4.paste(rail_bg, (820, 0), rail_bg)

b4 = draw_pedestal(b4, y_start=820, y_end=1040, center_x=1440, width=880)

# Docked Kenwood NXR-1800 Base Station Repeater and Cab Radio Console
b4 = place_product_with_reflection(b4, "public/storage/media/products/1710417916_NXR-1800.jpg", dest_x=1080, dest_y=380, target_h=460)
b4 = place_product_with_reflection(b4, "public/storage/media/products/1710415993_NX-1800.png", dest_x=1440, dest_y=360, target_h=480)

b4 = draw_spec_card(b4, 1420, 160, "TELTRONIC CAB RADIOS & NXR-1800", "EN 50155 RAILWAY COMPLIANT TELEMETRY", tag="● RAILWAY CERTIFIED", width=400, height=78)
b4 = draw_spec_card(b4, 1500, 380, "GROUND-TO-TRAIN VOICE & DATA", "CONTINUOUS 5G / LTE-R TRANSIT", tag="● KAVACH READY", width=360, height=78)
b4 = draw_spec_card(b4, 1360, 880, "KENWOOD NXR-1800 BASE REPEATER", "MISSION-CRITICAL HIGH-SPEED CORRIDOR", tag="● ACTIVE CONTROL", width=380, height=78)

# =========================================================================
# SAVE TO BOTH public/storage/media/banners/ AND storage/app/public/media/banners/
# =========================================================================
dest_dirs = [
    "public/storage/media/banners",
    "storage/app/public/media/banners"
]

for d in dest_dirs:
    os.makedirs(d, exist_ok=True)
    
    # Banner 1 (Save as both jpg and png)
    b1_rgb = b1.convert("RGB")
    b1_rgb.save(os.path.join(d, "banner1.jpg"), "JPEG", quality=95, subsampling=0)
    b1.save(os.path.join(d, "banner1.png"), "PNG", optimize=True)
    
    # Banner 2
    b2_rgb = b2.convert("RGB")
    b2_rgb.save(os.path.join(d, "banner2.jpg"), "JPEG", quality=95, subsampling=0)
    
    # Banner 3
    b3_rgb = b3.convert("RGB")
    b3_rgb.save(os.path.join(d, "banner3.jpg"), "JPEG", quality=95, subsampling=0)
    
    # Banner 4
    b4_rgb = b4.convert("RGB")
    b4_rgb.save(os.path.join(d, "banner4.jpg"), "JPEG", quality=95, subsampling=0)

print("All 4 Motorola-caliber banners successfully generated and deployed!")
