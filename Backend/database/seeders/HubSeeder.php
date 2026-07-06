<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class HubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function up(): void
    {
        // Governorates
        DB::table('governorates')->insert([
            ['governorate_id' => 1, 'name_en' => 'North Gaza', 'name_ar' => 'شمال غزة', 'main_city' => 'Jabalia'],
            ['governorate_id' => 2, 'name_en' => 'Gaza', 'name_ar' => 'غزة', 'main_city' => 'Gaza City'],
            ['governorate_id' => 3, 'name_en' => 'Deir al-Balah', 'name_ar' => 'دير البلح', 'main_city' => 'Deir al-Balah'],
            ['governorate_id' => 4, 'name_en' => 'Khan Younis', 'name_ar' => 'خانيونس', 'main_city' => 'Khan Younis'],
            ['governorate_id' => 5, 'name_en' => 'Rafah', 'name_ar' => 'رفح', 'main_city' => 'Rafah'],
        ]);

        // Pharmacies
        DB::table('pharmacies')->insert([
            ['pharmacy_id' => 1, 'governorate_id' => 2, 'pharmacy_name_en' => 'Al-Shifa Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية الشفاء', 'license_number' => 'MOH-1001', 'open_time' => '08:00', 'close_time' => '22:00', 'area_name' => 'Gaza City', 'address_note' => 'Near Al-Shifa medical area', 'latitude' => 31.5223, 'longitude' => 34.4431, 'google_maps_link' => 'https://goo.gl/maps/example1'],
            ['pharmacy_id' => 2, 'governorate_id' => 4, 'pharmacy_name_en' => 'Nasser Medical Pharmacy', 'pharmacy_name_ar' => 'صيدلية مجمع ناصر الطبي', 'license_number' => 'MOH-2001', 'open_time' => '08:00', 'close_time' => '22:00', 'area_name' => 'Khan Younis', 'address_note' => 'Inside Nasser medical complex', 'latitude' => 31.3447, 'longitude' => 34.3033, 'google_maps_link' => 'https://goo.gl/maps/example2'],
            ['pharmacy_id' => 3, 'governorate_id' => 3, 'pharmacy_name_en' => 'Al-Aqsa Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية شهداء الأقصى', 'license_number' => 'MOH-3001', 'open_time' => '08:00', 'close_time' => '23:00', 'area_name' => 'Deir al-Balah', 'address_note' => 'Near Al-Aqsa hospital gate', 'latitude' => 31.4180, 'longitude' => 34.3500, 'google_maps_link' => 'https://goo.gl/maps/example3'],
            ['pharmacy_id' => 4, 'governorate_id' => 1, 'pharmacy_name_en' => 'Al-Awda Pharmacy Jabalia', 'pharmacy_name_ar' => 'صيدلية العودة جباليا', 'license_number' => 'MOH-4001', 'open_time' => '09:00', 'close_time' => '21:00', 'area_name' => 'Jabalia', 'address_note' => 'Near Jabalia area service point', 'latitude' => 31.5468, 'longitude' => 34.4951, 'google_maps_link' => 'https://goo.gl/maps/example4'],
            ['pharmacy_id' => 5, 'governorate_id' => 5, 'pharmacy_name_en' => 'ICRC Field Hospital Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية المستشفى الميداني للجنة الدولية للصليب الأحمر', 'license_number' => 'MOH-5001', 'open_time' => '00:00', 'close_time' => '23:59', 'area_name' => 'Rafah', 'address_note' => 'Rafah limited health services area', 'latitude' => 31.2969, 'longitude' => 34.2436, 'google_maps_link' => 'https://goo.gl/maps/example5'],
        ]);

        // Health Centers
        DB::table('health_centers')->insert([
            ['center_id' => 1, 'governorate_id' => 2, 'center_name_en' => 'Pharmacists Syndicate Health Center - Gaza', 'center_name_ar' => 'المركز الصحي لنقابة الصيادلة - غزة', 'area_name' => 'Gaza City', 'address_note' => 'Syndicate services point in Gaza governorate', 'phone' => '+970599100001', 'image_url' => '', 'description' => 'Syndicate health center seed record for awareness, consultation, and medicine guidance services.', 'is_active' => 1],
            ['center_id' => 2, 'governorate_id' => 4, 'center_name_en' => 'Pharmacists Syndicate Health Center - Khan Younis', 'center_name_ar' => 'المركز الصحي لنقابة الصيادلة - خانيونس', 'area_name' => 'Khan Younis', 'address_note' => 'Syndicate services point in Khan Younis', 'phone' => '+970599100002', 'image_url' => '', 'description' => 'Seed record for chronic medication counseling and community support activities.', 'is_active' => 1],
            ['center_id' => 3, 'governorate_id' => 3, 'center_name_en' => 'Pharmacists Syndicate Health Unit - Deir al-Balah', 'center_name_ar' => 'الوحدة الصحية لنقابة الصيادلة - دير البلح', 'area_name' => 'Deir al-Balah', 'address_note' => 'Syndicate services point in Deir al-Balah', 'phone' => '+970599100003', 'image_url' => '', 'description' => 'Seed record for education, counseling, and medicine-use awareness.', 'is_active' => 1],
        ]);

        // Users — only Admin + one Pharmacist per pharmacy
        DB::table('users')->insert([
            ['user_id' => 1, 'pharmacy_id' => NULL, 'full_name' => 'System Admin', 'email' => 'admin@dawai.ps', 'password' => Hash::make('admin123'), 'role' => 'Admin', 'phone' => '+970590000001', 'is_active' => 1],
            ['user_id' => 2, 'pharmacy_id' => 2, 'full_name' => 'Ahmed Khaled', 'email' => 'ahmed.khaled@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000002', 'is_active' => 1],
            ['user_id' => 3, 'pharmacy_id' => 3, 'full_name' => 'Mona Sami', 'email' => 'mona.sami@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000003', 'is_active' => 1],
            ['user_id' => 4, 'pharmacy_id' => 1, 'full_name' => 'Hassan Al-Shifa', 'email' => 'hassan.shifa@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000006', 'is_active' => 1],
            ['user_id' => 5, 'pharmacy_id' => 4, 'full_name' => 'Laila Al-Awda', 'email' => 'laila.awda@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000007', 'is_active' => 1],
            ['user_id' => 6, 'pharmacy_id' => 5, 'full_name' => 'Omar ICRC', 'email' => 'omar.icrc@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000008', 'is_active' => 1],
        ]);

        // Medicines
        DB::table('medicines')->insert([
            [
                'medicine_id' => 1, 'name_en' => 'Paracetamol', 'name_ar' => 'باراسيتامول',
                'dosage_form' => 'أقراص', 'strength' => '500 مجم',
                'leaflet_uses' => 'يستخدم لخفض الحرارة وتخفيف الآلام الخفيفة إلى المتوسطة.',
                'leaflet_dosage' => 'البالغين: قرص واحد كل 6 إلى 8 ساعات عند الحاجة. لا تتجاوز 4 أقراص في اليوم.',
                'leaflet_side_effects' => 'قد يسبب غثيان أو طفح جلدي في بعض الحالات.',
                'leaflet_contraindications' => 'يستخدم بحذر في حالات أمراض الكبد. يمنع تناوله مع الكحول.', 'is_active' => 1,
            ],
            [
                'medicine_id' => 2, 'name_en' => 'Amoxicillin', 'name_ar' => 'أموكسيسيلين',
                'dosage_form' => 'كبسولات', 'strength' => '500 مجم',
                'leaflet_uses' => 'مضاد حيوي يستخدم لعلاج الالتهابات البكتيرية حسب وصف الطبيب.',
                'leaflet_dosage' => 'عادةً يؤخذ كل 8 ساعات حسب توجيهات الطبيب. يجب إكمال المدة الموصوفة بالكامل.',
                'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة، إسهال، أو حساسية.',
                'leaflet_contraindications' => 'يمنع استخدامه إذا كان المريض يعاني من حساسية البنسلين.', 'is_active' => 1,
            ],
            [
                'medicine_id' => 3, 'name_en' => 'Salbutamol', 'name_ar' => 'سالبوتامول',
                'dosage_form' => 'بخاخ', 'strength' => '100 مكغم',
                'leaflet_uses' => 'يستخدم لتوسيع الشعب الهوائية وتخفيف الأزيز وضيق التنفس.',
                'leaflet_dosage' => 'استخدم 1 إلى 2 بخة عند الحاجة حسب توجيهات الطبيب.',
                'leaflet_side_effects' => 'قد يسبب رعشة أو تسارع في ضربات القلب.',
                'leaflet_contraindications' => 'يستخدم بحذر في حالات أمراض القلب الشديدة.', 'is_active' => 1,
            ],
            [
                'medicine_id' => 4, 'name_en' => 'Metformin', 'name_ar' => 'ميتفورمين',
                'dosage_form' => 'أقراص', 'strength' => '500 مجم',
                'leaflet_uses' => 'يستخدم للمساعدة في التحكم بمستوى السكر في الدم لمرضى السكري من النوع الثاني.',
                'leaflet_dosage' => 'عادةً يؤخذ مع الطعام مرة أو مرتين يومياً حسب توجيهات الطبيب.',
                'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة أو إسهال في بداية العلاج.',
                'leaflet_contraindications' => 'يمنع استخدامه في حالات الفشل الكلوي الحاد.', 'is_active' => 1,
            ],
            [
                'medicine_id' => 5, 'name_en' => 'Human Insulin Regular', 'name_ar' => 'أنسولين بشري منتظم',
                'dosage_form' => 'حقن', 'strength' => '100 وحدة/مل',
                'leaflet_uses' => 'يستخدم للتحكم في مستويات سكر الدم لمرضى السكري.',
                'leaflet_dosage' => 'تعتمد الجرعة على خطة العلاج المحددة من قبل الطبيب. يجب قياس السكر بانتظام.',
                'leaflet_side_effects' => 'قد يسبب انخفاض في مستوى سكر الدم (نقص سكر الدم).',
                'leaflet_contraindications' => 'يستخدم بحذر مع مراقبة منتظمة لمستوى الجلوكوز.', 'is_active' => 1,
            ],
        ]);

        // Inventory
        DB::table('inventory')->insert([
            ['pharmacy_id' => 2, 'medicine_id' => 1, 'quantity' => 120, 'price_ils' => 8.00, 'expiry_date' => '2027-01-15', 'stock_status' => 'In Stock'],
            ['pharmacy_id' => 2, 'medicine_id' => 4, 'quantity' => 40, 'price_ils' => 12.00, 'expiry_date' => '2026-11-20', 'stock_status' => 'Low Stock'],
            ['pharmacy_id' => 3, 'medicine_id' => 2, 'quantity' => 25, 'price_ils' => 18.00, 'expiry_date' => '2026-10-10', 'stock_status' => 'Low Stock'],
            ['pharmacy_id' => 1, 'medicine_id' => 3, 'quantity' => 60, 'price_ils' => 22.00, 'expiry_date' => '2027-03-01', 'stock_status' => 'In Stock'],
            ['pharmacy_id' => 5, 'medicine_id' => 5, 'quantity' => 10, 'price_ils' => 35.00, 'expiry_date' => '2026-09-01', 'stock_status' => 'Low Stock'],
        ]);

        // Promotions
        DB::table('promotions')->insert([
            ['pharmacy_id' => 2, 'center_id' => NULL, 'title' => 'Diabetes Follow-up Support', 'description' => 'Free medicine timing guidance for diabetes patients at the pharmacy.', 'image_url' => '', 'start_date' => '2026-04-01', 'end_date' => '2026-06-30', 'is_active' => 1],
            ['pharmacy_id' => 3, 'center_id' => NULL, 'title' => 'Child Fever Guidance', 'description' => 'Quick dose guidance for children fever medicines.', 'image_url' => '', 'start_date' => '2026-04-10', 'end_date' => '2026-05-31', 'is_active' => 1],
            ['pharmacy_id' => NULL, 'center_id' => 1, 'title' => 'Syndicate Awareness Campaign', 'description' => 'Awareness campaign about safe medicine use and storage.', 'image_url' => '', 'start_date' => '2026-04-05', 'end_date' => '2026-06-15', 'is_active' => 1],
            ['pharmacy_id' => NULL, 'center_id' => 2, 'title' => 'Chronic Medication Counseling', 'description' => 'Support sessions for chronic medication schedule and adherence.', 'image_url' => '', 'start_date' => '2026-04-15', 'end_date' => '2026-07-01', 'is_active' => 1],
            ['pharmacy_id' => NULL, 'center_id' => 3, 'title' => 'Community Health Education Week', 'description' => 'Educational mini-campaign for rational medicine use.', 'image_url' => '', 'start_date' => '2026-05-01', 'end_date' => '2026-07-31', 'is_active' => 1],

        ]);

    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->up();
    }
}
