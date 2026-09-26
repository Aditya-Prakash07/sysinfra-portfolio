<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\OemPartnerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SitemapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about-us', [AboutController::class, 'index'])->name('about');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{item:slug}/datasheet', [ProductController::class, 'datasheet'])
    ->name('products.datasheet');
Route::get('/products/{category:slug}/{subcategory:slug}', [ProductController::class, 'subcategory'])
    ->name('products.subcategory');
Route::get('/products/{category:slug}/{subcategory:slug}/{item:slug}', [ProductController::class, 'show'])
    ->name('products.show');
Route::get('/products/{category:slug}/{subcategory:slug}/{item:slug}/datasheet', [ProductController::class, 'datasheet'])
    ->name('products.show.datasheet');

Route::get('/latest-news', [NewsController::class, 'index'])->name('news.index');
Route::get('/latest-news/{post:slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/clients', [ClientController::class, 'index'])->name('clients');
Route::get('/our-clients', fn () => redirect('/clients', 301));
Route::get('/oem-partners', [OemPartnerController::class, 'index'])->name('oem-partners');
Route::get('/media', [EventController::class, 'index'])->name('events.index');
Route::get('/events', fn () => redirect('/media', 301));
Route::get('/careers', [CareersController::class, 'index'])->name('careers');

Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/resource.php', fn () => redirect('/resources', 301));
Route::get('/catalogues', fn () => redirect('/resources', 301))->name('catalogues');
Route::get('/catalogue', fn () => redirect('/resources', 301));
Route::get('/download-catalog', [ResourceController::class, 'downloadMaster'])->name('catalog.download');
Route::get('/catalogues/download/{catalogue}', [ResourceController::class, 'download'])->name('catalogues.download');

Route::get('/contact-us', [ContactUsController::class, 'index'])->name('contact');
Route::post('/contact-us', [ContactUsController::class, 'store'])->name('contact.store');

// Legacy sysinfra.in contact and inquiry endpoints
Route::get('/contact', fn () => redirect('/contact-us', 301));
Route::post('/contact', [ContactUsController::class, 'store']);
Route::get('/connectWithus.php', fn () => redirect('/contact-us', 301));
Route::get('/inquiryNow.php', fn () => redirect('/contact-us', 301));
Route::match(['get', 'post'], '/inquiry.php', function (Request $request) {
    if ($request->isMethod('post')) {
        return app(ContactUsController::class)->store($request);
    }
    return redirect('/contact-us', 301);
});

// Filament serves /admin itself once installed — no route needed here.
