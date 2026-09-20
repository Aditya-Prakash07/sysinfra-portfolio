<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\OemPartnerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SitemapController;
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

Route::get('/oem-partners', [OemPartnerController::class, 'index'])->name('oem-partners');
Route::get('/careers', [CareersController::class, 'index'])->name('careers');

Route::get('/contact-us', [ContactUsController::class, 'index'])->name('contact');
Route::post('/contact-us', [ContactUsController::class, 'store'])->name('contact.store');

// Filament serves /admin itself once installed — no route needed here.
