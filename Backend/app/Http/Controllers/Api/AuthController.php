<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * POST /api/auth/login
     * Returns a JWT/Sanctum token and user role. Public.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['البريد الإلكتروني أو كلمة المرور غير صحيحة.'],
            ]);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'الحساب غير مفعل.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'user_id'   => $user->user_id,
                'full_name' => $user->full_name,
                'email'     => $user->email,
                'role'      => $user->role,
                'phone'     => $user->phone,
                'pharmacy_id' => $user->pharmacy_id,
            ],
        ]);
    }

    /**
     * POST /api/auth/register
     * Register a new Citizen account. Public.
     * Role is always forced to 'Citizen' — Admins/Pharmacists are created by Admin directly.
     */
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:150',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6|confirmed',
            'phone'     => 'nullable|string|max:30',
        ]);

        $user = User::create([
            'full_name'   => $request->full_name,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
            'role'        => 'Citizen',   // always forced
            'phone'       => $request->phone,
            'is_active'   => true,
            'pharmacy_id' => null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'user_id'   => $user->user_id,
                'full_name' => $user->full_name,
                'email'     => $user->email,
                'role'      => $user->role,
                'phone'     => $user->phone,
            ],
        ], 201);
    }

    /**
     * POST /api/logout
     * Revokes the current Sanctum token. Authenticated.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }
}
