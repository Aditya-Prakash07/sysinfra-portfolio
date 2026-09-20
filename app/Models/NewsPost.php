<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsPost extends Model
{
    protected $fillable = ['title', 'slug', 'body', 'cover_image_path', 'published_at', 'is_published'];
    protected $casts = ['is_published' => 'boolean', 'published_at' => 'date'];
}
