<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;


class PromotionController extends Controller
{
    /**
     * GET /api/promotions
     * List active, non-expired promotions/campaigns. Public.
     */
    public function index()
    {
        $promotions = Promotion::with(['pharmacy', 'healthCenter'])
            ->where('is_active', true)
            ->where('end_date', '>=', now())
            ->get()
            ->map(fn($p) => $this->formatPromotion($p));

        return response()->json($promotions);
    }

    /**
     * POST /api/promotions
     * Create a new promotion. Admin or Pharmacist.
     * Pharmacists may only create promotions for their own pharmacy.
     */
public function store(Request $request)
{
    $authUser = $request->user();

    $validated = $request->validate([
        'pharmacy_id' => 'nullable|integer|exists:pharmacies,pharmacy_id',
        'center_id'   => 'nullable|integer|exists:health_centers,center_id',
        'title'       => 'required|string|max:200',
        'description' => 'nullable|string',
        'image_url'   => 'nullable|url|max:255',
        'start_date'  => 'required|date',
        'end_date'    => 'required|date|after:start_date',
        'is_active'   => 'boolean',
        'priority'    => 'required|in:normal,urgent,info',
    ]);

    if ($authUser->role === 'Pharmacist') {
        $validated['pharmacy_id'] = $authUser->pharmacy_id;
    }

    $promotion = Promotion::create($validated);

    return response()->json($this->formatPromotion($promotion->load(['pharmacy', 'healthCenter'])), 201);
}

    /**
     * DELETE /api/promotions/{id}
     * Soft-deactivates a promotion (sets is_active = false). Admin or Pharmacist (own pharmacy).
     */
    public function destroy(Request $request, $id)
    {
        $authUser = $request->user();
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return response()->json(['message' => __('messages.promotion_not_found')], 404);
        }

        if ($authUser->role === 'Pharmacist' && $promotion->pharmacy_id !== $authUser->pharmacy_id) {
            return response()->json(['message' => __('messages.unauthorized')], 403);
        }

        $promotion->update(['is_active' => false]);

        return response()->json(['message' => __('messages.promotion_deactivated')]);
    }

    /**
     * GET /api/pharmacies/{id}/promotions
     * Returns active, non-expired promotions for a specific pharmacy. Public.
     */
    public function pharmacyPromotions($pharmacyId)
    {
        $promotions = Promotion::with(['pharmacy', 'healthCenter'])
            ->where('pharmacy_id', $pharmacyId)
            ->where('is_active', true)
            ->where('end_date', '>=', now())
            ->get()
            ->map(fn($p) => $this->formatPromotion($p));

        return response()->json([
            'pharmacy_id' => (int) $pharmacyId,
            'promotions'  => $promotions,
        ]);
    }

    /**
     * GET /api/centers/{id}/promotions
     * Returns active, non-expired promotions for a specific health center. Public.
     */
    public function centerPromotions($centerId)
    {
        $promotions = Promotion::with(['pharmacy', 'healthCenter'])
            ->where('center_id', $centerId)
            ->where('is_active', true)
            ->where('end_date', '>=', now())
            ->get()
            ->map(fn($p) => $this->formatPromotion($p));

        return response()->json([
            'center_id'  => (int) $centerId,
            'promotions' => $promotions,
        ]);
    }

    // -----------------------------------------------------------------------
    // Private helper
    // -----------------------------------------------------------------------

    private function formatPromotion(Promotion $p): array
    {
        return [
            'id'          => $p->promotion_id,
            'title'       => $p->title,
            'description' => $p->description,
            'priority'    => $p->priority,
            'image_url'   => $p->image_url,
            'start_date'  => $p->start_date?->toDateString(),
            'end_date'    => $p->end_date?->toDateString(),
            'is_active'   => $p->is_active,
            'pharmacy_id' => $p->pharmacy_id,
            'center_id'   => $p->center_id,
            'pharmacy'    => $p->pharmacy ? [
                'id'      => $p->pharmacy->pharmacy_id,
                'name_ar' => $p->pharmacy->pharmacy_name_ar,
                'name_en' => $p->pharmacy->pharmacy_name_en,
            ] : null,
            'health_center' => $p->healthCenter ? [
                'id'      => $p->healthCenter->center_id,
                'name_ar' => $p->healthCenter->center_name_ar,
                'name_en' => $p->healthCenter->center_name_en,
            ] : null,
        ];
    }


public function update(Request $request, $id)
{
    $authUser = $request->user();
    $promotion = Promotion::find($id);

    if (!$promotion) return response()->json(['message' => __('messages.promotion_not_found')], 404);

    if ($authUser->role === 'Pharmacist' && $promotion->pharmacy_id !== $authUser->pharmacy_id) {
        return response()->json(['message' => __('messages.unauthorized')], 403);
    }

    $validated = $request->validate([
        'title'       => 'sometimes|string|max:200',
        'description' => 'nullable|string',
        'priority'    => 'sometimes|in:normal,urgent,info',
        'is_active'   => 'sometimes|boolean',
    ]);

    $promotion->update($validated);
    return response()->json($this->formatPromotion($promotion->load(['pharmacy', 'healthCenter'])));
}
}
