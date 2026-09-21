#!/usr/bin/env python3
"""
Fix all remaining Sanchar/radio-specific text across sysinfra project JSX files.
"""
import os
import re

BASE = '/Users/adityaprakash/Sites/sysinfra/resources/js'

REPLACEMENTS = [
    # ── Seo.jsx ────────────────────────────────────────────────────────────────
    (
        "System Infra Solutions is India's premier manufacturer and turnkey supplier of DMR, TETRA, PoC over Cellular, and Railway LTE-R communication systems.",
        "System Infra Solutions (SISPL) is India's ISO-certified manufacturer of AMF power controllers, SYS-AXS NOC telemetry platforms, 5G smart enclosures, and Motorola Solutions tactical radios."
    ),
    (
        "DMR walkie talkie India, license free walkie talkie, WPC approved radios, TETRA supplier India, PoC LTE terminals, Diamond antenna India, Kenwood communication equipment",
        "AMF controller India, telecom power automation, SYS-AXS NOC platform, 5G smart box enclosure, solar hybrid AMF panel, Motorola Solutions India, SISPL energy management, tower automation"
    ),
    # ── About.jsx ──────────────────────────────────────────────────────────────
    (
        "System Infra Solutions is a market leader in mission-critical wireless communications in India. We pioneer in offering world-class wireless communication solutions to customers around the country.",
        "System Infra Solutions Pvt. Ltd. (SISPL) is a market leader in telecom power automation and NOC telemetry in India. We manufacture ISO-certified AMF controllers, SYS-AXS platforms, and 5G smart enclosures for tower operators and defence establishments."
    ),
    (
        "DMR &bull; TETRA &bull; PoC &bull; LTE-R",
        "AMF &bull; NOC &bull; 5G &bull; Defence"
    ),
    (
        "Turnkey communication systems delivered for public safety, transit, and heavy industry.",
        "Turnkey energy management and automation systems for telecom towers and defence."
    ),
    (
        "We collaborate with the world&rsquo;s leading Original Equipment Manufacturers (OEMs) and technology providers to bring best-in-class communication solutions to India. We are a leading manufacturer of LTE MCX, LTE PoC, and DMR radios in India.",
        "We collaborate with world-leading OEMs including Motorola Solutions to deliver cutting-edge tactical radios, Automatic Weather Stations, and mission-critical hardware across India."
    ),
    (
        "Sysinfra excels in offering mission-critical communication solutions to diverse sectors such as public safety, railways, utility companies, and industrial houses with DMR, TETRA, analog radio, and LTE technologies.",
        "SISPL excels in delivering mission-critical power automation, NOC telemetry, and tactical communication solutions to telecom operators, defence establishments, railways, and utility companies across India."
    ),
    # ── Careers.jsx ────────────────────────────────────────────────────────────
    (
        'Join System Infra Solutions. Build the wireless and telecom infrastructure that protects India\'s borders, public safety, and critical industries.',
        'Join System Infra Solutions. Build the power automation and NOC telemetry infrastructure that keeps India\'s telecom towers, defence sites, and utilities running 24/7.'
    ),
    (
        "DMR &bull; TETRA &bull; PoC &bull; 4G/5G",
        "AMF &bull; NOC &bull; 5G &bull; Defence"
    ),
    (
        "Participate in the design of next-generation DMR handhelds, base repeaters, and tactical push-to-talk PoC terminals designed and manufactured right here in India.",
        "Participate in the design of next-generation AMF controllers, SYS-AXS NOC platforms, and tactical Motorola Solutions radios — designed and manufactured in our Patparganj facility."
    ),
    # ── Products/Index.jsx ─────────────────────────────────────────────────────
    (
        "Browse DMR, TETRA, P25, PoC over Cellular, LTE-R, and Diamond antenna equipment from System Infra Solutions.",
        "Browse AMF controllers, SYS-AXS NOC platforms, 5G smart enclosures, tactical radios, and energy management systems from System Infra Solutions."
    ),
    (
        "Engineered for defense, public safety, high-speed rail, and hazardous environments.",
        "Engineered for telecom towers, defence establishments, smart cities, and power utilities."
    ),
    (
        'placeholder="Search products (e.g. ST-200R, PoC, DMR, Diamond)..."',
        'placeholder="Search products (e.g. AMF panel, SYS-AXS, i-Protect, Motorola)..."'
    ),
    (
        "Tip: Try searching by model number (e.g. ST-200R, NX-3220), product family (PoC, DMR, TETRA), or brand (Diamond).",
        "Tip: Try searching by product name (e.g. AMF panel, SYS-AXS), category (Energy, NOC, Defence), or brand (Motorola)."
    ),
    (
        "High-reliability wireless communication equipment engineered for critical operations.",
        "High-reliability telecom power and automation equipment engineered for mission-critical operations."
    ),
    # ── Products/Category.jsx ──────────────────────────────────────────────────
    (
        "wireless communication equipment from System Infra Solutions.",
        "infrastructure solutions from System Infra Solutions."
    ),
    (
        "High-reliability wireless communication equipment engineered for critical operations.",
        "High-reliability telecom power and automation equipment engineered for mission-critical operations."
    ),
    # ── Navbar.jsx ─────────────────────────────────────────────────────────────
    (
        "4G/LTE &bull; Rail LTE-R &bull; Captive",
        "5G &bull; Smart Cities &bull; Towers"
    ),
    # ── WhySysinfraDiagram.jsx ─────────────────────────────────────────────────
    (
        "Military-grade AES-256 bit hardware voice and data encryption complying with homeland security and defense protocols.",
        "AES-256 encrypted communication complying with defence and strategic communication protocols for mission-critical deployments."
    ),
    (
        "Next-generation DMR Tier III trunking, Railway LTE-R cab radios, MCPTT mission-critical push-to-talk, and hybrid grids.",
        "MOTOTRBO DMR trunking, Motorola APX tactical radios, SYS-AXS NOC telemetry, and 5G smart enclosures for mission-critical sites."
    ),
    # ── HomeSectorData.js ──────────────────────────────────────────────────────
    (
        "Mission-Critical DMR, P25 & Tactical Transceivers",
        "Motorola Solutions & Tactical Defence Systems"
    ),
    (
        "Authorized Motorola Solutions wireless communication hardware, encrypted handhelds, high-altitude repeaters, and Automatic Weather Stations for armed forces and public security.",
        "Authorized Motorola Solutions dealer — MOTOTRBO APX encrypted handhelds, DP series radios, high-altitude repeaters, and Automatic Weather Stations for armed forces and para-military."
    ),
    # ── OemPartners.jsx ────────────────────────────────────────────────────────
    (
        "Digital Mobile Radio (DMR)",
        "MOTOTRBO DMR Systems"
    ),
    (
        "We collaborate with Tier-1 international radio manufacturers, antenna specialists, and tactical audio engineers to engineer turnkey, WPC-certified communication systems for India's defense, public safety, and enterprise sectors.",
        "We collaborate with Motorola Solutions and other Tier-1 manufacturers to deliver ISO-certified AMF systems, SYS-AXS NOC platforms, tactical radios, and 5G enclosures for India's telecom and defence sectors."
    ),
    # ── Contact.jsx ────────────────────────────────────────────────────────────
    (
        "System Infra Solutions products, including Kenwood DMR terminals, are registered and actively available through the GeM portal. For tender compliance authorizations or OEM letters, include your RFP number in the message.",
        "System Infra Solutions products, including AMF controllers and SYS-AXS NOC platforms, are available through the GeM portal. For tender compliance authorizations or OEM letters, include your RFP number."
    ),
]

