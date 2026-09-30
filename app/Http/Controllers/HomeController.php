<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CompanyStat;
use App\Models\NewsPost;
use App\Models\OemPartner;
use App\Models\PortfolioItem;
use App\Models\ProductCategory;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $uploadedVideo = SiteSetting::get('hero_video_path');
        $videoUrl = SiteSetting::get('hero_video_url');
        $finalVideo = !empty($uploadedVideo)
            ? (str_starts_with($uploadedVideo, '/') ? $uploadedVideo : '/storage/' . $uploadedVideo)
            : (!empty($videoUrl) ? $videoUrl : '/img/sysinfra-video-banner.mp4');

        $uploadedPoster = SiteSetting::get('hero_video_poster');
        $finalPoster = !empty($uploadedPoster)
            ? (str_starts_with($uploadedPoster, '/') ? $uploadedPoster : '/storage/' . $uploadedPoster)
            : '/img/video-banner-poster.jpg';

        $videoSettings = [
            'video_url' => $finalVideo,
            'poster_url' => $finalPoster,
            'badge' => SiteSetting::get('hero_video_badge', '8,000 SQ. FT. ADVANCED MANUFACTURING FACILITY • PATPARGANJ NEW DELHI'),
            'title' => SiteSetting::get('hero_video_title', 'Inside Our Patparganj Electronics Facility'),
            'subtitle' => SiteSetting::get('hero_video_subtitle', 'Watch how our state-of-the-art Delhi manufacturing facility produces high-reliability AMF panels, IoT telemetry systems, and precision power electronics.'),
            'highlights' => SiteSetting::get('hero_video_highlights', null),
        ];

        return Inertia::render('Home', [
            'banners' => Banner::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'heading', 'subheading', 'image_path', 'cta_label', 'cta_url']),

            'videoSettings' => $videoSettings,

            'categories' => ProductCategory::where('is_published', true)
                ->orderBy('sort_order')
                ->withCount('subcategories')
                ->get(['id', 'name', 'slug', 'description', 'thumbnail_path']),

            'featuredProducts' => PortfolioItem::where('is_published', true)
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
