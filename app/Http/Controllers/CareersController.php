<?php

namespace App\Http\Controllers;

use App\Models\JobOpening;
use Inertia\Inertia;
use Inertia\Response;

class CareersController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Careers', [
            'openings' => JobOpening::where('is_published', true)->latest()->get(),
            'seo' => [
                'title' => 'Careers — System Infra Solutions',
                'description' => 'Join System Infra Solutions and build the wireless communication networks that keep India\'s public safety, railways and industry connected.',
            ],
        ]);
    }
}
