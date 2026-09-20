from PIL import Image, ImageDraw, ImageFilter, ImageChops

def clean_alpha_cutout(img, thresh=230):
    img = img.convert('RGBA')
    datas = list(img.getdata())
    new_data = []
    for item in datas:
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

# ==================== BANNER 1 ====================
def refine_banner1():
    print("Refining Banner 1...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (5, 12, 28, 255))
    
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        draw.line([(0, y), (target_w, y)], fill=(int(5 + 4*t), int(12 + 10*t), int(28 + 24*t), 255))
        
    b1_orig = Image.open('storage/app/public/media/banners/backups_orig/banner1.png').convert('RGBA')
    # Crop globe region strictly to the right of old radios (x=450..1802, y=0..660)
    globe = b1_orig.crop((450, 0, 1802, 660))
    gw, gh = globe.size
    
    # Scale so height is 940 (centered vertically: top=70, bottom=70)
    # This guarantees the upper circle of the globe is 100% complete with 70px margin above it!
    scale = 940.0 / gh
    ngw = int(gw * scale)
    ngh = int(gh * scale)
    globe_scaled = globe.resize((ngw, ngh), Image.Resampling.LANCZOS)
    
    # Feather edges of globe smoothly
    g_mask = Image.new('L', (ngw, ngh), 255)
    gmd = ImageDraw.Draw(g_mask)
    for y in range(50):
        gmd.line([(0, y), (ngw, y)], fill=int(255 * (y / 50.0)))
    for y in range(90):
        gmd.line([(0, ngh - 1 - y), (ngw, ngh - 1 - y)], fill=int(255 * (y / 90.0)))
    for x in range(160):
        for y in range(ngh):
            val = g_mask.getpixel((x, y))
            g_mask.putpixel((x, y), int(val * (x / 160.0)))
            
    globe_scaled.putalpha(ImageChops.multiply(globe_scaled.split()[3], g_mask))
    
    gx = target_w - ngw + 40
    gy = 70
    canvas.alpha_composite(globe_scaled, (gx, gy))
    
    # Authentic Kenwood radios on the right
    nx_img = Image.open('public/storage/media/products/1559993134_nx5200.jpg')
    nx_cut = clean_alpha_cutout(nx_img, thresh=230)
    rw = 630
    rh = int(rw * (nx_cut.size[1] / float(nx_cut.size[0])))
    nx_scaled = nx_cut.resize((rw, rh), Image.Resampling.LANCZOS)
    
    rx = 1260
    ry = target_h - rh - 55
    
    shadow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([rx + 40, ry + rh - 25, rx + rw - 30, ry + rh + 40], fill=(0, 0, 0, 230))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    canvas.alpha_composite(shadow)
    canvas.alpha_composite(nx_scaled, (rx, ry))
    
    # Left vignette: solid on far left, smooth exponential fade
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 255)
        vd.line([(x, 0), (x, target_h)], fill=(5, 12, 28, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('storage/app/public/media/banners/banner1.png', 'PNG', optimize=True)
    out.save('public/storage/media/banners/banner1.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('public/storage/media/banners/banner1.png', 'PNG', optimize=True)
    print("Banner 1 refined successfully.")

# ==================== BANNER 3 ====================
def refine_banner3():
    print("Refining Banner 3...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (10, 18, 34, 255))
    
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        draw.line([(0, y), (target_w, y)], fill=(int(10 + 6*t), int(18 + 10*t), int(34 + 18*t), 255))
        
    glow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([900, 80, 1880, 960], fill=(0, 150, 230, 32))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(glow)
    
    # Telemetry grid
    grid = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    grd = ImageDraw.Draw(grid)
    for gx in range(850, 1920, 60):
        grd.line([(gx, 50), (gx, 1030)], fill=(0, 180, 240, 14), width=1)
    for gy in range(50, 1030, 60):
        grd.line([(850, gy), (1920, gy)], fill=(0, 180, 240, 14), width=1)
    canvas.alpha_composite(grid)
    
    # 3 Real deployment photos from backups_orig/banner3.jpg
    b3_orig = Image.open('storage/app/public/media/banners/backups_orig/banner3.jpg')
    soldier = b3_orig.crop((935, 120, 1720, 388)).convert('RGBA')
    police = b3_orig.crop((935, 395, 1370, 585)).convert('RGBA')
    constr = b3_orig.crop((1380, 395, 1720, 585)).convert('RGBA')
    
    sw, sh = 920, int(920 * (soldier.size[1] / float(soldier.size[0])))
    soldier_scaled = soldier.resize((sw, sh), Image.Resampling.LANCZOS)
    
    pw, ph = 490, int(490 * (police.size[1] / float(police.size[0])))
    police_scaled = police.resize((pw, ph), Image.Resampling.LANCZOS)
    
    cw, ch = 415, int(415 * (constr.size[1] / float(constr.size[0])))
    constr_scaled = constr.resize((cw, ch), Image.Resampling.LANCZOS)
    
    tile_x = 940
    # Top tile: Tactical Defense
    canvas.alpha_composite(soldier_scaled, (tile_x, 80))
    draw.rectangle([tile_x - 2, 78, tile_x + sw + 1, 80 + sh + 1], outline=(56, 189, 248, 140), width=2)
    
    # Bottom Left tile: Delhi Police
    canvas.alpha_composite(police_scaled, (tile_x, 98 + sh))
    draw.rectangle([tile_x - 2, 96 + sh, tile_x + pw + 1, 98 + sh + ph + 1], outline=(56, 189, 248, 140), width=2)
    
    # Bottom Right tile: Heavy Industry
    cx = tile_x + pw + 15
    canvas.alpha_composite(constr_scaled, (cx, 98 + sh))
    draw.rectangle([cx - 2, 96 + sh, cx + cw + 1, 98 + sh + ch + 1], outline=(56, 189, 248, 140), width=2)
    
    # STELE PoC Product Lineup at bottom right
    # poc_banner_11.jpg has the complete official lineup
    poc_orig = Image.open('public/storage/media/products/poc_banner_11.jpg')
    poc_cut = clean_alpha_cutout(poc_orig, thresh=238)
    
    pow, poh = 930, int(930 * (poc_cut.size[1] / float(poc_cut.size[0])))
    poc_scaled = poc_cut.resize((pow, poh), Image.Resampling.LANCZOS)
    
    px = 935
    py = target_h - poh - 45
    
    # Ambient shelf glow under PoC hardware
    shelf = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shelf)
    sd.ellipse([px + 20, py + poh - 20, px + pow - 20, py + poh + 40], fill=(0, 0, 0, 220))
    shelf = shelf.filter(ImageFilter.GaussianBlur(25))
    canvas.alpha_composite(shelf)
    canvas.alpha_composite(poc_scaled, (px, py))
    
    # Left vignette for hero text
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 245)
        vd.line([(x, 0), (x, target_h)], fill=(10, 18, 34, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 3 refined successfully.")

# ==================== BANNER 4 ====================
def refine_banner4():
    print("Refining Banner 4 (Authentic Human Composite, Indian Railways & Turnkey Repeaters)...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (6, 11, 24, 255))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Base dark twilight gradient
    for y in range(target_h):
        t = y / float(target_h)
        draw.line([(0, y), (target_w, y)], fill=(int(6 + 6*t), int(11 + 10*t), int(24 + 22*t), 255))
        
    # 2. Authentic Indian Railways LTE-R Locomotive photo (1709450016_LTTE-R.jpeg)
    # Scale to fill the right 60% of the canvas with full height coverage!
    train_orig = Image.open('public/storage/media/products/1709450016_LTTE-R.jpeg').convert('RGBA')
    # Scale to height 1080
    t_scale = 1080.0 / float(train_orig.size[1]) # 1080 / 465 = 2.32
    tw = int(train_orig.size[0] * t_scale) # 1920
    th = 1080
    train_scaled = train_orig.resize((tw, th), Image.Resampling.LANCZOS)
    
    # Feather left side of train image smoothly so it dissolves into dark navy
    t_mask = Image.new('L', (tw, th), 255)
    tmd = ImageDraw.Draw(t_mask)
    fade_x = int(tw * 0.45)
    for x in range(fade_x):
        a = int(255 * (x / float(fade_x)) ** 1.5)
        tmd.line([(x, 0), (x, th)], fill=a)
        
    train_scaled.putalpha(t_mask)
    canvas.alpha_composite(train_scaled, (target_w - tw, 0))
    
    # 3. Ambient technical telemetry and cyber grid
    grid = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    grd = ImageDraw.Draw(grid)
    for gx in range(880, 1920, 70):
        grd.line([(gx, 400), (gx, 1060)], fill=(0, 200, 255, 16), width=1)
    for gy in range(400, 1060, 60):
        grd.line([(880, gy), (1920, gy)], fill=(0, 200, 255, 16), width=1)
    canvas.alpha_composite(grid)
    
    # 4. Authentic Turnkey Hardware:
    # Kenwood NXR-1800 Digital Repeater Base Station ("Control Tower")
    nxr_img = Image.open('public/storage/media/products/1710417916_NXR-1800.jpg')
    nxr_cut = clean_alpha_cutout(nxr_img, thresh=235)
    nw = 620
    nh = int(nw * (nxr_cut.size[1] / float(nxr_cut.size[0])))
    nxr_scaled = nxr_cut.resize((nw, nh), Image.Resampling.LANCZOS)
    nx_x = 920
    nx_y = target_h - nh - 40
    
    s1 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd1 = ImageDraw.Draw(s1)
    sd1.ellipse([nx_x + 30, nx_y + nh - 30, nx_x + nw - 30, nx_y + nh + 35], fill=(0, 0, 0, 230))
    s1 = s1.filter(ImageFilter.GaussianBlur(26))
    canvas.alpha_composite(s1)
    canvas.alpha_composite(nxr_scaled, (nx_x, nx_y))
    
    # Kenwood Mobile Dispatch Unit (1710415993_NX-1800.png) with illuminated "1--DISPATCH" display
    mob_img = Image.open('public/storage/media/products/1710415993_NX-1800.png')
    mob_cut = clean_alpha_cutout(mob_img, thresh=235)
    mw = 420
    mh = int(mw * (mob_cut.size[1] / float(mob_cut.size[0])))
    mob_scaled = mob_cut.resize((mw, mh), Image.Resampling.LANCZOS)
    mx = 1480
    my = target_h - mh - 45
    
    s2 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd2 = ImageDraw.Draw(s2)
    sd2.ellipse([mx + 20, my + mh - 25, mx + mw - 20, my + mh + 30], fill=(0, 0, 0, 230))
    s2 = s2.filter(ImageFilter.GaussianBlur(24))
    canvas.alpha_composite(s2)
    canvas.alpha_composite(mob_scaled, (mx, my))
    
    # 5. Left vignette for hero text readability
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 245)
        vd.line([(x, 0), (x, target_h)], fill=(6, 11, 24, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner4.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 4 refined successfully.")

if __name__ == '__main__':
    refine_banner1()
    refine_banner3()
    refine_banner4()
