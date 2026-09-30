<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class EventAlbum extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'event_date',
        'cover_image_path',
        'gallery_images',
        'description',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (EventAlbum $album) {
            if (empty($album->slug)) {
                $album->slug = Str::slug($album->title);
            }
        });
    }

    /**
     * Get clean normalized cover URL
     */
    public function getCoverUrlAttribute(): string
    {
        if (empty($this->cover_image_path)) {
            return '';
        }
        if (str_starts_with($this->cover_image_path, 'http://') || str_starts_with($this->cover_image_path, 'https://')) {
            return $this->cover_image_path;
        }
        if (str_starts_with($this->cover_image_path, '/')) {
            return $this->cover_image_path;
        }
        if (str_starts_with($this->cover_image_path, 'img/') || str_starts_with($this->cover_image_path, 'storage/')) {
            return '/' . $this->cover_image_path;
        }
        return '/storage/' . $this->cover_image_path;
    }
}
