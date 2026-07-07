<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Pharmacy;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * GET /api/inventory/search?medicine_id=X
     * Finds which pharmacies have a specific medicine in stock. Public.
     */
    public function search(Request $request)
    {
        $request->validate([
            'medicine_id' => 'required|integer|exists:medicines,medicine_id',
        ]);

        $rows = Inventory::with(['pharmacy.governorate', 'medicine'])
            ->where('medicine_id', $request->medicine_id)
            ->where('quantity', '>', 0)
            ->get()
            ->map(function ($inv) {
                return [
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
                        'lat'      => (float) $inv->pharmacy->latitude,
                        'lng'      => (float) $inv->pharmacy->longitude,
                    ],
                    'medicine'     => [
                        'id'          => $inv->medicine->medicine_id,
                        'name_ar'     => $inv->medicine->name_ar,
                        'name_en'     => $inv->medicine->name_en,
                        'dosage_form' => $inv->medicine->dosage_form,
                        'strength'    => $inv->medicine->strength,
                    ],
                ];
            });

        return response()->json($rows);
    }

    /**
     * GET /api/pharmacies/{id}/inventory
     * Lists all stock for a specific pharmacy. Public.
     */
    public function pharmacyInventory($pharmacyId)
    {
        $pharmacy = Pharmacy::find($pharmacyId);

        if (!$pharmacy) {
<<<<<<< HEAD
            return response()->json(['message' => __('messages.pharmacy_not_found')], 404);
        }

        $inventory = Inventory::with('medicine')
            ->where('pharmacy_id', $pharmacyId)
            ->get()
            ->map(function ($inv) {
                return [
                    'inventory_id' => $inv->inventory_id,
                    'quantity'     => $inv->quantity,
                    'price_ils'    => (float) $inv->price_ils,
                    'expiry_date'  => $inv->expiry_date?->toDateString(),
                    'stock_status' => $inv->stock_status,
                    'last_updated' => $inv->last_updated,
                    'medicine'     => [
                        'id'          => $inv->medicine->medicine_id,
                        'name_ar'     => $inv->medicine->name_ar,
                        'name_en'     => $inv->medicine->name_en,
                        'dosage_form' => $inv->medicine->dosage_form,
                        'strength'    => $inv->medicine->strength,
                    ],
                ];
            });

        return response()->json([
            'pharmacy_id' => (int) $pharmacyId,
            'inventory'   => $inventory,
        ]);
    }

    /**
     * POST /api/inventory
     * Add a new medicine to a pharmacy's stock. Pharmacist (own pharmacy) / Admin.
     */
  public function store(Request $request, $pharmacyId = null)
{
    $authUser = $request->user();

    $validated = $request->validate([
        'pharmacy_id' => 'required|integer|exists:pharmacies,pharmacy_id',
        'medicine_id' => 'required|integer|exists:medicines,medicine_id', 
        'quantity'    => 'required|integer|min:0',
        'price_ils'   => 'required|numeric|min:0', 
        'expiry_date' => 'nullable|date|after:today',
    ]);

    if ($authUser->role === 'Pharmacist' && $authUser->pharmacy_id !== (int) $validated['pharmacy_id']) {
        return response()->json(['message' => __('messages.inventory_unauthorized')], 403);
    }

    // Enforce unique (pharmacy_id, medicine_id) constraint with a user-friendly error
    $exists = Inventory::where('pharmacy_id', $validated['pharmacy_id'])
        ->where('medicine_id', $validated['medicine_id'])
        ->exists();

    if ($exists) {
        return response()->json([
            'message' => __('messages.inventory_duplicate'),
        ], 422);
    }

    // Derive stock_status from quantity if not provided
    if (!isset($validated['stock_status'])) {
        $qty = $validated['quantity'];
        $validated['stock_status'] = $qty === 0 ? 'Out of Stock' : ($qty <= 10 ? 'Low Stock' : 'In Stock');
    }

    $inventory = Inventory::create($validated);

    return response()->json($inventory->load('medicine', 'pharmacy'), 201);
}

    /**
     * PUT /api/inventory/{id}
     * Update quantity, price, expiry or stock_status. Pharmacist (own pharmacy) / Admin.
     */
    public function update(Request $request, $id)
    {
        $authUser = $request->user();
        $inventory = Inventory::with('pharmacy')->find($id);

        if (!$inventory) {
            return response()->json(['message' => __('messages.inventory_not_found')], 404);
        }

        if ($authUser->role === 'Pharmacist' && $authUser->pharmacy_id !== $inventory->pharmacy_id) {
            return response()->json(['message' => __('messages.inventory_unauthorized')], 403);
        }

        $validated = $request->validate([
            'quantity'     => 'sometimes|integer|min:0',
            'price_ils'    => 'sometimes|numeric|min:0',
            'expiry_date'  => 'sometimes|nullable|date|after:today',
            'stock_status' => 'sometimes|in:In Stock,Low Stock,Out of Stock',
        ]);

        // Auto-derive stock_status when quantity is updated but status is not explicit
        if (isset($validated['quantity']) && !isset($validated['stock_status'])) {
            $qty = $validated['quantity'];
            $validated['stock_status'] = $qty === 0 ? 'Out of Stock' : ($qty <= 10 ? 'Low Stock' : 'In Stock');
        }

        $inventory->update($validated);

        return response()->json([
            'message'   => __('messages.inventory_updated'),
            'inventory' => $inventory->fresh()->load('medicine'),
        ]);
    }

    /**
     * GET /api/inventory/low-stock
     * Returns all 'Low Stock' entries scoped to the authenticated pharmacy
     * (Pharmacist sees only own pharmacy; Admin sees all). Pharmacist / Admin.
     */
    public function lowStock(Request $request)
    {
        $authUser = $request->user();

        $query = Inventory::with(['medicine', 'pharmacy.governorate'])
            ->where('stock_status', 'Low Stock');

        // Pharmacists only see their own pharmacy
        if ($authUser->role === 'Pharmacist') {
            $query->where('pharmacy_id', $authUser->pharmacy_id);
        }

        $rows = $query->get()->map(fn($inv) => [
            'inventory_id' => $inv->inventory_id,
            'quantity'     => $inv->quantity,
            'price_ils'    => (float) $inv->price_ils,
            'expiry_date'  => $inv->expiry_date?->toDateString(),
            'stock_status' => $inv->stock_status,
            'last_updated' => $inv->last_updated,
            'pharmacy'     => [
                'id'      => $inv->pharmacy->pharmacy_id,
                'name_ar' => $inv->pharmacy->pharmacy_name_ar,
                'name_en' => $inv->pharmacy->pharmacy_name_en,
            ],
            'medicine'     => [
                'id'          => $inv->medicine->medicine_id,
                'name_ar'     => $inv->medicine->name_ar,
                'name_en'     => $inv->medicine->name_en,
                'dosage_form' => $inv->medicine->dosage_form,
                'strength'    => $inv->medicine->strength,
            ],
        ]);

        return response()->json([
            'count' => $rows->count(),
            'items' => $rows,
        ]);
    }

    /**
     * DELETE /api/inventory/{id}
     * Hard-deletes an inventory row (removes medicine from pharmacy stock entirely).
     * The DB ON DELETE CASCADE handles related records. Pharmacist (own) / Admin.
     */
    public function destroy(Request $request, $id)
    {
        $authUser  = $request->user();
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json(['message' => __('messages.inventory_not_found')], 404);
        }

        if ($authUser->role === 'Pharmacist' && $authUser->pharmacy_id !== $inventory->pharmacy_id) {
            return response()->json(['message' => __('messages.inventory_unauthorized')], 403);
        }

        $inventory->delete();

        return response()->json(['message' => __('messages.inventory_deleted')]);
    }



