
<div dir="rtl">

# دوائي

<p align="center">
  <a href="https://dawai-gaza.vercel.app/"><strong>عرض المشروع</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/PHP_8.3-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

---

## وصف المشروع

**دوائي** منصة ويب شاملة تهدف إلى معالجة أزمة الوصول إلى الدواء في **قطاع غزة**. تعمل كجسر يربط بين المواطنين والصيادلة ونقابة الصيادلة، من خلال إتاحة البحث عن الأدوية، وتحديد الصيدليات القريبة، ومتابعة توفر الأدوية وأسعارها، والاطلاع على النشرات الرسمية.

تدعم المنصة ثلاثة أدوار رئيسية:

- **النقابة:** تُشرف على المنظومة بأكملها — إدارة الأدوية، ومراقبة الصيدليات، والموافقة على طلبات التسجيل، وإصدار النشرات الرسمية، وتتبع مخالفات الأسعار.
- **الصيدلاني:** يُدير مخزون صيدليته، وينشر إعلانات ترويجية، ويُحدّث بيانات الأدوية المتاحة.
- **المواطن:** يبحث عن الأدوية والصيدليات، ويطّلع على الأسعار والنشرات الرسمية، ويصل إلى ملفات الصيدليات وخرائط مواقعها.

---

## المميزات

### مميزات النقابة
- **لوحة التحكم:** نظرة عامة على إحصائيات المنظومة (أدوية، صيدليات، مستخدمون، مخالفات).
- **إدارة الأدوية:** عمليات CRUD كاملة على قاعدة بيانات الأدوية.
- **إدارة الصيدليات:** عرض وإدارة جميع الصيدليات المسجلة.
- **نظام الموافقات:** مراجعة طلبات تسجيل الصيدليات والبت فيها.
- **مراقبة الأسعار:** رصد مخالفات الأسعار عبر الصيدليات وتوثيقها.
- **النشرات الرسمية:** نشر إعلانات وبلاغات موجهة لجميع المستخدمين.

### مميزات الصيدلاني
- **لوحة التحكم:** نظرة سريعة على حالة المخزون والإعلانات.
- **إدارة المخزون:** إضافة وتعديل وحذف الأدوية مع بيانات الأسعار والتوفر.
- **مدير الإعلانات:** إنشاء وإدارة الإعلانات الترويجية للصيدلية.

### مميزات المواطن
- **الصفحة الرئيسية:** واجهة الهبوط مع إمكانية البحث الفوري.
- **البحث عن دواء:** البحث بالاسم واستعراض الصيدليات المتوفر فيها.
- **تفاصيل الدواء:** عرض معلومات الدواء الكاملة مع الأسعار وأماكن التوفر.
- **البحث عن صيدلية:** تصفح الصيدليات والبحث بالاسم أو الموقع.
- **ملف الصيدلية:** عرض تفاصيل الصيدلية وموقعها على خريطة تفاعلية.
- **النشرات الرسمية:** قراءة الإعلانات الصادرة عن نقابة الصيادلة.

---

## معمارية النظام

يتبع النظام نمط **Client-Server Architecture** مع فصل واضح بين المسؤوليات:

| الطبقة | التقنية | الوصف |
|--------|---------|-------|
| **الواجهة الأمامية** | React.js + Tailwind CSS + MUI | عرض واجهة المستخدم والتفاعل مع API |
| **الخادم الخلفي** | Laravel 13 + PHP 8.3 | منطق الأعمال والمصادقة ونقاط الـ API |
| **قاعدة البيانات** | MySQL (TiDB Serverless) | تخزين البيانات: المستخدمون، الأدوية، الصيدليات، المخزون |
| **الخرائط** | Leaflet + React Leaflet | عرض مواقع الصيدليات على خرائط تفاعلية |
| **الرسوم المتحركة** | Framer Motion + GSAP | انتقالات وتأثيرات بصرية سلسة |

*يتم التواصل بين الواجهة والخادم عبر **RESTful APIs** مؤمّنة بـ **Laravel Sanctum**.*

---

<div dir="ltr">

## Project Structure

```
dawai/
├── Backend/          # Laravel 13 API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/Api/
│   │   │       ├── AuthController.php
│   │   │       ├── MedicineController.php
│   │   │       ├── PharmacyController.php
│   │   │       ├── InventoryController.php
│   │   │       ├── PromotionController.php
│   │   │       ├── ViolationController.php
│   │   │       ├── GovernorateController.php
│   │   │       └── UserController.php
│   │   └── Models/
│   │       ├── Medicine.php
│   │       ├── Pharmacy.php
│   │       ├── Inventory.php
│   │       ├── Promotion.php
│   │       ├── Violation.php
│   │       ├── Governorate.php
│   │       └── User.php
│   └── ...
└── Frontend/         # React.js App
    └── src/
        └── pages/
            ├── citizen/        # Citizen pages
            ├── pharmacist/     # Pharmacist pages
            └── syndicate/      # Syndicate pages
```

