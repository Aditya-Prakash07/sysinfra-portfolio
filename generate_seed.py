#!/usr/bin/env python3
"""
Comprehensive sysinfra.in product seeder
Seeds all categories, subcategories, and products with correct images.
Runs: php artisan tinker --execute="..."
"""
import subprocess
import json

# ─────────────────────────────────────────────────────────────────────────────
# FULL PRODUCT CATALOGUE from sysinfra.in
# ─────────────────────────────────────────────────────────────────────────────
CATEGORIES = [
    {
        "name": "Energy Management & Controllers",
        "slug": "energy-management-controllers",
        "description": "ISO-certified AMF panels, solar hybrid controllers, LVD units, and smart energy management systems for telecom towers and DG sets.",
        "thumbnail_path": "img/productIconImg/energyMgtImg.png",
        "products": [
            {
                "name": "AMF Panel (Indoor Shelter Spec)",
                "slug": "amf-panel-indoor",
                "short_description": "Automated Mains Failure panel designed for indoor telecom shelter environments with DG auto-start, load transfer, and genset protection.",
                "description": "The SISPL AMF Panel (Indoor Shelter Spec) is an ISO-certified Automatic Mains Failure controller engineered specifically for indoor telecom shelter environments. It provides fully automated DG start/stop, seamless mains-to-DG load transfer, overload and short-circuit protection, and remote status monitoring via GPRS. Compatible with all standard DG sets up to 500 kVA. Deployed across 70,000+ telecom tower sites for Airtel, Indus, and ATC.",
                "cover_image_path": "img/iprotect-Img/amf-panelindoor.png",
                "icon_path": "img/productIconImg/Amf pannel(Indoor).png",
            },
            {
                "name": "AMF Panel (Outdoor Weatherproof Enclosure)",
                "slug": "amf-panel-outdoor",
                "short_description": "Outdoor IP55-rated weatherproof AMF enclosure for ground-mounted DG sets at BTS tower sites exposed to harsh climatic conditions.",
                "description": "Designed for harsh outdoor environments, the SISPL Outdoor AMF Panel features an IP55-rated powder-coated enclosure, automatic DG start on mains failure, load shedding, and dual-phase sensing. It supports remote monitoring via GPRS and integrates with SYS-AXS NOC for real-time site visibility. Tested to withstand temperature ranges from -10°C to +55°C.",
                "cover_image_path": "img/iprotect-Img/main-Amf-img.png",
                "icon_path": "img/productIconImg/Amf pannel(Outdoor).png",
            },
            {
                "name": "AMF Panel for Solar Cell Site",
                "slug": "amf-panel-solar",
                "short_description": "Three-way AMF controller managing mains, DG, and solar/battery sources for hybrid green energy telecom sites.",
                "description": "The Solar Cell Site AMF Panel manages three power sources — EB mains, diesel generator, and solar/battery BESS — with intelligent priority-based load switching. It maximises solar utilisation while ensuring zero downtime for critical telecom loads. Features energy logging, SOC-based DG start, and full GPRS telemetry to SYS-AXS NOC.",
                "cover_image_path": "img/iprotect-Img/controller1.jpg",
                "icon_path": "img/productIconImg/energyController.png",
            },
            {
                "name": "Retrofit AMF Controller",
                "slug": "retrofit-amf-controller",
                "short_description": "Drop-in retrofit AMF controller to upgrade legacy manual or relay-based DG panels to full automatic operation.",
                "description": "The SISPL Retrofit AMF Controller is a compact, plug-and-play solution that converts manual or relay-based genset panels into fully automated AMF systems without panel replacement. It supports RS485/GPRS communication for SYS-AXS NOC integration, DG runtime logging, and multi-site centralised monitoring. Reduces OPEX by eliminating manual DG start interventions.",
                "cover_image_path": "img/iprotect-Img/retrofitcontroller.jpg",
                "icon_path": "img/productIconImg/RetrofitController.png",
            },
            {
                "name": "Dual DG Controller",
                "slug": "dual-dg-controller",
                "short_description": "Controller for tower sites running two DG sets in alternating or load-sharing mode with automatic changeover.",
                "description": "The Dual DG Controller manages two diesel generators with automatic changeover, run-hour equalisation, and parallel load-sharing capability. Ideal for high-availability BTS sites requiring N+1 DG redundancy. Features individual DG health monitoring, fail-to-start detection, and full GPRS/SYS-AXS integration.",
                "cover_image_path": "img/iprotect-Img/dctocdconverter.jpg",
                "icon_path": "img/productIconImg/dualDGcontroller.png",
            },
            {
                "name": "Universal AC Controller",
                "slug": "universal-ac-controller",
                "short_description": "Intelligent air-conditioner controller for telecom shelters with scheduling, temperature management, and GPRS monitoring.",
                "description": "The Universal AC Controller provides intelligent management of precision air-conditioning units in telecom shelters. It monitors inlet/outlet temperature, implements duty-cycle rotation for dual-AC configurations, controls thermostat setpoints remotely, and reports AC fault alarms via SYS-AXS NOC. Compatible with all major brands including Voltas, Bluestar, and Daikin.",
                "cover_image_path": "img/iprotect-Img/remotemonitoringsystem.jpg",
                "icon_path": "img/productIconImg/UniversalACcontroller.png",
            },
            {
                "name": "LVD Controller (Low Voltage Disconnect)",
                "slug": "lvd-controller",
                "short_description": "Battery protection unit that disconnects non-critical DC loads when VRLA/Li-ion battery voltage falls below threshold.",
                "description": "The SISPL LVD Controller monitors battery voltage in real time and disconnects non-priority DC loads when voltage drops below a configurable threshold (typically 44V or 47V for 48V VRLA). On mains restoration or DG start, loads reconnect automatically. Prevents deep discharge that shortens battery life and reduces carbon emissions from unnecessary DG runs.",
                "cover_image_path": "img/iprotect-Img/Image1.jpg",
                "icon_path": "img/productIconImg/lvdController.png",
            },
            {
                "name": "DC Energy Meter",
                "slug": "dc-energy-meter",
                "short_description": "High-accuracy DC energy metering for telecom rectifier systems, battery banks, and solar MPPT charge controllers.",
                "description": "The SISPL DC Energy Meter provides precision measurement of DC current, voltage, power, and cumulative energy consumption in telecom power systems. Supports RS485 Modbus and GPRS connectivity for integration with SYS-AXS NOC. Data logging at 15-minute intervals enables energy auditing, carbon credit calculation, and rectifier efficiency analysis.",
                "cover_image_path": "img/iprotect-Img/dcenergymeter.jpg",
                "icon_path": "img/productIconImg/dcenergymeter.png",
            },
            {
                "name": "i2PMS Power Management System",
                "slug": "i2pms-power-management",
                "short_description": "Integrated intelligent power management system combining AMF, LVD, AC controller, and SYS-AXS NOC in a single unit.",
                "description": "The i2PMS (Integrated Intelligent Power Management System) consolidates AMF panel control, LVD battery protection, air-conditioning management, fuel monitoring, and GPRS/SYS-AXS NOC communication into a single compact controller. Designed for next-generation 5G tower deployments where multi-function integration reduces panel count and CAPEX.",
                "cover_image_path": "img/iprotect-Img/Image3.jpg",
                "icon_path": "img/productIconImg/i2pmsSubsitute.png",
            },
            {
                "name": "Pluto Alternate Controller",
                "slug": "pluto-alternate-controller",
                "short_description": "Advanced multi-source energy controller with grid/DG/solar/battery source management and demand response.",
                "description": "The Pluto Alternate Controller is SISPL's advanced multi-source power controller supporting up to 4 energy inputs (EB grid, DG, solar, and BESS) with intelligent priority switching and demand response. Features predictive battery health management, generator exercise scheduling, and full telemetry via SYS-AXS NOC.",
                "cover_image_path": "img/iprotect-Img/Image4.jpg",
                "icon_path": "img/productIconImg/plutoAlternate.png",
            },
            {
                "name": "Z-Brainer Intelligent Controller",
                "slug": "z-brainer-controller",
                "short_description": "Next-generation microprocessor-based site controller with AI-assisted fault prediction and predictive maintenance alerts.",
                "description": "The Z-Brainer is SISPL's flagship next-generation intelligent site controller, powered by a 32-bit ARM microprocessor with AI-assisted anomaly detection. It monitors all site parameters, predicts equipment failures before they occur, automatically schedules preventive maintenance, and provides real-time dashboards via SYS-AXS NOC. Supports OTA firmware updates.",
                "cover_image_path": "img/iprotect-Img/zbrainer.jpg",
                "icon_path": "img/productIconImg/z-brainer.png",
            },
            {
                "name": "Module Reconditioning Services",
                "slug": "module-reconditioning",
                "short_description": "ISO-certified reconditioning of Emerson, Eltek, Huawei, ZTE, and Nokia rectifier modules to OEM performance specs.",
                "description": "SISPL's rectifier module reconditioning facility in Patparganj Industrial Area has reconditioned over 3,00,000 modules from major brands including Emerson, Eltek, Delta, Huawei, ZTE, and Nokia. Each unit undergoes full disassembly, component-level inspection, power cycling tests, and 72-hour burn-in before delivery. 6-month warranty provided.",
                "cover_image_path": "img/sys-products/5.jpg",
                "icon_path": "img/productIconImg/moduleRecondition.png",
            },
        ],
    },
    {
        "name": "NOC & IoT Automation",
        "slug": "noc-iot-automation",
        "description": "SYS-AXS centralized NOC platform, GPRS data cards, IoT telemetry nodes, and site surveillance solutions for real-time tower monitoring.",
        "thumbnail_path": "img/productIconImg/nocSolutions.png",
        "products": [
            {
                "name": "SYS-AXS NOC Platform",
                "slug": "sys-axs-noc-platform",
                "short_description": "Centralised Network Operations Centre platform for real-time monitoring of 10,000+ telecom tower sites via GPRS/4G telemetry.",
                "description": "The SYS-AXS NOC Platform is SISPL's proprietary centralised monitoring solution that provides real-time visibility into 10,000+ telecom tower sites. It aggregates data from AMF controllers, energy meters, CCTV, fuel sensors, battery monitors, and intrusion alarms via GPRS/4G. Features customisable dashboards, automated alert dispatch via SMS/email, energy analytics, and SLA compliance reporting. Deployed by Bharti Airtel, Indus Towers, and Power Grid Corporation.",
                "cover_image_path": "img/iprotect-Img/remotemonitoringsystem.jpg",
                "icon_path": "img/productIconImg/nocSolutions.png",
            },
            {
                "name": "SIS-AXS IoT Gateway",
                "slug": "sis-axs-iot-gateway",
                "short_description": "Edge IoT gateway connecting field sensors, controllers, and CCTV cameras to the SYS-AXS cloud NOC platform.",
                "description": "The SIS-AXS IoT Gateway is a ruggedised field device that aggregates data from multiple site sensors — energy meters, temperature probes, fuel level sensors, PIR intrusion detectors, and door contacts — and transmits to the SYS-AXS NOC via GPRS/4G. Supports Modbus RTU/TCP, RS485, CAN Bus, and dry-contact interfaces. Operating temperature: -20°C to +70°C.",
                "cover_image_path": "img/iprotect-Img/Image2.jpg",
                "icon_path": "img/productIconImg/sis-axs.png",
            },
            {
                "name": "Remote Monitoring System (RMS)",
                "slug": "remote-monitoring-system",
                "short_description": "GPRS-based remote monitoring system for real-time site parameter visibility and alarm management at telecom tower sites.",
                "description": "The SISPL Remote Monitoring System (RMS) provides GPRS-based real-time monitoring of all critical site parameters including mains status, DG runtime, battery voltage, rectifier output, temperature, and intrusion alarms. Web-based dashboard with mobile-responsive interface allows NOC operators and field engineers to view site health from anywhere. Integrates with SYS-AXS NOC.",
                "cover_image_path": "img/iprotect-Img/remotemonitoringsystem.jpg",
                "icon_path": "img/productIconImg/rms.png",
            },
            {
                "name": "i-Protect Security & Anti-Theft Node",
                "slug": "i-protect-security-node",
                "short_description": "AI-powered PIR intrusion detection, cable theft prevention, CCTV integration, and instant SMS alert node for telecom towers.",
                "description": "The i-Protect node is SISPL's comprehensive security and anti-theft solution for unmanned telecom tower sites. It integrates dual PIR motion detectors, door/hatch magnetic sensors, cable theft vibration sensors, CCTV relay control, and an 80dB siren into a single IoT device. Alerts are dispatched instantly via SMS, email, and SYS-AXS NOC dashboard. Solar-powered option available for off-grid sites.",
                "cover_image_path": "img/iprotect-Img/Image5.jpg",
                "icon_path": "img/productIconImg/i-protect.png",
            },
            {
                "name": "5G Smart Cell Box Enclosure",
                "slug": "5g-smart-cell-box",
                "short_description": "Weather-hardened 5G small-cell outdoor enclosure with integrated power management, thermal control, and IoT monitoring.",
                "description": "The SISPL 5G Smart Cell Box is a purpose-built outdoor enclosure for 5G small-cell and FWA radio units. It features IP65-rated weatherproof construction, active thermal management, integrated power distribution, POE+ switches, and full SYS-AXS NOC monitoring. Designed for fast deployment on street furniture, rooftops, and lamp posts across smart-city corridors.",
                "cover_image_path": "img/iprotect-Img/Image6.jpg",
                "icon_path": "img/productIconImg/smartBoxIcon.png",
            },
            {
                "name": "GPRS Data Card Module",
                "slug": "gprs-data-card",
                "short_description": "Embedded GPRS/GSM data card for adding cellular connectivity to legacy AMF panels and site controllers.",
                "description": "The SISPL GPRS Data Card is a plug-in module that adds GSM/GPRS cellular connectivity to existing AMF panels and site controllers lacking built-in communication. It supports TCP/IP, UDP, and SMS protocols, enabling SYS-AXS NOC integration. Quad-band GSM (850/900/1800/1900 MHz) with SIM slot and external antenna connector.",
                "cover_image_path": "img/iprotect-Img/gprsCard.jpg",
                "icon_path": "img/productIconImg/gprsCard.png",
            },
            {
                "name": "GPRS External Modem",
                "slug": "gprs-external-modem",
                "short_description": "Industrial-grade external GPRS modem for RS232/RS485 serial connectivity to field equipment and SYS-AXS NOC.",
                "description": "The SISPL GPRS External Modem provides robust industrial cellular connectivity for AMF controllers, energy meters, and other RS232/RS485-equipped field devices. DIN-rail mountable, 9-30V DC powered, with watchdog auto-reconnect. Supports TCP/UDP/PPP and is fully compatible with SISPL's SYS-AXS NOC data protocol.",
                "cover_image_path": "img/iprotect-Img/Image1.jpg",
                "icon_path": "img/productIconImg/gprsModem.png",
            },
            {
                "name": "CAN Bus to RS485 Converter",
                "slug": "canbus-rs485-converter",
                "short_description": "Protocol converter bridging CAN Bus (J1939/CANOpen) DG set ECUs to RS485 Modbus for NOC integration.",
                "description": "The SISPL CAN Bus to RS485 Converter bridges modern diesel generator ECUs — which communicate via J1939 or CANOpen CAN protocols — to RS485 Modbus RTU for integration with SISPL AMF controllers and SYS-AXS NOC. Enables real-time DG telemetry including fuel consumption, coolant temperature, RPM, oil pressure, and fault codes without OEM software.",
                "cover_image_path": "img/iprotect-Img/Image2.jpg",
                "icon_path": "img/productIconImg/canbusConverter.png",
            },
            {
                "name": "SVR Card (Site Visit Record)",
                "slug": "svr-card",
                "short_description": "Electronic site visit recording card that logs field engineer visits with timestamp, GPS location, and digital signature.",
                "description": "The SVR Card is an electronic site visit verification system that replaces paper-based field visit registers. Field engineers tap their NFC-enabled ID card on the SVR reader at the tower site, logging a time-stamped visit record with GPS coordinates. Records are transmitted to SYS-AXS NOC in real time, enabling TowerCo SLA compliance verification and field force management.",
                "cover_image_path": "img/iprotect-Img/Image3.jpg",
                "icon_path": "img/productIconImg/svrCard.png",
            },
            {
                "name": "Alarm Monitoring Card",
                "slug": "alarm-monitoring-card",
                "short_description": "Multi-input dry-contact alarm monitoring card for integrating third-party site alarms into the SYS-AXS NOC platform.",
                "description": "The SISPL Alarm Monitoring Card accepts up to 16 dry-contact inputs from third-party equipment — rectifiers, batteries, temperature alarms, fuel-level switches, and door contacts — and transmits status to SYS-AXS NOC via GPRS. Configurable alarm labels, severity levels, and escalation rules. Compatible with all major OEM rectifier systems.",
                "cover_image_path": "img/iprotect-Img/Image4.jpg",
                "icon_path": "img/productIconImg/alrmCard1.png",
            },
            {
                "name": "Nano MAC Controller",
                "slug": "nano-mac-controller",
                "short_description": "Ultra-compact microcontroller for small-footprint indoor telecom sites with limited rack space.",
                "description": "The Nano MAC is SISPL's most compact site controller, designed for indoor cabinets and limited rack-space deployments such as FTTH exchange points, indoor DAS hubs, and enterprise server rooms. Despite its 1U form factor, it provides full AMF, LVD, temperature monitoring, and GPRS connectivity to SYS-AXS NOC.",
                "cover_image_path": "img/iprotect-Img/Image5.jpg",
                "icon_path": "img/productIconImg/nanoMac.png",
            },
            {
                "name": "Voice Message Service Unit",
                "slug": "voice-message-service",
                "short_description": "Automated voice call and SMS dispatch unit for critical site alarms requiring human acknowledgement.",
                "description": "The SISPL Voice Message Service Unit automatically places outbound voice calls to pre-configured NOC operators and field engineers when critical site alarms are triggered. It plays pre-recorded voice messages describing the alarm type, site ID, and GPS location, and logs acknowledgement keypress responses. Escalates to the next contact if unanswered within a timeout.",
                "cover_image_path": "img/iprotect-Img/Image6.jpg",
                "icon_path": "img/productIconImg/voicemessageServices.png",
            },
            {
                "name": "GPS Vehicle Tracker",
                "slug": "gps-vehicle-tracker",
                "short_description": "Real-time GPS tracking device for field maintenance vehicles, fuel tankers, and asset tracking.",
                "description": "The SISPL GPS Vehicle Tracker provides real-time location tracking of field maintenance vehicles, diesel tankers, and mobile assets via 4G/GPS. Features geo-fencing alerts, trip history, ignition sensing, fuel-tank level monitoring, and driver behaviour analytics. Integrates with SYS-AXS NOC for unified fleet and site operations visibility.",
                "cover_image_path": "img/iprotect-Img/portablemobile.png",
                "icon_path": "img/productIconImg/rms.png",
            },
            {
                "name": "Site Maintenance Services",
                "slug": "site-maintenance-services",
                "short_description": "Comprehensive O&M and preventive maintenance services for telecom tower sites across India.",
                "description": "SISPL provides end-to-end Operation & Maintenance (O&M) and Preventive Maintenance (PM) services for telecom tower sites. Services include DG servicing, battery replacement, rectifier module reconditioning, cleaning of air-conditioning filters, earthing audits, and SYS-AXS NOC parameter verification. SLA-bound contracts available with 4-hour and 8-hour response time options.",
                "cover_image_path": "img/sys-products/6.jpg",
                "icon_path": "img/productIconImg/siteMaintanance.png",
            },
        ],
    },
    {
        "name": "Defence, Tactical & Specialized",
        "slug": "defence-tactical-specialized",
        "description": "Authorized Motorola Solutions channel partner for MOTOTRBO tactical radios, APX encrypted handsets, and Automatic Weather Stations for defence and para-military.",
        "thumbnail_path": "img/productIconImg/strategicProducts.png",
        "products": [
            {
                "name": "Motorola MOTOTRBO DP Series Radios",
                "slug": "motorola-mototrbo-dp-series",
                "short_description": "Motorola Solutions MOTOTRBO DP4800e/DP4801e encrypted DMR digital portable radios for secure commercial and tactical operations.",
                "description": "As an authorized Motorola Solutions Channel Partner, SISPL supplies the full MOTOTRBO DP Series line of digital portable radios. The DP4800e and DP4801e feature AES-256 enhanced privacy, IP67 dust and waterproofing, Bluetooth 4.0 for accessories, and integrated GPS. Ideal for para-military, industrial security, and critical infrastructure operations across India.",
                "cover_image_path": "img/sys-products/2.jpg",
                "icon_path": "img/productIconImg/strategicProducts.png",
            },
            {
                "name": "Motorola APX Tactical Encrypted Radios",
                "slug": "motorola-apx-tactical",
                "short_description": "Motorola APX 8000 series P25 Phase 2 mission-critical encrypted portable radios for defence, BSF, CISF, and para-military forces.",
                "description": "The Motorola APX 8000 All-Band portable radio supports P25 Phase 1/2, DMR, and analog operation in a single device. It features DES/AES hardware encryption, MIL-STD-810H military durability, full-keypad and voice control, and integrated WiFi for configuration. SISPL supplies these to para-military organisations, defence establishments, and critical infrastructure operators.",
                "cover_image_path": "img/sys-products/7.jpg",
                "icon_path": "img/productIconImg/strategicProducts.png",
            },
            {
                "name": "Automatic Weather Station (AWS)",
                "slug": "automatic-weather-station",
                "short_description": "Precision meteorological station measuring wind speed, direction, rainfall, temperature, humidity, and atmospheric pressure for defence and research.",
                "description": "The SISPL Automatic Weather Station (AWS) is a precision meteorological instrument measuring wind speed, wind direction, rainfall, ambient temperature, relative humidity, solar radiation, and atmospheric pressure. Used by the Indian Armed Forces for tactical meteorological intelligence, the India Meteorological Department, and research institutions. Data transmitted via GPRS to centralised AWS management software.",
                "cover_image_path": "img/sys-products/8.jpg",
                "icon_path": "img/productIconImg/strategicProducts.png",
            },
            {
                "name": "Defence Tactical Communication Systems",
                "slug": "defence-tactical-communication",
                "short_description": "Ruggedised tactical VHF/UHF communication systems, portable repeaters, and high-altitude encrypted voice/data transceivers for armed forces.",
                "description": "SISPL supplies ruggedised tactical VHF/UHF communication equipment for the Indian Armed Forces and para-military organisations including BSF, CRPF, CISF, and NSG. Products include high-altitude manpack transceivers, portable vehicle-mounted repeaters, encrypted tactical intercom systems, and dual-band antenna solutions. Supply includes installation, training, and AMC support.",
                "cover_image_path": "img/sys-products/9.jpg",
                "icon_path": "img/productIconImg/strategicProducts.png",
            },
        ],
    },
    {
        "name": "Power Infrastructure Solutions",
        "slug": "power-infrastructure-solutions",
        "description": "DC power supply systems, SMPS rectifiers, battery management, and power quality solutions for telecom and critical infrastructure.",
        "thumbnail_path": "img/productIconImg/energyMgtImg.png",
        "products": [
            {
                "name": "DC Power Supply System (48V SMPS)",
                "slug": "dc-power-supply-48v",
                "short_description": "48V DC SMPS rectifier system with hot-swappable modules for BTS, DAS, and telecom exchange power applications.",
                "description": "SISPL's 48V DC SMPS Power Supply System provides stable, regulated DC power for BTS, small cells, DAS, and exchange equipment. Features hot-swappable rectifier modules, N+1 redundancy, power factor correction >0.99, and full GPRS monitoring via SYS-AXS NOC. Available in 200A, 300A, 400A, and 600A configurations. Compliant with ITU-T K.21 and TRAI requirements.",
                "cover_image_path": "img/sys-products/5.jpg",
                "icon_path": "img/productIconImg/energyMgtImg.png",
            },
            {
                "name": "O&M Support Services",
                "slug": "om-support-services",
                "short_description": "Annual maintenance contracts for rectifier systems, AMF panels, and NOC telemetry equipment across telecom tower estates.",
                "description": "SISPL's O&M Support Services provide comprehensive annual maintenance contracts (AMC) for rectifier modules, AMF panels, SYS-AXS NOC hardware, and battery systems across large telecom tower estates. Services include quarterly PM visits, emergency breakdown support (4-hour SLA), spare-parts inventory management, and detailed MIS reporting to TowerCo NOC teams.",
                "cover_image_path": "img/sys-products/6.jpg",
                "icon_path": "img/productIconImg/o&mSupport.png",
            },
        ],
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# Generate PHP Artisan Tinker seeding code
# ─────────────────────────────────────────────────────────────────────────────
php_code = """
use App\\Models\\ProductCategory;
use App\\Models\\ProductSubcategory;
use App\\Models\\PortfolioItem;
use Illuminate\\Support\\Str;

// Wipe existing data
PortfolioItem::truncate();
ProductSubcategory::truncate();
ProductCategory::truncate();
echo "Cleared all products, subcategories, categories.\\n";

"""

cat_data = json.loads(open('/dev/stdin').read()) if False else CATEGORIES

for cat in cat_data:
    cat_name = cat['name'].replace("'", "\\'")
    cat_slug = cat['slug']
    cat_desc = cat['description'].replace("'", "\\'")
    cat_thumb = cat['thumbnail_path']
    
    php_code += f"""
$cat = ProductCategory::create([
    'name' => '{cat_name}',
    'slug' => '{cat_slug}',
    'description' => '{cat_desc}',
    'thumbnail_path' => '{cat_thumb}',
    'is_active' => true,
    'sort_order' => 0,
]);
echo "Category: " . $cat->name . "\\n";
"""
    
    for product in cat['products']:
        p_name = product['name'].replace("'", "\\'")
        p_slug = product['slug']
        p_short = product['short_description'].replace("'", "\\'")
        p_desc = product['description'].replace("'", "\\'")
        p_cover = product['cover_image_path']
        p_icon = product['icon_path'].replace("'", "\\'")
        
        php_code += f"""
PortfolioItem::create([
    'name' => '{p_name}',
    'slug' => '{p_slug}',
    'short_description' => '{p_short}',
    'description' => '{p_desc}',
    'cover_image_path' => '{p_cover}',
    'is_featured' => false,
    'is_published' => true,
    'sort_order' => 0,
    'category_id' => $cat->id,
    'subcategory_id' => null,
]);
echo "  Product: {p_name[:40]}\\n";
"""

php_code += """
echo "\\nTotal Products: " . PortfolioItem::count() . "\\n";
echo "Total Categories: " . ProductCategory::count() . "\\n";
"""

# Write to temp file
with open('/tmp/seed_sysinfra.php', 'w') as f:
    f.write(php_code)

print("Generated seed script with:")
total_products = sum(len(c['products']) for c in CATEGORIES)
print(f"  {len(CATEGORIES)} categories")
print(f"  {total_products} products")
print(f"  Saved to /tmp/seed_sysinfra.php")
print(f"  Script size: {len(php_code)} bytes")
