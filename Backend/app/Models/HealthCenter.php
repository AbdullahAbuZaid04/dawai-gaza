<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthCenter extends Model
{
    protected $table = 'health_centers';
    protected $primaryKey = 'center_id';

    protected $fillable = [
        'governorate_id',
        'center_name_en',
        'center_name_ar',
        'area_name',
        'address_note',
        'phone',
        'image_url',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function governorate()
    {
        return $this->belongsTo(Governorate::class, 'governorate_id');
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class, 'center_id');
    }
}
