<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('clients')) {
            Schema::create('clients', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('sector')->nullable();
                $table->text('highlight')->nullable();
                $table->text('description')->nullable();
                $table->string('logo_path')->nullable();
                $table->string('website_url')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->boolean('is_published')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
