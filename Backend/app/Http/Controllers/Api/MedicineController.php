<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    /**
     * GET /api/medicines?search=X
     * Search medicines by name_en or name_ar. Public.
     */
public function index(Request $request)
{
    $query = Medicine::with(['inventory.pharmacy']);
    $query->where('is_active', true);

    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('name_ar', 'like', '%' . $searchTerm . '%')
              ->orWhere('name_en', 'like', '%' . $searchTerm . '%');
        });
    }

    $medicines = $query->paginate(16);

    return response()->json($medicines);
}

    /**
     * GET /api/medicines/{id}
     * Full leaflet details + inventory stock across pharmacies. Public.
     */
    public function show($id)
    {
        $medicine = Medicine::with(['inventory.pharmacy.governorate'])->find($id);

        if (!$medicine) {
            return response()->json(['message' => 'Medicine not found'], 404);
        }

        return response()->json([
            'medicine_id'                => $medicine->medicine_id,
            'name_en'                    => $medicine->name_en,
            'name_ar'                    => $medicine->name_ar,
            'dosage_form'                => $medicine->dosage_form,
            'strength'                   => $medicine->strength,
            'leaflet_uses'               => $medicine->leaflet_uses,
            'leaflet_dosage'             => $medicine->leaflet_dosage,
            'leaflet_side_effects'       => $medicine->leaflet_side_effects,
            'leaflet_contraindications'  => $medicine->leaflet_contraindications,
            'is_active'                  => $medicine->is_active,
            'availability'               => $medicine->inventory->map(fn($inv) => [
                'inventory_id' => $inv->inventory_id,
                'quantity'     => $inv->quantity,
                'price_ils'    => (float) $inv->price_ils,
                'expiry_date'  => $inv->expiry_date?->toDateString(),
                'stock_status' => $inv->stock_status,
                'pharmacy'     => [
                    'id'       => $inv->pharmacy->pharmacy_id,
                    'name_ar'  => $inv->pharmacy->pharmacy_name_ar,
                    'name_en'  => $inv->pharmacy->pharmacy_name_en,
                    'location' => $inv->pharmacy->governorate->name_ar . ' - ' . $inv->pharmacy->area_name,
                ],
            ]),
        ]);
    }

    /**
     * POST /api/medicines
     * Add a new medicine to the master database. Admin only.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en'                    => 'required|string|max:150',
            'name_ar'                    => 'required|string|max:150',
            'dosage_form'                => 'required|string|max:100',
            'strength'                   => 'required|string|max:100',
            'leaflet_uses'               => 'nullable|string',
            'leaflet_dosage'             => 'nullable|string',
            'leaflet_side_effects'       => 'nullable|string',
            'leaflet_contraindications'  => 'nullable|string',
            'is_active'                  => 'boolean',
        ]);

        // The DB has a unique constraint on (name_en, dosage_form, strength)
        $exists = Medicine::where('name_en', $validated['name_en'])
            ->where('dosage_form', $validated['dosage_form'])
            ->where('strength', $validated['strength'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'A medicine with the same name, dosage form, and strength already exists.',
            ], 422);
        }

        $medicine = Medicine::create($validated);

        return response()->json($medicine, 201);
    }

    /**
     * PATCH /api/medicines/{id}
     * Toggle is_active or update leaflet fields. Admin only.
     */
    public function patch(Request $request, $id)
    {
        $medicine = Medicine::find($id);

        if (!$medicine) {
            return response()->json(['message' => 'Medicine not found.'], 404);
        }

        $validated = $request->validate([
            'is_active'                  => 'sometimes|boolean',
            'leaflet_uses'               => 'sometimes|nullable|string',
            'leaflet_dosage'             => 'sometimes|nullable|string',
            'leaflet_side_effects'       => 'sometimes|nullable|string',
            'leaflet_contraindications'  => 'sometimes|nullable|string',
            'name_en'                    => 'sometimes|string|max:150',
            'name_ar'                    => 'sometimes|string|max:150',
            'dosage_form'                => 'sometimes|string|max:100',
            'strength'                   => 'sometimes|string|max:100',
        ]);

        $medicine->update($validated);

        return response()->json([
            'message'  => 'Medicine updated successfully.',
            'medicine' => $medicine->fresh(),
        ]);
    }

    /**
     * GET /api/medicines/dosage-forms
     * Returns a unique sorted list of dosage_form values. Public.
     * Useful for populating frontend search/filter dropdowns.
     */
    public function dosageForms()
    {
        $forms = Medicine::where('is_active', true)
            ->distinct()
            ->orderBy('dosage_form')
            ->pluck('dosage_form');

        return response()->json($forms);
    }
}
