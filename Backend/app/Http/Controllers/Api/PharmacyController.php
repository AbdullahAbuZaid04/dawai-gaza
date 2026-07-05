<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pharmacy;
use Illuminate\Http\Request;

class PharmacyController extends Controller
{
    /**
     * GET /api/pharmacies?gov_id=X
     * List pharmacies, optionally filtered by governorate. Public.
     */
  public function index(Request $request)
{
    $query = Pharmacy::with(['governorate', 'inventory.medicine', 'users']);

    if ($request->filled('gov_id')) {
        $query->where('governorate_id', $request->gov_id);
    }

    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('pharmacy_name_ar', 'like', '%' . $searchTerm . '%')
              ->orWhere('pharmacy_name_en', 'like', '%' . $searchTerm . '%');
        });
    }

    $pharmacies = $query->get()->map(fn($p) => $this->formatPharmacy($p));

    return response()->json($pharmacies);
}

public function registerRequest(Request $request)
{
    $request->validate([
        'pharmacy_name_ar' => 'required|string|max:200',
        'email'            => 'required|email|unique:users,email',
        'phone'            => 'required|string|max:30',
        'address_note'     => 'nullable|string|max:255',
        'governorate_id'   => 'required|integer|exists:governorates,governorate_id',
        'license_number'   => 'required|string|max:100', //
        'password'         => 'required|string|min:6',   // 
        'open_time'        => 'required',
        'close_time'       => 'required',
        
    ]);

    return \Illuminate\Support\Facades\DB::transaction(function () use ($request) {
        $pharmacy = Pharmacy::create([
            'pharmacy_name_ar' => $request->pharmacy_name_ar,
            'pharmacy_name_en' => $request->pharmacy_name_ar ,
            'governorate_id'   => $request->governorate_id,
            'area_name'        => 'لم يحدد بعد',
            'address_note'     => $request->address_note,
            'license_number'   => $request->license_number,
            'open_time'        => $request->open_time,
            'close_time'       => $request->close_time,
            'google_maps_link' => $request->google_maps_link,
            
        ]);

        $user = \App\Models\User::create([
            'pharmacy_id' => $pharmacy->pharmacy_id,
            'full_name'   => $request->pharmacy_name_ar,
            'email'       => $request->email,
            'password'    => \Illuminate\Support\Facades\Hash::make($request->password),
            'role'        => 'Pharmacist',
            'phone'       => $request->phone,
            'is_active'   => false, //    
            'status'      => 'pending',
        ]);

        return response()->json(['message' => 'تم إرسال طلبك للمراجعة'], 201);
    });
}
    /**
     * GET /api/pharmacies/{id}
     * Detailed info including location, inventory, and promotions. Public.
     */
    public function show($id)
    {
        $p = Pharmacy::with(['governorate', 'inventory.medicine', 'promotions','users'])->find($id);

        if (!$p) {
            return response()->json(['message' => 'Pharmacy not found'], 404);
        }

        $data = $this->formatPharmacy($p);
        $data['offers'] = $p->promotions->map(fn($pr) => [
            'id'          => $pr->promotion_id,
            'title'       => $pr->title,
            'description' => $pr->description,
            'image'       => $pr->image_url,
            'start_date'  => $pr->start_date?->toDateString(),
            'end_date'    => $pr->end_date?->toDateString(),
            'is_active'   => $pr->is_active,
        ]);

        return response()->json($data);
    }

    /**
     * POST /api/pharmacies
     * Create a new pharmacy location. Admin only.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'governorate_id'    => 'required|integer|exists:governorates,governorate_id',
            'pharmacy_name_en'  => 'required|string|max:200',
            'pharmacy_name_ar'  => 'required|string|max:200',
            'area_name'         => 'required|string|max:150',
            'address_note'      => 'nullable|string|max:255',
            'latitude'          => 'nullable|numeric|between:-90,90',
            'longitude'         => 'nullable|numeric|between:-180,180',
        ]);

        $pharmacy = Pharmacy::create($validated);

        return response()->json($pharmacy->load('governorate'), 201);
    }

    // -----------------------------------------------------------------------
    // Private helper
    // -----------------------------------------------------------------------

    private function formatPharmacy(Pharmacy $p): array
    {
     $user = \App\Models\User::where('pharmacy_id', $p->pharmacy_id)->first();
        return [
            'id'           => $p->pharmacy_id,
            'name'         => $p->pharmacy_name_ar,
            'name_en'      => $p->pharmacy_name_en,
            'open_time'    => $p->open_time, 
        'close_time'   => $p->close_time,
        'is_active'    => $user ? (bool) $user->is_active : false,
        'reject_reason'=> $user ? $user->reject_reason : null,
        'status'       => $user ? $user->status : 'pending', // 
        
        'phone'        => $user ? $user->phone : null,
         'email'        => $user ? $user->email : null,
            'location'     => $p->governorate->name_ar . ' - ' . $p->area_name,
            'lat'          => (float) $p->latitude,
            'lng'          => (float) $p->longitude,
            'address_note' => $p->address_note,
            'governorate'  => $p->governorate,
            'medicines'    => $p->inventory->map(fn($i) => [
                'id'           => $i->inventory_id,
                'medicine_id'  => $i->medicine->medicine_id,
                'nameAr'       => $i->medicine->name_ar,
                'nameEn'       => $i->medicine->name_en,
                'dosage_form'  => $i->medicine->dosage_form,
                'strength'     => $i->medicine->strength,
                'price'        => (float) $i->price_ils,
                'available'    => $i->quantity > 0,
                'stock_status' => $i->stock_status,
                'expiry_date'  => $i->expiry_date?->toDateString(),
            ]),
        ];
    }
}
