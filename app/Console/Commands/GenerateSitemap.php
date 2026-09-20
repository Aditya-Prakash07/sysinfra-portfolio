<?php

namespace App\Console\Commands;

use App\Models\NewsPost;
use App\Models\PortfolioItem;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    protected $signature = 'sanchar:generate-sitemap';

    protected $description = 'Regenerate public/sitemap.xml from published content';

    public function handle(): int
    {
        $base = rtrim(config('app.url'), '/');
        $urls = collect([
            ['loc' => $base.'/', 'priority' => '1.0'],
            ['loc' => $base.'/about-us', 'priority' => '0.8'],
            ['loc' => $base.'/products', 'priority' => '0.9'],
            ['loc' => $base.'/oem-partners', 'priority' => '0.6'],
            ['loc' => $base.'/careers', 'priority' => '0.5'],
            ['loc' => $base.'/contact-us', 'priority' => '0.7'],
        ]);

        foreach (ProductSubcategory::where('is_published', true)->with('category')->get() as $sub) {
            $urls->push([
                'loc' => "{$base}/products/{$sub->category->slug}/{$sub->slug}",
                'priority' => '0.8',
            ]);
        }

        foreach (PortfolioItem::where('is_published', true)->with('subcategory.category')->get() as $item) {
            $urls->push([
                'loc' => "{$base}/products/{$item->subcategory->category->slug}/{$item->subcategory->slug}/{$item->slug}",
                'priority' => '0.7',
            ]);
        }

        foreach (NewsPost::where('is_published', true)->get() as $post) {
            $urls->push([
                'loc' => "{$base}/latest-news/{$post->slug}",
                'priority' => '0.4',
            ]);
        }

        $xml = view('sitemap', ['urls' => $urls])->render();
        File::put(public_path('sitemap.xml'), $xml);

        $this->info('sitemap.xml written with '.$urls->count().' URLs.');

        return self::SUCCESS;
    }
}
