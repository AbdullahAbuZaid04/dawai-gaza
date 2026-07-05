<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    protected $table = 'pharmacies';
    protected $primaryKey = 'pharmacy_id';

    protected $fillable = [
        'governorate_id',
        'pharmacy_name_en',
        'pharmacy_name_ar',
        'area_name',
        'address_note',
        'latitude',
        'longitude',
        'license_number', 'open_time', 'close_time', 'google_maps_link',
    ];

    public function governorate()
    {
        return $this->belongsTo(Governorate::class, 'governorate_id');
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class, 'pharmacy_id');
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class, 'pharmacy_id');
    }

    public function users()
    {
       return $this->hasMany(User::class, 'pharmacy_id', 'pharmacy_id');
        
    }

}
