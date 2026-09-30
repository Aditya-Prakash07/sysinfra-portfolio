<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Catalogue extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'category',
        'badge',
        'description',
        'file_path',
        'cover_image_path',
        'file_size',
        'pages',
        'is_popular',
        'is_master',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
        'is_master' => 'boolean',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (Catalogue $catalogue) {
            if (empty($catalogue->slug)) {
                $catalogue->slug = Str::slug($catalogue->title);
            }
        });
    }

    /**
     * Get the download URL for this catalogue
     */
    public function getDownloadUrlAttribute(): string
    {
        return route('catalogues.download', $this->slug);
    }

    /**
     * Get clean normalized web-accessible URL for the file
     */
    public function getFileUrlAttribute(): string
    {
        if (empty($this->file_path)) {
            return '';
        }
        if (str_starts_with($this->file_path, 'http://') || str_starts_with($this->file_path, 'https://')) {
            return $this->file_path;
        }
        if (str_starts_with($this->file_path, '/')) {
            return $this->file_path;
        }
        if (str_starts_with($this->file_path, 'storage/')) {
            return '/' . $this->file_path;
        }
        return '/storage/' . $this->file_path;
    }
}
