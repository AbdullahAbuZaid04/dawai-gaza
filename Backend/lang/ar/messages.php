<?php

return [
    // Auth
    'login_invalid' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    'account_inactive' => 'الحساب غير مفعل. يرجى انتظار اعتماد الحساب من النقابة.',
    'logout_success' => 'تم تسجيل الخروج بنجاح.',
    'unauthenticated' => 'يرجى تسجيل الدخول أولاً.',
    'unauthorized' => 'ليس لديك صلاحية للوصول إلى هذه الميزة.',
    'unauthorized_role' => 'ليس لديك صلاحية. الصلاحيات المطلوبة: :roles.',

    // Users
    'user_not_found' => 'المستخدم غير موجود.',
    'profile_updated' => 'تم تحديث الملف الشخصي بنجاح.',
    'status_updated' => 'تم تحديث الحالة بنجاح.',

    // Pharmacies
    'pharmacy_not_found' => 'الصيدلية غير موجودة.',
    'registration_sent' => 'تم إرسال طلبك للمراجعة. سيتم إعلامك عند الاعتماد.',

    // Medicines
    'medicine_not_found' => 'الدواء غير موجود.',
    'medicine_duplicate' => 'يوجد دواء بنفس الاسم والشكل الصيدلاني والتركيز مسبقاً.',
    'medicine_updated' => 'تم تحديث الدواء بنجاح.',

    // Promotions
    'promotion_not_found' => 'الإعلان غير موجود.',
    'promotion_deactivated' => 'تم إلغاء تفعيل الإعلان بنجاح.',

    // Inventory
    'inventory_not_found' => 'سجل المخزون غير موجود.',
    'inventory_unauthorized' => 'يمكن للصيدلي إدارة مخزون صيدليته فقط.',
    'inventory_duplicate' => 'هذا الدواء موجود مسبقاً في مخزون هذه الصيدلية. استخدم PUT /api/inventory/{id} لتحديثه.',
    'inventory_updated' => 'تم تحديث المخزون بنجاح.',
    'inventory_deleted' => 'تم حذف الدواء من مخزون الصيدلية.',
    'medicine_not_in_pharmacy' => 'الدواء غير موجود في هذه الصيدلية.',

    // Governorates
    'governorate_not_found' => 'المحافظة غير موجودة.',

    // Violations
    'violation_not_found' => 'المخالفة غير موجودة.',
    'unknown' => 'غير معروف',
    'unspecified' => 'غير محدد',

    // General
    'not_available' => 'غير متوفر',
    'not_specified_yet' => 'لم يحدد بعد',
    'operation_success' => 'تمت العملية بنجاح.',
    'operation_failed' => 'فشلت العملية. يرجى المحاولة مرة أخرى.',
];
