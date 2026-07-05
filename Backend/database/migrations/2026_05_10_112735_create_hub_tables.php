<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('governorates', function (Blueprint $table) {
            $table->id('governorate_id');
            $table->string('name_en', 100)->unique();
            $table->string('name_ar', 100)->unique();
            $table->string('main_city', 100);
        });

        Schema::create('pharmacies', function (Blueprint $table) {
            $table->id('pharmacy_id');
            $table->foreignId('governorate_id')->constrained('governorates', 'governorate_id')->onUpdate('cascade')->onDelete('restrict');
            $table->string('pharmacy_name_en', 200);
            $table->string('pharmacy_name_ar', 200);
            $table->string('area_name', 150);
            $table->string('address_note', 255)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });

        Schema::create('health_centers', function (Blueprint $table) {
            $table->id('center_id');
            $table->foreignId('governorate_id')->constrained('governorates', 'governorate_id')->onUpdate('cascade')->onDelete('restrict');
            $table->string('center_name_en', 200);
            $table->string('center_name_ar', 200);
            $table->string('area_name', 150);
            $table->string('address_note', 255)->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('image_url', 255)->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->foreignId('pharmacy_id')->nullable()->constrained('pharmacies', 'pharmacy_id')->onUpdate('cascade')->onDelete('set null');
            $table->string('full_name', 150);
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->enum('role', ['Admin', 'Pharmacist', 'Citizen']);
            $table->string('phone', 30)->nullable();
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('medicines', function (Blueprint $table) {
            $table->id('medicine_id');
            $table->string('name_en', 150);
            $table->string('name_ar', 150);
            $table->string('dosage_form', 100);
            $table->string('strength', 100);
            $table->text('leaflet_uses')->nullable();
            $table->text('leaflet_dosage')->nullable();
            $table->text('leaflet_side_effects')->nullable();
            $table->text('leaflet_contraindications')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->unique(['name_en', 'dosage_form', 'strength'], 'uq_medicine');
        });

        Schema::create('inventory', function (Blueprint $table) {
            $table->id('inventory_id');
            $table->foreignId('pharmacy_id')->constrained('pharmacies', 'pharmacy_id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained('medicines', 'medicine_id')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('quantity')->default(0);
            $table->decimal('price_ils', 10, 2);
            $table->date('expiry_date')->nullable();
            $table->enum('stock_status', ['In Stock', 'Low Stock', 'Out of Stock'])->default('In Stock');
            $table->timestamp('last_updated')->useCurrent()->useCurrentOnUpdate();
            $table->unique(['pharmacy_id', 'medicine_id'], 'uq_inventory');
        });

        Schema::create('promotions', function (Blueprint $table) {
            $table->id('promotion_id');
            $table->foreignId('pharmacy_id')->nullable()->constrained('pharmacies', 'pharmacy_id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('center_id')->nullable()->constrained('health_centers', 'center_id')->onUpdate('cascade')->onDelete('cascade');
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('image_url', 255)->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
        Schema::dropIfExists('inventory');
        Schema::dropIfExists('medicines');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('health_centers');
        Schema::dropIfExists('pharmacies');
        Schema::dropIfExists('governorates');
    }
};
