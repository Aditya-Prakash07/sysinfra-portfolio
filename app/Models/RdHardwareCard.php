<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RdHardwareCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tag',
        'description',
        'image_path',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get clean normalized image URL
     */
    public function getImageUrlAttribute(): string
    {
        if (empty($this->image_path)) {
            return '';
        }
        if (str_starts_with($this->image_path, 'http://') || str_starts_with($this->image_path, 'https://')) {
            return $this->image_path;
        }
        if (str_starts_with($this->image_path, '/')) {
            return $this->image_path;
        }
        if (str_starts_with($this->image_path, 'img/') || str_starts_with($this->image_path, 'storage/')) {
            return '/' . $this->image_path;
        }
        return '/storage/' . $this->image_path;
    }
}
