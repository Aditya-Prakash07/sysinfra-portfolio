<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('group')->default('general');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->string('metric');
            $table->string('label');
            $table->text('detail');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('company_values', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable(); // e.g. "01", "02"
            $table->string('title');
            $table->string('badge')->nullable(); // e.g. "Priority", "Execution"
            $table->text('description');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('rd_hardware_cards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tag')->nullable(); // e.g. "Power Conditioning", "Edge Analytics"
            $table->text('description');
            $table->string('image_path');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rd_hardware_cards');
        Schema::dropIfExists('company_values');
        Schema::dropIfExists('milestones');
        Schema::dropIfExists('site_settings');
    }
};
