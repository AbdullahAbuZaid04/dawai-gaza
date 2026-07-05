<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GovernorateController;
use App\Http\Controllers\Api\HealthCenterController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// ============================================================
// PUBLIC ROUTES — No authentication required
// ============================================================

        
Route::get('/inventory', [InventoryController::class, 'index']); 

Route::get('/inventory/{pharmacyId}/{medicineId}', [InventoryController::class, 'show']);


// Auth (rate-limited to prevent brute force)
Route::post('/auth/login',             [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::post('/pharmacies/register-request', [PharmacyController::class, 'registerRequest'])->middleware('throttle:5,60');
Route::post('/auth/register',          [AuthController::class, 'register'])->middleware('throttle:5,60');

// Governorates & sub-resources
Route::get('/governorates',                    [GovernorateController::class, 'index']);
Route::get('/governorates/{id}/pharmacies',    [GovernorateController::class, 'pharmacies']);
Route::get('/governorates/{id}/centers',       [GovernorateController::class, 'centers']);

// Health Centers
Route::get('/centers', [HealthCenterController::class, 'index']);

// Pharmacies (read-only)
Route::get('/pharmacies',                      [PharmacyController::class, 'index']);       // ?gov_id= optional
Route::get('/pharmacies/{id}',                 [PharmacyController::class, 'show']);
Route::get('/pharmacies/{id}/inventory',       [InventoryController::class, 'pharmacyInventory']);
Route::get('/pharmacies/{id}/promotions',      [PromotionController::class, 'pharmacyPromotions']);


// Medicines (read-only)
// NOTE: /medicines/dosage-forms MUST be declared before /medicines/{id}
// so Laravel doesn't treat 'dosage-forms' as a wildcard {id}
Route::get('/medicines/dosage-forms',          [MedicineController::class, 'dosageForms']);
Route::get('/medicines',                       [MedicineController::class, 'index']);       // ?search= optional
Route::get('/medicines/{id}',                  [MedicineController::class, 'show']);

// Inventory search
Route::get('/inventory/search',                [InventoryController::class, 'search']);     // ?medicine_id=

// Health Centers sub-resources
Route::get('/centers/{id}/promotions',         [PromotionController::class, 'centerPromotions']);

// Promotions
Route::get('/promotions',                      [PromotionController::class, 'index']);

// ============================================================
// AUTHENTICATED ROUTES — Any valid Sanctum token
// ============================================================

Route::middleware(['auth:sanctum', 'throttle:100,1'])->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // User profile & update (ownership check in controller)
    Route::get('/users/profile',   [UserController::class, 'profile']);
    Route::put('/users/{id}',      [UserController::class, 'update']);

    // --------------------------------------------------------
    // ADMIN ONLY
    // --------------------------------------------------------
    Route::middleware('role:Admin')->group(function () {
        Route::post('/pharmacies',           [PharmacyController::class, 'store']);
        Route::post('/medicines',            [MedicineController::class, 'store']);
        Route::patch('/medicines/{id}',      [MedicineController::class, 'patch']);

        // User management (Admin dashboard)
        Route::get('/users/pharmacists',     [UserController::class, 'pharmacists']);
        Route::patch('/users/{id}/status',   [UserController::class, 'toggleStatus']);
        Route::get('/violations', [App\Http\Controllers\Api\ViolationController::class, 'index']);
        Route::patch('/violations/{id}/status', [App\Http\Controllers\Api\ViolationController::class, 'updateStatus']);
    });

    // --------------------------------------------------------
    // PHARMACIST or ADMIN
    // --------------------------------------------------------
    Route::middleware('role:Admin,Pharmacist')->group(function () {
        Route::post('/inventory',            [InventoryController::class, 'store']);
        Route::put('/inventory/{id}',        [InventoryController::class, 'update']);
        Route::delete('/inventory/{id}',     [InventoryController::class, 'destroy']);
        Route::get('/inventory/low-stock',   [InventoryController::class, 'lowStock']);
        Route::post('/pharmacies/{pharmacyId}/inventory', [InventoryController::class, 'store']);
        Route::put('/pharmacies/{pharmacyId}/inventory/{inventoryId}', [InventoryController::class, 'update']);
        Route::get('/pharmacies/{pharmacyId}/promotions', [PromotionController::class, 'pharmacyPromotions']);
        Route::post('/promotions',           [PromotionController::class, 'store']);
        Route::put('/promotions/{id}',       [PromotionController::class, 'update']);
        Route::delete('/promotions/{id}',    [PromotionController::class, 'destroy']);
    });

    
});
