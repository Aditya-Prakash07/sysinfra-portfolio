<?php

namespace Tests\Feature;

use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use App\Models\PortfolioItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_public_pages_load_successfully(): void
    {
        $this->get('/')->assertStatus(200);
        $this->get('/about-us')->assertStatus(200);
        $this->get('/products')->assertStatus(200);
        $this->get('/oem-partners')->assertStatus(200);
        $this->get('/careers')->assertStatus(200);
        $this->get('/contact-us')->assertStatus(200);
    }

    public function test_sitemap_xml_loads_successfully(): void
    {
        $response = $this->get('/sitemap.xml');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');
        $this->assertStringContainsString('<urlset', $response->getContent());
        $this->assertStringContainsString('/products', $response->getContent());
    }

    public function test_product_detail_page_loads_successfully(): void
    {
        $cat = ProductCategory::create([
            'name' => 'DMR Radios',
            'slug' => 'dmr-radios',
            'sort_order' => 1,
            'is_published' => true,
        ]);

        $sub = ProductSubcategory::create([
            'product_category_id' => $cat->id,
            'name' => 'Handheld Terminals',
            'slug' => 'handheld-terminals',
            'sort_order' => 1,
            'is_published' => true,
        ]);

        $product = PortfolioItem::create([
            'product_subcategory_id' => $sub->id,
            'name' => 'ST-800 Tactical',
            'slug' => 'st-800-tactical',
            'model_number' => 'ST-800',
            'frequency_band' => '136-174 MHz VHF',
            'summary' => 'Tactical radio terminal',
            'is_published' => true,
        ]);

        $this->get("/products/{$cat->slug}/{$sub->slug}")->assertStatus(200);
        $this->get("/products/{$cat->slug}/{$sub->slug}/{$product->slug}")->assertStatus(200);
        $this->get("/products/{$product->slug}/datasheet")->assertStatus(200);
    }

    public function test_contact_form_submission_works(): void
    {
        $response = $this->from('/contact-us')->post('/contact-us', [
            'name' => 'Commander Sharma',
            'email' => 'sharma@nic.in',
            'phone' => '+91 9811122334',
            'subject' => 'VHF Repeater Architecture',
            'message' => 'Requesting technical consultation for hill-station repeater network.',
            'website' => '',
        ]);

        $response->assertRedirect('/contact-us');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'sharma@nic.in',
            'name' => 'Commander Sharma',
        ]);
    }
}
