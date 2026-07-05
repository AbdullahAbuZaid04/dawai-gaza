<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ViolationSeeder extends Seeder
{
 public function run()
{
    \App\Models\Violation::create([
        'pharmacy_id' =>2,   
        'medicine_id' => 2,
        'official_price' => 12.00,
        'sold_price' => 50.00,
        'status' => 'new',
    ]);
}
}
