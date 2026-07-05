<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up()
{
    Schema::table('promotions', function (Blueprint $table) {
        $table->string('priority')->default('normal')->after('is_active');
    });
}

public function down()
{
    Schema::table('promotions', function (Blueprint $table) {
        $table->dropColumn('priority');
    });
}
};
