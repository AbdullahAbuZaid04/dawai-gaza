<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Governorate;
use App\Models\HealthCenter;
use App\Models\Pharmacy;

class GovernorateController extends Controller
{
    /**
     * GET /api/governorates
     * Returns all governorates. Public.
     */
    public function index()
    {
        return response()->json(
            Governorate::all()->map(fn($g) => [
                'id'      => $g->governorate_id,
                'name_en' => $g->name_en,
                'name_ar' => $g->name_ar,
                'main_city' => $g->main_city,
            ])
        );
    }

    /**
     * GET /api/governorates/{id}/centers
     * Returns active health centers in a specific governorate. Public.
     */
    public function centers($id)
    {
        $governorate = Governorate::find($id);

        if (!$governorate) {
            return response()->json(['message' => 'المحافظة غير موجودة.'], 404);
        }

        $centers = HealthCenter::with('governorate')
            ->where('governorate_id', $id)
            ->where('is_active', true)
            ->get()
            ->map(fn($c) => [
                'id'           => $c->center_id,
                'name_en'      => $c->center_name_en,
                'name_ar'      => $c->center_name_ar,
                'area_name'    => $c->area_name,
                'address_note' => $c->address_note,
                'phone'        => $c->phone,
                'image_url'    => $c->image_url,
                'description'  => $c->description,
                'governorate'  => [
                    'id'   => $c->governorate->governorate_id,
                    'name' => $c->governorate->name_ar,
                ],
            ]);

        return response()->json([
            'governorate' => [
                'id'   => $governorate->governorate_id,
                'name' => $governorate->name_ar,
            ],
            'centers'     => $centers,
        ]);
    }

    /**
     * GET /api/governorates/{id}/pharmacies
     * Returns pharmacies in a specific governorate. Public.
     */
    public function pharmacies($id)
    {
        $governorate = Governorate::find($id);

        if (!$governorate) {
            return response()->json(['message' => 'المحافظة غير موجودة.'], 404);
        }

        $pharmacies = Pharmacy::with(['governorate', 'inventory.medicine'])
            ->where('governorate_id', $id)
            ->get()
            ->map(fn($p) => [
                'id'           => $p->pharmacy_id,
                'name'         => $p->pharmacy_name_ar,
                'name_en'      => $p->pharmacy_name_en,
                'location'     => $p->governorate->name_ar . ' - ' . $p->area_name,
                'lat'          => (float) $p->latitude,
                'lng'          => (float) $p->longitude,
                'address_note' => $p->address_note,
                'medicines'    => $p->inventory->map(fn($i) => [
                    'id'           => $i->inventory_id,
                    'medicine_id'  => $i->medicine->medicine_id,
                    'name_ar'      => $i->medicine->name_ar,
                    'name_en'      => $i->medicine->name_en,
                    'price'        => (float) $i->price_ils,
                    'stock_status' => $i->stock_status,
                ]),
            ]);

        return response()->json([
            'governorate' => [
                'id'   => $governorate->governorate_id,
                'name' => $governorate->name_ar,
            ],
            'pharmacies'  => $pharmacies,
        ]);
    }
}
