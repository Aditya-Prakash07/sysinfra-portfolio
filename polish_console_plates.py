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

def polish_banner3():
    print("Polishing Banner 3...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (8, 14, 28, 255))
    
    draw = ImageDraw.Draw(canvas)
    for y in range(target_h):
        t = y / float(target_h)
        draw.line([(0, y), (target_w, y)], fill=(int(8 + 6*t), int(14 + 10*t), int(28 + 18*t), 255))
        
    glow = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([900, 60, 1880, 960], fill=(0, 160, 240, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(110))
    canvas.alpha_composite(glow)
    
    # 3 Real deployment photos from backups_orig/banner3.jpg
    b3_orig = Image.open('storage/app/public/media/banners/backups_orig/banner3.jpg')
    soldier = b3_orig.crop((935, 120, 1720, 388)).convert('RGBA')
    police = b3_orig.crop((935, 395, 1370, 585)).convert('RGBA')
    constr = b3_orig.crop((1380, 395, 1720, 585)).convert('RGBA')
    
    sw, sh = 920, int(920 * (soldier.size[1] / float(soldier.size[0]))) # 920 x 314
    soldier_scaled = soldier.resize((sw, sh), Image.Resampling.LANCZOS)
    
    pw, ph = 490, int(490 * (police.size[1] / float(police.size[0]))) # 490 x 214
    police_scaled = police.resize((pw, ph), Image.Resampling.LANCZOS)
    
    cw, ch = 415, int(415 * (constr.size[1] / float(constr.size[0]))) # 415 x 225
    constr_scaled = constr.resize((cw, ch), Image.Resampling.LANCZOS)
    
    tile_x = 940
    # Top tile: Tactical Defense
    canvas.alpha_composite(soldier_scaled, (tile_x, 70))
    draw.rectangle([tile_x - 2, 68, tile_x + sw + 1, 70 + sh + 1], outline=(56, 189, 248, 140), width=2)
    
    # Bottom Left tile: Delhi Police
    canvas.alpha_composite(police_scaled, (tile_x, 86 + sh))
    draw.rectangle([tile_x - 2, 84 + sh, tile_x + pw + 1, 86 + sh + ph + 1], outline=(56, 189, 248, 140), width=2)
    
    # Bottom Right tile: Heavy Industry
    cx = tile_x + pw + 15
    canvas.alpha_composite(constr_scaled, (cx, 86 + sh))
    draw.rectangle([cx - 2, 84 + sh, cx + cw + 1, 86 + sh + ch + 1], outline=(56, 189, 248, 140), width=2)
    
    # Glass console plate for STELE hardware at bottom
    plate_y = 660
    plate = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    pld = ImageDraw.Draw(plate)
    # Rounded glass docking plate
    pld.rounded_rectangle([920, plate_y, 1880, 1020], radius=16, fill=(10, 18, 36, 190), outline=(56, 189, 248, 90), width=1)
    canvas.alpha_composite(plate)
    
    # STELE PoC Product Lineup inside plate
    poc_orig = Image.open('public/storage/media/products/poc_banner_11.jpg')
    poc_cut = clean_alpha_cutout(poc_orig, thresh=238)
    pow, poh = 900, int(900 * (poc_cut.size[1] / float(poc_cut.size[0])))
    poc_scaled = poc_cut.resize((pow, poh), Image.Resampling.LANCZOS)
    
    px = 950
    py = plate_y + (1020 - plate_y - poh) // 2 + 10
    
    canvas.alpha_composite(poc_scaled, (px, py))
    
    # Left vignette for hero text
    vignette = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    fade_w = int(target_w * 0.48)
    for x in range(fade_w):
        u = x / float(fade_w)
        a = int((1.0 - u) * (1.0 - u) * 245)
        vd.line([(x, 0), (x, target_h)], fill=(8, 14, 28, a))
    canvas.alpha_composite(vignette)
    
    out = canvas.convert('RGB')
    out.save('storage/app/public/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    out.save('public/storage/media/banners/banner3.jpg', 'JPEG', quality=95, optimize=True)
    print("Banner 3 polished.")

def polish_banner4():
    print("Polishing Banner 4...")
    target_w, target_h = 1920, 1080
    canvas = Image.new('RGBA', (target_w, target_h), (6, 11, 24, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Base dark gradient
    for y in range(target_h):
        t = y / float(target_h)
        draw.line([(0, y), (target_w, y)], fill=(int(6 + 6*t), int(11 + 10*t), int(24 + 22*t), 255))
        
    # Indian Railways LTE-R train photo
    train_orig = Image.open('public/storage/media/products/1709450016_LTTE-R.jpeg').convert('RGBA')
    t_scale = 1080.0 / float(train_orig.size[1])
    tw = int(train_orig.size[0] * t_scale)
    th = 1080
    train_scaled = train_orig.resize((tw, th), Image.Resampling.LANCZOS)
    
    t_mask = Image.new('L', (tw, th), 255)
    tmd = ImageDraw.Draw(t_mask)
    fade_x = int(tw * 0.48)
    for x in range(fade_x):
        a = int(255 * (x / float(fade_x)) ** 1.5)
        tmd.line([(x, 0), (x, th)], fill=a)
    train_scaled.putalpha(t_mask)
    canvas.alpha_composite(train_scaled, (target_w - tw, 0))
    
    # Docking console plate for repeater & dispatch equipment at bottom right
    plate_y = 620
    plate = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    pld = ImageDraw.Draw(plate)
    pld.rounded_rectangle([880, plate_y, 1890, 1020], radius=16, fill=(8, 14, 28, 210), outline=(56, 189, 248, 100), width=1)
    
    # Subtle telemetry accents inside plate
    pld.text((910, plate_y + 15), "MISSION CRITICAL BASE STATION & REPEATER INFRASTRUCTURE", fill=(56, 189, 248, 160))
    canvas.alpha_composite(plate)
    
    # Kenwood NXR-1800 Digital Repeater ("Control Tower")
    nxr_img = Image.open('public/storage/media/products/1710417916_NXR-1800.jpg')
    nxr_cut = clean_alpha_cutout(nxr_img, thresh=235)
    nw = 550
    nh = int(nw * (nxr_cut.size[1] / float(nxr_cut.size[0])))
    nxr_scaled = nxr_cut.resize((nw, nh), Image.Resampling.LANCZOS)
    nx_x = 920
    nx_y = plate_y + 40
    
    s1 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd1 = ImageDraw.Draw(s1)
    sd1.ellipse([nx_x + 30, nx_y + nh - 25, nx_x + nw - 30, nx_y + nh + 30], fill=(0, 0, 0, 230))
    s1 = s1.filter(ImageFilter.GaussianBlur(22))
    canvas.alpha_composite(s1)
    canvas.alpha_composite(nxr_scaled, (nx_x, nx_y))
    
    # Kenwood Mobile Dispatch Unit with screen "1--DISPATCH"
    mob_img = Image.open('public/storage/media/products/1710415993_NX-1800.png')
    mob_cut = clean_alpha_cutout(mob_img, thresh=235)
    mw = 380
    mh = int(mw * (mob_cut.size[1] / float(mob_cut.size[0])))
    mob_scaled = mob_cut.resize((mw, mh), Image.Resampling.LANCZOS)
    mx = 1490
    my = plate_y + 50
    
    s2 = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    sd2 = ImageDraw.Draw(s2)
    sd2.ellipse([mx + 20, my + mh - 20, mx + mw - 20, my + mh + 25], fill=(0, 0, 0, 230))
    s2 = s2.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(s2)
    canvas.alpha_composite(mob_scaled, (mx, my))
    
    # Left vignette for hero text
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
    print("Banner 4 polished.")

if __name__ == '__main__':
    polish_banner3()
    polish_banner4()
