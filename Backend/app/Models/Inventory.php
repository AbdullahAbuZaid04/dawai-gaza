<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $table = 'inventory';
    protected $primaryKey = 'inventory_id';
    public $timestamps = false;

    protected $fillable = [
        'pharmacy_id',
        'medicine_id',
        'quantity',
        'price_ils',
        'expiry_date',
        'stock_status',
    ];

    protected $casts = [
        'price_ils' => 'decimal:2',
        'expiry_date' => 'date',
    ];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class, 'pharmacy_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class, 'medicine_id');
    }
}
