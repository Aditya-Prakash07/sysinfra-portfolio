<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CompanyStat;
use App\Models\NewsPost;
use App\Models\OemPartner;
use App\Models\ProductCategory;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'banners' => Banner::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'heading', 'subheading', 'image_path', 'cta_label', 'cta_url']),

            'categories' => ProductCategory::where('is_published', true)
                ->orderBy('sort_order')
                ->withCount('subcategories')
                ->get(['id', 'name', 'slug', 'description', 'thumbnail_path']),

            'featuredProducts' => \App\Models\PortfolioItem::where('is_published', true)
                ->orderBy('sort_order')
                ->take(8)
                ->with('subcategory.category')
                ->get(['id', 'product_subcategory_id', 'name', 'slug', 'model_number', 'short_description', 'cover_image_path', 'specifications']),

            'stats' => CompanyStat::orderBy('sort_order')->get(['label', 'value', 'suffix', 'icon']),

            'testimonials' => Testimonial::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'client_name', 'story', 'logo_path']),

            'clients' => \App\Models\Client::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'name', 'logo_path', 'website_url']),

            'oemPartners' => OemPartner::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'name', 'logo_path', 'website_url']),

            'latestNews' => NewsPost::where('is_published', true)
                ->orderByDesc('published_at')
                ->take(3)
                ->get(['id', 'title', 'slug', 'body', 'cover_image_path', 'published_at']),

            'seo' => [
                'title' => 'System Infra Solutions — Telecom, Power & Tactical Infrastructure',
                'description' => 'System Infra Solutions Pvt. Ltd. (SISPL) delivers ISO-certified AMF panels, SYS-AXS NOC telemetry, 5G smart enclosures, and tactical communications across India.',
            ],
        ]);
    }
}
