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
                'description' => 'System Infra Solutions is a market leader in wireless communications in India, delivering end-to-end solutions from conceptualization to system design to project execution.',
            ],
        ]);
    }
}
