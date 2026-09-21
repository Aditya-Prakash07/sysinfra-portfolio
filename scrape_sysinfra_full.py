#!/usr/bin/env python3
"""
Comprehensive scraper for sysinfra.in
Grabs all products, categories, text content, and image paths
"""
import urllib.request
import urllib.parse
import re
import json
import os

BASE = "https://sysinfra.in"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"  ERR fetching {url}: {e}")
        return ""

def clean(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_imgs(html, base_path=""):
    imgs = re.findall(r'src=["\']([^"\']+\.(?:jpg|jpeg|png|gif|webp|svg))["\']', html, re.I)
    result = []
    for img in imgs:
        if img.startswith('http'):
            result.append(img)
        else:
            result.append(f"{BASE}/{img.lstrip('/')}")
    return list(dict.fromkeys(result))  # deduplicate preserving order

# ─────────────────────────────────────────────
print("=== SCRAPING sysinfra.in ===\n")

# 1. Homepage
print("1. Fetching homepage...")
home_html = fetch(BASE + "/")

# Extract all PHP page links
php_links = re.findall(r'href=["\']([^"\']+\.php(?:[^"\']*)?)["\']', home_html)
php_links = [l for l in php_links if not l.startswith('http') or 'sysinfra' in l]
php_links = list(dict.fromkeys([l.split('#')[0].split('?')[0] for l in php_links]))
print(f"   Found {len(php_links)} PHP page links")

# Key pages to scrape
KEY_PAGES = [
    "/products.php",
    "/about.php",
    "/contact.php",
    "/amf-panel.php",
    "/noc-solutions.php",
    "/rms.php",
    "/iprotect.php",
    "/smart-box.php",
    "/strategic-products.php",
    "/defence-products.php",
    "/energy-management.php",
    "/module-recondition.php",
    "/site-maintenance.php",
]

# 2. Products page
print("\n2. Fetching products.php...")
prod_html = fetch(BASE + "/products.php")
prod_links = re.findall(r'href=["\']([^"\']+\.php[^"\']*)["\']', prod_html)
prod_imgs = extract_imgs(prod_html)
print(f"   Found {len(prod_links)} links, {len(prod_imgs)} images")

# Extract product names and icons from products page
# sysinfra uses a gallery layout with icon images and titles
product_items = []
# Find icon+text pairs
icon_sections = re.findall(r'<img[^>]+src=["\']([^"\']+productIconImg[^"\']+)["\'][^>]*>.*?<[hp][^>]*>([^<]+)<', prod_html, re.S)
for img, title in icon_sections:
    if title.strip() and len(title.strip()) > 3:
        product_items.append({'icon': img.strip(), 'name': title.strip()})

# Also try to find product links
prod_php_links = [l for l in prod_links if '.php' in l and l not in ['/', '#', 'index.php']]
unique_pages = list(dict.fromkeys(prod_php_links))
print(f"   Product-page links: {unique_pages[:20]}")

# 3. Scrape individual product pages
print("\n3. Scraping individual product pages from sysinfra.in...")
PRODUCT_PAGES = [
    ("amf-panel-indoor.php", "AMF Panel (Indoor)", "Energy Management & Controllers"),
    ("amf-panel-outdoor.php", "AMF Panel (Outdoor Weatherproof)", "Energy Management & Controllers"),
    ("amf-panel-solar.php", "AMF Panel For Solar Cell Site", "Energy Management & Controllers"),
    ("rms.php", "Remote Monitoring System (RMS)", "NOC & IoT Automation"),
    ("retrofit-controller.php", "Retrofit AMF Controller", "Energy Management & Controllers"),
    ("dual-dg-controller.php", "Dual DG Controller", "Energy Management & Controllers"),
    ("universal-ac-controller.php", "Universal AC Controller", "Energy Management & Controllers"),
    ("lvd-controller.php", "LVD Controller (Low Voltage Disconnect)", "Energy Management & Controllers"),
    ("dc-energy-meter.php", "DC Energy Meter", "Energy Management & Controllers"),
    ("energy-controller.php", "Smart Energy Controller", "Energy Management & Controllers"),
    ("gprs-card.php", "GPRS / GSM Data Card", "NOC & IoT Automation"),
    ("gprs-modem.php", "GPRS External Modem", "NOC & IoT Automation"),
    ("canbus-converter.php", "CAN Bus to RS485 Converter", "NOC & IoT Automation"),
    ("svr-card.php", "SVR (Site Visit Record) Card", "NOC & IoT Automation"),
    ("alarm-card.php", "Alarm Monitoring Card", "NOC & IoT Automation"),
    ("nano-mac.php", "Nano MAC Controller", "NOC & IoT Automation"),
    ("noc-solutions.php", "SYS-AXS Centralized NOC Platform", "NOC & IoT Automation"),
    ("iprotect.php", "i-Protect Security & Anti-Theft Node", "NOC & IoT Automation"),
    ("smart-box.php", "5G Smart Cell Box Enclosure", "NOC & IoT Automation"),
    ("strategic-products.php", "Motorola Solutions Tactical Radios", "Defence, Tactical & Specialized"),
    ("z-brainer.php", "Z-Brainer Intelligent Controller", "Energy Management & Controllers"),
    ("pluto-alternate.php", "Pluto Alternate Controller", "Energy Management & Controllers"),
    ("i2pms.php", "i2PMS Power Management System", "Energy Management & Controllers"),
    ("voice-message.php", "Voice Message Service Unit", "NOC & IoT Automation"),
    ("weather-station.php", "Automatic Weather Station", "Defence, Tactical & Specialized"),
    ("gps-tracker.php", "GPS Vehicle Tracker", "NOC & IoT Automation"),
    ("power-supply.php", "Power Supply Systems", "Energy Management & Controllers"),
    ("module-recondition.php", "Module Reconditioning Services", "Energy Management & Controllers"),
    ("site-maintenance.php", "Site Maintenance Services", "NOC & IoT Automation"),
    ("defence-products.php", "Defence Tactical Equipment", "Defence, Tactical & Specialized"),
]

scraped_products = []
for page_file, fallback_name, category in PRODUCT_PAGES:
    url = f"{BASE}/{page_file}"
    html = fetch(url)
    if not html or len(html) < 500:
        # Try alternate URL patterns
        alt = page_file.replace('.php', '').replace('-', '_')
        html = fetch(f"{BASE}/{alt}.php")
    
    if html and len(html) > 500:
        # Extract title
        title_m = re.search(r'<title>([^<]+)</title>', html, re.I)
        h1_m = re.search(r'<h[12][^>]*>([^<]+)</h[12]>', html, re.I)
        name = (h1_m.group(1).strip() if h1_m else (title_m.group(1).split('|')[0].strip() if title_m else fallback_name))
        name = name or fallback_name
        
        # Extract description paragraphs
        paras = re.findall(r'<p[^>]*>([^<]{40,})</p>', html, re.I)
        desc = ' '.join(clean(p) for p in paras[:3] if len(clean(p)) > 30)
        
        # Extract images
        page_imgs = re.findall(r'src=["\']([^"\']+\.(?:jpg|png|jpeg))["\']', html, re.I)
        page_imgs = [i for i in page_imgs if 'productIconImg' not in i and 'brand' not in i]
        cover = page_imgs[0] if page_imgs else ''
        if cover and not cover.startswith('/'):
            cover = cover.lstrip('/')
        
        scraped_products.append({
            'name': name[:100],
            'category': category,
            'description': desc[:500] if desc else f"{name} by System Infra Solutions Pvt. Ltd.",
            'cover_image': cover,
            'page': page_file,
            'found': True
        })
        print(f"   OK  {page_file}: {name[:50]}")
    else:
        scraped_products.append({
            'name': fallback_name,
            'category': category,
            'description': f"{fallback_name} manufactured and supplied by System Infra Solutions Pvt. Ltd. (SISPL).",
            'cover_image': '',
            'page': page_file,
            'found': False
        })
        print(f"   404 {page_file}: using fallback")

# 4. Homepage content
print("\n4. Extracting homepage text blocks...")
home_paras = re.findall(r'<p[^>]*class=["\'][^"\']*["\'][^>]*>([^<]{30,})</p>', home_html, re.I)
home_stats = re.findall(r'(\d[\d,\+]+)\s*<[^>]*>([^<]{5,30})<', home_html, re.I)

print(f"   Found {len(home_paras)} paragraphs, {len(home_stats)} stat items")
for s in home_stats[:10]:
    print(f"   STAT: {s[0]} — {s[1].strip()}")

# 5. About page
print("\n5. Fetching about.php...")
about_html = fetch(BASE + "/about.php")
about_paras = re.findall(r'<p[^>]*>([^<]{50,})</p>', about_html, re.I)
about_text = ' | '.join(clean(p) for p in about_paras[:5])
print(f"   About text snippet: {about_text[:200]}")

# Save results
output = {
    'products': scraped_products,
    'about_snippet': about_text[:1000],
    'homepage_images': prod_imgs[:30],
    'php_pages_found': unique_pages[:20],
}

out_path = '/Users/adityaprakash/Sites/sysinfra/storage/app/scraped_full.json'
with open(out_path, 'w') as f:
    json.dump(output, f, indent=2)

print(f"\n=== DONE ===")
print(f"Scraped {len([p for p in scraped_products if p['found']])} of {len(scraped_products)} product pages")
print(f"Output saved to {out_path}")

# Print product summary for DB seeding
print("\n=== PRODUCT SUMMARY FOR SEEDING ===")
for p in scraped_products:
    status = "✓" if p['found'] else "✗"
    print(f"  {status} [{p['category'][:25]:25s}] {p['name'][:50]}")
    if p['cover_image']:
        print(f"       img: {p['cover_image'][:60]}")
