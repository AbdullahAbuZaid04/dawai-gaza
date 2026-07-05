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
    Schema::create('violations', function (Blueprint $table) {
        $table->id('violation_id');
        $table->unsignedBigInteger('pharmacy_id');
        $table->unsignedBigInteger('medicine_id');
        $table->decimal('official_price', 8, 2);
        $table->decimal('sold_price', 8, 2);
        $table->string('status')->default('new'); // new, warned, fined
        $table->timestamps();

        // 
        $table->foreign('pharmacy_id')->references('pharmacy_id')->on('pharmacies');
        $table->foreign('medicine_id')->references('medicine_id')->on('medicines');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violations');
    }
};
