<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = ['heading', 'subheading', 'image_path', 'cta_label', 'cta_url', 'sort_order', 'is_published'];
    protected $casts = ['is_published' => 'boolean'];
}
