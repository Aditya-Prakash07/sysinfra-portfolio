<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use App\Models\PortfolioItem;
use App\Models\NewsPost;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = config('app.url', 'https://www.sanchartelesystems.com');
        $baseUrl = rtrim($baseUrl, '/');

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // 1. Core Pages
        $staticPages = [
            ['url' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => '/products', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => '/latest-news', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/about-us', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/oem-partners', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/careers', 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['url' => '/contact-us', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        $today = date('Y-m-d');

        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . $page['url']) . '</loc>';
            $xml .= '<lastmod>' . $today . '</lastmod>';
            $xml .= '<changefreq>' . $page['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $page['priority'] . '</priority>';
            $xml .= '</url>';
        }

        // 2. Subcategories
        $subcategories = ProductSubcategory::with('category')
            ->where('is_published', true)
            ->get();

        foreach ($subcategories as $sub) {
            if ($sub->category) {
                $subUrl = "{$baseUrl}/products/{$sub->category->slug}/{$sub->slug}";
                $xml .= '<url>';
                $xml .= '<loc>' . htmlspecialchars($subUrl) . '</loc>';
                $xml .= '<lastmod>' . ($sub->updated_at ? $sub->updated_at->format('Y-m-d') : $today) . '</lastmod>';
                $xml .= '<changefreq>weekly</changefreq>';
                $xml .= '<priority>0.8</priority>';
                $xml .= '</url>';
            }
        }

        // 3. Products
        $products = PortfolioItem::with(['subcategory.category'])
            ->where('is_published', true)
            ->get();

        foreach ($products as $item) {
            if ($item->subcategory && $item->subcategory->category) {
                $itemUrl = "{$baseUrl}/products/{$item->subcategory->category->slug}/{$item->subcategory->slug}/{$item->slug}";
                $xml .= '<url>';
                $xml .= '<loc>' . htmlspecialchars($itemUrl) . '</loc>';
                $xml .= '<lastmod>' . ($item->updated_at ? $item->updated_at->format('Y-m-d') : $today) . '</lastmod>';
                $xml .= '<changefreq>weekly</changefreq>';
                $xml .= '<priority>0.7</priority>';
                $xml .= '</url>';
            }
        }

        // 4. Latest News
        $news = NewsPost::where('is_published', true)->get();
        foreach ($news as $post) {
            $postUrl = "{$baseUrl}/latest-news/{$post->slug}";
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($postUrl) . '</loc>';
            $xml .= '<lastmod>' . ($post->updated_at ? $post->updated_at->format('Y-m-d') : $today) . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
