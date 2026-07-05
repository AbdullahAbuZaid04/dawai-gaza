<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $table = 'medicines';
    protected $primaryKey = 'medicine_id';

    protected $fillable = [
        'name_en',
        'name_ar',
        'dosage_form',
        'strength',
        'leaflet_uses',
        'leaflet_dosage',
        'leaflet_side_effects',
        'leaflet_contraindications',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function inventory()
    {
        return $this->hasMany(Inventory::class, 'medicine_id');
    }
}