def fix_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return 0
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    count = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            count += 1
    
    if count:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED {count} strings: {filepath}")
    else:
        print(f"  OK (nothing to change): {filepath}")
    return count

files = [
    f"{BASE}/Components/Seo.jsx",
    f"{BASE}/Components/WhySysinfraDiagram.jsx",
    f"{BASE}/Components/Navbar.jsx",
    f"{BASE}/Pages/Home.jsx",
    f"{BASE}/Pages/HomeSectorData.js",
    f"{BASE}/Pages/About.jsx",
    f"{BASE}/Pages/Careers.jsx",
    f"{BASE}/Pages/Contact.jsx",
    f"{BASE}/Pages/OemPartners.jsx",
    f"{BASE}/Pages/Products/Index.jsx",
    f"{BASE}/Pages/Products/Category.jsx",
    f"{BASE}/Pages/Products/Show.jsx",
]

total = 0
for f in files:
    total += fix_file(f, REPLACEMENTS)

print(f"\nTotal replacements made: {total}")

# Final check for any remaining DMR/TETRA/Sanchar
print("\n=== Remaining Sanchar/radio text ===")
os.system(f"grep -rn 'Sanchar\\|DMR\\|TETRA\\|LTE-R\\|walkie\\|wireless communication\\|homeland security\\|public safety\\|pioneer world' {BASE}/ --include='*.jsx' --include='*.js' | grep -v node_modules | grep -v 'Motorola'")
