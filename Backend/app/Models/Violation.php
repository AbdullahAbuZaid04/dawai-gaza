<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Violation extends Model
{
    protected $table = 'violations';
    protected $primaryKey = 'violation_id';

    protected $fillable = [
        'pharmacy_id',
        'medicine_id',
        'official_price',
        'sold_price',
        'status',
    ];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class, 'pharmacy_id', 'pharmacy_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class, 'medicine_id', 'medicine_id');
    }
}