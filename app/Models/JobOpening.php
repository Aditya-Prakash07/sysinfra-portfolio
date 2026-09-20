<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOpening extends Model
{
    protected $fillable = ['title', 'location', 'employment_type', 'description', 'is_published'];
    protected $casts = ['is_published' => 'boolean'];
}
