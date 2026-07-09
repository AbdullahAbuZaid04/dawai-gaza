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
  public function run(): void
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

    // Medicines (22 common medicines)
    DB::table('medicines')->insert([
      [
        'medicine_id' => 1,
        'name_en' => 'Paracetamol',
        'name_ar' => 'باراسيتامول',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'يستخدم لخفض الحرارة وتخفيف الآلام الخفيفة إلى المتوسطة.',
        'leaflet_dosage' => 'البالغين: قرص واحد كل 6 إلى 8 ساعات عند الحاجة. لا تتجاوز 4 أقراص في اليوم.',
        'leaflet_side_effects' => 'قد يسبب غثيان أو طفح جلدي في بعض الحالات.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات أمراض الكبد. يمنع تناوله مع الكحول.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 2,
        'name_en' => 'Amoxicillin',
        'name_ar' => 'أموكسيسيلين',
        'dosage_form' => 'كبسولات',
        'strength' => '500 مجم',
        'leaflet_uses' => 'مضاد حيوي يستخدم لعلاج الالتهابات البكتيرية حسب وصف الطبيب.',
        'leaflet_dosage' => 'عادةً يؤخذ كل 8 ساعات حسب توجيهات الطبيب. يجب إكمال المدة الموصوفة بالكامل.',
        'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة، إسهال، أو حساسية.',
        'leaflet_contraindications' => 'يمنع استخدامه إذا كان المريض يعاني من حساسية البنسلين.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 3,
        'name_en' => 'Salbutamol',
        'name_ar' => 'سالبوتامول',
        'dosage_form' => 'بخاخ',
        'strength' => '100 مكغم',
        'leaflet_uses' => 'يستخدم لتوسيع الشعب الهوائية وتخفيف الأزيز وضيق التنفس.',
        'leaflet_dosage' => 'استخدم 1 إلى 2 بخة عند الحاجة حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب رعشة أو تسارع في ضربات القلب.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات أمراض القلب الشديدة.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 4,
        'name_en' => 'Metformin',
        'name_ar' => 'ميتفورمين',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'يستخدم للمساعدة في التحكم بمستوى السكر في الدم لمرضى السكري من النوع الثاني.',
        'leaflet_dosage' => 'عادةً يؤخذ مع الطعام مرة أو مرتين يومياً حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة أو إسهال في بداية العلاج.',
        'leaflet_contraindications' => 'يمنع استخدامه في حالات الفشل الكلوي الحاد.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 5,
        'name_en' => 'Human Insulin Regular',
        'name_ar' => 'أنسولين بشري منتظم',
        'dosage_form' => 'حقن',
        'strength' => '100 وحدة/مل',
        'leaflet_uses' => 'يستخدم للتحكم في مستويات سكر الدم لمرضى السكري.',
        'leaflet_dosage' => 'تعتمد الجرعة على خطة العلاج المحددة من قبل الطبيب. يجب قياس السكر بانتظام.',
        'leaflet_side_effects' => 'قد يسبب انخفاض في مستوى سكر الدم (نقص سكر الدم).',
        'leaflet_contraindications' => 'يستخدم بحذر مع مراقبة منتظمة لمستوى الجلوكوز.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 6,
        'name_en' => 'Panadol',
        'name_ar' => 'بنادول',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'مسكن للآلام وخافض للحرارة. يحتوي على الباراسيتامول.',
        'leaflet_dosage' => 'البالغين: قرص واحد كل 4-6 ساعات. لا تتجاوز 8 أقراص في اليوم.',
        'leaflet_side_effects' => 'نادراً ما يحدث آثار جانبية عند الالتزام بالجرعة الموصى بها.',
        'leaflet_contraindications' => 'يمنع تناوله مع أي أدوية أخرى تحتوي على الباراسيتامول.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 7,
        'name_en' => 'Ibuprofen',
        'name_ar' => 'ايبوبروفين',
        'dosage_form' => 'أقراص',
        'strength' => '400 مجم',
        'leaflet_uses' => 'مضاد للالتهابات ومسكن للآلام وخافض للحرارة.',
        'leaflet_dosage' => 'قرص واحد كل 6-8 ساعات بعد الأكل.',
        'leaflet_side_effects' => 'قد يسبب حرقة في المعدة أو اضطراب في الهضم.',
        'leaflet_contraindications' => 'يمنع استخدامه لمرضى القرحة المعدية أو الربو التحسسي.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 8,
        'name_en' => 'Azithromycin',
        'name_ar' => 'أزيترومايسين',
        'dosage_form' => 'كبسولات',
        'strength' => '250 مجم',
        'leaflet_uses' => 'مضاد حيوي لعلاج التهابات الجهاز التنفسي والتهابات الأذن والحلق.',
        'leaflet_dosage' => 'عادةً حبة واحدة يومياً لمدة 3 أيام حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة أو إسهال.',
        'leaflet_contraindications' => 'يمنع في حالات الحساسية للماكروليدات.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 9,
        'name_en' => 'Ciprofloxacin',
        'name_ar' => 'سيبروفلوكساسين',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'مضاد حيوي لعلاج التهابات المسالك البولية والتهابات الجهاز التنفسي.',
        'leaflet_dosage' => 'حبة واحدة كل 12 ساعة حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب غثيان أو إسهال أو دوخة.',
        'leaflet_contraindications' => 'يمنع استخدامه للأطفال والمراهقين خلال فترة النمو.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 10,
        'name_en' => 'Omeprazole',
        'name_ar' => 'أوميبرازول',
        'dosage_form' => 'كبسولات',
        'strength' => '20 مجم',
        'leaflet_uses' => 'يستخدم لعلاج حموضة المعدة وقرحة المعدة والارتجاع المريئي.',
        'leaflet_dosage' => 'كبسولة واحدة يومياً صباحاً قبل الأكل.',
        'leaflet_side_effects' => 'قد يسبب صداع أو إمساك أو غثيان.',
        'leaflet_contraindications' => 'يستخدم بحذر مع بعض الأدوية المميعة للدم.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 11,
        'name_en' => 'Loratadine',
        'name_ar' => 'لوراتادين',
        'dosage_form' => 'أقراص',
        'strength' => '10 مجم',
        'leaflet_uses' => 'مضاد للحساسية يستخدم لتخفيف أعراض حساسية الأنف وحكة العيون.',
        'leaflet_dosage' => 'قرص واحد يومياً.',
        'leaflet_side_effects' => 'نادراً ما يسبب نعاس أو صداع.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات القصور الكلوي أو الكبدي.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 12,
        'name_en' => 'Diclofenac',
        'name_ar' => 'دايكلوفيناك',
        'dosage_form' => 'أقراص',
        'strength' => '50 مجم',
        'leaflet_uses' => 'مسكن للآلام ومضاد للالتهابات يستخدم لآلام المفاصل والعضلات.',
        'leaflet_dosage' => 'قرص واحد كل 8-12 ساعة بعد الأكل.',
        'leaflet_side_effects' => 'قد يسبب اضطراب في المعدة أو حرقة.',
        'leaflet_contraindications' => 'يمنع استخدامه لمرضى القرحة المعدية أو الربو.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 13,
        'name_en' => 'Amlodipine',
        'name_ar' => 'أملوديبين',
        'dosage_form' => 'أقراص',
        'strength' => '5 مجم',
        'leaflet_uses' => 'يستخدم لعلاج ارتفاع ضغط الدم والذبحة الصدرية.',
        'leaflet_dosage' => 'قرص واحد يومياً حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب تورم في الكاحلين أو دوخة.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات انخفاض ضغط الدم الشديد.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 14,
        'name_en' => 'Bisoprolol',
        'name_ar' => 'بيسوبرولول',
        'dosage_form' => 'أقراص',
        'strength' => '5 مجم',
        'leaflet_uses' => 'يستخدم لعلاج ارتفاع ضغط الدم وفشل القلب المزمن.',
        'leaflet_dosage' => 'قرص واحد يومياً صباحاً حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب بطء في ضربات القلب أو إرهاق.',
        'leaflet_contraindications' => 'يمنع استخدامه في حالات الربو الشديد أو بطء القلب الشديد.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 15,
        'name_en' => 'Multivitamin',
        'name_ar' => 'مالتي فيتامين',
        'dosage_form' => 'أقراص',
        'strength' => 'مكمل غذائي',
        'leaflet_uses' => 'مكمل غذائي متكامل يحتوي على فيتامينات ومعادن لتعزيز الصحة العامة.',
        'leaflet_dosage' => 'قرص واحد يومياً مع الطعام.',
        'leaflet_side_effects' => 'قد يسبب اضطراب بسيط في المعدة في بعض الحالات.',
        'leaflet_contraindications' => 'يمنع تناوله مع مكملات أخرى تحتوي على نفس الفيتامينات.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 16,
        'name_en' => 'Vitamin D3',
        'name_ar' => 'فيتامين د',
        'dosage_form' => 'أقراص',
        'strength' => '1000 وحدة',
        'leaflet_uses' => 'لتعويض نقص فيتامين د وتقوية العظام والمناعة.',
        'leaflet_dosage' => 'قرص واحد يومياً.',
        'leaflet_side_effects' => 'نادراً ما يحدث آثار جانبية عند الجرعات الموصى بها.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات ارتفاع الكالسيوم في الدم.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 17,
        'name_en' => 'Vitamin C',
        'name_ar' => 'فيتامين سي',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'مضاد أكسدة يعزز المناعة ويساعد في التئام الجروح.',
        'leaflet_dosage' => 'قرص واحد يومياً.',
        'leaflet_side_effects' => 'قد يسبب اضطراب بسيط في المعدة عند الجرعات العالية.',
        'leaflet_contraindications' => 'يستخدم بحذر في حالات حصوات الكلى.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 18,
        'name_en' => 'Ferrous Sulfate',
        'name_ar' => 'حديد',
        'dosage_form' => 'أقراص',
        'strength' => '200 مجم',
        'leaflet_uses' => 'لعلاج والوقاية من فقر الدم الناتج عن نقص الحديد.',
        'leaflet_dosage' => 'قرص واحد إلى قرصين يومياً بعد الأكل.',
        'leaflet_side_effects' => 'قد يسبب إمساك أو تغير لون البراز.',
        'leaflet_contraindications' => 'يمنع في حالات زيادة الحديد في الدم.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 19,
        'name_en' => 'Calcium Carbonate',
        'name_ar' => 'كالسيوم',
        'dosage_form' => 'أقراص',
        'strength' => '500 مجم',
        'leaflet_uses' => 'مكمل غذائي لتقوية العظام والأسنان والوقاية من هشاشة العظام.',
        'leaflet_dosage' => 'قرص واحد إلى قرصين يومياً مع الأكل.',
        'leaflet_side_effects' => 'قد يسبب إمساك أو غازات.',
        'leaflet_contraindications' => 'يمنع في حالات حصوات الكلى أو زيادة الكالسيوم.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 20,
        'name_en' => 'Omega-3',
        'name_ar' => 'اوميغا 3',
        'dosage_form' => 'كبسولات',
        'strength' => '1000 مجم',
        'leaflet_uses' => 'مكمل غذائي لصحة القلب والدماغ وتقليل الالتهابات.',
        'leaflet_dosage' => 'كبسولة واحدة يومياً مع الأكل.',
        'leaflet_side_effects' => 'قد يسبب طعم سمكي أو غثيان بسيط.',
        'leaflet_contraindications' => 'يستخدم بحذر مع مميعات الدم.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 21,
        'name_en' => 'Lisinopril',
        'name_ar' => 'ليسينوبريل',
        'dosage_form' => 'أقراص',
        'strength' => '10 مجم',
        'leaflet_uses' => 'يستخدم لعلاج ارتفاع ضغط الدم وفشل القلب.',
        'leaflet_dosage' => 'قرص واحد يومياً حسب توجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب سعال جاف أو دوخة.',
        'leaflet_contraindications' => 'يمنع استخدامه في حالات الحمل أو تضيق الشريان الكلوي.',
        'is_active' => 1,
      ],
      [
        'medicine_id' => 22,
        'name_en' => 'Paracetamol Syrup',
        'name_ar' => 'باراسيتامول شراب',
        'dosage_form' => 'شراب',
        'strength' => '250 مجم/5مل',
        'leaflet_uses' => 'خافض للحرارة ومسكن للآلام مناسب للأطفال.',
        'leaflet_dosage' => 'حسب وزن الطفل وتوجيهات الطبيب.',
        'leaflet_side_effects' => 'قد يسبب غثيان في بعض الحالات.',
        'leaflet_contraindications' => 'يمتنع استخدامه مع أدوية أخرى تحتوي على الباراسيتامول.',
        'is_active' => 1,
      ],
    ]);

    // Inventory (each pharmacy stocks 7-9 medicines)
    DB::table('inventory')->insert([
      // ---- Pharmacy 1: Al-Shifa - Gaza (9 items) ----
      ['pharmacy_id' => 1, 'medicine_id' => 1, 'quantity' => 150, 'price_ils' => 7.00, 'expiry_date' => '2027-06-15', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 6, 'quantity' => 80, 'price_ils' => 12.00, 'expiry_date' => '2027-05-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 2, 'quantity' => 100, 'price_ils' => 15.00, 'expiry_date' => '2027-04-20', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 3, 'quantity' => 60, 'price_ils' => 22.00, 'expiry_date' => '2027-03-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 10, 'quantity' => 45, 'price_ils' => 18.00, 'expiry_date' => '2027-08-10', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 11, 'quantity' => 70, 'price_ils' => 10.00, 'expiry_date' => '2027-07-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 15, 'quantity' => 200, 'price_ils' => 25.00, 'expiry_date' => '2027-09-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 16, 'quantity' => 90, 'price_ils' => 15.00, 'expiry_date' => '2027-10-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 1, 'medicine_id' => 20, 'quantity' => 40, 'price_ils' => 35.00, 'expiry_date' => '2027-06-01', 'stock_status' => 'In Stock'],

      // ---- Pharmacy 2: Nasser - Khan Younis (8 items) ----
      ['pharmacy_id' => 2, 'medicine_id' => 1, 'quantity' => 120, 'price_ils' => 8.00, 'expiry_date' => '2027-01-15', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 4, 'quantity' => 40, 'price_ils' => 12.00, 'expiry_date' => '2026-11-20', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 7, 'quantity' => 85, 'price_ils' => 9.00, 'expiry_date' => '2027-03-15', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 13, 'quantity' => 55, 'price_ils' => 14.00, 'expiry_date' => '2027-04-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 11, 'quantity' => 30, 'price_ils' => 11.00, 'expiry_date' => '2026-12-01', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 18, 'quantity' => 65, 'price_ils' => 10.00, 'expiry_date' => '2027-05-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 17, 'quantity' => 100, 'price_ils' => 8.00, 'expiry_date' => '2027-07-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 2, 'medicine_id' => 5, 'quantity' => 25, 'price_ils' => 35.00, 'expiry_date' => '2026-10-15', 'stock_status' => 'In Stock'],

      // ---- Pharmacy 3: Al-Aqsa - Deir al-Balah (7 items) ----
      ['pharmacy_id' => 3, 'medicine_id' => 2, 'quantity' => 25, 'price_ils' => 18.00, 'expiry_date' => '2026-10-10', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 8, 'quantity' => 50, 'price_ils' => 28.00, 'expiry_date' => '2027-02-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 12, 'quantity' => 40, 'price_ils' => 8.00, 'expiry_date' => '2027-01-20', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 10, 'quantity' => 35, 'price_ils' => 19.00, 'expiry_date' => '2027-03-10', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 14, 'quantity' => 60, 'price_ils' => 12.00, 'expiry_date' => '2027-05-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 15, 'quantity' => 120, 'price_ils' => 26.00, 'expiry_date' => '2027-08-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 3, 'medicine_id' => 19, 'quantity' => 45, 'price_ils' => 15.00, 'expiry_date' => '2027-04-15', 'stock_status' => 'In Stock'],

      // ---- Pharmacy 4: Al-Awda - Jabalia (8 items) ----
      ['pharmacy_id' => 4, 'medicine_id' => 6, 'quantity' => 90, 'price_ils' => 13.00, 'expiry_date' => '2027-05-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 7, 'quantity' => 70, 'price_ils' => 8.50, 'expiry_date' => '2027-03-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 9, 'quantity' => 40, 'price_ils' => 20.00, 'expiry_date' => '2027-02-15', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 11, 'quantity' => 20, 'price_ils' => 10.00, 'expiry_date' => '2026-11-01', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 16, 'quantity' => 60, 'price_ils' => 16.00, 'expiry_date' => '2027-06-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 20, 'quantity' => 30, 'price_ils' => 36.00, 'expiry_date' => '2027-04-01', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 19, 'quantity' => 50, 'price_ils' => 14.00, 'expiry_date' => '2027-07-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 4, 'medicine_id' => 17, 'quantity' => 75, 'price_ils' => 9.00, 'expiry_date' => '2027-08-01', 'stock_status' => 'In Stock'],

      // ---- Pharmacy 5: ICRC - Rafah (9 items) ----
      ['pharmacy_id' => 5, 'medicine_id' => 3, 'quantity' => 20, 'price_ils' => 23.00, 'expiry_date' => '2026-12-01', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 5, 'quantity' => 10, 'price_ils' => 35.00, 'expiry_date' => '2026-09-01', 'stock_status' => 'Low Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 2, 'quantity' => 100, 'price_ils' => 16.00, 'expiry_date' => '2027-04-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 4, 'quantity' => 60, 'price_ils' => 11.00, 'expiry_date' => '2027-03-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 12, 'quantity' => 45, 'price_ils' => 7.50, 'expiry_date' => '2027-02-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 15, 'quantity' => 80, 'price_ils' => 27.00, 'expiry_date' => '2027-06-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 18, 'quantity' => 35, 'price_ils' => 11.00, 'expiry_date' => '2027-05-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 1, 'quantity' => 200, 'price_ils' => 6.50, 'expiry_date' => '2027-07-01', 'stock_status' => 'In Stock'],
      ['pharmacy_id' => 5, 'medicine_id' => 22, 'quantity' => 30, 'price_ils' => 10.00, 'expiry_date' => '2027-08-01', 'stock_status' => 'In Stock'],
    ]);

    // Promotions
    DB::table('promotions')->insert([
      // Pharmacy Advertisements
      ['pharmacy_id' => 1, 'center_id' => NULL, 'title' => 'Diabetes Follow-up Support', 'description' => 'Free medicine timing guidance for diabetes patients at the pharmacy.', 'image_url' => '', 'start_date' => '2026-04-01', 'end_date' => '2026-06-30', 'is_active' => 1],
      ['pharmacy_id' => 2, 'center_id' => NULL, 'title' => 'Child Fever Guidance', 'description' => 'Quick dose guidance for children fever medicines.', 'image_url' => '', 'start_date' => '2026-04-10', 'end_date' => '2026-05-31', 'is_active' => 1],

      // Syndicate Circulars (Both pharmacy_id and center_id must be NULL)
      ['pharmacy_id' => NULL, 'center_id' => NULL, 'title' => 'Syndicate Awareness Campaign', 'description' => 'Awareness campaign about safe medicine use and storage.', 'image_url' => '', 'start_date' => '2026-04-05', 'end_date' => '2026-06-15', 'is_active' => 1],
      ['pharmacy_id' => NULL, 'center_id' => NULL, 'title' => 'Chronic Medication Counseling', 'description' => 'Support sessions for chronic medication schedule and adherence.', 'image_url' => '', 'start_date' => '2026-04-15', 'end_date' => '2026-07-01', 'is_active' => 1],
      ['pharmacy_id' => NULL, 'center_id' => NULL, 'title' => 'Community Health Education Week', 'description' => 'Educational mini-campaign for rational medicine use.', 'image_url' => '', 'start_date' => '2026-05-01', 'end_date' => '2026-07-31', 'is_active' => 1],
    ]);

  }
}
