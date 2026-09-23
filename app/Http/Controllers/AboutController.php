<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About', [
            'team' => TeamMember::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['name', 'title', 'bio', 'photo_path']),
            'seo' => [
                'title' => 'About Us — System Infra Solutions',
                'description' => 'System Infra Solutions is an ISO-certified engineering leader in telecom power automation, SYS-AXS NOC telemetry, 5G smart enclosures, and tactical wireless networks.',
            ],
        ]);
    }
}
