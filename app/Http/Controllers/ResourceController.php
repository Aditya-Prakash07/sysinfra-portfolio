<?php

namespace App\Http\Controllers;

use App\Models\Catalogue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ResourceController extends Controller
{
    /**
     * Default fallback catalogues metadata matching sysinfra.in/resource.php
     */
    public static function getDefaultCatalogues(): array
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
                'is_master' => true,
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
                'is_master' => false,
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
                'is_master' => false,
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
                'is_master' => false,
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
                'is_master' => false,
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
                'is_master' => false,
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
                'is_master' => false,
            ],
        ];
    }

    /**
     * Get all active catalogues from database with fallback
     */
    public static function getCatalogues(): array
    {
        $dbCatalogues = Catalogue::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        if ($dbCatalogues->isNotEmpty()) {
            return $dbCatalogues->map(function ($cat) {
                $filePath = $cat->file_path;
                $cleanPath = str_starts_with($filePath, '/') ? $filePath : (str_starts_with($filePath, 'storage/') ? '/' . $filePath : '/storage/' . $filePath);

                return [
                    'id' => $cat->id,
                    'slug' => $cat->slug,
                    'title' => $cat->title,
                    'subtitle' => $cat->subtitle,
                    'category' => $cat->category,
                    'filename' => basename($cat->file_path),
                    'path' => $cleanPath,
                    'size' => $cat->file_size ?? 'PDF Spec',
                    'pages' => $cat->pages ?? 'Technical Sheet',
                    'description' => $cat->description,
                    'badge' => $cat->badge ?? $cat->category,
                    'popular' => (bool) $cat->is_popular,
                    'is_master' => (bool) $cat->is_master,
                ];
            })->toArray();
        }

        return self::getDefaultCatalogues();
    }

    /**
     * Display the official Catalogues & Resources page
     */
    public function index(): Response
    {
        $catalogues = self::getCatalogues();
        $master = collect($catalogues)->firstWhere('is_master', true) ?? ($catalogues[0] ?? null);

        return Inertia::render('Resources', [
            'catalogues' => $catalogues,
            'masterCatalogue' => $master,
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
        $master = Catalogue::where('is_master', true)->where('is_published', true)->first();
        if ($master && !empty($master->file_path)) {
            $filePath = storage_path('app/public/' . ltrim($master->file_path, '/'));
            if (!file_exists($filePath)) {
                $filePath = public_path(ltrim($master->file_path, '/'));
            }
            if (file_exists($filePath)) {
                return response()->download($filePath, basename($master->file_path), ['Content-Type' => 'application/pdf']);
            }
        }

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
        $dbCat = Catalogue::where('slug', $slug)
            ->orWhere('id', $slug)
            ->first();

        if ($dbCat && !empty($dbCat->file_path)) {
            $filePath = storage_path('app/public/' . ltrim($dbCat->file_path, '/'));
            if (!file_exists($filePath)) {
                $filePath = public_path(ltrim($dbCat->file_path, '/'));
            }
            if (file_exists($filePath)) {
                return response()->download($filePath, basename($dbCat->file_path), ['Content-Type' => 'application/pdf']);
            }
        }

        $catalogues = self::getDefaultCatalogues();
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
