<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * Usage: ->middleware('role:Admin') or ->middleware('role:Admin,Pharmacist')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => __('messages.unauthenticated')], 401);
        }

        if (!in_array($user->role, $roles)) {
            return response()->json([
                'message' => __('messages.unauthorized_role', ['roles' => implode(' أو ', $roles)]),
            ], 403);
        }

        return $next($request);
    }
}
