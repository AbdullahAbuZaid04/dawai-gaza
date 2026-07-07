<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // ── Validation errors (422) ──────────────────────────────────────────
        $exceptions->render(function (ValidationException $e, Request $request) {
            return response()->json([
                'message' => __('messages.validation_failed'),
                'errors'  => $e->errors(),
            ], 422);
        });

        // ── Unauthenticated (401) ────────────────────────────────────────────
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return response()->json([
                'message' => __('messages.unauthenticated'),
            ], 401);
        });

        // ── Forbidden via AuthorizationException (403) ───────────────────────
        $exceptions->render(function (AuthorizationException $e, Request $request) {
            return response()->json([
                'message' => __('messages.unauthorized'),
            ], 403);
        });

        // ── Forbidden via HTTP kernel (403) ──────────────────────────────────
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            return response()->json([
                'message' => __('messages.unauthorized'),
            ], 403);
        });

        // ── Model not found (404) ─────────────────────────────────────────────
        $exceptions->render(function (ModelNotFoundException $e, Request $request) {
            return response()->json([
                'message' => __('messages.not_found'),
            ], 404);
        });

        // ── Route not found (404) ─────────────────────────────────────────────
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return response()->json([
                'message' => __('messages.not_found'),
            ], 404);
        });

        // ── Method not allowed (405) ──────────────────────────────────────────
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            return response()->json([
                'message' => __('messages.method_not_allowed'),
            ], 405);
        });

        // ── Too many requests (429) ───────────────────────────────────────────
        $exceptions->render(function (TooManyRequestsHttpException $e, Request $request) {
            return response()->json([
                'message' => __('messages.too_many_requests'),
            ], 429);
        });

        // ── Generic HTTP exceptions ───────────────────────────────────────────
        $exceptions->render(function (HttpException $e, Request $request) {
            $statusCode = $e->getStatusCode();
            $message = match ($statusCode) {
                400     => 'طلب غير صالح.',
                403     => __('messages.unauthorized'),
                404     => __('messages.not_found'),
                405     => __('messages.method_not_allowed'),
                429     => __('messages.too_many_requests'),
                500     => __('messages.server_error'),
                502     => 'خطأ في البوابة.',
                503     => 'الخدمة غير متاحة مؤقتاً.',
                default => __('messages.server_error'),
            };

            return response()->json([
                'message' => $message,
            ], $statusCode);
        });

        // ── Catch-all server errors (500) ─────────────────────────────────────
        $exceptions->render(function (\Throwable $e, Request $request) {
            return response()->json([
                'message' => __('messages.server_error'),
            ], 500);
        });

    })->create();
