<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OemPartner extends Model
{
    protected $fillable = ['name', 'description', 'logo_path', 'website_url', 'sort_order', 'is_published'];
    protected $casts = ['is_published' => 'boolean'];
}
