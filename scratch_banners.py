import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

def make_alpha_from_white(img, thresh=235):
    """Converts white/near-white background of product photo into clean alpha."""
    img = img.convert('RGBA')
    datas = img.getdata()
    new_data = []
    for item in datas:
        # Check if pixel is white/near-white
        if item[0] >= thresh and item[1] >= thresh and item[2] >= thresh:
            diff = min(item[0], item[1], item[2]) - thresh
            span = 255 - thresh
            alpha = int(255 * (1.0 - (diff / float(span)) ** 1.5)) if span > 0 else 0
            alpha = max(0, min(255, alpha))
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
    img.putdata(new_data)
    return img

def create_banner1():
    print("Generating Banner 1...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (5, 12, 28, 255))
    
    # 1. Background gradient
    bg_draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        r = int(5 + 3 * t)
        g = int(12 + 8 * t)
        b = int(28 + 20 * t)
        bg_draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # 2. Cyber RF Mesh Globe from backups_orig/banner1.png
    b1_orig = Image.open('storage/app/public/media/banners/backups_orig/banner1.png').convert('RGBA')
    # Globe crop: x=400..1802, y=0..660 (strictly above the grey bar)
    globe_crop = b1_orig.crop((420, 0, 1802, 650))
    gw, gh = globe_crop.size # ~1382 x 650
    
    # Scale globe so it fits with generous top & bottom margin (complete upper circle visible!)
    # Target height = 760 (so top = 140, bottom = 900)
    g_scale = 760.0 / gh
    new_gw = int(gw * g_scale)
    new_gh = int(gh * g_scale)
    globe_scaled = globe_crop.resize((new_gw, new_gh), Image.Resampling.LANCZOS)
    
    # Smooth fade out at the bottom of the globe to blend seamlessly into navy background
    globe_alpha = globe_scaled.split()[3]
    fade_mask = Image.new('L', (new_gw, new_gh), 255)
    fdraw = ImageDraw.Draw(fade_mask)
    fade_rows = 90
    for fy in range(fade_rows):
        fa = int(255 * (1.0 - fy / float(fade_rows)))
        fdraw.line([(0, new_gh - fy), (new_gw, new_gh - fy)], fill=fa)
    globe_alpha = ImageChops.multiply(globe_alpha, fade_mask)
    globe_scaled.putalpha(globe_alpha)
    
    # Position globe centered vertically, aligned to right
    gx = target_w - new_gw + 40
    gy = 140
    canvas.alpha_composite(globe_scaled, (gx, gy))
    
    # 3. Real Kenwood Radios (NX-5200 dual unit from 1559993134_nx5200.jpg)
    nx_img = Image.open('public/storage/media/products/1559993134_nx5200.jpg')
    nx_cutout = make_alpha_from_white(nx_img, thresh=230)
    
    # Scale radios to look crisp & dominant on the right side
    rw = 560
    rh = int(rw * (nx_cutout.size[1] / float(nx_cutout.size[0])))
    nx_scaled = nx_cutout.resize((rw, rh), Image.Resampling.LANCZOS)
    
    rx = 1310
    ry = target_h - rh - 60
    
    # Soft realistic ground shadow under radios
    shadow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([rx + 40, ry + rh - 30, rx + rw - 40, ry + rh + 45], fill=(0, 0, 0, 200))
    shadow = shadow.filter(ImageFilter.GaussianBlur(35))
    canvas.alpha_composite(shadow)
    
    canvas.alpha_composite(nx_scaled, (rx, ry))
    
    # 4. Cinematic left gradient for hero text readability
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 230)
        vd.line([(x, 0), (x, target_h)], fill=(5, 12, 28, a))
    canvas.alpha_composite(vignette)
    
    # Save
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('storage/app/public/media/banners/banner1.png', 'PNG', optimize=True)
    out.save('public/storage/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('public/storage/media/banners/banner1.png', 'PNG', optimize=True)
    print("Banner 1 complete: full upper circle intact, zero grey bar, authentic NX-5200 radios.")

def create_banner2():
    print("Generating Banner 2...")
    target_w, target_h = 1920, 1080
    orig = Image.open('storage/app/public/media/banners/backups_orig/banner2.jpg').convert('RGB')
    ow, oh = orig.size # 1920 x 700
    
    canvas = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    
    # Place orig at bottom of canvas: table is at y = target_h - oh = 380
    y_offset = target_h - oh # 380
    canvas.paste(orig, (0, y_offset))
    
    # Natural upward extension of the boardroom sky and window mullions
    # In orig, rows 0..50 are bright sky and window beams.
    # We sample each vertical column from y=0..10 and extend upwards smoothly!
    sky_band = orig.crop((0, 0, ow, 15))
    # Resize sky_band to height y_offset to extend upwards
    sky_extended = sky_band.resize((ow, y_offset + 5), Image.Resampling.BILINEAR)
    canvas.paste(sky_extended, (0, 0))
    
    # Smooth 25px horizontal cross-fade at y_offset boundary to ensure 0 seam
    blend_h = 25
    for y in range(blend_h):
        alpha = y / float(blend_h)
        for x in range(target_w):
            p_top = sky_extended.getpixel((x, y_offset - blend_h + y))
            p_orig = orig.getpixel((x, y))
            r = int(p_top[0] * (1 - alpha) + p_orig[0] * alpha)
            g = int(p_top[1] * (1 - alpha) + p_orig[1] * alpha)
            b = int(p_top[2] * (1 - alpha) + p_orig[2] * alpha)
            canvas.putpixel((x, y_offset + y), (r, g, b))
            
    # Soft vignette on the left 42% for hero text contrast
    canvas_rgba = canvas.convert('RGBA')
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.44)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 200)
        vd.line([(x, 0), (x, target_h)], fill=(8, 14, 26, a))
    canvas_rgba.alpha_composite(vignette)
    
    out = canvas_rgba.convert('RGB')
    out.save('storage/app/public/media/banners/banner2.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner2.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 2 complete: natural floor-to-ceiling glass executive skyline, authentic Kenwood products.")

def create_banner3():
    print("Generating Banner 3...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (11, 19, 36, 255))
    
    # Tactical dark background gradient
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        r = int(11 + 6 * t)
        g = int(19 + 10 * t)
        b = int(36 + 18 * t)
        draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # Subtle telemetry grid on the right
    grid_layer = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid_layer)
    for gx in range(850, 1920, 60):
        gd.line([(gx, 60), (gx, 1020)], fill=(0, 180, 240, 15), width=1)
    for gy in range(60, 1020, 60):
        gd.line([(850, gy), (1920, gy)], fill=(0, 180, 240, 15), width=1)
    canvas.alpha_composite(grid_layer)
    
    # Load original 3 authentic field photos from backups_orig/banner3.jpg
    b3_orig = Image.open('storage/app/public/media/banners/backups_orig/banner3.jpg')
    # 1. Soldier/Tactical
    soldier = b3_orig.crop((935, 120, 1720, 388)).convert('RGBA')
    # 2. Delhi Police
    police = b3_orig.crop((935, 395, 1370, 585)).convert('RGBA')
    # 3. Construction
    constr = b3_orig.crop((1380, 395, 1720, 585)).convert('RGBA')
    
    # Scale and place tactical deployment photo grid on top right
    # Tactical soldier (wide top tile): 860 x 300
    sw, sh = 860, int(860 * (soldier.size[1] / float(soldier.size[0])))
    soldier_scaled = soldier.resize((sw, sh), Image.Resampling.LANCZOS)
    
    # Delhi police (bottom left tile): 460 x 205
    pw, ph = 460, int(460 * (police.size[1] / float(police.size[0])))
    police_scaled = police.resize((pw, ph), Image.Resampling.LANCZOS)
    
    # Construction (bottom right tile): 385 x 205
    cw, ch = 385, int(385 * (constr.size[1] / float(constr.size[0])))
    constr_scaled = constr.resize((cw, ch), Image.Resampling.LANCZOS)
    
    tile_x = 980
    # Soldier tile with glass border
    canvas.alpha_composite(soldier_scaled, (tile_x, 100))
    # Border around soldier tile
    draw.rectangle([tile_x - 1, 99, tile_x + sw, 100 + sh], outline=(0, 180, 240, 90), width=2)
    
    # Police tile
    canvas.alpha_composite(police_scaled, (tile_x, 115 + sh))
    draw.rectangle([tile_x - 1, 114 + sh, tile_x + pw, 115 + sh + ph], outline=(0, 180, 240, 90), width=2)
    
    # Construction tile
    cx = tile_x + pw + 15
    canvas.alpha_composite(constr_scaled, (cx, 115 + sh))
    draw.rectangle([cx - 1, 114 + sh, cx + cw, 115 + sh + ch], outline=(0, 180, 240, 90), width=2)
    
    # STELE PoC Product Hardware Lineup (from poc_banner_11.jpg)
    poc_img = Image.open('public/storage/media/products/poc_banner_11.jpg')
    poc_cutout = make_alpha_from_white(poc_img, thresh=235)
    
    # Scale PoC lineup to width 900
    pow, poh = 900, int(900 * (poc_cutout.size[1] / float(poc_cutout.size[0])))
    poc_scaled = poc_cutout.resize((pow, poh), Image.Resampling.LANCZOS)
    
    poc_x = 950
    poc_y = target_h - poh - 60
    
    # Shadow under PoC lineup
    poc_shadow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    psd = ImageDraw.Draw(poc_shadow)
    psd.ellipse([poc_x + 30, poc_y + poh - 25, poc_x + pow - 30, poc_y + poh + 35], fill=(0, 0, 0, 210))
    poc_shadow = poc_shadow.filter(ImageFilter.GaussianBlur(30))
    canvas.alpha_composite(poc_shadow)
    canvas.alpha_composite(poc_scaled, (poc_x, poc_y))
    
    # Soft left vignette for hero text readability
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 230)
        vd.line([(x, 0), (x, target_h)], fill=(11, 19, 36, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 3 complete: authentic tactical field deployments and STELE PoC hardware.")

def create_banner4():
    print("Generating Banner 4 (Authentic Human Design, Zero AI Generation)...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (7, 12, 24, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Deep twilight / navy gradient
    for y in range(target_h):
        t = y / float(target_h)
        r = int(7 + 5 * t)
        g = int(12 + 10 * t)
        b = int(24 + 22 * t)
        draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # Ambient deep cyan / blue glow
    glow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([900, 150, 1900, 950], fill=(0, 130, 210, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    canvas.alpha_composite(glow)
    
    # 1. Feature the authentic Indian Railways LTE-R Locomotive from Sanchar's website (1709450016_LTTE-R.jpeg)
    train_img = Image.open('public/storage/media/products/1709450016_LTTE-R.jpeg').convert('RGBA')
    tw, th = 960, int(960 * (train_img.size[1] / float(train_img.size[0])))
    train_scaled = train_img.resize((tw, th), Image.Resampling.LANCZOS)
    
    # Soft edge feathering around train image
    t_mask = Image.new('L', (tw, th), 255)
    tmd = ImageDraw.Draw(t_mask)
    # Left fade
    for x in range(120):
        a = int(255 * (x / 120.0))
        tmd.line([(x, 0), (x, th)], fill=a)
    # Bottom fade
    for y in range(90):
        a = int(255 * ((90 - y) / 90.0))
        # multiply
        for x in range(tw):
            orig_val = t_mask.getpixel((x, th - y - 1))
            t_mask.putpixel((x, th - y - 1), int(orig_val * ((90 - y) / 90.0)))
    # Top fade
    for y in range(60):
        for x in range(tw):
            orig_val = t_mask.getpixel((x, y))
            t_mask.putpixel((x, y), int(orig_val * (y / 60.0)))
            
    train_scaled.putalpha(t_mask)
    train_x = target_w - tw + 40
    train_y = 60
    canvas.alpha_composite(train_scaled, (train_x, train_y))
    
    # Technical telemetry accents (crisp vector lines & coordinate ticks)
    grid = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    grd = ImageDraw.Draw(grid)
    for gx in range(920, 1920, 70):
        grd.line([(gx, 480), (gx, 1040)], fill=(0, 190, 240, 14), width=1)
    for gy in range(480, 1040, 60):
        grd.line([(920, gy), (1920, gy)], fill=(0, 190, 240, 14), width=1)
    canvas.alpha_composite(grid)
    
    # Modern dark technical equipment console / bench
    bench_y = 660
    bench = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bench)
    for y in range(bench_y, target_h):
        prog = (y - bench_y) / float(target_h - bench_y)
        c = int(14 + prog * 10)
        bd.line([(820, y), (target_w, y)], fill=(c, c + 3, c + 8, 245))
    # Glowing bevel edge
    bd.line([(820, bench_y), (target_w, bench_y)], fill=(56, 189, 248, 90), width=2)
    canvas.alpha_composite(bench)
    
    # 2. Real Product 1: Kenwood NXR-1800 Digital Repeater Base Station ("Control Tower")
    nxr_img = Image.open('public/storage/media/products/1710417916_NXR-1800.jpg')
    nxr_cutout = make_alpha_from_white(nxr_img, thresh=235)
    nw = 580
    nh = int(nw * (nxr_cutout.size[1] / float(nxr_cutout.size[0])))
    nxr_scaled = nxr_cutout.resize((nw, nh), Image.Resampling.LANCZOS)
    
    nx_x = 940
    nx_y = 505
    # Shadow
    s1 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd1 = ImageDraw.Draw(s1)
    sd1.ellipse([nx_x + 30, nx_y + nh - 35, nx_x + nw - 30, nx_y + nh + 35], fill=(0, 0, 0, 180))
    s1 = s1.filter(ImageFilter.GaussianBlur(25))
    canvas.alpha_composite(s1)
    canvas.alpha_composite(nxr_scaled, (nx_x, nx_y))
    
    # 3. Real Product 2: Kenwood Viking P25 System (VM5000 & ATLAS 8000)
    p25_img = Image.open('public/storage/media/products/1561313421_P25_system.jpg')
    p25_cutout = make_alpha_from_white(p25_img, thresh=230)
    pw = 620
    ph = int(pw * (p25_cutout.size[1] / float(p25_cutout.size[0])))
    p25_scaled = p25_cutout.resize((pw, ph), Image.Resampling.LANCZOS)
    
    px = 1260
    py = 425
    s2 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd2 = ImageDraw.Draw(s2)
    sd2.ellipse([px + 30, py + ph - 30, px + pw - 30, py + ph + 35], fill=(0, 0, 0, 190))
    s2 = s2.filter(ImageFilter.GaussianBlur(28))
    canvas.alpha_composite(s2)
    canvas.alpha_composite(p25_scaled, (px, py))
    
    # 4. Left vignette for hero text contrast
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 230)
        vd.line([(x, 0), (x, target_h)], fill=(7, 12, 24, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 4 complete: authentic Indian Railways LTE-R & Kenwood NXR-1800 / Viking P25 infrastructure.")

if __name__ == '__main__':
    create_banner1()
    create_banner2()
    create_banner3()
    create_banner4()
