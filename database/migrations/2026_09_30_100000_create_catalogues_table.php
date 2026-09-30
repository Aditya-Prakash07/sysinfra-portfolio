<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catalogues', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->string('category')->default('General');
            $table->string('badge')->nullable();
            $table->text('description')->nullable();
            $table->string('file_path'); // PDF file path
            $table->string('cover_image_path')->nullable();
            $table->string('file_size')->nullable(); // e.g. "2.26 MB"
            $table->string('pages')->nullable(); // e.g. "Technical Sheet", "12 Pages"
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_master')->default(false); // Flags the Primary Master Corporate Catalogue
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catalogues');
    }
};
