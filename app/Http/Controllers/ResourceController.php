<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ResourceController extends Controller
{
    /**
     * Catalogues metadata matching sysinfra.in/resource.php
     */
    public static function getCatalogues(): array
    {
        return [
            [
                'id' => 'master-corporate',
                'slug' => 'system-infra-solutions-catalogue',
                'title' => 'System Infra Solutions Corporate Catalogue',
                'subtitle' => 'Comprehensive Technical & Product Architecture',
                'category' => 'Master Corporate',
                'filename' => 'SystemInfraSolutionsCatalogue.pdf',
                'path' => '/storage/catalogue/SystemInfraSolutionsCatalogue.pdf',
                'legacy_path' => '/img/catalogue/SystemInfraSolutionsCatalogue.pdf',
                'size' => '2.26 MB',
                'pages' => 'Full Portfolio',
                'description' => 'Complete catalog covering telecom power controllers, AMF systems, SYS-AXS NOC telemetry, small cell smart enclosures, and Patparganj manufacturing plant capabilities.',
                'badge' => 'Flagship Catalog',
                'popular' => true,
            ],
            [
                'id' => 'i-protect',
                'slug' => 'i-protect-security-catalogue',
                'title' => 'I-Protect Telecom Tower Security & Anti-Theft',
                'subtitle' => 'Site Surveillance, RFID Access & Fuel Siphon Deterrent',
                'category' => 'Security Telemetry',
                'filename' => 'IProtectCatalouge.pdf',
                'path' => '/storage/catalogue/IProtectCatalouge.pdf',
                'legacy_path' => '/img/catalogue/IProtectCatalouge.pdf',
                'size' => '640 KB',
                'pages' => 'Technical Sheet',
                'description' => 'Smart perimeter security, RFID keyless entry, dual PIR intrusion motion sensors, siren automation, and diesel tank ultrasonic level monitoring.',
                'badge' => 'Patented IoT',
                'popular' => true,
            ],
            [
                'id' => 'sis-axs',
                'slug' => 'sis-axs-noc-catalogue',
                'title' => 'SIS-AXS Enterprise NOC Platform & Remote Telemetry',
                'subtitle' => 'Centralized Monitoring & IoT Management Unit',
                'category' => 'NOC Automation',
                'filename' => 'SIS-AXSCatalouge.pdf',
                'path' => '/storage/catalogue/SIS-AXSCatalouge.pdf',
                'legacy_path' => '/img/catalogue/SIS-AXSCatalouge.pdf',
                'size' => '706 KB',
                'pages' => 'Technical Spec',
                'description' => 'Cloud-connected NOC telemetry gateway managing remote diesel generator parameters, battery bank health, grid availability, and multi-tenant billing.',
                'badge' => 'Cloud Telemetry',
                'popular' => true,
            ],
            [
                'id' => 'smart-box',
                'slug' => 'smart-box-5g-catalogue',
                'title' => 'Smart Box 5G Small Cell & Micro-Site Enclosure',
                'subtitle' => 'Integrated Urban Telecom Infrastructure Enclosures',
                'category' => '5G Infrastructure',
                'filename' => 'SmartBoxCatalog.pdf',
                'path' => '/storage/catalogue/SmartBoxCatalog.pdf',
                'legacy_path' => '/img/catalogue/SmartBoxCatalog.pdf',
                'size' => '808 KB',
                'pages' => 'Product Spec',
                'description' => 'Compact IP65 outdoor telecom enclosures designed for pole mounting, fiber aggregation, smart street furniture, and high-density 5G radio deployments.',
                'badge' => '5G Enclosure',
                'popular' => false,
            ],
            [
                'id' => 'amf-panel',
                'slug' => 'amf-panel-controller-catalogue',
                'title' => 'AMF Panel Automated Power Controllers',
                'subtitle' => 'Auto Mains Failure & Hybrid DG Automation Panels',
                'category' => 'Power Automation',
                'filename' => 'AMFPanel.pdf',
                'path' => '/storage/catalogue/AMFPanel.pdf',
                'legacy_path' => '/img/catalogue/AMFPanel.pdf',
                'size' => '702 KB',
                'pages' => 'Engineering Guide',
                'description' => 'Automated Mains Failure controllers for telecom and commercial sites. Handles automatic generator start/stop, phase sequencing, and fuel conservation.',
                'badge' => '70,000+ Deployed',
                'popular' => true,
            ],
            [
                'id' => 'dual-dg',
                'slug' => 'dual-dg-controller-catalogue',
                'title' => 'Dual DG Automation Controller System',
                'subtitle' => 'Intelligent Dual Generator Alternating Logic',
                'category' => 'Power Automation',
                'filename' => 'DualDGcontroller.pdf',
                'path' => '/storage/catalogue/DualDGcontroller.pdf',
                'legacy_path' => '/img/catalogue/DualDGcontroller.pdf',
                'size' => '468 KB',
                'pages' => 'Specification',
                'description' => 'Equal run-time load balancing and automated switchover for sites running dual diesel generator setups in harsh off-grid geographies.',
                'badge' => 'Energy Optimization',
                'popular' => false,
            ],
            [
                'id' => 'security',
                'slug' => 'security-automation-catalogue',
                'title' => 'Security Automation & Perimeter Defense Systems',
                'subtitle' => 'Turnstiles, Bollards, Road Blockers & Inspection',
                'category' => 'Perimeter Defense',
                'filename' => 'Security.pdf',
                'path' => '/storage/catalogue/Security.pdf',
                'legacy_path' => '/img/catalogue/Security.pdf',
                'size' => '5.48 MB',
                'pages' => 'Comprehensive Guide',
                'description' => 'High-security crash-rated bollards, hydraulic road blockers, tyre killers, flap turnstiles, and UVSS vehicle undercarriage scanners for defence and VIP installations.',
                'badge' => 'Defence Grade',
                'popular' => true,
            ],
        ];
    }

    /**
     * Display the official Catalogues & Resources page
     */
    public function index(): Response
    {
        return Inertia::render('Resources', [
            'catalogues' => self::getCatalogues(),
            'seo' => [
                'title' => 'Official Product Catalogues & Technical Brochures — System Infra Solutions',
                'description' => 'Download official PDF catalogues for System Infra Solutions products including AMF panels, SYS-AXS NOC telemetry, i-Protect tower security, and 5G smart enclosures.',
            ],
        ]);
    }

    /**
     * Trigger direct download for the master corporate catalogue
     */
    public function downloadMaster(): BinaryFileResponse
    {
        $filePath = public_path('storage/catalogue/SystemInfraSolutionsCatalogue.pdf');
        if (!file_exists($filePath)) {
            $filePath = storage_path('app/public/catalogue/SystemInfraSolutionsCatalogue.pdf');
        }

        return response()->download(
            $filePath,
            'SystemInfraSolutions_MasterCatalogue.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    /**
     * Download a specific catalogue by slug or filename
     */
    public function download(string $slug): BinaryFileResponse
    {
        $catalogues = self::getCatalogues();
        $target = null;

        foreach ($catalogues as $cat) {
            if ($cat['slug'] === $slug || $cat['id'] === $slug || strtolower($cat['filename']) === strtolower($slug) || strtolower($cat['filename']) === strtolower($slug . '.pdf')) {
                $target = $cat;
                break;
            }
        }

        if (!$target) {
            return $this->downloadMaster();
        }

        $filePath = public_path('storage/catalogue/' . $target['filename']);
        if (!file_exists($filePath)) {
            $filePath = storage_path('app/public/catalogue/' . $target['filename']);
        }

        return response()->download(
            $filePath,
            $target['filename'],
            ['Content-Type' => 'application/pdf']
        );
    }
}
