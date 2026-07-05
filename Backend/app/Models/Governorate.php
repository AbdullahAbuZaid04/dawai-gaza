<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Governorate extends Model
{
    protected $table = 'governorates';
    protected $primaryKey = 'governorate_id';
    public $timestamps = false;

    protected $fillable = [
        'name_en',
        'name_ar',
        'main_city',
    ];

    public function pharmacies()
    {
        return $this->hasMany(Pharmacy::class, 'governorate_id');
    }

    public function healthCenters()
    {
        return $this->hasMany(HealthCenter::class, 'governorate_id');
    }
}