public function index(Request $request)
{
    
    $query = Inventory::with(['pharmacy', 'medicine']);

    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->whereHas('medicine', function($subQuery) use ($searchTerm) {
            $subQuery->where('name_ar', 'like', '%' . $searchTerm . '%')
                     ->orWhere('name_en', 'like', '%' . $searchTerm . '%');
        });
    }

    $inventory = $query->get();

    return response()->json($inventory->map(fn($inv) => [
        'inventory_id'  => $inv->inventory_id,
        'medicine_id'   => $inv->medicine_id,
        'pharmacy_name' => $inv->pharmacy->pharmacy_name_ar,
        'quantity'      => $inv->quantity,
        'pharmacy_id'   => $inv->pharmacy->pharmacy_id,
        'location'      => $inv->pharmacy->address_note ?? __('messages.not_available'),
        'name_ar'       => $inv->medicine->name_ar,
        'strength'      => $inv->medicine->strength,
        'dosage_form'   => $inv->medicine->dosage_form,
        'price'         => (float) $inv->price_ils,
        'stock_status'  => $inv->stock_status,
        'expiry_date'   => $inv->expiry_date?->toDateString(),
    ]));
}

public function show($pharmacyId, $medicineId)
{
    $item = Inventory::with(['pharmacy', 'medicine'])
        ->where('pharmacy_id', $pharmacyId)
        ->where('medicine_id', $medicineId)
        ->first(); 

    if (!$item) {
        return response()->json(['message' => __('messages.medicine_not_in_pharmacy')], 404);
    }

  return response()->json([
        'pharmacy' => array_merge($item->pharmacy->toArray(), [
            'id' => $item->pharmacy->pharmacy_id,
        ]),
        'medicine' => [
            'name_ar' => $item->medicine->name_ar,
            'dosage_form' => $item->medicine->dosage_form,
            'strength' => $item->medicine->strength,
            'leaflet_side_effects' => $item->medicine->leaflet_side_effects,
            'leaflet_contraindications' => $item->medicine->leaflet_contraindications,
            'price' => (float) $item->price_ils, 
        ]
    ]);
}
}
