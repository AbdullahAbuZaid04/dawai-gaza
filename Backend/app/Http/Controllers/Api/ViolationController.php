<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Violation;
use Illuminate\Http\Request;

class ViolationController extends Controller
{
    public function index()
    {
        $violations = Violation::with(['pharmacy', 'medicine'])->get()->map(fn($v) => [
            'id'            => $v->violation_id,
            'pharmacy'      => $v->pharmacy?->pharmacy_name_ar ?? 'غير معروف',
            'medicine'      => $v->medicine?->name_ar ?? 'غير معروف',
            'officialPrice' => (float) $v->official_price,
            'soldPrice'     => (float) $v->sold_price,
            'status'        => $v->status,
            'date'          => $v->created_at?->format('Y-m-d') ?? 'غير محدد',
        ]);

        return response()->json($violations);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:warned,fined']);

        $violation = Violation::find($id);

        if (!$violation) {
            return response()->json(['message' => 'المخالفة غير موجودة'], 404);
        }

        $violation->update(['status' => $request->status]);

        return response()->json(['message' => 'تم تحديث الحالة بنجاح']);
    }
}