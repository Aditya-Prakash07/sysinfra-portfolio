import os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

W, H = 1920, 1080
p_base = '/Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/products'
b_base = '/Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners'

def extract_bbox(p_path):
    im = Image.open(p_path).convert('RGBA')
    b = im.getbbox()
    return im.crop(b) if b else im

def make_banner_dark(prod_items, out_path, accent_rgb=(225, 29, 72), line_density=28, start_x=940):
    canvas = Image.new('RGB', (W, H), (4, 6, 10))
    draw = ImageDraw.Draw(canvas)
    
    # Subtle dark background gradient
    for y in range(H):
        t = y / float(H)
        r = int(3 + 5 * t)
        g = int(4 + 7 * t)
        b = int(7 + 12 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
        
    # Right background ambient spotlight
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([W - 1050, 40, W + 150, H - 40], fill=(16, 24, 38, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    canvas.paste(glow, (0, 0), glow)
    
    # Motorola signature top-to-bottom telemetry stripes
    stripes = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(stripes)
    spacing = 17
    dx = 260
    
    for i in range(line_density):
        x1 = start_x + i * spacing
        x2 = x1 - dx
        mid = line_density / 2.0
        dist = abs(i - mid) / mid
        alpha = int(220 * (1.0 - dist * dist))
        alpha = max(20, min(240, alpha))
        col = (accent_rgb[0], accent_rgb[1], accent_rgb[2], alpha)
        sdraw.line([(x1, -20), (x2, H + 20)], fill=col, width=3)
        
    stripes = stripes.filter(ImageFilter.GaussianBlur(1.0))
    canvas.paste(stripes, (0, 0), stripes)
    
    # Place products with ground drop shadows
    for p_img, target_h, cx, by, sh_blur in prod_items:
        aspect = p_img.width / float(p_img.height)
        new_w = int(target_h * aspect)
        p = p_img.resize((new_w, target_h), Image.Resampling.LANCZOS)
        
        # Ground shadow
        shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        sh_draw = ImageDraw.Draw(shadow)
        sh_w = int(new_w * 1.35)
        sh_h = int(new_w * 0.28)
        sh_box = [cx - sh_w//2, by - sh_h//2, cx + sh_w//2, by + sh_h//2]
        sh_draw.ellipse(sh_box, fill=(0, 0, 0, 230))
        shadow = shadow.filter(ImageFilter.GaussianBlur(sh_blur))
        canvas.paste(shadow, (0, 0), shadow)
        
        top_x = cx - new_w // 2
        top_y = by - target_h
        canvas.paste(p, (top_x, top_y), p)
        
    # Theatrical pure black vignette on the left 48%
    vig = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vig)
    for x in range(W):
        if x < 760:
            alpha = 255
        elif x < 1200:
            t = (x - 760) / float(1200 - 760)
            alpha = int(255 * (1.0 - t * t))
        else:
            alpha = int(35 * ((x - 1200) / float(W - 1200)))
        vdraw.line([(x, 0), (x, H)], fill=(2, 3, 5, alpha))
        
    for y in range(110):
        t = (110 - y) / 110.0
        vdraw.line([(0, y), (W, y)], fill=(2, 3, 5, int(180 * t)))
    for y in range(H - 120, H):
        t = (y - (H - 120)) / 120.0
        vdraw.line([(0, y), (W, y)], fill=(2, 3, 5, int(200 * t)))
        
    canvas.paste(vig, (0, 0), vig)
    canvas.convert('RGB').save(out_path, 'JPEG', quality=95, optimize=True)
    print('Generated Dark:', out_path)

def make_banner_light(prod_items, out_path, accent_rgb=(220, 38, 38), line_density=28, start_x=960):
    canvas = Image.new('RGB', (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Ultra-clean executive studio gradient: pure white on left -> soft pearlescent tint on right
    for x in range(W):
        t = x / float(W)
        r = int(255 - 12 * (t ** 1.3))
        g = int(255 - 10 * (t ** 1.3))
        b = int(255 - 6 * (t ** 1.3))
        draw.line([(x, 0), (x, H)], fill=(r, g, b))
        
    # Motorola signature top-to-bottom telemetry stripes (Crisp & High-Contrast in Light Mode)
    stripes = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(stripes)
    spacing = 17
    dx = 260
    
    for i in range(line_density):
        x1 = start_x + i * spacing
        x2 = x1 - dx
        mid = line_density / 2.0
        dist = abs(i - mid) / mid
        # Distinct, rich opacity curve so stripes are punchy and structural
        alpha = int(210 * (1.0 - dist * dist))
        alpha = max(35, min(230, alpha))
        col = (accent_rgb[0], accent_rgb[1], accent_rgb[2], alpha)
        sdraw.line([(x1, -20), (x2, H + 20)], fill=col, width=3)
        
    stripes = stripes.filter(ImageFilter.GaussianBlur(0.7))
    canvas.paste(stripes, (0, 0), stripes)
    
    # Place products with pristine contact occlusion shadows + ambient floor diffusion
    for p_img, target_h, cx, by, sh_blur in prod_items:
        aspect = p_img.width / float(p_img.height)
        new_w = int(target_h * aspect)
        p = p_img.resize((new_w, target_h), Image.Resampling.LANCZOS)
        
        # 1. Ambient soft floor shadow
        amb_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        adraw = ImageDraw.Draw(amb_shadow)
        aw = int(new_w * 1.3)
        ah = int(new_w * 0.22)
        adraw.ellipse([cx - aw//2, by - ah//2 + 8, cx + aw//2, by + ah//2 + 8], fill=(30, 40, 60, 45))
        amb_shadow = amb_shadow.filter(ImageFilter.GaussianBlur(16))
        canvas.paste(amb_shadow, (0, 0), amb_shadow)
        
        # 2. Tight contact occlusion shadow directly under base
        occ_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        odraw = ImageDraw.Draw(occ_shadow)
        ow = int(new_w * 0.95)
        oh = int(new_w * 0.10)
        odraw.ellipse([cx - ow//2, by - oh//2 + 2, cx + ow//2, by + oh//2 + 2], fill=(15, 20, 30, 150))
        occ_shadow = occ_shadow.filter(ImageFilter.GaussianBlur(4))
        canvas.paste(occ_shadow, (0, 0), occ_shadow)
        
        # 3. Paste product
        top_x = cx - new_w // 2
        top_y = by - target_h
        canvas.paste(p, (top_x, top_y), p)
        
    # Left pure white fade ensures 100% crystal clarity for hero typography
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(fade)
    fade_end = 920
    for x in range(fade_end):
        if x < 650:
            alpha = 255
        else:
            t = (x - 650) / float(fade_end - 650)
            alpha = int(255 * (1.0 - t * t))
        fdraw.line([(x, 0), (x, H)], fill=(255, 255, 255, alpha))
        
    canvas.paste(fade, (0, 0), fade)
    canvas.convert('RGB').save(out_path, 'JPEG', quality=95, optimize=True)
    print('Generated Light:', out_path)

# =========================================================================
# ASSET LOADING & CLEANING
# =========================================================================
# Kenwood NX series (DMR)
nx5400 = extract_bbox(f'{b_base}/nx5400_clean.png')
nx5300 = extract_bbox(f'{b_base}/nx5300_clean.png')
nx3220 = extract_bbox(f'{b_base}/nx3220_clean.png')

# PoC / Cellular
st500 = extract_bbox(f'{b_base}/st500_clean.png')
st200 = extract_bbox(f'{b_base}/st200_clean.png')
st32 = extract_bbox(f'{b_base}/st32_transparent.png')

# ATEX / Hazard
atex_v710 = extract_bbox(f'{b_base}/atex_v710_clean.png')
nx5200 = extract_bbox(f'{b_base}/nx5200_clean.png')
hx400 = extract_bbox(f'{b_base}/hx400_clean.png')

# Infrastructure (Repeater + Mobile)
repeater = extract_bbox(f'{b_base}/repeater_cropped.png')
nx5700_raw = extract_bbox(f'{p_base}/1559997060_nx5700.jpg')

print("Loaded all isolated assets successfully.")

# =========================================================================
# BANNER 1: DMR Tier III Kenwood NX-Series (Crimson Red Stripes)
# Products: NX-3220, NX-5400, NX-5300
# cx shifted to right half: 1180, 1450, 1710
# =========================================================================
b1_items = [
    (nx3220, 570, 1180, 930, 24),
    (nx5400, 680, 1440, 940, 30),
    (nx5300, 620, 1700, 930, 26),
]
make_banner_dark(b1_items, f'{b_base}/banner1.jpg', accent_rgb=(225, 29, 72), start_x=960)
make_banner_light(b1_items, f'{b_base}/banner1_light.jpg', accent_rgb=(220, 38, 38), start_x=980)

# =========================================================================
# BANNER 2: PoC & Broadband Networks (Electric Blue Stripes)
# Products: ST-32R, ST-500R 5G, ST-200R
# =========================================================================
b2_items = [
    (st32, 540, 1190, 930, 22),
    (st500, 670, 1440, 940, 28),
    (st200, 610, 1710, 930, 26),
]
make_banner_dark(b2_items, f'{b_base}/banner2.jpg', accent_rgb=(37, 99, 235), start_x=960)
make_banner_light(b2_items, f'{b_base}/banner2_light.jpg', accent_rgb=(29, 78, 216), start_x=980)

# =========================================================================
# BANNER 3: Intrinsically Safe & ATEX Radios (Safety Amber-Orange Stripes)
# Products: Kenwood NX-5200 IS, Sanchar ATEX V-710, Standard Horizon HX-400IS
# =========================================================================
b3_items = [
    (nx5200, 580, 1180, 930, 24),
    (atex_v710, 670, 1440, 940, 28),
    (hx400, 600, 1710, 930, 26),
]
make_banner_dark(b3_items, f'{b_base}/banner3.jpg', accent_rgb=(249, 115, 22), start_x=960)
make_banner_light(b3_items, f'{b_base}/banner3_light.jpg', accent_rgb=(234, 88, 12), start_x=980)

# =========================================================================
# BANNER 4: Turnkey Wireless Infrastructure (Emerald Green Stripes)
# Products: Kenwood NXR-1700 Base Repeater + NX-5700 Mobile Transceiver
# =========================================================================
b4_items = [
    (repeater, 520, 1360, 840, 32),
    (nx5700_raw, 420, 1580, 940, 26),
]
make_banner_dark(b4_items, f'{b_base}/banner4.jpg', accent_rgb=(16, 185, 129), start_x=960)
make_banner_light(b4_items, f'{b_base}/banner4_light.jpg', accent_rgb=(5, 150, 105), start_x=980)

# Synchronize all to storage/app/public/media/banners/
os.system('cp /Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners/* /Users/adityaprakash/Sites/sanchar-telesystems/storage/app/public/media/banners/ 2>/dev/null || true')
print('ALL 8 BANNERS SUCCESSFULLY GENERATED AND SYNCHRONIZED!')
