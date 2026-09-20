<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioItem extends Model
{
    protected $fillable = [
        'product_subcategory_id', 'name', 'slug', 'model_number', 'short_description',
        'description', 'specifications', 'gallery', 'cover_image_path', 'datasheet_path',
        'meta_title', 'meta_description', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'specifications' => 'array',
        'gallery' => 'array',
        'is_published' => 'boolean',
    ];

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(ProductSubcategory::class, 'product_subcategory_id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
