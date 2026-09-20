<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['client_name', 'story', 'logo_path', 'sort_order', 'is_published'];
    protected $casts = ['is_published' => 'boolean'];
}
