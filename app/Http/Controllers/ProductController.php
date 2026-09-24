<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use App\Models\PortfolioItem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * /products — full category + subcategory tree, mirrors the old mega-menu
     * but as a browsable page instead of a dead end.
     */
    public function index(): Response
    {
        $categories = ProductCategory::where('is_published', true)
            ->whereHas('subcategories', fn ($sq) => $sq->where('is_published', true))
            ->orderBy('sort_order')
            ->with([
                'subcategories' => fn ($q) => $q->where('is_published', true)
                    ->orderBy('sort_order')
                    ->with([
                        'items' => fn ($iq) => $iq->where('is_published', true)
                            ->orderBy('sort_order')
                            ->select(['id', 'product_subcategory_id', 'name', 'slug', 'model_number', 'short_description', 'cover_image_path'])
                    ])
            ])
            ->get(['id', 'name', 'slug', 'description', 'thumbnail_path']);

        return Inertia::render('Products/Index', [
            'categories' => $categories,
            'seo' => [
                'title' => 'Products — System Infra Solutions',
                'description' => 'ISO-certified AMF panels, SYS-AXS NOC telemetry platforms, 5G smart enclosures, DC energy meters, and Motorola Solutions tactical equipment.',
            ],
        ]);
    }

    /**
     * /products/{category}/{subcategory} — item grid for one subcategory.
     */
    public function subcategory(ProductCategory $category, ProductSubcategory $subcategory): Response
    {
        abort_unless($subcategory->product_category_id === $category->id, 404);

        $items = $subcategory->items()
            ->where('is_published', true)
            ->get(['id', 'name', 'slug', 'short_description', 'cover_image_path', 'model_number']);

        return Inertia::render('Products/Category', [
            'category' => $category->only('name', 'slug'),
            'subcategory' => $subcategory->only('name', 'slug', 'description'),
            'items' => $items,
            'seo' => [
                'title' => $subcategory->name.' — System Infra Solutions',
                'description' => $subcategory->description ?? "Browse {$subcategory->name} communication equipment from System Infra Solutions.",
            ],
        ]);
    }

    /**
     * /products/{category}/{subcategory}/{item} — single product spec page.
     */
    public function show(ProductCategory $category, ProductSubcategory $subcategory, PortfolioItem $item): Response
    {
        abort_unless($item->product_subcategory_id === $subcategory->id, 404);

        return Inertia::render('Products/Show', [
            'category' => $category->only('name', 'slug'),
            'subcategory' => $subcategory->only('name', 'slug'),
            'item' => $item,
            'seo' => [
                'title' => ($item->meta_title ?: $item->name).' — System Infra Solutions',
                'description' => $item->meta_description ?: $item->short_description,
            ],
        ]);
    }

    /**
     * /products/{item}/datasheet — official technical specification datasheet.
     */
    public function datasheet(PortfolioItem $item)
    {
        if ($item->datasheet_path && Storage::disk('public')->exists($item->datasheet_path)) {
            return response()->download(
                storage_path('app/public/' . $item->datasheet_path),
                Str::slug($item->name) . '-datasheet.pdf'
            );
        }

        $item->load(['subcategory.category']);

        return view('datasheet', [
            'item' => $item,
            'subcategory' => $item->subcategory,
            'category' => $item->subcategory?->category,
        ]);
    }
}
