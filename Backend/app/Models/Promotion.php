<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $table = 'promotions';
    protected $primaryKey = 'promotion_id';

    protected $fillable = [
        'pharmacy_id',
        'center_id',
        'title',
        'description',
        'image_url',
        'start_date',
        'end_date',
        'is_active',
        'priority', 
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class, 'pharmacy_id');
    }

    public function healthCenter()
    {
        return $this->belongsTo(HealthCenter::class, 'center_id');
    }
}
