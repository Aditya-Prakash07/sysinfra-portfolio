import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

def clean_alpha_cutout(img, thresh=235):
    """Converts white/near-white studio backdrop into clean transparent alpha."""
    img = img.convert('RGBA')
    datas = img.getdata()
    new_data = []
    for item in datas:
        # If r,g,b are all near white
        if item[0] >= thresh and item[1] >= thresh and item[2] >= thresh:
            diff = min(item[0], item[1], item[2]) - thresh
            span = 255 - thresh
            a = int(255 * (1.0 - (diff / float(span)) ** 1.8)) if span > 0 else 0
            a = max(0, min(255, a))
            new_data.append((item[0], item[1], item[2], a))
        else:
            new_data.append(item)
    img.putdata(new_data)
    return img

def build_banner1():
    print("Building Banner 1 (Kenwood DMR & Cyber RF Network)...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (5, 12, 28, 255))
    
    # 1. Base gradient
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        r = int(5 + 4 * t)
        g = int(12 + 10 * t)
        b = int(28 + 24 * t)
        draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # 2. Cyber RF Globe from backups_orig/banner1.png
    b1_orig = Image.open('storage/app/public/media/banners/backups_orig/banner1.png').convert('RGBA')
    # Crop globe region (from x=420 to 1802, y=0 to 660, excluding the grey bar and old left radios)
    globe = b1_orig.crop((410, 0, 1802, 660))
    gw, gh = globe.size
    
    # Scale so height is 920px (centered vertically on 1080 canvas: 80px top, 80px bottom)
    # The upper circle/sphere is 100% complete with 80px margin at the top!
    g_scale = 920.0 / gh
    ngw = int(gw * g_scale)
    ngh = int(gh * g_scale)
    globe_scaled = globe.resize((ngw, ngh), Image.Resampling.LANCZOS)
    
    # Soft vertical and horizontal fade so no hard edge
    g_mask = Image.new('L', (ngw, ngh), 255)
    gmd = ImageDraw.Draw(g_mask)
    # Top fade (40px)
    for y in range(40):
        a = int(255 * (y / 40.0))
        gmd.line([(0, y), (ngw, y)], fill=a)
    # Bottom fade (80px)
    for y in range(80):
        a = int(255 * (y / 80.0))
        gmd.line([(0, ngh - 1 - y), (ngw, ngh - 1 - y)], fill=a)
    # Left fade (100px)
    for x in range(100):
        a = int(255 * (x / 100.0))
        for y in range(ngh):
            orig_val = g_mask.getpixel((x, y))
            g_mask.putpixel((x, y), int(orig_val * (x / 100.0)))
            
    g_alpha = globe_scaled.split()[3]
    globe_scaled.putalpha(ImageChops.multiply(g_alpha, g_mask))
    
    gx = target_w - ngw + 80
    gy = 80
    canvas.alpha_composite(globe_scaled, (gx, gy))
    
    # 3. Authentic Kenwood Transceivers on the right (1559993134_nx5200.jpg)
    nx_img = Image.open('public/storage/media/products/1559993134_nx5200.jpg')
    nx_cut = clean_alpha_cutout(nx_img, thresh=230)
    rw = 620
    rh = int(rw * (nx_cut.size[1] / float(nx_cut.size[0])))
    nx_scaled = nx_cut.resize((rw, rh), Image.Resampling.LANCZOS)
    
    rx = 1260
    ry = target_h - rh - 60
    
    # Drop shadow
    shadow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([rx + 40, ry + rh - 25, rx + rw - 30, ry + rh + 40], fill=(0, 0, 0, 230))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    canvas.alpha_composite(shadow)
    canvas.alpha_composite(nx_scaled, (rx, ry))
    
    # 4. Left 46% dark vignette for hero text readability
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 235)
        vd.line([(x, 0), (x, target_h)], fill=(5, 12, 28, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('storage/app/public/media/banners/banner1.png', 'PNG', optimize=True)
    out.save('public/storage/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('public/storage/media/banners/banner1.png', 'PNG', optimize=True)
    print("Banner 1 saved successfully.")

def build_banner2():
    print("Building Banner 2 (Executive Boardroom & Kenwood Fleet)...")
    target_w, target_h = 1920, 1080
    orig = Image.open('storage/app/public/media/banners/backups_orig/banner2.jpg').convert('RGB')
    ow, oh = orig.size # 1920 x 700
    
    canvas = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    y_offset = target_h - oh # 380
    canvas.paste(orig, (0, y_offset))
    
    # Smooth natural upward extension of boardroom sky & window frames
    sky_band = orig.crop((0, 0, ow, 15))
    sky_extended = sky_band.resize((ow, y_offset + 5), Image.Resampling.BILINEAR)
    canvas.paste(sky_extended, (0, 0))
    
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
            
    # Soft vignette on left 44% for hero text contrast
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
    print("Banner 2 saved successfully.")

def build_banner3():
    print("Building Banner 3 (STELE PS-LTE Tactical Deployments)...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (10, 18, 34, 255))
    
    # Tactical deep slate gradient
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        r = int(10 + 6 * t)
        g = int(18 + 10 * t)
        b = int(34 + 18 * t)
        draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # Ambient cyan glow behind photo mosaic
    glow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([920, 100, 1850, 920], fill=(0, 160, 240, 30))
    glow = glow.filter(ImageFilter.GaussianBlur(100))
    canvas.alpha_composite(glow)
    
    # Subtle telemetry grid
    grid = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    grd = ImageDraw.Draw(grid)
    for gx in range(880, 1920, 60):
        grd.line([(gx, 60), (gx, 1020)], fill=(0, 180, 240, 14), width=1)
    for gy in range(60, 1020, 60):
        grd.line([(880, gy), (1920, gy)], fill=(0, 180, 240, 14), width=1)
    canvas.alpha_composite(grid)
    
    # Real field photos from backups_orig/banner3.jpg
    b3_orig = Image.open('storage/app/public/media/banners/backups_orig/banner3.jpg')
    soldier = b3_orig.crop((935, 120, 1720, 388)).convert('RGBA')
    police = b3_orig.crop((935, 395, 1370, 585)).convert('RGBA')
    constr = b3_orig.crop((1380, 395, 1720, 585)).convert('RGBA')
    
    # Scale photo tiles
    sw, sh = 880, int(880 * (soldier.size[1] / float(soldier.size[0])))
    soldier_scaled = soldier.resize((sw, sh), Image.Resampling.LANCZOS)
    
    pw, ph = 470, int(470 * (police.size[1] / float(police.size[0])))
    police_scaled = police.resize((pw, ph), Image.Resampling.LANCZOS)
    
    cw, ch = 395, int(395 * (constr.size[1] / float(constr.size[0])))
    constr_scaled = constr.resize((cw, ch), Image.Resampling.LANCZOS)
    
    tile_x = 960
    # Top tile: Tactical Defense
    canvas.alpha_composite(soldier_scaled, (tile_x, 90))
    draw.rectangle([tile_x - 2, 88, tile_x + sw + 1, 90 + sh + 1], outline=(56, 189, 248, 120), width=2)
    
    # Bottom Left tile: Delhi Police
    canvas.alpha_composite(police_scaled, (tile_x, 105 + sh))
    draw.rectangle([tile_x - 2, 103 + sh, tile_x + pw + 1, 105 + sh + ph + 1], outline=(56, 189, 248, 120), width=2)
    
    # Bottom Right tile: Heavy Industry
    cx = tile_x + pw + 15
    canvas.alpha_composite(constr_scaled, (cx, 105 + sh))
    draw.rectangle([cx - 2, 103 + sh, cx + cw + 1, 105 + sh + ch + 1], outline=(56, 189, 248, 120), width=2)
    
    # Bench for STELE hardware at bottom right
    bench_y = target_h - 220
    bench = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bench)
    for y in range(bench_y, target_h):
        prog = (y - bench_y) / float(target_h - bench_y)
        c = int(12 + prog * 10)
        bd.line([(880, y), (target_w, y)], fill=(c, c + 4, c + 12, 240))
    bd.line([(880, bench_y), (target_w, bench_y)], fill=(56, 189, 248, 80), width=2)
    canvas.alpha_composite(bench)
    
    # Add genuine STELE hardware: ST-920M vehicle console & ST-500R smart radio
    st920 = Image.open('public/storage/media/products/1707161461_ST-920M_ttt.png').convert('RGBA')
    # Clean alpha
    st920_cut = clean_alpha_cutout(st920, thresh=235)
    s9w = 420
    s9h = int(s9w * (st920_cut.size[1] / float(st920_cut.size[0])))
    s9_scaled = st920_cut.resize((s9w, s9h), Image.Resampling.LANCZOS)
    
    s9_x = 1000
    s9_y = target_h - s9h - 25
    canvas.alpha_composite(s9_scaled, (s9_x, s9_y))
    
    # ST-500R 5G smart terminal
    st500 = Image.open('public/storage/media/products/1707159410_ST-500R_5g.png').convert('RGBA')
    st500_cut = clean_alpha_cutout(st500, thresh=235)
    s5w = 170
    s5h = int(s5w * (st500_cut.size[1] / float(st500_cut.size[0])))
    s5_scaled = st500_cut.resize((s5w, s5h), Image.Resampling.LANCZOS)
    s5_x = 1460
    s5_y = target_h - s5h - 25
    canvas.alpha_composite(s5_scaled, (s5_x, s5_y))
    
    # ST-32R terminal
    st32 = Image.open('public/storage/media/products/1707158524_ST-32R_ttt.png').convert('RGBA')
    st32_cut = clean_alpha_cutout(st32, thresh=235)
    s3w = 210
    s3h = int(s3w * (st32_cut.size[1] / float(st32_cut.size[0])))
    s3_scaled = st32_cut.resize((s3w, s3h), Image.Resampling.LANCZOS)
    s3_x = 1660
    s3_y = target_h - s3h - 25
    canvas.alpha_composite(s3_scaled, (s3_x, s3_y))
    
    # Left dark vignette for hero text
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 230)
        vd.line([(x, 0), (x, target_h)], fill=(10, 18, 34, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 3 saved successfully.")

def build_banner4():
    print("Building Banner 4 (Authentic Human Design, Indian Railways LTE-R & Turnkey Repeaters)...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (7, 12, 24, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Base dark navy gradient
    for y in range(target_h):
        t = y / float(target_h)
        r = int(7 + 5 * t)
        g = int(12 + 10 * t)
        b = int(24 + 22 * t)
        draw.line([(0, y), (target_w, y)], fill=(r, g, b, 255))
        
    # Ambient cyan/blue glow on the right
    glow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([880, 100, 1900, 950], fill=(0, 140, 220, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    canvas.alpha_composite(glow)
    
    # 1. Real Indian Railways LTE-R Locomotive photo from Sanchar's website (1709450016_LTTE-R.jpeg)
    train_orig = Image.open('public/storage/media/products/1709450016_LTTE-R.jpeg').convert('RGBA')
    tw = 980
    th = int(tw * (train_orig.size[1] / float(train_orig.size[0])))
    train_scaled = train_orig.resize((tw, th), Image.Resampling.LANCZOS)
    
    # Feather edges of train so it blends into the command center backdrop
    t_mask = Image.new('L', (tw, th), 255)
    tmd = ImageDraw.Draw(t_mask)
    # Left fade
    for x in range(140):
        a = int(255 * (x / 140.0))
        tmd.line([(x, 0), (x, th)], fill=a)
    # Bottom fade
    for y in range(90):
        a = int(255 * (y / 90.0))
        for x in range(tw):
            orig_v = t_mask.getpixel((x, th - 1 - y))
            t_mask.putpixel((x, th - 1 - y), int(orig_v * (y / 90.0)))
    # Top fade
    for y in range(50):
        for x in range(tw):
            orig_v = t_mask.getpixel((x, y))
            t_mask.putpixel((x, y), int(orig_v * (y / 50.0)))
            
    train_scaled.putalpha(t_mask)
    train_x = target_w - tw + 30
    train_y = 60
    canvas.alpha_composite(train_scaled, (train_x, train_y))
    
    # Subtle technical telemetry grid
    grid = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    grd = ImageDraw.Draw(grid)
    for gx in range(900, 1920, 70):
        grd.line([(gx, 460), (gx, 1040)], fill=(0, 190, 240, 14), width=1)
    for gy in range(460, 1040, 60):
        grd.line([(900, gy), (1920, gy)], fill=(0, 190, 240, 14), width=1)
    canvas.alpha_composite(grid)
    
    # Technical metallic console table
    bench_y = 650
    bench = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bench)
    for y in range(bench_y, target_h):
        prog = (y - bench_y) / float(target_h - bench_y)
        c = int(14 + prog * 10)
        bd.line([(820, y), (target_w, y)], fill=(c, c + 3, c + 8, 245))
    bd.line([(820, bench_y), (target_w, bench_y)], fill=(56, 189, 248, 90), width=2)
    canvas.alpha_composite(bench)
    
    # 2. Real Product 1: Kenwood NXR-1800 Digital Repeater Base Station ("Control Tower")
    nxr_img = Image.open('public/storage/media/products/1710417916_NXR-1800.jpg')
    nxr_cut = clean_alpha_cutout(nxr_img, thresh=235)
    nw = 580
    nh = int(nw * (nxr_cut.size[1] / float(nxr_cut.size[0])))
    nxr_scaled = nxr_cut.resize((nw, nh), Image.Resampling.LANCZOS)
    nx_x = 940
    nx_y = 495
    
    s1 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd1 = ImageDraw.Draw(s1)
    sd1.ellipse([nx_x + 30, nx_y + nh - 35, nx_x + nw - 30, nx_y + nh + 35], fill=(0, 0, 0, 190))
    s1 = s1.filter(ImageFilter.GaussianBlur(25))
    canvas.alpha_composite(s1)
    canvas.alpha_composite(nxr_scaled, (nx_x, nx_y))
    
    # 3. Real Product 2: Kenwood Mobile Dispatch Station (1710415993_NX-1800.png)
    mob_img = Image.open('public/storage/media/products/1710415993_NX-1800.png')
    mob_cut = clean_alpha_cutout(mob_img, thresh=235)
    mw = 380
    mh = int(mw * (mob_cut.size[1] / float(mob_cut.size[0])))
    mob_scaled = mob_cut.resize((mw, mh), Image.Resampling.LANCZOS)
    mx = 1530
    my = 515
    
    s2 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd2 = ImageDraw.Draw(s2)
    sd2.ellipse([mx + 20, my + mh - 25, mx + mw - 20, my + mh + 30], fill=(0, 0, 0, 190))
    s2 = s2.filter(ImageFilter.GaussianBlur(22))
    canvas.alpha_composite(s2)
    canvas.alpha_composite(mob_scaled, (mx, my))
    
    # Left dark vignette for hero text
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 235)
        vd.line([(x, 0), (x, target_h)], fill=(7, 12, 24, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 4 saved successfully.")

if __name__ == '__main__':
    build_banner1()
    build_banner2()
    build_banner3()
    build_banner4()
