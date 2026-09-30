<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'categoriesNav' => fn () => \App\Models\ProductCategory::where('is_published', true)
                ->whereHas('subcategories', fn ($sq) => $sq->where('is_published', true))
                ->orderBy('sort_order')
                ->with([
                    'subcategories' => fn ($q) => $q->where('is_published', true)
                        ->orderBy('sort_order')
                        ->withCount(['items' => fn ($iq) => $iq->where('portfolio_items.is_published', true)])
                ])
                ->withCount(['items' => fn ($iq) => $iq->where('portfolio_items.is_published', true)])
                ->get(['id', 'name', 'slug', 'description', 'thumbnail_path']),
            'siteBranding' => fn () => [
                'site_name' => \App\Models\SiteSetting::get('site_name', 'System Infra Solutions'),
                'logo_light' => \App\Models\SiteSetting::get('site_logo_light'),
                'logo_dark' => \App\Models\SiteSetting::get('site_logo_dark'),
                'phone' => \App\Models\SiteSetting::get('boardline_1', '+91-011-35004142'),
                'email' => \App\Models\SiteSetting::get('email_sales', 'sales@sysinfra.in'),
                'footer_copyright' => \App\Models\SiteSetting::get('footer_copyright', 'System Infra Solutions Private Limited. All Rights Reserved.'),
            ],
        ];
    }
}
