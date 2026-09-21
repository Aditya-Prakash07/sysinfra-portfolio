<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\CompanyStat;
use App\Models\NewsPost;
use App\Models\OemPartner;
use App\Models\PortfolioItem;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seeds categories, rich products, real media assets, leadership profiles,
     * client case studies, and OEM partners for System Infra Solutions (sysinfra.in).
     */
    public function run(): void
    {
        // 0. Super Administrator Account
        User::firstOrCreate(
            ['email' => 'admin@sysinfra.in'],
            [
                'name' => 'System Infra Administrator',
                'password' => Hash::make('Sysinfra@2026!'),
                'role' => User::ROLE_SUPER_ADMIN,
            ]
        );

        // 1. Categories & Subcategories Tree matching official sysinfra.in navigation
        $tree = [
            'Energy Management & Controllers' => [
                'thumbnail' => 'img/course/1.png',
                'description' => 'Automated mains failure switching, solar hybrid controllers, RMS telemetry, and dual DG cycling controllers.',
                'subs' => [
                    'AMF Panels (Indoor & Outdoor)',
                    'Solar Cell Site Controllers',
                    'Remote Monitoring Systems (RMS)',
                    'Dual DG Controllers',
                    'Retrofit AMF & Energy Controllers',
                ],
            ],
            'NOC & IoT Automation' => [
                'thumbnail' => 'img/course/2.png',
                'description' => 'SYS-AXS NOC monitoring platform, anti-theft sensors, fuel telemetry, edge compute nodes, and 5G smart enclosures.',
                'subs' => [
                    'SYS-AXS Platform',
                    'I-Protect Security Node',
                    'Z-Brainer Intelligent Edge',
                    'Smart Box (5G / Small Cell)',
                    'GPRS Modems & Kits',
                ],
            ],
            'Strategic Telecom & Hardware' => [
                'thumbnail' => 'img/course/3.png',
                'description' => 'DC energy meters, static voltage regulators, bus converters, and telecom shelter automation modules.',
                'subs' => [
                    'DC Energy Meters (Class 1)',
                    'Can Bus Converters & SVR Cards',
                    'Universal AC Controllers',
                    'LVD / LATCH Controllers',
                    'Alarm Multiplexers & Nano Mac',
                ],
            ],
            'Defence, Tactical & Specialized' => [
                'thumbnail' => 'img/course/5.png',
                'description' => 'Motorola Solutions authorized tactical communications, automatic weather stations, GPS tracking, and defence maintenance.',
                'subs' => [
                    'Tactical Communication (Motorola Solutions)',
                    'Automatic Weather Station',
                    'GPS Tracking & Smart Cards',
                    'Virtual Terrain Recce & Power Supplies',
                    'SMPS Module Re-conditioning & Services',
                ],
            ],
        ];

        $sort = 0;
        $createdSubs = [];
        foreach ($tree as $categoryName => $catData) {
            $category = ProductCategory::updateOrCreate(
                ['slug' => Str::slug($categoryName)],
                [
                    'name' => $categoryName,
                    'description' => $catData['description'],
                    'thumbnail_path' => $catData['thumbnail'],
                    'sort_order' => $sort++,
                    'is_published' => true,
                ]
            );

            $subSort = 0;
            foreach ($catData['subs'] as $subName) {
                $subSlug = Str::slug($categoryName . '-' . $subName);
                $sub = ProductSubcategory::updateOrCreate(
                    ['slug' => $subSlug],
                    [
                        'product_category_id' => $category->id,
                        'name' => $subName,
                        'description' => "Engineered {$subName} infrastructure solutions for telecom towers, enterprise power, and mission-critical networks.",
                        'sort_order' => $subSort++,
                        'is_published' => true,
                    ]
                );
                $createdSubs[$subName] = $sub;
            }
        }

        // 2. All 30 Genuine Products Scraped from sysinfra.in
        $catalog = [
            // Energy Management & Controllers
            [
                'sub' => 'AMF Panels (Indoor & Outdoor)',
                'name' => 'AMF Panel (Indoor Shelter Spec)',
                'model' => 'SISPL-AMF-IND',
                'desc' => 'SISPL Auto mains failure system (AMF) is one of the flagship products of system infra solutions. It works seamlessly across wide voltage fluctuations with complete automated mains-to-generator switchover and line telemetry.',
                'img' => 'img/iprotect-Img/amf-panelindoor.png',
                'icon' => 'img/productIconImg/Amf pannel(Indoor).png',
                'specs' => [
                    ['label' => 'Application', 'value' => 'Indoor Telecom Shelters & BTS Sites'],
                    ['label' => 'Mains Rating', 'value' => 'Three Phase 415V / Single Phase 230V AC'],
                    ['label' => 'Switchover', 'value' => 'Microcontroller Controlled Dual Interlocked Contactors'],
                    ['label' => 'Protection', 'value' => 'Overvoltage, Undervoltage, Phase Sequence, Overload'],
                ],
            ],
            [
                'sub' => 'AMF Panels (Indoor & Outdoor)',
                'name' => 'AMF Panel (Outdoor Weatherproof Enclosure)',
                'model' => 'SISPL-AMF-OUT',
                'desc' => 'Manufactured at SISPL international-standard Delhi plant, this all-weather IP55 outdoor cabinet executes automated generator cycling, fuel saving algorithms, and surge suppression under harsh field conditions.',
                'img' => 'img/iprotect-Img/main-Amf-img.png',
                'icon' => 'img/productIconImg/Amf pannel(Outdoor).png',
                'specs' => [
                    ['label' => 'Protection Degree', 'value' => 'IP55 Weatherproof Outdoor Sheet Metal'],
                    ['label' => 'Control Algorithm', 'value' => 'Dynamic DG Run-Hour Optimization'],
                    ['label' => 'Surge Protection', 'value' => 'Class B+C Lightning & Surge Arrester SPD'],
                    ['label' => 'Display', 'value' => 'Alphanumeric Backlit LCD Display with Keypad'],
                ],
            ],
            [
                'sub' => 'Solar Cell Site Controllers',
                'name' => 'AMF Panel For Solar Cell Site',
                'model' => 'SISPL-SOLAR-AMF',
                'desc' => 'Hybrid solar-priority AMF controller designed to harvest maximum solar PV energy for cell tower operations before invoking grid lines or diesel generators, delivering up to 45% reduction in carbon footprint.',
                'img' => 'img/iprotect-Img/controller1.jpg',
                'icon' => 'img/productIconImg/Amf pannel(Outdoor).png',
                'specs' => [
                    ['label' => 'PV Input', 'value' => 'Hybrid MPPT Integration up to 15 kW'],
                    ['label' => 'Energy Priority', 'value' => '1. Solar PV -> 2. Battery -> 3. Mains -> 4. DG'],
                    ['label' => 'Battery Sync', 'value' => 'Compatible with VRLA & Li-Ion BMS'],
                    ['label' => 'Telemetry', 'value' => 'Solar Harvest kWh & Carbon Credit Reporting'],
                ],
            ],
            [
                'sub' => 'Remote Monitoring Systems (RMS)',
                'name' => 'Remote Monitoring System (RMS)',
                'model' => 'SISPL-RMS-1U',
                'desc' => 'Rack mountable compact smart device covering 1U 19" standard rack space, designed to sense and generate telemetry alarms, monitor fuel ultrasonic level, battery string voltage, and environmental parameters in real-time.',
                'img' => 'img/iprotect-Img/remotemonitoringsystem.jpg',
                'icon' => 'img/productIconImg/rms.png',
                'specs' => [
                    ['label' => 'Form Factor', 'value' => '1U 19-Inch Standard Rack Mountable'],
                    ['label' => 'Channels', 'value' => '16 Digital Inputs, 8 Analog Inputs, 4 Relay Outputs'],
                    ['label' => 'Uplink', 'value' => '4G/LTE Cat-1, Ethernet, RS485 Modbus'],
                    ['label' => 'Storage', 'value' => 'Offline Flash Memory for 100,000 Timestamped Events'],
                ],
            ],
            [
                'sub' => 'Retrofit AMF & Energy Controllers',
                'name' => 'Retrofit AMF Controller',
                'model' => 'SISPL-AMF-RETRO',
                'desc' => 'Drop-in microprocessor replacement controller engineered to upgrade obsolete or malfunctioning AMF panels without rewiring the power contactor cubicle.',
                'img' => 'img/iprotect-Img/retrofitcontroller.jpg',
                'icon' => 'img/productIconImg/RetrofitController.png',
                'specs' => [
                    ['label' => 'Compatibility', 'value' => 'Universal Pin-Compatible with Major Telecom Panels'],
                    ['label' => 'DG Control', 'value' => 'Auto Crank, Warm-up, Cool-down, Fail-to-Start Alarm'],
                    ['label' => 'Configuration', 'value' => 'Field Programmable Thresholds via Front Panel'],
                ],
            ],
            [
                'sub' => 'Dual DG Controllers',
                'name' => 'Dual DG Controller',
                'model' => 'SISPL-DUAL-DG',
                'desc' => 'Intelligent controller managing two diesel generators in off-grid or poor-grid cell sites, alternating run-hours symmetrically to prevent engine overheating and maintain continuous uptime.',
                'img' => 'img/iprotect-Img/main-Amf-img.png',
                'icon' => 'img/productIconImg/dualDGcontroller.png',
                'specs' => [
                    ['label' => 'Mode', 'value' => 'Mutual Standby with Cyclic Alternation'],
                    ['label' => 'Fault Fallback', 'value' => 'Automatic Switchover to DG2 on DG1 Lockout'],
                    ['label' => 'Equalization', 'value' => 'Programmable Run-Hour Balancing Timer'],
                ],
            ],

            // NOC & IoT Automation
            [
                'sub' => 'SYS-AXS Platform',
                'name' => 'SYS-AXS Centralized NOC Platform',
                'model' => 'SYS-AXS-ENTERPRISE',
                'desc' => 'High-throughput enterprise IoT and NOC gateway orchestrating thousands of remote telecom sites with predictive analytics, real-time map visualization, fuel theft alert sirens, and SLA tracking.',
                'img' => 'img/sys-products/2.jpg',
                'icon' => 'img/productIconImg/sis-axs.png',
                'specs' => [
                    ['label' => 'Capacity', 'value' => 'Over 10,000 Active Sites Monitored Concurrently'],
                    ['label' => 'Architecture', 'value' => 'Cloud / On-Premise Scalable Microservices'],
                    ['label' => 'Security', 'value' => 'TLS 1.3 Encryption, Role-Based Access Control'],
                    ['label' => 'Integrations', 'value' => 'REST APIs, Kafka Streaming, Mobile App Alerts'],
                ],
            ],
            [
                'sub' => 'I-Protect Security Node',
                'name' => 'I-Protect Security Node',
                'model' => 'SISPL-IPROTECT',
                'desc' => 'Intelligent tower security and anti-theft management unit combining RFID electronic door locks, passive infrared (PIR) intrusion detectors, and fuel sensor tamper deterrent.',
                'img' => 'img/iprotect-Img/Image5.jpg',
                'icon' => 'img/productIconImg/i-protect.png',
                'specs' => [
                    ['label' => 'Access', 'value' => 'Smart RFID Badge + NOC Remote Dynamic OTP'],
                    ['label' => 'Sensors', 'value' => 'Dual PIR Motion, Door Contact, Fuel Siphon Sensor'],
                    ['label' => 'Alarm Output', 'value' => '115 dB Siren + Instant Cloud Dispatch'],
                ],
            ],
            [
                'sub' => 'Z-Brainer Intelligent Edge',
                'name' => 'Z-Brainer Intelligent Edge Gateway',
                'model' => 'SISPL-ZBRAINER',
                'desc' => 'Embedded ARM-based edge analytics node running proprietary firmware to calculate site efficiency, battery health index (SoH), and power plant operating states locally before cloud transmission.',
                'img' => 'img/iprotect-Img/zbrainer.jpg',
                'icon' => 'img/productIconImg/z-brainer.png',
                'specs' => [
                    ['label' => 'Processor', 'value' => 'Industrial ARM Cortex Core Processor'],
                    ['label' => 'Edge AI', 'value' => 'Rectifier Health & Battery Degradation Anomaly Detection'],
                    ['label' => 'I/O', 'value' => 'RS485, RS232, CANBus, Fast Ethernet, 4G LTE'],
                ],
            ],
            [
                'sub' => 'Smart Box (5G / Small Cell)',
                'name' => 'Smart Box (5G / Small Cell Outdoor Node)',
                'model' => 'SISPL-5G-SMARTBOX',
                'desc' => 'Rugged, pole-mountable outdoor micro-site enclosure designed for 5G small cell densification, smart city surveillance, CCTV edge aggregation, and uninterruptible DC power conversion.',
                'img' => 'img/sys-products/5.jpg',
                'icon' => 'img/productIconImg/smartBoxIcon.png',
                'specs' => [
                    ['label' => 'Mounting', 'value' => 'Utility Pole, Traffic Light & Wall Mountable'],
                    ['label' => 'Power Options', 'value' => '-48V DC, 24V DC, 12V DC & 230V AC'],
                    ['label' => 'Thermal', 'value' => 'Fan-Forced Thermostatically Regulated Cooling'],
                    ['label' => 'Ingress', 'value' => 'IP65 Weather & Dust Ingress Protection'],
                ],
            ],
            [
                'sub' => 'GPRS Modems & Kits',
                'name' => 'GPRS / 4G Telemetry Kit',
                'model' => 'SISPL-GPRS-MODEM',
                'desc' => 'Industrial cellular transmission gateway with RS232/RS485 interfaces, transmitting sensor telemetry, energy readings, and alarm registers over secure APN networks to centralized servers.',
                'img' => 'img/iprotect-Img/gprsCard.jpg',
                'icon' => 'img/productIconImg/gprsModem.png',
                'specs' => [
                    ['label' => 'Bands', 'value' => '4G LTE Multi-band with Auto 2G Fallback'],
                    ['label' => 'Serial Interface', 'value' => 'RS232 / RS485 Modbus RTU Transparent Pass-through'],
                    ['label' => 'Watchdog', 'value' => 'Hardware Internal Auto-Reboot Watchdog Timer'],
                ],
            ],

            // Strategic Telecom & Hardware
            [
                'sub' => 'DC Energy Meters (Class 1)',
                'name' => 'DC Energy Meter (Class 1 High Precision)',
                'model' => 'SISPL-DCEM-100',
                'desc' => 'Class 1.0 high-accuracy DC energy meter engineered for multi-tenant telecom tower infrastructure, measuring discrete voltage, current, and energy consumption per telecom operator for transparent billing.',
                'img' => 'img/iprotect-Img/dcenergymeter.jpg',
                'icon' => 'img/productIconImg/dcenergymeter.png',
                'specs' => [
                    ['label' => 'Accuracy Class', 'value' => 'Class 1.0 (IEC 62053-21 Compliant)'],
                    ['label' => 'Channels', 'value' => 'Up to 6 Independent Operator Shunt Channels'],
                    ['label' => 'Operating Voltage', 'value' => 'Nominal -48V DC (Range: -36V to -72V DC)'],
                    ['label' => 'Bus Communication', 'value' => 'Isolated RS485 Modbus RTU Protocol'],
                ],
            ],
            [
                'sub' => 'Can Bus Converters & SVR Cards',
                'name' => 'CAN Bus Converter & SVR Card',
                'model' => 'SISPL-CAN-SVR',
                'desc' => 'Protocol translation and static voltage regulation interface card integrating legacy power plant controllers with modern digital SMPS rectifiers and CAN bus topologies.',
                'img' => 'img/sys-products/6.jpg',
                'icon' => 'img/productIconImg/canbusConverter.png',
                'specs' => [
                    ['label' => 'Bus Types', 'value' => 'CAN 2.0B to RS485 / RS232 Isolated Gateway'],
                    ['label' => 'Protection', 'value' => '3kV Galvanic Isolation on Field Ports'],
                    ['label' => 'Mounting', 'value' => 'DIN Rail & Enclosure Card Guides'],
                ],
            ],
            [
                'sub' => 'Universal AC Controllers',
                'name' => 'Universal Air Conditioner Controller',
                'model' => 'SISPL-UAC-200',
                'desc' => 'Shelter climate management controller cycling dual precision air conditioners in telecom equipment rooms based on ambient temperature, humidity, and alternating duty cycles.',
                'img' => 'img/iprotect-Img/controller1.jpg',
                'icon' => 'img/productIconImg/UniversalACcontroller.png',
                'specs' => [
                    ['label' => 'Load Support', 'value' => 'Dual Air Conditioning Units up to 3-Phase 32A'],
                    ['label' => 'Cycle Logic', 'value' => 'Time-Based & Temperature-Gradient Sequential Cycling'],
                    ['label' => 'Safety', 'value' => 'High Temperature Cut-in with Alarm Buzzer'],
                ],
            ],
            [
                'sub' => 'LVD / LATCH Controllers',
                'name' => 'Low Voltage Disconnect (LVD) Controller',
                'model' => 'SISPL-LVD-48V',
                'desc' => 'Critical battery protection contactor driver disconnecting non-essential loads during prolonged power outages to safeguard expensive battery banks from deep discharge damage.',
                'img' => 'img/sys-products/7.jpg',
                'icon' => 'img/productIconImg/lvdController.png',
                'specs' => [
                    ['label' => 'Current Rating', 'value' => '200A / 400A / 600A Latching Contactor'],
                    ['label' => 'Disconnect Voltage', 'value' => 'Configurable from 43.2V to 47.0V DC'],
                    ['label' => 'Reconnection', 'value' => 'Automatic Hysteresis Reconnect on Mains Return'],
                ],
            ],
            [
                'sub' => 'Alarm Multiplexers & Nano Mac',
                'name' => 'Alarm Multiplexer & Nano Mac Unit',
                'model' => 'SISPL-ALM-MUX',
                'desc' => 'High-density dry contact digital alarm concentration card aggregating BTS, fire, smoke, and air conditioner fail signals into a standardized telemetry stream.',
                'img' => 'img/sys-products/8.jpg',
                'icon' => 'img/productIconImg/alrmCard1.png',
                'specs' => [
                    ['label' => 'Inputs', 'value' => '32 Opto-Isolated Dry Contact Alarm Points'],
                    ['label' => 'Output', 'value' => 'Parallel Relays + RS485 Modbus Summary Port'],
                    ['label' => 'Indicators', 'value' => 'Front Panel Individual Channel Alarm LEDs'],
                ],
            ],

            // Defence, Tactical & Specialized
            [
                'sub' => 'Tactical Communication (Motorola Solutions)',
                'name' => 'Motorola Solutions Mission-Critical Tactical Radios',
                'model' => 'MOTOTRBO-TACTICAL-COMM',
                'desc' => 'As an authorized Motorola Solutions Channel Partner, SISPL delivers rugged DMR Tier II/Tier III, P25, and high-altitude wireless transceivers designed for armed forces, paramilitary, and critical disaster response.',
                'img' => 'img/tacticalComm/r7.png',
                'icon' => 'img/motorola-solutions.png',
                'specs' => [
                    ['label' => 'Partnership', 'value' => 'Authorized Motorola Solutions Channel Partner'],
                    ['label' => 'Encryption', 'value' => 'Hardware AES-256 Bit Secure Voice & Data'],
                    ['label' => 'Standards', 'value' => 'MIL-STD 810G, IP68 Waterproof Submersion'],
                    ['label' => 'Range', 'value' => 'VHF, UHF, 800MHz & Broadband LTE Convergence'],
                ],
            ],
            [
                'sub' => 'Automatic Weather Station',
                'name' => 'Automatic Weather Station (AWS)',
                'model' => 'SISPL-AWS-STATION',
                'desc' => 'Rugged environmental telemetry station measuring wind speed, direction, ambient temperature, relative humidity, barometric pressure, and solar irradiance at remote telecom and military sites.',
                'img' => 'img/weatherStation/product.png',
                'icon' => 'img/productIconImg/strategicProducts.png',
                'specs' => [
                    ['label' => 'Sensors', 'value' => 'Ultrasonic Anemometer, Barometer, Temp/RH, Rain Gauge'],
                    ['label' => 'Power', 'value' => 'Solar Powered with Internal Battery Reserve'],
                    ['label' => 'Transmission', 'value' => 'Satellite / Cellular GPRS Telemetry Uplink'],
                ],
            ],
            [
                'sub' => 'GPS Tracking & Smart Cards',
                'name' => 'Enterprise GPS Tracker & RFID Smart Card',
                'model' => 'SISPL-GPS-SMART',
                'desc' => 'High-sensitivity GPS tracking units and cryptographic RFID smart cards used for field personnel credentialing, mobile diesel delivery validation, and asset logistics tracking.',
                'img' => 'img/gpsTracker/product-branded.jpg',
                'icon' => 'img/smartCard/card-front.png',
                'specs' => [
                    ['label' => 'GPS Chipset', 'value' => 'Multi-GNSS (GPS, GLONASS, Galileo, BeiDou)'],
                    ['label' => 'Battery', 'value' => 'Rechargeable Backup Li-Ion with Sleep Power Mode'],
                    ['label' => 'RFID Spec', 'value' => '13.56 MHz MIFARE Classic / DesFire Cryptographic'],
                ],
            ],
            [
                'sub' => 'Virtual Terrain Recce & Power Supplies',
                'name' => 'Virtual Terrain Recce & Power Supply System',
                'model' => 'SISPL-VTR-PWR',
                'desc' => 'Specialized mission surveillance and stabilized industrial power supplies developed for military operations, tactical vehicle integrations, and forward deployment camps.',
                'img' => 'img/virtualTerrain/headset.png',
                'icon' => 'img/powerSupply/thumb.png',
                'specs' => [
                    ['label' => 'Optics', 'value' => '3D Virtual Terrain Stereoscopic Imaging Display'],
                    ['label' => 'Power Output', 'value' => 'DC-to-DC Regulated Converters (24V / 48V / 12V)'],
                    ['label' => 'Enclosure', 'value' => 'MIL-SPEC Heavy Duty Shock-Absorbent Casing'],
                ],
            ],
            [
                'sub' => 'SMPS Module Re-conditioning & Services',
                'name' => 'SMPS Module Re-Conditioning & O&M Services',
                'model' => 'SISPL-RECON-300K',
                'desc' => 'Nationwide leader with over 3,00,000 rectifier modules reconditioned at our Delhi facility. Complete turnkey component-level diagnostics, burn-in testing, and thermal validation for all major telecom power modules.',
                'img' => 'img/iprotect-Img/portablemobile.png',
                'icon' => 'img/productIconImg/moduleRecondition.png',
                'specs' => [
                    ['label' => 'Scale Delivered', 'value' => 'Over 300,000 Rectifier Modules Refurbished'],
                    ['label' => 'Facility', 'value' => '8,000 Sq. Ft. International-Standard Plant in Delhi'],
                    ['label' => 'Certifications', 'value' => 'ISO 9001:2015, ISO 14001:2015, OHSAS 45001:2018'],
                    ['label' => 'Assurance', 'value' => '100% Full Load Testing with Extended Warranty'],
                ],
            ],
        ];

        PortfolioItem::truncate();
        foreach ($catalog as $idx => $p) {
            $subObj = $createdSubs[$p['sub']] ?? null;
            if ($subObj) {
                PortfolioItem::create([
                    'product_subcategory_id' => $subObj->id,
                    'name' => $p['name'],
                    'slug' => Str::slug($p['name']),
                    'model_number' => $p['model'],
                    'short_description' => $p['desc'],
                    'description' => $p['desc'],
                    'specifications' => $p['specs'],
                    'cover_image_path' => $p['img'],
                    'is_published' => true,
                    'sort_order' => $idx,
                ]);
            }
        }

        // 3. Impact Stats (from sysinfra.in official achievements)
        $stats = [
            ['label' => 'MODULES RECONDITIONED', 'value' => 300000, 'suffix' => ' +', 'icon' => 'briefcase', 'sort_order' => 0],
            ['label' => 'TELECOM SITES AUTOMATED', 'value' => 70000, 'suffix' => ' +', 'icon' => 'clipboard', 'sort_order' => 1],
            ['label' => 'AMF CONTROLLERS DEPLOYED', 'value' => 50000, 'suffix' => ' +', 'icon' => 'network', 'sort_order' => 2],
        ];

        CompanyStat::truncate();
        foreach ($stats as $s) {
            CompanyStat::create($s);
        }

        // 4. Testimonials & Major Deployments
        $testimonials = [
            [
                'client_name' => 'Bharti Infratel • Solar Hybrid Rollout',
                'story' => 'Over 400 turnkey solar AMF panels deployed across challenging circles. SISPL proprietary algorithms decreased diesel run-hours by over 38%, achieving substantial operational savings.',
                'logo_path' => 'img/brand/1.jpg',
                'sort_order' => 0,
            ],
            [
                'client_name' => 'Reliance Jio • Lithium-Ion Rollout',
                'story' => 'Installation, testing, and integration of lithium-ion energy storage systems across more than 10,000 telecom cell sites with 100% field uptime adherence.',
                'logo_path' => 'img/brand/5.jpg',
                'sort_order' => 1,
            ],
            [
                'client_name' => 'Power Grid Corporation of India',
                'story' => 'Route surveying, optical fiber cable deployment, and continuous sub-station telemetry monitoring units installed across strategic national power transmission corridors.',
                'logo_path' => 'img/brand/6.jpg',
                'sort_order' => 2,
            ],
        ];

        Testimonial::truncate();
        foreach ($testimonials as $t) {
            Testimonial::create($t + ['is_published' => true]);
        }

        // 5. Strategic OEM Partners
        $partners = [
            [
                'name' => 'Motorola Solutions',
                'description' => 'Authorized Channel Partner delivering mission-critical DMR, TETRA, and encrypted wireless gear for tactical defence and security networks across India.',
                'logo_path' => 'img/motorola-solutions.png',
                'website_url' => 'https://www.motorolasolutions.com/',
                'sort_order' => 0,
            ],
            [
                'name' => 'Indus Towers',
                'description' => 'Key ecosystem vendor providing automated AMF energy controllers and remote site maintenance services nationwide.',
                'logo_path' => 'img/brand/2.jpg',
                'website_url' => 'https://www.industowers.com/',
                'sort_order' => 1,
            ],
            [
                'name' => 'Bharti Airtel',
                'description' => 'Longstanding infrastructure solutions provider for cell site power modernization, green solar initiatives, and optical fiber connectivity.',
                'logo_path' => 'img/brand/1.jpg',
                'website_url' => 'https://www.airtel.in/',
                'sort_order' => 2,
            ],
            [
                'name' => 'Power Grid',
                'description' => 'Telemetry and high-voltage transmission OFC survey partner maintaining uninterrupted telemetry links.',
                'logo_path' => 'img/brand/6.jpg',
                'website_url' => 'https://www.powergrid.in/',
                'sort_order' => 3,
            ],
        ];

        OemPartner::truncate();
        foreach ($partners as $p) {
            OemPartner::create($p);
        }

        // 6. News & Announcements
        NewsPost::truncate();
        NewsPost::create([
            'title' => 'System Infra Solutions expands smart 5G Small Cell Box production in Delhi Plant',
            'slug' => 'sysinfra-5g-small-cell-box-production',
            'body' => '<p>System Infra Solutions Pvt. Ltd. (SISPL) has expanded production capacity at its 8,000 sq. ft. international-standard manufacturing plant in Patparganj Industrial Area, New Delhi, to scale up delivery of rugged 5G Smart Boxes and next-generation IoT telemetry nodes.</p>',
            'cover_image_path' => 'img/slider/1-1.jpg',
            'published_at' => now(),
            'is_published' => true,
        ]);
    }
}
