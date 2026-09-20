<?php

namespace App\Http\Controllers;

use App\Models\OemPartner;
use Inertia\Inertia;
use Inertia\Response;

class OemPartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('OemPartners', [
            'partners' => OemPartner::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['name', 'description', 'logo_path', 'website_url']),
            'seo' => [
                'title' => 'OEM Partners — Sanchar Telesystems',
                'description' => 'Sanchar Telesystems collaborates with leading global OEMs including Kenwood, Nokia and Teltronics to bring best-in-class communication solutions to India.',
            ],
        ]);
    }
}
