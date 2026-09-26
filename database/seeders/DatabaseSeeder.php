<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Client;
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
     * Seeds complete authentic categories, rich products, real media assets, leadership profiles,
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

        // 1. Complete Categories & Subcategories Tree matching official sysinfra.in navigation
        $tree = [
            'Energy Management & Controllers' => [
                'thumbnail' => 'img/productIconImg/energyMgtImg.png',
                'description' => 'Automated mains failure switching, solar hybrid controllers, RMS telemetry, and dual DG cycling controllers for cell towers and grid substations.',
                'subs' => [
                    'AMF Panels (Indoor & Outdoor)',
                    'Solar Cell Site Controllers',
                    'Remote Monitoring Systems (RMS)',
                    'Dual DG Controllers & Alternators',
                    'Retrofit AMF & Energy Controllers',
                ],
            ],
            'NOC & IoT Automation' => [
                'thumbnail' => 'img/productIconImg/nocSolutions.png',
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
                'thumbnail' => 'img/productIconImg/strategicProducts.png',
                'description' => 'DC energy meters, static voltage regulators, bus converters, and telecom shelter automation modules.',
                'subs' => [
                    'DC Energy Meters (Class 1)',
                    'Can Bus Converters & SVR Cards',
                    'Universal AC Controllers',
                    'LVD / LATCH Controllers',
                    'Alarm Multiplexers & Nano Mac',
                    'DC to DC Converters & Power Units',
                ],
            ],
            'Defence, Tactical & Specialized' => [
                'thumbnail' => 'img/tacticalComm/r7.png',
                'description' => 'Motorola Solutions authorized tactical communications, automatic weather stations, GPS tracking, and defence maintenance.',
                'subs' => [
                    'Tactical Communication (Motorola Solutions)',
                    'Automatic Weather Station',
                    'GPS Tracking & Smart Cards',
                    'Virtual Terrain Recce & Tactical Power',
                    'Tactical Surveillance & Electro-Optics',
                ],
            ],
            'Security Automation & Access Control' => [
                'thumbnail' => 'img/securityAutomationImg/security-automation-img.png',
                'description' => 'Under-vehicle surveillance, hydraulic road blockers, tyre killers, boom barriers, flap turnstiles, and biometric access.',
                'subs' => [
                    'Under Vehicle Surveillance (UVSS)',
                    'Hydraulic Road Blockers & Spike Barriers',
                    'Boom Barriers & Parking Systems',
                    'Hydraulic Retractable Bollards',
                    'Flap Barriers & Tripod Turnstiles',
                    'Baggage Scanners & Metal Detectors',
                    'Face Recognition & Smart Readers',
                ],
            ],
            'Telecom Infrastructure & Turnkey Services' => [
                'thumbnail' => 'img/productIconImg/ourServices.png',
                'description' => 'SMPS module re-conditioning, comprehensive site maintenance, passive operations, and emergency broadcast solutions.',
                'subs' => [
                    'SMPS Module Re-conditioning (300K+ units)',
                    'Comprehensive Telecom Site Maintenance',
                    'Passive Operations & Energy O&M',
                    'Defence Equipment Repair & Overhaul',
                    'Voice Messaging & Emergency Telephony',
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

        // 2. All Genuine Products Scraped from sysinfra.in
        $catalog = [
            // ==================== Energy Management & Controllers ====================
            [
                'sub' => 'AMF Panels (Indoor & Outdoor)',
                'name' => 'AMF Panel (Indoor Shelter Spec)',
                'model' => 'SISPL-AMF-IND',
                'desc' => 'SISPL Auto mains failure system (AMF) is one of the flagship products of system infra solutions. It works seamlessly across wide voltage fluctuations with complete automated mains-to-generator switchover, reverse phase protection, and real-time telemetry line reporting.',
                'img' => 'img/iprotect-Img/amf-panelindoor.png',
                'icon' => 'img/productIconImg/Amf pannel(Indoor).png',
                'specs' => [
                    ['label' => 'Application', 'value' => 'Indoor Telecom Shelters & BTS Sites'],
                    ['label' => 'Mains Rating', 'value' => 'Three Phase 415V / Single Phase 230V AC'],
                    ['label' => 'Switchover', 'value' => 'Microcontroller Controlled Dual Interlocked Contactors'],
                    ['label' => 'Protection', 'value' => 'Overvoltage, Undervoltage, Phase Sequence, Overload'],
                    ['label' => 'Enclosure', 'value' => 'CRCA Powder Coated Sheet Steel, 1.6mm thickness'],
                ],
            ],
            [
                'sub' => 'AMF Panels (Indoor & Outdoor)',
                'name' => 'AMF Panel (Outdoor Weatherproof Enclosure)',
                'model' => 'SISPL-AMF-OUT',
                'desc' => 'Manufactured at SISPL international-standard Delhi plant, this all-weather IP55 outdoor cabinet executes automated generator cycling, fuel saving algorithms, and surge suppression under extreme field conditions.',
                'img' => 'img/iprotect-Img/main-Amf-img.png',
                'icon' => 'img/productIconImg/Amf pannel(Outdoor).png',
                'specs' => [
                    ['label' => 'Protection Degree', 'value' => 'IP55 Weatherproof Outdoor Sheet Metal'],
                    ['label' => 'Control Algorithm', 'value' => 'Dynamic DG Run-Hour Optimization'],
                    ['label' => 'Surge Protection', 'value' => 'Class B+C Lightning & Surge Arrester SPD (40kA)'],
                    ['label' => 'Display', 'value' => 'Alphanumeric Backlit LCD Display with Keypad'],
                    ['label' => 'Certifications', 'value' => 'ISO 9001:2015, IP55 Ingress Test Certified'],
                ],
            ],
            [
                'sub' => 'Solar Cell Site Controllers',
                'name' => 'AMF Panel For Solar Cell Site',
                'model' => 'SISPL-SOLAR-AMF',
                'desc' => 'Hybrid solar-priority AMF controller designed to harvest maximum solar PV energy for cell tower operations before invoking grid lines or diesel generators, delivering up to 45% reduction in carbon footprint and fuel expenditure.',
                'img' => 'img/iprotect-Img/controller1.jpg',
                'icon' => 'img/productIconImg/Amf pannel(Outdoor).png',
                'specs' => [
                    ['label' => 'PV Input', 'value' => 'Hybrid MPPT Integration up to 15 kW'],
                    ['label' => 'Energy Priority', 'value' => '1. Solar PV -> 2. Battery -> 3. Mains -> 4. DG'],
                    ['label' => 'Battery Sync', 'value' => 'Compatible with VRLA & Li-Ion BMS telemetry'],
                    ['label' => 'Telemetry', 'value' => 'Solar Harvest kWh & Carbon Credit Reporting to NOC'],
                ],
            ],
            [
                'sub' => 'Remote Monitoring Systems (RMS)',
                'name' => 'Remote Monitoring System (RMS 1U)',
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
                'desc' => 'Drop-in microprocessor replacement controller engineered to upgrade obsolete or malfunctioning AMF panels without rewiring the power contactor cubicle, drastically reducing upgrade capital cost.',
                'img' => 'img/iprotect-Img/retrofitcontroller.jpg',
                'icon' => 'img/productIconImg/RetrofitController.png',
                'specs' => [
                    ['label' => 'Compatibility', 'value' => 'Universal Pin-Compatible with Major Telecom Panels'],
                    ['label' => 'DG Control', 'value' => 'Auto Crank, Warm-up, Cool-down, Fail-to-Start Alarm'],
                    ['label' => 'Configuration', 'value' => 'Field Programmable Thresholds via Front Panel'],
                ],
            ],
            [
                'sub' => 'Dual DG Controllers & Alternators',
                'name' => 'Dual DG Controller & Pluto Alternator',
                'model' => 'SISPL-DUAL-DG-PLUTO',
                'desc' => 'Intelligent controller managing two diesel generators in off-grid or poor-grid cell sites, alternating run-hours symmetrically with Pluto Alternator cycle logic to prevent engine overheating and maintain continuous uptime.',
                'img' => 'img/iprotect-Img/main-Amf-img.png',
                'icon' => 'img/productIconImg/dualDGcontroller.png',
                'specs' => [
                    ['label' => 'Mode', 'value' => 'Mutual Standby with Cyclic Alternation'],
                    ['label' => 'Fault Fallback', 'value' => 'Automatic Switchover to DG2 on DG1 Lockout'],
                    ['label' => 'Equalization', 'value' => 'Programmable Run-Hour Balancing Timer (2h to 24h)'],
                ],
            ],

            // ==================== NOC & IoT Automation ====================
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
                    ['label' => 'Security', 'value' => 'TLS 1.3 Encryption, Role-Based Access Control (RBAC)'],
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

            // ==================== Strategic Telecom & Hardware ====================
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
            [
                'sub' => 'DC to DC Converters & Power Units',
                'name' => 'Industrial DC-to-DC Converter & SVR Power Supply',
                'model' => 'SISPL-DCDC-SVR',
                'desc' => 'High-efficiency galvanic isolated DC to DC converter converting -48V DC telecom bus voltage into regulated +12V, +24V, or +5V DC for auxiliary edge compute and telemetry instrumentation.',
                'img' => 'img/cardsImg/dctodcConverter.webp',
                'icon' => 'img/powerSupply/thumb.png',
                'specs' => [
                    ['label' => 'Input Voltage', 'value' => '-36V to -72V DC Wide Range'],
                    ['label' => 'Output Voltage', 'value' => 'Regulated 12V / 24V / 48V DC (±1%)'],
                    ['label' => 'Efficiency', 'value' => '> 92% Peak Efficiency'],
                    ['label' => 'Isolation', 'value' => '1500V DC Input-to-Output Galvanic'],
                ],
            ],

            // ==================== Defence, Tactical & Specialized ====================
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
                'sub' => 'Virtual Terrain Recce & Tactical Power',
                'name' => 'Virtual Terrain Recce & Tactical Power System',
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
                'sub' => 'Tactical Surveillance & Electro-Optics',
                'name' => 'Tactical Night Vision & PTZ Electro-Optics',
                'model' => 'SISPL-TACTICAL-OPTICS',
                'desc' => 'Military-grade night vision binoculars, thermal rifle scopes, and long-range pan-tilt-zoom (PTZ) electro-optic reconnaissance sensors engineered for perimeter defence and tactical squads.',
                'img' => 'img/securityAutomationImg/nightVisionDevice.png',
                'icon' => 'img/securityAutomationImg/ptzCamera.png',
                'specs' => [
                    ['label' => 'Sensor Type', 'value' => 'Gen 2+/3 Image Intensifier & Longwave Uncooled Thermal'],
                    ['label' => 'Detection Range', 'value' => 'Up to 2,500m Human Target Detection'],
                    ['label' => 'Durability', 'value' => 'Nitrogen Purged, Waterproof IP67 Shock Resistant'],
                ],
            ],

            // ==================== Security Automation & Access Control ====================
            [
                'sub' => 'Under Vehicle Surveillance (UVSS)',
                'name' => 'Under Vehicle Surveillance System (UVSS)',
                'model' => 'SISPL-UVSS-5000',
                'desc' => 'High-resolution color area scan imaging system capturing full undercarriage images of passing vehicles at entry checkpoints, with automatic foreign object and contraband detection.',
                'img' => 'img/securityAutomationImg/uvss.png',
                'icon' => 'img/securityAutomationImg/uvss1.png',
                'specs' => [
                    ['label' => 'Camera Sensor', 'value' => 'High-Speed Line-Scan Digital Color Sensor (4096 pixels)'],
                    ['label' => 'Speed Support', 'value' => 'Vehicles moving up to 60 km/h'],
                    ['label' => 'Weight Capacity', 'value' => 'Heavy Axle Load rated up to 50 Tons'],
                    ['label' => 'Illumination', 'value' => 'Integrated High-Intensity White LED Light Bar'],
                ],
            ],
            [
                'sub' => 'Hydraulic Road Blockers & Spike Barriers',
                'name' => 'Heavy Duty Hydraulic Road Blocker & Tyre Killer',
                'model' => 'SISPL-RB-K12',
                'desc' => 'Crash-rated hydraulic road blocker and surface-mounted bidirectional tyre killer designed for high-security installations, diplomatic enclaves, and critical telecom gateways.',
                'img' => 'img/securityAutomationImg/roadBlockerImg.png',
                'icon' => 'img/securityAutomationImg/spikeBarriers.png',
                'specs' => [
                    ['label' => 'Impact Rating', 'value' => 'ASTM F2656 M50 / K12 Equivalent (7.5 Ton truck at 80 km/h)'],
                    ['label' => 'Operating Speed', 'value' => 'Raise time 2-3 seconds, EFO emergency up 1.5 seconds'],
                    ['label' => 'Drive', 'value' => 'Heavy Duty Electro-Hydraulic Power Pack'],
                ],
            ],
            [
                'sub' => 'Boom Barriers & Parking Systems',
                'name' => 'Automatic High-Speed Boom Barrier with License Plate Recognition',
                'model' => 'SISPL-BOOM-LPR',
                'desc' => 'Fast-acting automatic vehicular barrier integrated with ANPR (Automatic Number Plate Recognition) smart cameras for frictionless corporate, toll, and facility access.',
                'img' => 'img/securityAutomationImg/1.png',
                'icon' => 'img/securityAutomationImg/anpr.png',
                'specs' => [
                    ['label' => 'Boom Length', 'value' => '3m to 6m Telescopic Aluminium Boom'],
                    ['label' => 'Opening Time', 'value' => '1.5s to 3.0s Configurable Brushless DC Motor'],
                    ['label' => 'ANPR Accuracy', 'value' => '> 98% Recognition for Indian Vehicle Plates'],
                ],
            ],
            [
                'sub' => 'Hydraulic Retractable Bollards',
                'name' => 'Automatic Hydraulic Retractable Bollard System',
                'model' => 'SISPL-BOLLARD-HYD',
                'desc' => 'Sub-surface hydraulic retractable security bollards engineered for pedestrian safety zones, corporate headquarters, and high-threat vehicle access restriction.',
                'img' => 'img/securityAutomationImg/bollardImg1.png',
                'icon' => 'img/securityAutomationImg/bollardImg2.png',
                'specs' => [
                    ['label' => 'Cylinder Material', 'value' => 'AISI 304 / 316 Stainless Steel (6mm to 10mm wall)'],
                    ['label' => 'Height Above Ground', 'value' => '600mm / 800mm / 1000mm standard stroke'],
                    ['label' => 'Warning System', 'value' => 'Integrated Top LED Ring & Reflective Micro-Prismatic Strip'],
                ],
            ],
            [
                'sub' => 'Flap Barriers & Tripod Turnstiles',
                'name' => 'Flap Barrier & Tripod Turnstile Pedestrian Series',
                'model' => 'SISPL-FLAP-TURNTOP',
                'desc' => 'Architectural motorized pedestrian turnstiles with rapid wing retractors, infrared tailgating sensors, and integration with facial recognition and RFID passes.',
                'img' => 'img/securityAutomationImg/flap.png',
                'icon' => 'img/securityAutomationImg/tripod0.png',
                'specs' => [
                    ['label' => 'Throughput', 'value' => '35 to 45 Persons Per Minute'],
                    ['label' => 'Sensor Array', 'value' => '6 to 12 Pairs of Dual-Beam Infrared Anti-Pinch Sensors'],
                    ['label' => 'Chassis', 'value' => '1.5mm Hairline Finish SUS304 Stainless Steel'],
                ],
            ],
            [
                'sub' => 'Baggage Scanners & Metal Detectors',
                'name' => 'Dual Energy X-Ray Baggage Scanner & Metal Detectors',
                'model' => 'SISPL-XR-100100',
                'desc' => 'High-resolution multi-energy X-ray inspection unit with automated atomic number colorization for organic/inorganic threat screening, paired with handheld (HHMD) and walk-through (DFMD) metal detectors.',
                'img' => 'img/securityAutomationImg/baggageScanner.png',
                'icon' => 'img/securityAutomationImg/HHMDetector.png',
                'specs' => [
                    ['label' => 'Tunnel Dimensions', 'value' => '1005 mm (W) x 1000 mm (H) Heavy Luggage Tunnel'],
                    ['label' => 'Generator Voltage', 'value' => '160 kV with Dual-Energy Real-Time Color Differentiation'],
                    ['label' => 'Penetration', 'value' => '38mm to 40mm Steel Penetration'],
                ],
            ],
            [
                'sub' => 'Face Recognition & Smart Readers',
                'name' => 'AI Dynamic Face Recognition & Biometric Terminal',
                'model' => 'SISPL-FACE-BIO',
                'desc' => 'High-speed contactless facial authentication terminal with live anti-spoofing dual cameras and RFID multi-card reader, operating reliably even under low lighting conditions.',
                'img' => 'img/securityAutomationImg/faceRecognition.png',
                'icon' => 'img/securityAutomationImg/faceRecognition1.png',
                'specs' => [
                    ['label' => 'Face Capacity', 'value' => '50,000 Facial Templates'],
                    ['label' => 'Speed & Accuracy', 'value' => '< 0.2s Recognition Speed, 99.8% LFW Accuracy'],
                    ['label' => 'Authentication', 'value' => 'Face, Mask Detection, Fingerprint, RFID & PIN'],
                ],
            ],

            // ==================== Telecom Infrastructure & Turnkey Services ====================
            [
                'sub' => 'SMPS Module Re-conditioning (300K+ units)',
                'name' => 'SMPS Module Re-Conditioning & Power O&M Services',
                'model' => 'SISPL-RECON-300K',
                'desc' => 'Nationwide industry leader with over 3,00,000 rectifier modules reconditioned at our Delhi facility. Complete turnkey component-level diagnostics, burn-in testing, and thermal validation for all major telecom power modules.',
                'img' => 'img/iprotect-Img/portablemobile.png',
                'icon' => 'img/productIconImg/moduleRecondition.png',
                'specs' => [
                    ['label' => 'Scale Delivered', 'value' => 'Over 300,000 Rectifier Modules Refurbished'],
                    ['label' => 'Facility', 'value' => '8,000 Sq. Ft. International-Standard Plant in Delhi'],
                    ['label' => 'Certifications', 'value' => 'ISO 9001:2015, ISO 14001:2015, OHSAS 45001:2018'],
                    ['label' => 'Assurance', 'value' => '100% Full Load Testing with Extended 1-Year Warranty'],
                ],
            ],
            [
                'sub' => 'Comprehensive Telecom Site Maintenance',
                'name' => 'Comprehensive Telecom Tower Site Maintenance',
                'model' => 'SISPL-SITE-MNT',
                'desc' => 'Turnkey SLA-governed 24/7 site operations for India\'s leading tower companies. Encompasses preventive maintenance, diesel filling validation, battery bank equalization, and rapid emergency restoration.',
                'img' => 'img/sysinfraPhase/1.png',
                'icon' => 'img/productIconImg/siteMaintanance.png',
                'specs' => [
                    ['label' => 'Site Portfolio', 'value' => 'Over 70,000 Telecom Towers Serviced Nationwide'],
                    ['label' => 'Response SLA', 'value' => '< 2 Hours Mean Time to Respond (MTTR)'],
                    ['label' => 'Model', 'value' => '24/7 Ambulance Emergency Rapid Intervention Fleet'],
                ],
            ],
            [
                'sub' => 'Passive Operations & Energy O&M',
                'name' => 'Passive Infrastructure & Energy Audit Services',
                'model' => 'SISPL-PASSIVE-OPS',
                'desc' => 'Complete passive site asset audits, fuel loss mitigation, power factor improvement, and battery health benchmarking to achieve minimal operational expenditure and maximum green energy utilization.',
                'img' => 'img/sysinfraPhase/2.png',
                'icon' => 'img/productIconImg/o&mSupport.png',
                'specs' => [
                    ['label' => 'Scope', 'value' => 'DG Maintenance, AMF Panels, Transformer Substations, Earthing'],
                    ['label' => 'Efficiency Gains', 'value' => 'Up to 35% Reduction in Diesel Fuel Run-Hours'],
                    ['label' => 'Software Support', 'value' => 'eBOT Integrated ERP Asset Tracking & Field Workflows'],
                ],
            ],
            [
                'sub' => 'Defence Equipment Repair & Overhaul',
                'name' => 'Defence Electronics & Tactical Radio Overhaul',
                'model' => 'SISPL-DEFENCE-REPAIR',
                'desc' => 'Specialized electronic repair and re-certification of tactical communications, base stations, repeater systems, and power amplifiers for Indian Armed Forces and Paramilitary establishments.',
                'img' => 'img/tacticalComm/base-station.png',
                'icon' => 'img/defenceRepair/repair-lab.png',
                'specs' => [
                    ['label' => 'Quality Standards', 'value' => 'Strict MIL-SPEC and MoD Procurement Compliance'],
                    ['label' => 'Test Lab', 'value' => 'Rohde & Schwarz RF Analyzers, EMI/EMC Test Benches'],
                    ['label' => 'Security Clearances', 'value' => 'Vetted Technical Engineering Personnel'],
                ],
            ],
            [
                'sub' => 'Voice Messaging & Emergency Telephony',
                'name' => 'Voice Messaging & Telephony Broadcast Service',
                'model' => 'SISPL-VOICE-MSG',
                'desc' => 'High-capacity SIP/PRI interactive voice messaging gateway for critical disaster alerts, automated tower outage dispatches, and public safety announcements.',
                'img' => 'img/sysinfraPhase/3.png',
                'icon' => 'img/productIconImg/voicemessageServices.png',
                'specs' => [
                    ['label' => 'Call Capacity', 'value' => 'Up to 50,000 Outbound Concurrent Calls Per Hour'],
                    ['label' => 'Protocol', 'value' => 'SIP Trunking, E1/PRI, WebRTC Cloud Connector'],
                    ['label' => 'Reporting', 'value' => 'Real-Time Delivery Acknowledgement & DTMF Logs'],
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
            ['label' => 'RECTIFIER MODULE RE-CONDITIONED', 'value' => 300000, 'suffix' => ' +', 'icon' => 'rectifier', 'sort_order' => 0],
            ['label' => 'TELECOM SITE AUTOMATION', 'value' => 70000, 'suffix' => ' +', 'icon' => 'telecom', 'sort_order' => 1],
            ['label' => 'AMF CONTROLLER INSTALLED', 'value' => 50000, 'suffix' => ' +', 'icon' => 'controller', 'sort_order' => 2],
            ['label' => 'FLAGSHIP SYS-AXS NOC SITES', 'value' => 10000, 'suffix' => ' +', 'icon' => 'noc', 'sort_order' => 3],
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

        // 5. Our Clients & Strategic OEM Partners
        $clients = [
            ['name' => 'Bharti Airtel', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/1.jpg', 'highlight' => 'Nationwide AMF Deployment across 35,000+ Cell Sites', 'website_url' => 'https://www.airtel.in/', 'sort_order' => 1],
            ['name' => 'Indus Towers', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/2.jpg', 'highlight' => 'Smart Energy Controller & DG Auto-cycling Partner', 'website_url' => 'https://www.industowers.com/', 'sort_order' => 2],
            ['name' => 'Reliance Jio', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/3.jpg', 'highlight' => '5G Small Cell Enclosures & Power Conditioning', 'website_url' => 'https://www.jio.com/', 'sort_order' => 3],
            ['name' => 'Power Grid Corporation of India', 'sector' => 'Energy, Power & Utilities', 'logo_path' => 'img/brand/4.jpg', 'highlight' => 'Substation Remote Telemetry & SVR Voltage Regulators', 'website_url' => 'https://www.powergrid.in/', 'sort_order' => 4],
            ['name' => 'Vodafone Idea (Vi)', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/5.jpg', 'highlight' => 'BTS Shelter Environmental Management & Dual-AC', 'website_url' => 'https://www.myvi.in/', 'sort_order' => 5],
            ['name' => 'American Tower Corporation (ATC)', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/6.jpg', 'highlight' => 'SYS-AXS NOC Remote Monitoring Integration', 'website_url' => 'https://www.americantower.com/', 'sort_order' => 6],
            ['name' => 'Bharat Sanchar Nigam Limited (BSNL)', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/7.jpg', 'highlight' => 'Turnkey Telecom Infrastructure O&M Services', 'website_url' => 'https://www.bsnl.co.in/', 'sort_order' => 7],
            ['name' => 'Tata Communications / Teleservices', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/8.jpg', 'highlight' => 'Fiber Exchange Power Systems & Rectifier AMC', 'website_url' => 'https://www.tatacommunications.com/', 'sort_order' => 8],
            ['name' => 'Ascend Telecom Infrastructure', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/9.jpg', 'highlight' => 'Tower Site Energy Optimization & LVD Controls', 'website_url' => '#', 'sort_order' => 9],
            ['name' => 'GTL Infrastructure', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/10.jpg', 'highlight' => 'DG Auto-Start & Diesel Theft Surveillance', 'website_url' => '#', 'sort_order' => 10],
            ['name' => 'Tower Vision India', 'sector' => 'Telecom Operators & TowerCos', 'logo_path' => 'img/brand/11.jpg', 'highlight' => 'Multi-Tenant Tower Energy Metering Units', 'website_url' => '#', 'sort_order' => 11],
            ['name' => 'Ericsson Telecommunications', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/12.jpg', 'highlight' => 'Rectifier Module Reconditioning to OEM Standards', 'website_url' => 'https://www.ericsson.com/', 'sort_order' => 12],
            ['name' => 'Nokia Solutions and Networks', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/13.jpg', 'highlight' => 'Telecom Power Supply Integration & Lab Certification', 'website_url' => 'https://www.nokia.com/', 'sort_order' => 13],
            ['name' => 'Huawei Telecommunications', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/14.jpg', 'highlight' => 'SMPS Module Refurbishment & Board Repairs', 'website_url' => '#', 'sort_order' => 14],
            ['name' => 'ZTE Telecom India', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/15.jpg', 'highlight' => 'DC Power Conversion & Power Plant Upgrades', 'website_url' => '#', 'sort_order' => 15],
            ['name' => 'Vertiv / Emerson Network Power', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/16.jpg', 'highlight' => '3,00,000+ Power Modules Serviced in Patparganj', 'website_url' => 'https://www.vertiv.com/', 'sort_order' => 16],
            ['name' => 'Delta Power Solutions', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/17.jpg', 'highlight' => 'In-house Component-Level Testing & Validation', 'website_url' => 'https://www.deltaww.com/', 'sort_order' => 17],
            ['name' => 'Eltek Power Systems', 'sector' => 'OEM Power & Equipment Partners', 'logo_path' => 'img/brand/18.jpg', 'highlight' => 'High-Efficiency DC Rectifier Support', 'website_url' => 'https://www.eltek.com/', 'sort_order' => 18],
            ['name' => 'Indian Railways', 'sector' => 'Transportation & Public Utilities', 'logo_path' => 'img/brand/19.jpg', 'highlight' => 'Station Signalling & Telemetry Power Backups', 'website_url' => 'https://indianrailways.gov.in/', 'sort_order' => 19],
            ['name' => 'Delhi Metro Rail Corporation (DMRC)', 'sector' => 'Transportation & Public Utilities', 'logo_path' => 'img/brand/20.jpg', 'highlight' => 'Underground Tunnel Telecommunications & AMF', 'website_url' => 'https://www.delhimetrorail.com/', 'sort_order' => 20],
            ['name' => 'GAIL (India) Limited', 'sector' => 'Energy, Power & Utilities', 'logo_path' => 'img/brand/21.jpg', 'highlight' => 'Gas Pipeline Repeater Station Remote Telemetry', 'website_url' => 'https://gailonline.com/', 'sort_order' => 21],
            ['name' => 'Oil and Natural Gas Corporation (ONGC)', 'sector' => 'Energy, Power & Utilities', 'logo_path' => 'img/brand/22.jpg', 'highlight' => 'Offshore / Onshore Rig Communications & SVR', 'website_url' => 'https://www.ongcindia.com/', 'sort_order' => 22],
            ['name' => 'Indian Armed Forces (MoD)', 'sector' => 'Defence & Homeland Security', 'logo_path' => 'img/brand/23.jpg', 'highlight' => 'Motorola Solutions Tactical Radios & Weather Stations', 'website_url' => '#', 'sort_order' => 23],
            ['name' => 'Central Reserve Police Force (CRPF)', 'sector' => 'Defence & Homeland Security', 'logo_path' => 'img/brand/24.jpg', 'highlight' => 'Tactical Communication Gear & Base Repeaters', 'website_url' => '#', 'sort_order' => 24],
            ['name' => 'Border Security Force (BSF)', 'sector' => 'Defence & Homeland Security', 'logo_path' => 'img/brand/25.jpg', 'highlight' => 'Extreme-Climate Automatic Weather Station (AWS)', 'website_url' => '#', 'sort_order' => 25],
            ['name' => 'Central Industrial Security Force (CISF)', 'sector' => 'Defence & Homeland Security', 'logo_path' => 'img/brand/26.jpg', 'highlight' => 'Airport & Strategic Plant Perimeter Telemetry', 'website_url' => '#', 'sort_order' => 26],
            ['name' => 'Larsen & Toubro (L&T)', 'sector' => 'Infrastructure & EPC Leaders', 'logo_path' => 'img/brand/27.jpg', 'highlight' => 'Smart City 5G Street Furniture Enclosures', 'website_url' => 'https://www.larsentoubro.com/', 'sort_order' => 27],
            ['name' => 'Sterling and Wilson', 'sector' => 'Infrastructure & EPC Leaders', 'logo_path' => 'img/brand/28.jpg', 'highlight' => 'Solar Hybrid Power Plant Integration & Microgrid', 'website_url' => '#', 'sort_order' => 28],
            ['name' => 'Voltas Limited', 'sector' => 'HVAC & Climate Control', 'logo_path' => 'img/brand/29.jpg', 'highlight' => 'Precision Shelter AC Duty-Cycling Controllers', 'website_url' => '#', 'sort_order' => 29],
            ['name' => 'Cummins India', 'sector' => 'Genset & Power Generation', 'logo_path' => 'img/brand/30.jpg', 'highlight' => 'J1939 CAN Bus Engine Telemetry Protocol Integration', 'website_url' => 'https://www.cummins.com/', 'sort_order' => 30],
            ['name' => 'Kirloskar Oil Engines', 'sector' => 'Genset & Power Generation', 'logo_path' => 'img/brand/31.jpg', 'highlight' => 'Universal AMF Panel Compatibility for DG Fleets', 'website_url' => '#', 'sort_order' => 31],
        ];

        Client::truncate();
        foreach ($clients as $c) {
            Client::create($c + ['is_published' => true]);
        }

        $oemPartners = [
            [
                'name' => 'Kenwood Corporation, Japan',
                'description' => 'World leader in mission-critical land mobile radios (DMR, NEXEDGE NXDN, P25). Sysinfra has been their accredited distributor in India since 1999.',
                'logo_path' => 'img/brand/12.jpg',
                'website_url' => 'https://www.kenwood.com/',
                'sort_order' => 1,
            ],
            [
                'name' => 'Motorola Solutions',
                'description' => 'Global leader in public safety and enterprise security technology. Authorized channel partner for MOTOTRBO and ASTRO 25 mission-critical tactical communications.',
                'logo_path' => 'img/motorola-solutions.png',
                'website_url' => 'https://www.motorolasolutions.com/',
                'sort_order' => 2,
            ],
            [
                'name' => 'Diamond Corporation, Japan',
                'description' => 'Established in 1955, Diamond Japan is a world leader in RF antennas, duplexers, and RF accessories. Sysinfra partner since 2005.',
                'logo_path' => 'img/brand/14.jpg',
                'website_url' => 'https://www.diamond-ant.co.jp/english/',
                'sort_order' => 3,
            ],
            [
                'name' => 'Radio Activity (JVCKENWOOD Group)',
                'description' => 'Specialized in the design of DMR Tier III simulcast and multisite trunked PMR base stations. 100% subsidiary of JVCKENWOOD group.',
                'logo_path' => 'img/brand/15.jpg',
                'website_url' => 'https://www.radioactivity-tlc.com/',
                'sort_order' => 4,
            ],
            [
                'name' => 'EF Johnson Technologies, USA',
                'description' => 'Mission-critical P25 communication solutions for first responders, public safety organizations, and defence forces worldwide.',
                'logo_path' => 'img/brand/13.jpg',
                'website_url' => 'https://www.efjohnson.com/',
                'sort_order' => 5,
            ],
            [
                'name' => 'Vertiv / Emerson Network Power',
                'description' => 'Strategic partner for DC telecom power systems and rectifier modules. Over 300,000 power modules serviced in Patparganj facility.',
                'logo_path' => 'img/brand/16.jpg',
                'website_url' => 'https://www.vertiv.com/',
                'sort_order' => 6,
            ],
            [
                'name' => 'Delta Power Solutions',
                'description' => 'Global provider of power and thermal management solutions, high-efficiency DC power systems, and telecom power conversion.',
                'logo_path' => 'img/brand/17.jpg',
                'website_url' => 'https://www.deltaww.com/',
                'sort_order' => 7,
            ],
            [
                'name' => 'Eltek Power Systems',
                'description' => 'High-efficiency DC power systems and telecom rectifier modules engineered for extreme reliability in mission-critical networks.',
                'logo_path' => 'img/brand/18.jpg',
                'website_url' => 'https://www.eltek.com/',
                'sort_order' => 8,
            ],
            [
                'name' => 'Nokia Solutions and Networks',
                'description' => 'Telecom power supply integration, base station power conditioning, and component validation laboratories.',
                'logo_path' => 'img/brand/13.jpg',
                'website_url' => 'https://www.nokia.com/',
                'sort_order' => 9,
            ],
            [
                'name' => 'Ericsson Telecommunications',
                'description' => 'Telecom infrastructure power modules and power plant upgrade partner.',
                'logo_path' => 'img/brand/12.jpg',
                'website_url' => 'https://www.ericsson.com/',
                'sort_order' => 10,
            ],
        ];

        OemPartner::truncate();
        foreach ($oemPartners as $p) {
            OemPartner::create($p + ['is_published' => true]);
        }

        // 6. Leadership & Engineering Directorate (Authentic Sysinfra Divisions)
        TeamMember::truncate();
        $sysinfraTeam = [
            [
                'name' => 'Executive Directorate',
                'title' => 'Managing Director & Infrastructure Board',
                'bio' => 'Steering nationwide telecom tower automation across 70,000+ sites, capital allocation, and strategic telecom operator partnerships with Bharti Airtel, Indus Towers, BSNL, and Reliance Jio.',
                'photo_path' => 'img/productIconImg/overview.png',
                'sort_order' => 0,
            ],
            [
                'name' => 'In-House Retro R&D Division',
                'title' => 'Chief Technology Officer & Embedded Lead',
                'bio' => 'Directing in-house hardware and software engineering teams. Specializing in rapid-turnaround retro development of AMF controllers, RMS telemetry, and ARM Cortex embedded firmware.',
                'photo_path' => 'img/productIconImg/research&Development.png',
                'sort_order' => 1,
            ],
            [
                'name' => 'Manufacturing & Quality Assurance',
                'title' => 'Head of Plant Engineering & QC',
                'bio' => 'Overseeing international-standard manufacturing at our 4,000 sq. ft. Patparganj facility for IP55 AMF outdoor panels, 5G smart enclosures, and rigorous 72-hour burn-in stress testing.',
                'photo_path' => 'img/productIconImg/manufacturingFacility.png',
                'sort_order' => 2,
            ],
            [
                'name' => 'SYS-AXS NOC & IoT Cloud',
                'title' => 'Principal Architect – Cloud & Enterprise IoT',
                'bio' => 'Managing the high-throughput 24/7 cloud NOC gateway orchestrating 10,000+ active sites with predictive fuel theft analytics, environmental sensors, and automated SLA escalations.',
                'photo_path' => 'img/productIconImg/sis-axs.png',
                'sort_order' => 3,
            ],
            [
                'name' => 'Field Operations & Power Logistics',
                'title' => 'Director – 24/7 Field Maintenance & O&M',
                'bio' => 'Leading a pan-India technical fleet with our 24/7 ambulance emergency rapid-intervention model and India\'s premier facility reconditioning over 3,00,000 SMPS rectifier modules.',
                'photo_path' => 'img/productIconImg/siteMaintanance.png',
                'sort_order' => 4,
            ],
        ];

        foreach ($sysinfraTeam as $tm) {
            TeamMember::create($tm + ['is_published' => true]);
        }

        // 7. News & Announcements
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
