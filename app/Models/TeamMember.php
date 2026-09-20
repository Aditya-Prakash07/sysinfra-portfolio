<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['name', 'title', 'bio', 'photo_path', 'sort_order', 'is_published'];
    protected $casts = ['is_published' => 'boolean'];
}
