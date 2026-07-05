<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HealthCenter;

class HealthCenterController extends Controller
{
    /**
     * GET /api/centers
     * Returns all active health centers with their governorate. Public.
     */
    public function index()
    {
        $centers = HealthCenter::with('governorate')
            ->where('is_active', true)
            ->get()
            ->map(function ($c) {
                return [
                    'id'             => $c->center_id,
                    'name_en'        => $c->center_name_en,
                    'name_ar'        => $c->center_name_ar,
                    'area_name'      => $c->area_name,
                    'address_note'   => $c->address_note,
                    'phone'          => $c->phone,
                    'image_url'      => $c->image_url,
                    'description'    => $c->description,
                    'governorate'    => $c->governorate,
                ];
            });

        return response()->json($centers);
    }
}
