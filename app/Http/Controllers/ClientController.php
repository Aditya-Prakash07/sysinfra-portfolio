<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = [
            ['name' => 'Bharti Airtel', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/1.jpg', 'highlight' => 'Nationwide AMF Deployment across 35,000+ Cell Sites'],
            ['name' => 'Indus Towers', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/2.jpg', 'highlight' => 'Smart Energy Controller & DG Auto-cycling Partner'],
            ['name' => 'Reliance Jio', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/3.jpg', 'highlight' => '5G Small Cell Enclosures & Power Conditioning'],
            ['name' => 'Power Grid Corporation of India', 'sector' => 'Energy, Power & Utilities', 'logo' => 'img/brand/4.jpg', 'highlight' => 'Substation Remote Telemetry & SVR Voltage Regulators'],
            ['name' => 'Vodafone Idea (Vi)', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/5.jpg', 'highlight' => 'BTS Shelter Environmental Management & Dual-AC'],
            ['name' => 'American Tower Corporation (ATC)', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/6.jpg', 'highlight' => 'SYS-AXS NOC Remote Monitoring Integration'],
            ['name' => 'Bharat Sanchar Nigam Limited (BSNL)', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/7.jpg', 'highlight' => 'Turnkey Telecom Infrastructure O&M Services'],
            ['name' => 'Tata Communications / Teleservices', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/8.jpg', 'highlight' => 'Fiber Exchange Power Systems & Rectifier AMC'],
            ['name' => 'Ascend Telecom Infrastructure', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/9.jpg', 'highlight' => 'Tower Site Energy Optimization & LVD Controls'],
            ['name' => 'GTL Infrastructure', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/10.jpg', 'highlight' => 'DG Auto-Start & Diesel Theft Surveillance'],
            ['name' => 'Tower Vision India', 'sector' => 'Telecom Operators & TowerCos', 'logo' => 'img/brand/11.jpg', 'highlight' => 'Multi-Tenant Tower Energy Metering Units'],
            ['name' => 'Ericsson Telecommunications', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/12.jpg', 'highlight' => 'Rectifier Module Reconditioning to OEM Standards'],
            ['name' => 'Nokia Solutions and Networks', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/13.jpg', 'highlight' => 'Telecom Power Supply Integration & Lab Certification'],
            ['name' => 'Huawei Telecommunications', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/14.jpg', 'highlight' => 'SMPS Module Refurbishment & Board Repairs'],
            ['name' => 'ZTE Telecom India', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/15.jpg', 'highlight' => 'DC Power Conversion & Power Plant Upgrades'],
            ['name' => 'Vertiv / Emerson Network Power', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/16.jpg', 'highlight' => '3,00,000+ Power Modules Serviced in Patparganj'],
            ['name' => 'Delta Power Solutions', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/17.jpg', 'highlight' => 'In-house Component-Level Testing & Validation'],
            ['name' => 'Eltek Power Systems', 'sector' => 'OEM Power & Equipment Partners', 'logo' => 'img/brand/18.jpg', 'highlight' => 'High-Efficiency DC Rectifier Support'],
            ['name' => 'Indian Railways', 'sector' => 'Transportation & Public Utilities', 'logo' => 'img/brand/19.jpg', 'highlight' => 'Station Signalling & Telemetry Power Backups'],
            ['name' => 'Delhi Metro Rail Corporation (DMRC)', 'sector' => 'Transportation & Public Utilities', 'logo' => 'img/brand/20.jpg', 'highlight' => 'Underground Tunnel Telecommunications & AMF'],
            ['name' => 'GAIL (India) Limited', 'sector' => 'Energy, Power & Utilities', 'logo' => 'img/brand/21.jpg', 'highlight' => 'Gas Pipeline Repeater Station Remote Telemetry'],
            ['name' => 'Oil and Natural Gas Corporation (ONGC)', 'sector' => 'Energy, Power & Utilities', 'logo' => 'img/brand/22.jpg', 'highlight' => 'Offshore / Onshore Rig Communications & SVR'],
            ['name' => 'Indian Armed Forces (MoD)', 'sector' => 'Defence & Homeland Security', 'logo' => 'img/brand/23.jpg', 'highlight' => 'Motorola Solutions Tactical Radios & Weather Stations'],
            ['name' => 'Central Reserve Police Force (CRPF)', 'sector' => 'Defence & Homeland Security', 'logo' => 'img/brand/24.jpg', 'highlight' => 'Tactical Communication Gear & Base Repeaters'],
            ['name' => 'Border Security Force (BSF)', 'sector' => 'Defence & Homeland Security', 'logo' => 'img/brand/25.jpg', 'highlight' => 'Extreme-Climate Automatic Weather Station (AWS)'],
            ['name' => 'Central Industrial Security Force (CISF)', 'sector' => 'Defence & Homeland Security', 'logo' => 'img/brand/26.jpg', 'highlight' => 'Airport & Strategic Plant Perimeter Telemetry'],
            ['name' => 'Larsen & Toubro (L&T)', 'sector' => 'Infrastructure & EPC Leaders', 'logo' => 'img/brand/27.jpg', 'highlight' => 'Smart City 5G Street Furniture Enclosures'],
            ['name' => 'Sterling and Wilson', 'sector' => 'Infrastructure & EPC Leaders', 'logo' => 'img/brand/28.jpg', 'highlight' => 'Solar Hybrid Power Plant Integration & Microgrid'],
            ['name' => 'Voltas Limited', 'sector' => 'HVAC & Climate Control', 'logo' => 'img/brand/29.jpg', 'highlight' => 'Precision Shelter AC Duty-Cycling Controllers'],
            ['name' => 'Cummins India', 'sector' => 'Genset & Power Generation', 'logo' => 'img/brand/30.jpg', 'highlight' => 'J1939 CAN Bus Engine Telemetry Protocol Integration'],
            ['name' => 'Kirloskar Oil Engines', 'sector' => 'Genset & Power Generation', 'logo' => 'img/brand/31.jpg', 'highlight' => 'Universal AMF Panel Compatibility for DG Fleets'],
        ];

        return Inertia::render('Clients', [
            'clients' => $clients,
            'seo' => [
                'title' => 'Our Clients & Enterprise Partners — System Infra Solutions',
                'description' => 'Trusted by India\'s leading telecom operators, towercos, public sector undertakings, and defence forces including Airtel, Indus, Jio, Power Grid, and Indian Armed Forces.',
            ],
        ]);
    }
}
