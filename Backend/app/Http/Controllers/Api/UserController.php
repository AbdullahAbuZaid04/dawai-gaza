<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * GET /api/users/profile
     * Returns the authenticated user's profile. Any authenticated role.
     */
    public function profile(Request $request)
    {
        $user = $request->user()->load('pharmacy');

        return response()->json([
            'user_id'    => $user->user_id,
            'full_name'  => $user->full_name,
            'email'      => $user->email,
            'role'       => $user->role,
            'phone'      => $user->phone,
            'is_active'  => $user->is_active,
            'pharmacy'   => $user->pharmacy,
            'created_at' => $user->created_at,
        ]);
    }

    /**
     * PUT /api/users/{id}
     * Update full_name and/or phone. Owner (own user_id) or Admin.
     */
    public function update(Request $request, $id)
    {
        $authUser = $request->user();

        if ($authUser->user_id !== (int) $id && $authUser->role !== 'Admin') {
            return response()->json(['message' => __('messages.unauthorized')], 403);
        }

        $target = User::find($id);

        if (!$target) {
            return response()->json(['message' => __('messages.user_not_found')], 404);
        }

        $rules = [
            'full_name' => 'sometimes|string|max:150',
            'phone'     => 'sometimes|string|max:30',
        ];

        if ($authUser->role === 'Admin') {
            $rules['is_active']      = 'sometimes|boolean';
            $rules['status']         = 'sometimes|string|in:pending,approved,rejected';
            $rules['reject_reason']  = 'nullable|string';
        }

        $validated = $request->validate($rules);

        $target->update($validated);

        return response()->json([
            'message' => __('messages.profile_updated'),
            'user'    => $target->fresh(),
        ]);
    }

    /**
     * GET /api/users/pharmacists
     * List all Pharmacist users with their assigned pharmacy. Admin only.
     */
    public function pharmacists()
    {
        $pharmacists = User::with('pharmacy')
            ->where('role', 'Pharmacist')
            ->get()
            ->map(fn($u) => [
                'user_id'     => $u->user_id,
                'full_name'   => $u->full_name,
                'email'       => $u->email,
                'phone'       => $u->phone,
                'is_active'   => $u->is_active,
                'status'      => $u->status,
                'pharmacy_id' => $u->pharmacy_id,
                'pharmacy'    => $u->pharmacy ? [
                    'id'      => $u->pharmacy->pharmacy_id,
                    'name_ar' => $u->pharmacy->pharmacy_name_ar,
                    'name_en' => $u->pharmacy->pharmacy_name_en,
                ] : null,
            ]);

        return response()->json($pharmacists);
    }

    /**
     * PATCH /api/users/{id}/status
     * Toggle is_active for a user (suspend/reactivate). Admin only.
     */
public function toggleStatus(Request $request, $id)
{
    $target = User::find($id);

    if (!$target) {
        return response()->json(['message' => __('messages.user_not_found')], 404);
    }

    $validated = $request->validate([
        'is_active' => 'required|boolean',
        'status' => 'required|string|in:pending,approved,rejected',
        'reject_reason' => 'nullable|string',
    ]);

    $target->update($validated);

    return response()->json([
        'message' => __('messages.status_updated'),
        'user' => $target,
    ]);
}
}
