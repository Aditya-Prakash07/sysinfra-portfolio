import os
from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 1080
b_base = '/Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners'

def extract_bbox(p_path):
    im = Image.open(p_path).convert('RGBA')
    b = im.getbbox()
    return im.crop(b) if b else im

def render_banner(prod_items, out_path, mode='light', accent_rgb=(220, 38, 38), start_x=1240, line_density=28):
    if mode == 'dark':
        # Deep obsidian slate base
        canvas = Image.new('RGB', (W, H), (4, 6, 10))
        draw = ImageDraw.Draw(canvas)
        
        # 1. Subtle dark background gradient
        for x in range(W):
            t = x / float(W)
            r = int(4 + 6 * t)
            g = int(6 + 8 * t)
            b = int(10 + 14 * t)
            draw.line([(x, 0), (x, H)], fill=(r, g, b))
            
        # 2. Right background ambient glow
        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([W - 800, 80, W + 100, H - 80], fill=(accent_rgb[0] // 5, accent_rgb[1] // 5, accent_rgb[2] // 5, 80))
        glow = glow.filter(ImageFilter.GaussianBlur(120))
        canvas.paste(glow, (0, 0), glow)
        
        # 3. Top-to-bottom telemetry stripes on the right side
        stripes = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(stripes)
        spacing = 18
        dx = 240
        for i in range(line_density):
            x1 = start_x + i * spacing
            x2 = x1 - dx
            mid = line_density / 2.0
            dist = abs(i - mid) / mid
            alpha = int(210 * (1.0 - dist * dist))
            alpha = max(30, min(230, alpha))
            col = (accent_rgb[0], accent_rgb[1], accent_rgb[2], alpha)
            sdraw.line([(x1, -20), (x2, H + 20)], fill=col, width=3)
            
        stripes = stripes.filter(ImageFilter.GaussianBlur(1.0))
        canvas.paste(stripes, (0, 0), stripes)
        
        # 4. Background theatrical fade on left (ensures pure black/dark behind text)
        vig = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        vdraw = ImageDraw.Draw(vig)
        for x in range(1180):
            if x < 880:
                alpha = 255
            else:
                t = (x - 880) / float(1180 - 880)
                alpha = int(255 * (1.0 - t * t))
            vdraw.line([(x, 0), (x, H)], fill=(4, 6, 10, alpha))
            
        canvas.paste(vig, (0, 0), vig)
        
    else:
        # LIGHT MODE
        # Clean, executive studio gradient
        canvas = Image.new('RGB', (W, H), (255, 255, 255))
        draw = ImageDraw.Draw(canvas)
        
        for x in range(W):
            if x < 850:
                draw.line([(x, 0), (x, H)], fill=(255, 255, 255))
            else:
                t = (x - 850) / float(W - 850)
                r = int(255 - 12 * (t ** 1.3))
                g = int(255 - 10 * (t ** 1.3))
                b = int(255 - 7 * (t ** 1.3))
                draw.line([(x, 0), (x, H)], fill=(r, g, b))
                
        # Subtle ambient tint behind products in accent color
        tint = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        tdraw = ImageDraw.Draw(tint)
        tdraw.ellipse([W - 750, 100, W + 100, H - 100], fill=(accent_rgb[0], accent_rgb[1], accent_rgb[2], 18))
        tint = tint.filter(ImageFilter.GaussianBlur(140))
        canvas.paste(tint, (0, 0), tint)
        
        # Top-to-bottom telemetry stripes on the right side (Crisp, High Contrast, Structural)
        stripes = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(stripes)
        spacing = 18
        dx = 240
        for i in range(line_density):
            x1 = start_x + i * spacing
            x2 = x1 - dx
            mid = line_density / 2.0
            dist = abs(i - mid) / mid
            alpha = int(180 * (1.0 - dist * dist))
            alpha = max(35, min(210, alpha))
            col = (accent_rgb[0], accent_rgb[1], accent_rgb[2], alpha)
            sdraw.line([(x1, -20), (x2, H + 20)], fill=col, width=3)
            
        stripes = stripes.filter(ImageFilter.GaussianBlur(0.7))
        canvas.paste(stripes, (0, 0), stripes)
        
        # Pure white mask strictly covering left zone up to x=1180
        fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        fdraw = ImageDraw.Draw(fade)
        for x in range(1180):
            if x < 880:
                alpha = 255
            else:
                t = (x - 880) / float(1180 - 880)
                alpha = int(255 * (1.0 - t * t))
            fdraw.line([(x, 0), (x, H)], fill=(255, 255, 255, alpha))
            
        canvas.paste(fade, (0, 0), fade)
        
    # Place products with ground drop shadows
    for p_img, target_h, cx, by in prod_items:
        aspect = p_img.width / float(p_img.height)
        new_w = int(target_h * aspect)
        p = p_img.resize((new_w, target_h), Image.Resampling.LANCZOS)
        
        # 1. Wide ambient floor shadow
        amb_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        adraw = ImageDraw.Draw(amb_shadow)
        aw = int(new_w * 1.35)
        ah = int(new_w * 0.22)
        sh_color = (20, 30, 50, 45) if mode == 'light' else (0, 0, 0, 100)
        adraw.ellipse([cx - aw//2, by - ah//2 + 8, cx + aw//2, by + ah//2 + 8], fill=sh_color)
        amb_shadow = amb_shadow.filter(ImageFilter.GaussianBlur(16))
        canvas.paste(amb_shadow, (0, 0), amb_shadow)
        
        # 2. Tight contact occlusion shadow directly under base
        occ_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        odraw = ImageDraw.Draw(occ_shadow)
        ow = int(new_w * 0.96)
        oh = int(new_w * 0.09)
        occ_color = (15, 20, 30, 150) if mode == 'light' else (0, 0, 0, 210)
        odraw.ellipse([cx - ow//2, by - oh//2 + 3, cx + ow//2, by + oh//2 + 3], fill=occ_color)
        occ_shadow = occ_shadow.filter(ImageFilter.GaussianBlur(4))
        canvas.paste(occ_shadow, (0, 0), occ_shadow)
        
        # 3. Paste product cutout
        top_x = cx - new_w // 2
        top_y = by - target_h
        canvas.paste(p, (top_x, top_y), p)

    canvas.convert('RGB').save(out_path, 'JPEG', quality=96, optimize=True)
    print(f'Rendered [{mode.upper()}]: {out_path}')

# Load assets cleanly from b_base
nx3220 = extract_bbox(f"{b_base}/nx3220_clean.png")
nx5400 = extract_bbox(f"{b_base}/nx5400_clean.png")
nx5300 = extract_bbox(f"{b_base}/nx5300_clean.png")

st_compact = extract_bbox(f"{b_base}/st_compact_clean.png")
st500 = extract_bbox(f"{b_base}/st500_tactical.png")
st200 = extract_bbox(f"{b_base}/st200_clean.png")

atex_v710 = extract_bbox(f"{b_base}/atex_v710_clean.png")
nx5200 = extract_bbox(f"{b_base}/nx5200_clean.png")
hx400 = extract_bbox(f"{b_base}/hx400_clean.png")

repeater = extract_bbox(f"{b_base}/repeater_cropped.png")
nx5700 = extract_bbox(f"{b_base}/nx5700_clean.png")

# 1. DMR Radios (Crimson Red)
b1_items = [
    (nx3220, 560, 1340, 930),
    (nx5400, 680, 1550, 940),
    (nx5300, 620, 1760, 930),
]
render_banner(b1_items, f"{b_base}/banner1.jpg", mode='dark', accent_rgb=(225, 29, 72), start_x=1260)
render_banner(b1_items, f"{b_base}/banner1_light.jpg", mode='light', accent_rgb=(220, 38, 38), start_x=1260)

# 2. PoC & Cellular (Electric Telecom Royal Blue)
b2_items = [
    (st_compact, 510, 1330, 930),
    (st500, 660, 1540, 940),
    (st200, 600, 1750, 930),
]
render_banner(b2_items, f"{b_base}/banner2.jpg", mode='dark', accent_rgb=(37, 99, 235), start_x=1260)
render_banner(b2_items, f"{b_base}/banner2_light.jpg", mode='light', accent_rgb=(29, 78, 216), start_x=1260)

# 3. ATEX Intrinsically Safe (Safety Flame Amber-Orange)
b3_items = [
    (nx5200, 560, 1335, 930),
    (atex_v710, 660, 1545, 940),
    (hx400, 590, 1755, 930),
]
render_banner(b3_items, f"{b_base}/banner3.jpg", mode='dark', accent_rgb=(249, 115, 22), start_x=1260)
render_banner(b3_items, f"{b_base}/banner3_light.jpg", mode='light', accent_rgb=(234, 88, 12), start_x=1260)

# 4. Turnkey Infrastructure (Tactical Emerald Green)
b4_items = [
    (repeater, 310, 1490, 870),
    (nx5700, 280, 1700, 940),
]
render_banner(b4_items, f"{b_base}/banner4.jpg", mode='dark', accent_rgb=(16, 185, 129), start_x=1260)
render_banner(b4_items, f"{b_base}/banner4_light.jpg", mode='light', accent_rgb=(5, 150, 105), start_x=1260)

os.system('cp /Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners/* /Users/adityaprakash/Sites/sanchar-telesystems/storage/app/public/media/banners/ 2>/dev/null || true')
print('=== COMPLETED V2 BANNERS GENERATION AND SYNC ===')
