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
            ['pharmacy_id' => 1, 'governorate_id' => 2, 'pharmacy_name_en' => 'Al-Shifa Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية الشفاء', 'area_name' => 'Gaza City', 'address_note' => 'Near Al-Shifa medical area', 'latitude' => 31.5223, 'longitude' => 34.4431],
            ['pharmacy_id' => 2, 'governorate_id' => 4, 'pharmacy_name_en' => 'Nasser Medical Pharmacy', 'pharmacy_name_ar' => 'صيدلية مجمع ناصر الطبي', 'area_name' => 'Khan Younis', 'address_note' => 'Inside Nasser medical complex', 'latitude' => 31.3447, 'longitude' => 34.3033],
            ['pharmacy_id' => 3, 'governorate_id' => 3, 'pharmacy_name_en' => 'Al-Aqsa Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية شهداء الأقصى', 'area_name' => 'Deir al-Balah', 'address_note' => 'Near Al-Aqsa hospital gate', 'latitude' => 31.4180, 'longitude' => 34.3500],
            ['pharmacy_id' => 4, 'governorate_id' => 1, 'pharmacy_name_en' => 'Al-Awda Pharmacy Jabalia', 'pharmacy_name_ar' => 'صيدلية العودة جباليا', 'area_name' => 'Jabalia', 'address_note' => 'Near Jabalia area service point', 'latitude' => 31.5468, 'longitude' => 34.4951],
            ['pharmacy_id' => 5, 'governorate_id' => 5, 'pharmacy_name_en' => 'ICRC Field Hospital Pharmacy Point', 'pharmacy_name_ar' => 'نقطة صيدلية المستشفى الميداني للجنة الدولية للصليب الأحمر', 'area_name' => 'Rafah', 'address_note' => 'Rafah limited health services area', 'latitude' => 31.2969, 'longitude' => 34.2436],
        ]);

        // Health Centers
        DB::table('health_centers')->insert([
            ['center_id' => 1, 'governorate_id' => 2, 'center_name_en' => 'Pharmacists Syndicate Health Center - Gaza', 'center_name_ar' => 'المركز الصحي لنقابة الصيادلة - غزة', 'area_name' => 'Gaza City', 'address_note' => 'Syndicate services point in Gaza governorate', 'phone' => '+970599100001', 'image_url' => '', 'description' => 'Syndicate health center seed record for awareness, consultation, and medicine guidance services.', 'is_active' => 1],
            ['center_id' => 2, 'governorate_id' => 4, 'center_name_en' => 'Pharmacists Syndicate Health Center - Khan Younis', 'center_name_ar' => 'المركز الصحي لنقابة الصيادلة - خانيونس', 'area_name' => 'Khan Younis', 'address_note' => 'Syndicate services point in Khan Younis', 'phone' => '+970599100002', 'image_url' => '', 'description' => 'Seed record for chronic medication counseling and community support activities.', 'is_active' => 1],
            ['center_id' => 3, 'governorate_id' => 3, 'center_name_en' => 'Pharmacists Syndicate Health Unit - Deir al-Balah', 'center_name_ar' => 'الوحدة الصحية لنقابة الصيادلة - دير البلح', 'area_name' => 'Deir al-Balah', 'address_note' => 'Syndicate services point in Deir al-Balah', 'phone' => '+970599100003', 'image_url' => '', 'description' => 'Seed record for education, counseling, and medicine-use awareness.', 'is_active' => 1],
        ]);

        // Users
        DB::table('users')->insert([
            ['user_id' => 1, 'pharmacy_id' => NULL, 'full_name' => 'System Admin', 'email' => 'admin@dawai.ps', 'password' => Hash::make('admin123'), 'role' => 'Admin', 'phone' => '+970590000001', 'is_active' => 1],
            ['user_id' => 2, 'pharmacy_id' => 2, 'full_name' => 'Ahmed Khaled', 'email' => 'ahmed.khaled@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000002', 'is_active' => 1],
            ['user_id' => 3, 'pharmacy_id' => 3, 'full_name' => 'Mona Sami', 'email' => 'mona.sami@dawai.ps', 'password' => Hash::make('pharm123'), 'role' => 'Pharmacist', 'phone' => '+970590000003', 'is_active' => 1],
            ['user_id' => 4, 'pharmacy_id' => NULL, 'full_name' => 'Yousef Adel', 'email' => 'yousef.adel@mail.ps', 'password' => Hash::make('user123'), 'role' => 'Citizen', 'phone' => '+970590000004', 'is_active' => 1],
            ['user_id' => 5, 'pharmacy_id' => NULL, 'full_name' => 'Sara Nabil', 'email' => 'sara.nabil@mail.ps', 'password' => Hash::make('user123'), 'role' => 'Citizen', 'phone' => '+970590000005', 'is_active' => 1],
        ]);

        // Medicines
        DB::table('medicines')->insert([
            ['medicine_id' => 1, 'name_en' => 'Paracetamol', 'name_ar' => 'باراسيتامول', 'dosage_form' => 'Tablet', 'strength' => '500 mg', 'leaflet_uses' => 'Used for fever and mild to moderate pain.', 'leaflet_dosage' => 'Adults: 1 tablet every 6 to 8 hours when needed.', 'leaflet_side_effects' => 'May cause nausea or rash in some cases.', 'leaflet_contraindications' => 'Use carefully in liver disease.', 'is_active' => 1],
            ['medicine_id' => 2, 'name_en' => 'Amoxicillin', 'name_ar' => 'أموكسيسيلين', 'dosage_form' => 'Capsule', 'strength' => '500 mg', 'leaflet_uses' => 'Used for bacterial infections when prescribed.', 'leaflet_dosage' => 'Usually taken every 8 hours as prescribed by a doctor.', 'leaflet_side_effects' => 'May cause stomach upset, diarrhea, or allergy.', 'leaflet_contraindications' => 'Avoid if the patient has penicillin allergy.', 'is_active' => 1],
            ['medicine_id' => 3, 'name_en' => 'Salbutamol', 'name_ar' => 'سالبوتامول', 'dosage_form' => 'Inhaler', 'strength' => '100 mcg', 'leaflet_uses' => 'Used to relieve bronchospasm and wheezing.', 'leaflet_dosage' => 'Use 1 to 2 puffs when needed as directed.', 'leaflet_side_effects' => 'May cause tremor or fast heartbeat.', 'leaflet_contraindications' => 'Use carefully in severe heart conditions.', 'is_active' => 1],
            ['medicine_id' => 4, 'name_en' => 'Metformin', 'name_ar' => 'ميتفورمين', 'dosage_form' => 'Tablet', 'strength' => '500 mg', 'leaflet_uses' => 'Used to help control blood sugar in type 2 diabetes.', 'leaflet_dosage' => 'Usually taken with food once or twice daily.', 'leaflet_side_effects' => 'May cause stomach upset or diarrhea.', 'leaflet_contraindications' => 'Avoid in severe kidney problems.', 'is_active' => 1],
            ['medicine_id' => 5, 'name_en' => 'Human Insulin Regular', 'name_ar' => 'أنسولين بشري منتظم', 'dosage_form' => 'Injection', 'strength' => '100 IU/ml', 'leaflet_uses' => 'Used to control blood sugar.', 'leaflet_dosage' => 'Dose depends on the treatment plan from the doctor.', 'leaflet_side_effects' => 'May cause low blood sugar.', 'leaflet_contraindications' => 'Use carefully and monitor glucose regularly.', 'is_active' => 1],
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
