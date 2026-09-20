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
                ->orderBy('sort_order')
                ->with([
                    'subcategories' => fn ($q) => $q->where('is_published', true)
                        ->orderBy('sort_order')
                        ->withCount(['items' => fn ($iq) => $iq->where('portfolio_items.is_published', true)])
                ])
                ->withCount(['items' => fn ($iq) => $iq->where('portfolio_items.is_published', true)])
                ->get(['id', 'name', 'slug', 'description', 'thumbnail_path']),
        ];
    }
}
