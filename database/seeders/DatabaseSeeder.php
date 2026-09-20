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
     * client case studies, and OEM partners for System Infra Solutions.
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

        // 1. Categories & Subcategories Tree for System Infra Solutions
        $tree = [
            'Energy Management & Control' => [
                'thumbnail' => 'img/course/1.png',
                'description' => 'Automated switching, solar hybrid controllers, and remote battery health monitoring systems.',
                'subs' => [
                    'AMF Panel (Indoor & Outdoor)',
                    'Solar Cell Site Controllers',
                    'Remote Monitoring Systems (RMS)',
                    'Dual DG Controllers',
                    'Retrofit AMF Controllers',
                ],
            ],
            'NOC & IoT Automation' => [
                'thumbnail' => 'img/course/2.png',
                'description' => 'SYS-AXS NOC telemetry platform, anti-theft sensing, fuel level telemetry, and edge compute boxes.',
                'subs' => [
                    'SYS-AXS Platform',
                    'I-Protect Security Node',
                    'Z-Brainer Intelligent Edge',
                    'Smart Box (5G / Small Cell)',
                    'GPRS Modems & Sensors',
                ],
            ],
            'Defence & Strategic Gear' => [
                'thumbnail' => 'img/course/5.png',
                'description' => 'Motorola Solutions authorized tactical communications, AWS weather stations, and DC energy metering.',
                'subs' => [
                    'Tactical Radios (Motorola Solutions)',
                    'Automatic Weather Station',
                    'Class 1 DC Energy Meters',
                    'DC-DC Power Converters',
                    'SMPS Module Re-conditioning',
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
                $subSlug = Str::slug($categoryName.'-'.$subName);
                $sub = ProductSubcategory::updateOrCreate(
                    ['slug' => $subSlug],
                    [
                        'product_category_id' => $category->id,
                        'name' => $subName,
                        'description' => "Engineered {$subName} infrastructure solutions for enterprise, industrial, and telecom deployment.",
                        'sort_order' => $subSort++,
                        'is_published' => true,
                    ]
                );
                $createdSubs[$subName] = $sub;
            }
        }

        // 2. Products from sysinfra.in catalog
        $products = [
            [
                'sub' => 'AMF Panel (Indoor & Outdoor)',
                'name' => 'AMF Panel (Outdoor Telecom Enclosure)',
                'model' => 'SIS-AMF-OD-40A',
                'desc' => 'All-weather IP55 outdoor cabinet engineered with auto-mains failure transfer and intelligent generator cycling.',
                'img' => 'img/productIconImg/Amf pannel(Outdoor).png',
                'specs' => [
                    ['label' => 'Enclosure', 'value' => 'IP55 Weatherproof Outdoor Sheet Metal'],
                    ['label' => 'Mains Rating', 'value' => '3-Phase 415V / Single Phase 230V'],
                    ['label' => 'Transfer Time', 'value' => '< 5 Seconds Automated Switchover'],
                    ['label' => 'Fuel Containment', 'value' => 'Integrated DG Run-Hours Optimization'],
                ],
            ],
            [
                'sub' => 'AMF Panel (Indoor & Outdoor)',
                'name' => 'AMF Panel (Indoor Shelter Spec)',
                'model' => 'SIS-AMF-IN-63A',
                'desc' => 'High-capacity indoor telecom shelter AMF system with dual contactor interlocking and line voltage telemetry.',
                'img' => 'img/productIconImg/Amf pannel(Indoor).png',
                'specs' => [
                    ['label' => 'Rating', 'value' => 'Up to 63A Continuous Load per Phase'],
                    ['label' => 'Protection', 'value' => 'Overvoltage, Undervoltage, Phase Reversal, Lightning SPD'],
                    ['label' => 'Display', 'value' => 'Alphanumeric Backlit LCD Console'],
                ],
            ],
            [
                'sub' => 'Solar Cell Site Controllers',
                'name' => 'AMF Panel for Solar Cell Site',
                'model' => 'SIS-SOLAR-HYBRID',
                'desc' => 'Solar-priority hybrid controller managing solar array generation, battery bank charging, and grid power fallback.',
                'img' => 'img/course/1.png',
                'specs' => [
                    ['label' => 'PV Input', 'value' => 'Up to 15kW Hybrid MPPT Integration'],
                    ['label' => 'Battery Sync', 'value' => 'VRLA & Li-Ion BMS Communication'],
                    ['label' => 'Fuel Savings', 'value' => 'Up to 45% DG Run-Hour Reduction'],
                ],
            ],
            [
                'sub' => 'SYS-AXS Platform',
                'name' => 'SYS-AXS Centralized NOC Gateway',
                'model' => 'SYS-AXS-PRO',
                'desc' => 'Comprehensive remote monitoring telemetry unit reporting alarms, site access, and power parameters directly to central NOC.',
                'img' => 'img/productIconImg/sis-axs.png',
                'specs' => [
                    ['label' => 'Connectivity', 'value' => '4G/LTE Cat-1 with 2G Fallback, Ethernet LAN'],
                    ['label' => 'Sensors', 'value' => 'Fuel Ultrasonic, Temp/Humidity, Smoke, Door Tamper'],
                    ['label' => 'Protocol', 'value' => 'MQTT, SNMP v2/v3, Modbus RTU RS485'],
                ],
            ],
            [
                'sub' => 'I-Protect Security Node',
                'name' => 'I-Protect Intelligent Security Unit',
                'model' => 'SIS-IPROTECT-V3',
                'desc' => 'Physical site security, passive infrared motion sensing, smart RFID access lock control, and fuel anti-pilferage deterrent.',
                'img' => 'img/productIconImg/i-protect.png',
                'specs' => [
                    ['label' => 'Access Control', 'value' => 'RFID Badge & Remote OTP via NOC App'],
                    ['label' => 'Siren', 'value' => '110dB Strobe Siren Trigger on Perimeter Breach'],
                    ['label' => 'Battery Backup', 'value' => 'Internal Li-Ion 24-Hour Keep-Alive'],
                ],
            ],
            [
                'sub' => 'Z-Brainer Intelligent Edge',
                'name' => 'Z-Brainer Edge Computing Controller',
                'model' => 'SIS-ZBRAINER-EDGE',
                'desc' => 'Embedded ARM microprocessor edge gateway calculating site efficiency, battery health index, and predictive fault notifications.',
                'img' => 'img/productIconImg/z-brainer.png',
                'specs' => [
                    ['label' => 'Processor', 'value' => 'ARM Cortex Industrial Core @ 800MHz'],
                    ['label' => 'Storage', 'value' => '32GB Onboard Industrial Flash for Blackbox Logging'],
                    ['label' => 'Edge AI', 'value' => 'Anomaly Detection for Rectifiers & Battery Banks'],
                ],
            ],
            [
                'sub' => 'Smart Box (5G / Small Cell)',
                'name' => 'Smart Box for 5G Small Cell Deployment',
                'model' => 'SIS-5G-SMARTBOX',
                'desc' => 'Compact pole-mounted outdoor unit with integrated power backup, fibre breakout, and CCTV edge connection for 5G micro-sites.',
                'img' => 'img/productIconImg/smartBoxIcon.png',
                'specs' => [
                    ['label' => 'Mounting', 'value' => 'Street Light Pole & Wall Mountable'],
                    ['label' => 'Output', 'value' => '-48V DC & 230V AC Regulated Outputs'],
                    ['label' => 'Cooling', 'value' => 'Thermostatically Controlled Forced Air Convection'],
                ],
            ],
            [
                'sub' => 'Tactical Radios (Motorola Solutions)',
                'name' => 'Motorola Solutions DMR & Tactical Transceivers',
                'model' => 'MOTOTRBO-TACTICAL',
                'desc' => 'Authorized channel partner supply of mission-critical encrypted digital mobile radios for defence, railways, and utilities.',
                'img' => 'img/tacticalComm/1.png',
                'specs' => [
                    ['label' => 'Partner Tier', 'value' => 'Motorola Solutions Authorized Channel Partner'],
                    ['label' => 'Standards', 'value' => 'DMR Tier II / Tier III, P25, MIL-STD 810G'],
                    ['label' => 'Encryption', 'value' => 'Hardware AES-256 Bit Secure Voice'],
                ],
            ],
            [
                'sub' => 'Class 1 DC Energy Meters',
                'name' => 'DC Energy Meter (Class 1 High Accuracy)',
                'model' => 'SIS-DC-METER-100A',
                'desc' => 'Multi-channel DC energy metering device for precise operator-wise billing in shared infrastructure telecom towers.',
                'img' => 'img/productIconImg/dcenergymeter.png',
                'specs' => [
                    ['label' => 'Accuracy', 'value' => 'Class 1.0 (IEC 62053-21 Compliant)'],
                    ['label' => 'Channels', 'value' => 'Up to 6 Independent DC Operator Shunts'],
                    ['label' => 'Bus', 'value' => 'Modbus RTU over Isolated RS485'],
                ],
            ],
            [
                'sub' => 'SMPS Module Re-conditioning',
                'name' => 'Telecom SMPS Rectifier Re-Conditioning',
                'model' => 'SIS-SMPS-RECON',
                'desc' => 'Certified high-precision repair and re-conditioning of telecom power supply modules (over 300,000 units delivered).',
                'img' => 'img/productIconImg/moduleRecondition.png',
                'specs' => [
                    ['label' => 'Scale', 'value' => 'Over 3,00,000 Power Modules Serviced Nationwide'],
                    ['label' => 'Testing', 'value' => 'Full Load Burn-in & Thermal Imaging Quality Checks'],
                    ['label' => 'Warranty', 'value' => 'Complete Field Assurance Warranty on Rebuilt Units'],
                ],
            ],
        ];

        PortfolioItem::truncate();
        foreach ($products as $idx => $p) {
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

        // 3. Impact Stats
        $stats = [
            ['label' => 'MODULES RECONDITIONED', 'value' => 300000, 'suffix' => ' +', 'icon' => 'briefcase', 'sort_order' => 0],
            ['label' => 'TELECOM SITES AUTOMATED', 'value' => 70000, 'suffix' => ' +', 'icon' => 'clipboard', 'sort_order' => 1],
            ['label' => 'AMF CONTROLLERS DEPLOYED', 'value' => 50000, 'suffix' => ' +', 'icon' => 'network', 'sort_order' => 2],
        ];

        CompanyStat::truncate();
        foreach ($stats as $s) {
            CompanyStat::create($s);
        }

        // 4. Testimonials / Key Deployment Stories
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
