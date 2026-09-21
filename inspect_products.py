#!/usr/bin/env python3
"""Scrape sysinfra.in products.php to extract all product names and images"""
import urllib.request
import re
import json

HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode('utf-8', errors='ignore')

html = fetch("https://sysinfra.in/products.php")
print(f"Fetched {len(html)} bytes from products.php")

# Extract product icon images
icons = re.findall(r'src=["\']([^"\']+productIconImg[^"\']+)["\']', html)
print(f"\nProduct icons ({len(icons)}):")
for icon in icons:
    print(f"  {icon}")

# Extract headings
headings = re.findall(r'<h[2-6][^>]*>([^<]{5,100})<', html)
print(f"\nHeadings ({len(headings)}):")
for h in headings[:30]:
    print(f"  {h.strip()}")

# Extract paragraphs with content
paras = re.findall(r'<p[^>]*>([^<]{50,400})<', html)
print(f"\nParagraphs ({len(paras)}):")
for p in paras[:10]:
    print(f"  {p.strip()[:100]}")

# Try homepage too for product names in product cards
html2 = fetch("https://sysinfra.in/")
icons2 = re.findall(r'src=["\']([^"\']+productIconImg[^"\']+)["\']', html2)
# Find anchor text near each icon
# Look for pattern: img tag followed by heading text in nearby anchor
product_blocks = re.findall(r'<img[^>]+productIconImg[^>]+>.*?<[ha][^>]*>([^<]{5,80})<', html2, re.DOTALL)
print(f"\nProduct blocks from homepage ({len(product_blocks)}):")
for pb in product_blocks[:20]:
    print(f"  {pb.strip()}")

# Save raw HTML for manual inspection
with open('/tmp/sysinfra_products.html', 'w') as f:
    f.write(html[:50000])
print("\nSaved first 50KB to /tmp/sysinfra_products.html")