</div>

---


## لقطات الشاشة

### الصفحة الرئيسية

| الصفحة الرئيسية | لماذا تختار دوائي؟ | كيف يعمل دوائي؟ |
| :---: | :---: | :---: |
| <img src="Screenshots/home-page.png" width="380"/> | <img src="Screenshots/why-choose-dawai.png" width="380"/> | <img src="Screenshots/how-it-works.png" width="380"/> |

### المصادقة

| تسجيل الدخول | تسجيل صيدلية جديدة |
| :---: | :---: |
| <img src="Screenshots/login-page.png" width="380"/> | <img src="Screenshots/sign-up-pharmacy.png" width="380"/> |

### تجربة المواطن

| البحث عن دواء | تفاصيل الدواء |
| :---: | :---: |
| <img src="Screenshots/medicine-page.png" width="380"/> | <img src="Screenshots/details-of-specific-medicine.png" width="380"/> |

| البحث عن صيدلية | ملف الصيدلية |
| :---: | :---: |
| <img src="Screenshots/pharmacy-page.png" width="380"/> | <img src="Screenshots/pharmacy-profile.png" width="380"/> |

### لوحة تحكم الصيدلية

| لوحة تحكم الصيدلية | إدارة المخزون |
| :---: | :---: |
| <img src="Screenshots/dashboard-pharmacy-page.png" width="380"/> | <img src="Screenshots/inventory-page.png" width="380"/> |

### لوحة تحكم النقابة

| لوحة تحكم النقابة | مراقبة الأسعار |
| :---: | :---: | 
| <img src="Screenshots/dashboard-admin-page.png" width="380"/> | <img src="Screenshots/price-monitoring-page.png" width="380"/> |

| طلبات اعتماد الصيدليات | النشرات الرسمية |
| :---: | :---: |
| <img src="Screenshots/requests-page.png" width="380"/> | <img src="Screenshots/official-announcements-page.png" width="380"/> |

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AbdullahAbuZaid04/dawai-gaza.git
cd dawai-gaza
```

### 2. Setup Backend (Laravel)

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Copy the environment file and configure your variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your values:
   ```env
   APP_NAME=Dawai
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=your_db_host
   DB_PORT=3306
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password

   ALLOWED_ORIGINS=http://localhost:3000
   SANCTUM_STATEFUL_DOMAINS=localhost:3000
   ```
4. Generate the application key:
   ```bash
   php artisan key:generate
   ```
5. Run database migrations:
   ```bash
   php artisan migrate
   ```
6. *(Optional)* Seed the database with sample data:
   ```bash
   php artisan db:seed
   ```
7. Start the development server:
   ```bash
   php artisan serve
   ```

### 3. Setup Frontend (React)

1. Navigate to the frontend folder:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and set the API URL:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

---

## توثيق الـ API

التوثيق الكامل لنقاط الـ API متوفر في:
- [`API_JSON_Part1.md`](./API_JSON_Part1.md) — المصادقة، الأدوية، الصيدليات
- [`API_JSON_Part2.md`](./API_JSON_Part2.md) — المخزون، العروض الترويجية، المخالفات، النشرات

---

## التقنيات المستخدمة

| الفئة | التقنية |
|-------|---------|
| إطار الواجهة الأمامية | React.js 19 |
| مكتبة واجهة المستخدم | Material UI (MUI) v7 |
| التنسيق | Tailwind CSS v3 |
| الرسوم المتحركة | Framer Motion, GSAP |
| الخرائط | Leaflet, React-Leaflet |
| طلبات HTTP | Axios |
| إطار الخادم الخلفي | Laravel 13 |
| لغة البرمجة | PHP 8.3 |
| المصادقة | Laravel Sanctum |
| قاعدة البيانات | MySQL (TiDB Serverless) |
| نشر الواجهة | Vercel |
| نشر الخادم | Railway |

---

## المشرف الأكاديمي

تم تطوير هذا المشروع تحت الإشراف والتوجيه من قِبل: **أ.د. حاتم حماد**

---

## فريق العمل

الفريق الذي أنجز هذا المشروع:

| **عبدالله أبوزيد** | **يوسف اللحام** | **هاني الخطيب** | **عبدالله الهنداوي** |
| :---: | :---: | :---: | :---: |
| مطور واجهة أمامية | مطور خادم خلفي | مطور خادم خلفي | مطور قواعد بيانات |

---

<p align="center">
  <sub>طُوِّر بواسطة فريق دوائي — © 2026 جميع الحقوق محفوظة</sub>
</p>

<p align="center">
  <a href="#دوائي">
    <img src="https://img.shields.io/badge/Back%20To%20Top-⬆️-gray?style=flat-square" alt="العودة للأعلى" />
  </a>
</p>

</div>
