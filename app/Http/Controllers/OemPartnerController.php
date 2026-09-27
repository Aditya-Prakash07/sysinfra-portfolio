<?php

namespace App\Http\Controllers;

use App\Models\OemPartner;
use Inertia\Inertia;
use Inertia\Response;

class OemPartnerController extends Controller
{
    public function index(): Response
    {
        $dbPartners = OemPartner::where('is_published', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'description', 'logo_path', 'website_url', 'sort_order']);

        $partners = $dbPartners->isNotEmpty() ? $dbPartners->all() : $this->fallbackPartners();

        return Inertia::render('OemPartners', [
            'partners' => $partners,
            'seo' => [
                'title' => 'OEM & Technology Partners — System Infra Solutions',
                'description' => 'System Infra Solutions is an Authorised Channel Partner for Motorola Solutions and collaborates with premier power and telecom equipment OEMs to deliver mission-critical infrastructure across India.',
            ],
        ]);
    }

    protected function fallbackPartners(): array
    {
        return [
            [
                'name' => 'Motorola Solutions',
                'description' => 'Global leader in public safety and enterprise security technology. Authorized Channel Partner for MOTOTRBO digital two-way radios, ASTRO 25 systems, VB400 body-worn cameras, TLK LTE push-to-talk radios, and HALO smart environmental sensors.',
                'logo_path' => 'img/motorola-solutions.png',
                'website_url' => 'https://www.motorolasolutions.com/',
                'sort_order' => 1,
            ],
            [
                'name' => 'Vertiv / Emerson Network Power',
                'description' => 'Global leader in critical digital infrastructure and continuity solutions. Strategic engineering partner for telecom DC power plants, NetSure rectifier modules, inverter systems, and power conditioning.',
                'logo_path' => 'img/partners/vertiv.svg',
                'website_url' => 'https://www.vertiv.com/',
                'sort_order' => 2,
            ],
            [
                'name' => 'Delta Power Solutions',
                'description' => 'World-class provider of energy-efficient power conversion and thermal management solutions for telecom cellular base stations and green energy sites.',
                'logo_path' => 'img/partners/delta.svg',
                'website_url' => 'https://www.deltaww.com/',
                'sort_order' => 3,
            ],
            [
                'name' => 'Eltek Power Systems',
                'description' => 'Strategic partner in high-efficiency DC power technology, Flatpack modular rectifiers, and industrial power engineering for mission-critical telecom networks.',
                'logo_path' => 'img/partners/eltek.svg',
                'website_url' => 'https://www.eltek.com/',
                'sort_order' => 4,
            ],
            [
                'name' => 'Nokia Solutions and Networks',
                'description' => 'Telecom network infrastructure leader, base station power conditioning, and RF telecom equipment engineering support.',
                'logo_path' => 'img/partners/nokia.svg',
                'website_url' => 'https://www.nokia.com/',
                'sort_order' => 5,
            ],
            [
                'name' => 'Ericsson Telecommunications',
                'description' => 'Global telecommunications equipment partner for cellular site power conversion units, SMPS modules, and telecom plant power infrastructure.',
                'logo_path' => 'img/partners/ericsson.svg',
                'website_url' => 'https://www.ericsson.com/',
                'sort_order' => 6,
            ],
        ];
    }
}
