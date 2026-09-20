import os
from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 1080
p_base = '/Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/products'
b_base = '/Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners'

def extract_bbox(p_path):
    im = Image.open(p_path).convert('RGBA')
    b = im.getbbox()
    return im.crop(b) if b else im

def render_banner(prod_items, out_path, mode='dark', accent_rgb=(225, 29, 72), start_x=960, line_density=28):
    if mode == 'dark':
        canvas = Image.new('RGB', (W, H), (4, 6, 10))
        draw = ImageDraw.Draw(canvas)
        
        # 1. Subtle dark background gradient
        for y in range(H):
            t = y / float(H)
            r = int(3 + 5 * t)
            g = int(4 + 7 * t)
            b = int(7 + 12 * t)
            draw.line([(0, y), (W, y)], fill=(r, g, b))
            
        # 2. Right background ambient glow
        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([W - 1050, 40, W + 150, H - 40], fill=(16, 24, 38, 170))
        glow = glow.filter(ImageFilter.GaussianBlur(130))
        canvas.paste(glow, (0, 0), glow)
        
        # 3. Top-to-bottom telemetry stripes
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
        
        # 4. Background theatrical fade applied BEFORE products
        vig = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        vdraw = ImageDraw.Draw(vig)
        for x in range(1050):
            if x < 680:
                alpha = 255
            else:
                t = (x - 680) / float(1050 - 680)
                alpha = int(255 * (1.0 - t * t))
            vdraw.line([(x, 0), (x, H)], fill=(2, 3, 5, alpha))
            
        for y in range(90):
            t = (90 - y) / 90.0
            vdraw.line([(0, y), (W, y)], fill=(2, 3, 5, int(150 * t)))
        for y in range(H - 100, H):
            t = (y - (H - 100)) / 100.0
            vdraw.line([(0, y), (W, y)], fill=(2, 3, 5, int(180 * t)))
            
        canvas.paste(vig, (0, 0), vig)
        
        # 5. Place products with realistic dark ground shadows
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
            
    else: # LIGHT MODE
        canvas = Image.new('RGB', (W, H), (255, 255, 255))
        draw = ImageDraw.Draw(canvas)
        
        # 1. Subtle, ultra-clean executive studio gradient
        for x in range(W):
            t = x / float(W)
            r = int(255 - 14 * (t ** 1.4))
            g = int(255 - 11 * (t ** 1.4))
            b = int(255 - 7 * (t ** 1.4))
            draw.line([(x, 0), (x, H)], fill=(r, g, b))
            
        # 2. Rich, solid telemetry stripes (High Contrast, Never Faint or Washed Out)
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
            alpha = max(40, min(240, alpha))
            col = (accent_rgb[0], accent_rgb[1], accent_rgb[2], alpha)
            sdraw.line([(x1, -20), (x2, H + 20)], fill=col, width=4)
            
        stripes = stripes.filter(ImageFilter.GaussianBlur(0.6))
        canvas.paste(stripes, (0, 0), stripes)
        
        # 3. Pure white left feather applied BEFORE products are placed
        fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        fdraw = ImageDraw.Draw(fade)
        for x in range(1020):
            if x < 680:
                alpha = 255
            else:
                t = (x - 680) / float(1020 - 680)
                alpha = int(255 * (1.0 - t * t))
            fdraw.line([(x, 0), (x, H)], fill=(255, 255, 255, alpha))
            
        canvas.paste(fade, (0, 0), fade)
        
        # 4. Place products with high-definition contact occlusion + soft ambient shadows
        for p_img, target_h, cx, by, sh_blur in prod_items:
            aspect = p_img.width / float(p_img.height)
            new_w = int(target_h * aspect)
            p = p_img.resize((new_w, target_h), Image.Resampling.LANCZOS)
            
            # Ambient floor shadow
            amb_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            adraw = ImageDraw.Draw(amb_shadow)
            aw = int(new_w * 1.32)
            ah = int(new_w * 0.22)
            adraw.ellipse([cx - aw//2, by - ah//2 + 8, cx + aw//2, by + ah//2 + 8], fill=(30, 40, 60, 50))
            amb_shadow = amb_shadow.filter(ImageFilter.GaussianBlur(16))
            canvas.paste(amb_shadow, (0, 0), amb_shadow)
            
            # Contact occlusion shadow directly under base
            occ_shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            odraw = ImageDraw.Draw(occ_shadow)
            ow = int(new_w * 0.95)
            oh = int(new_w * 0.10)
            odraw.ellipse([cx - ow//2, by - oh//2 + 2, cx + ow//2, by + oh//2 + 2], fill=(15, 20, 30, 160))
            occ_shadow = occ_shadow.filter(ImageFilter.GaussianBlur(4))
            canvas.paste(occ_shadow, (0, 0), occ_shadow)
            
            # Paste product
            top_x = cx - new_w // 2
            top_y = by - target_h
            canvas.paste(p, (top_x, top_y), p)

    canvas.convert('RGB').save(out_path, 'JPEG', quality=96, optimize=True)
    print(f'Rendered [{mode.upper()}]: {out_path}')

# Load assets
nx5400 = extract_bbox(f'{b_base}/nx5400_clean.png')
nx5300 = extract_bbox(f'{b_base}/nx5300_clean.png')
nx3220 = extract_bbox(f'{b_base}/nx3220_clean.png')

st_compact = extract_bbox(f'{b_base}/st_compact_clean.png')
st500 = extract_bbox(f'{b_base}/st500_clean.png')
st200 = extract_bbox(f'{b_base}/st200_clean.png')

atex_v710 = extract_bbox(f'{b_base}/atex_v710_clean.png')
nx5200 = extract_bbox(f'{b_base}/nx5200_clean.png')
hx400 = extract_bbox(f'{b_base}/hx400_clean.png')

repeater = extract_bbox(f'{b_base}/repeater_cropped.png')
nx5700 = extract_bbox(f'{b_base}/nx5700_clean.png')

# 1. DMR Radios (Crimson Red)
b1_items = [
    (nx3220, 570, 1180, 930, 24),
    (nx5400, 680, 1440, 940, 30),
    (nx5300, 620, 1700, 930, 26),
]
render_banner(b1_items, f'{b_base}/banner1.jpg', mode='dark', accent_rgb=(225, 29, 72))
render_banner(b1_items, f'{b_base}/banner1_light.jpg', mode='light', accent_rgb=(220, 38, 38))

# 2. PoC & Cellular (Electric Telecom Blue)
b2_items = [
    (st_compact, 560, 1200, 930, 22),
    (st500, 680, 1450, 940, 30),
    (st200, 620, 1710, 930, 26),
]
render_banner(b2_items, f'{b_base}/banner2.jpg', mode='dark', accent_rgb=(37, 99, 235))
render_banner(b2_items, f'{b_base}/banner2_light.jpg', mode='light', accent_rgb=(29, 78, 216))

# 3. ATEX Intrinsically Safe (Safety Flame Amber-Orange)
b3_items = [
    (nx5200, 580, 1180, 930, 24),
    (atex_v710, 670, 1440, 940, 28),
    (hx400, 600, 1710, 930, 26),
]
render_banner(b3_items, f'{b_base}/banner3.jpg', mode='dark', accent_rgb=(249, 115, 22))
render_banner(b3_items, f'{b_base}/banner3_light.jpg', mode='light', accent_rgb=(234, 88, 12))

# 4. Turnkey Infrastructure (Tactical Emerald Green)
b4_items = [
    (repeater, 540, 1360, 840, 34),
    (nx5700, 410, 1580, 940, 26),
]
render_banner(b4_items, f'{b_base}/banner4.jpg', mode='dark', accent_rgb=(16, 185, 129))
render_banner(b4_items, f'{b_base}/banner4_light.jpg', mode='light', accent_rgb=(5, 150, 105))

# Sync to storage/app/public/media/banners/
os.system('cp /Users/adityaprakash/Sites/sanchar-telesystems/public/storage/media/banners/* /Users/adityaprakash/Sites/sanchar-telesystems/storage/app/public/media/banners/ 2>/dev/null || true')
print('=== COMPLETED ALL 8 BANNERS SYNCHRONIZATION ===')
