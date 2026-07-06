<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('pharmacies', function (Blueprint $table) {
        $table->string('license_number')->nullable();
        $table->time('open_time')->nullable();
        $table->time('close_time')->nullable();
        $table->string('google_maps_link')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pharmacies', function (Blueprint $table) {
            $table->dropColumn(['license_number', 'open_time', 'close_time', 'google_maps_link']);
        });
    }
};
