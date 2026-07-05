# Dawai — API Reference with Real JSON Responses

### Part 1: Auth · Users · Governorates · Health Centers · Pharmacies

**Base URL:** `http://localhost:8000/api`
**Auth Header:** `Authorization: Bearer <token>`

---

## 1. AUTH

### POST `/auth/login`

**Body:** `{ "email": "admin@dawai.ps", "password": "admin123" }`

```json
{
  "access_token": "1|abc...",
  "token_type": "Bearer",
  "user": {
    "user_id": 1,
    "full_name": "System Admin",
    "email": "admin@dawai.ps",
    "role": "Admin",
    "phone": "+970590000001",
    "pharmacy_id": null
  }
}
```

> `role` is one of: `Admin` | `Pharmacist` | `Citizen`

---

### POST `/auth/register`

**Body:**

```json
{
  "full_name": "Frontend Test",
  "email": "frontend.test@mail.ps",
  "password": "pass1234",
  "password_confirmation": "pass1234",
  "phone": "+970599111222"
}
```

**Response 201:**

```json
{
  "access_token": "16|3L7...",
  "token_type": "Bearer",
  "user": {
    "user_id": 7,
    "full_name": "Frontend Test",
    "email": "frontend.test@mail.ps",
    "role": "Citizen",
    "phone": "+970599111222"
  }
}
```

---

### POST `/logout` 🔒

**Response 200:**

```json
{ "message": "تم تسجيل الخروج بنجاح" }
```

---

## 2. USERS

### GET `/users/profile` 🔒

**Response 200:**

```json
{
  "user_id": 1,
  "full_name": "System Admin",
  "email": "admin@dawai.ps",
  "role": "Admin",
  "phone": "+970590000001",
  "is_active": true,
  "pharmacy": null,
  "created_at": null
}
```

> For a Pharmacist, `pharmacy` will be a full pharmacy object.

---

### PUT `/users/{id}` 🔒

**Body:** `{ "full_name": "New Name", "phone": "+970599000000" }`
**Response 200:**

```json
{
  "message": "Profile updated successfully.",
  "user": {
    "user_id": 1,
    "pharmacy_id": null,
    "full_name": "System Admin",
    "email": "admin@dawai.ps",
    "role": "Admin",
    "phone": "+970590000001",
    "is_active": true,
    "created_at": null,
    "updated_at": "2026-05-11T08:25:53.000000Z"
  }
}
```

---

### GET `/users/pharmacists` 👑

**Response 200:**

```json
[
  {
    "user_id": 2,
    "full_name": "Ahmed Khaled",
    "email": "ahmed.khaled@dawai.ps",
    "phone": "+970590000002",
    "is_active": true,
    "pharmacy_id": 2,
    "pharmacy": {
      "id": 2,
      "name_ar": "صيدلية مجمع ناصر الطبي",
      "name_en": "Nasser Medical Pharmacy"
    }
  },
  {
    "user_id": 3,
    "full_name": "Mona Sami",
    "email": "mona.sami@dawai.ps",
    "phone": "+970590000003",
    "is_active": true,
    "pharmacy_id": 3,
    "pharmacy": {
      "id": 3,
      "name_ar": "نقطة صيدلية شهداء الأقصى",
      "name_en": "Al-Aqsa Pharmacy Point"
    }
  }
]
```

---

### PATCH `/users/{id}/status` 👑

**Body:** `{ "is_active": false }`
**Response 200:**

```json
{
  "message": "User suspended.",
  "user_id": 4,
  "is_active": false
}
```

> Set `"is_active": true` to reactivate. `message` changes to `"User reactivated."`

---

## 3. GOVERNORATES

### GET `/governorates`

**Response 200:**

```json
[
  {
    "governorate_id": 1,
    "name_en": "North Gaza",
    "name_ar": "شمال غزة",
    "main_city": "Jabalia"
  },
  {
    "governorate_id": 2,
    "name_en": "Gaza",
    "name_ar": "غزة",
    "main_city": "Gaza City"
  },
  {
    "governorate_id": 3,
    "name_en": "Deir al-Balah",
    "name_ar": "دير البلح",
    "main_city": "Deir al-Balah"
  },
  {
    "governorate_id": 4,
    "name_en": "Khan Younis",
    "name_ar": "خانيونس",
    "main_city": "Khan Younis"
  },
  {
    "governorate_id": 5,
    "name_en": "Rafah",
    "name_ar": "رفح",
    "main_city": "Rafah"
  }
]
```

---

### GET `/governorates/{id}/pharmacies`

**Response 200:**

```json
{
  "governorate": {
    "governorate_id": 2,
    "name_en": "Gaza",
    "name_ar": "غزة",
    "main_city": "Gaza City"
  },
  "pharmacies": [
    {
      "id": 1,
      "name": "نقطة صيدلية الشفاء",
      "name_en": "Al-Shifa Pharmacy Point",
      "location": "غزة - Gaza City",
      "lat": 31.5223,
      "lng": 34.4431,
      "address_note": "Near Al-Shifa medical area",
      "medicines": [
        {
          "id": 4,
          "medicine_id": 3,
          "nameAr": "سالبوتامول",
          "nameEn": "Salbutamol",
          "price": 22,
          "stock_status": "In Stock"
        }
      ]
    }
  ]
}
```

---

### GET `/governorates/{id}/centers`

**Response 200:**

```json
{
  "governorate": {
    "governorate_id": 2,
    "name_en": "Gaza",
    "name_ar": "غزة",
    "main_city": "Gaza City"
  },
  "centers": [
    {
      "id": 1,
      "name_en": "Pharmacists Syndicate Health Center - Gaza",
      "name_ar": "المركز الصحي لنقابة الصيادلة - غزة",
      "area_name": "Gaza City",
      "address_note": "Syndicate services point in Gaza governorate",
      "phone": "+970599100001",
      "image_url": "",
      "description": "Syndicate health center seed record for awareness, consultation, and medicine guidance services.",
      "governorate": {
        "governorate_id": 2,
        "name_en": "Gaza",
        "name_ar": "غزة",
        "main_city": "Gaza City"
      }
    }
  ]
}
```

---

## 4. HEALTH CENTERS

### GET `/centers`

**Response 200:** _(array of all active centers)_

```json
[
  {
    "id": 1,
    "name_en": "Pharmacists Syndicate Health Center - Gaza",
    "name_ar": "المركز الصحي لنقابة الصيادلة - غزة",
    "area_name": "Gaza City",
    "address_note": "Syndicate services point in Gaza governorate",
    "phone": "+970599100001",
    "image_url": "",
    "description": "Syndicate health center seed record for awareness.",
    "governorate": {
      "governorate_id": 2,
      "name_en": "Gaza",
      "name_ar": "غزة",
      "main_city": "Gaza City"
    }
  },
  {
    "id": 2,
    "name_en": "Pharmacists Syndicate Health Center - Khan Younis",
    "name_ar": "المركز الصحي لنقابة الصيادلة - خانيونس",
    "area_name": "Khan Younis",
    "address_note": "Syndicate services point in Khan Younis",
    "phone": "+970599100002",
    "image_url": "https://example.com/images/center-khan-younis.jpg",
    "description": "Seed record for chronic medication counseling.",
    "governorate": {
      "governorate_id": 4,
      "name_en": "Khan Younis",
      "name_ar": "خانيونس",
      "main_city": "Khan Younis"
    }
  },
  {
    "id": 3,
    "name_en": "Pharmacists Syndicate Health Unit - Deir al-Balah",
    "name_ar": "الوحدة الصحية لنقابة الصيادلة - دير البلح",
    "area_name": "Deir al-Balah",
    "address_note": "Syndicate services point in Deir al-Balah",
    "phone": "+970599100003",
    "image_url": "https://example.com/images/center-deir-al-balah.jpg",
    "description": "Seed record for education, counseling, and medicine-use awareness.",
    "governorate": {
      "governorate_id": 3,
      "name_en": "Deir al-Balah",
      "name_ar": "دير البلح",
      "main_city": "Deir al-Balah"
    }
  }
]
```

---

### GET `/centers/{id}/promotions`

**Response 200:**

```json
{
  "center_id": 1,
  "promotions": [
    {
      "id": 3,
      "title": "Syndicate Awareness Campaign",
      "description": "Awareness campaign about safe medicine use and storage.",
      "image_url": "https://example.com/images/promo-awareness-center.jpg",
      "start_date": "2026-04-05",
      "end_date": "2026-06-15",
      "is_active": true,
      "pharmacy_id": null,
      "center_id": 1,
      "pharmacy": null,
      "health_center": {
        "id": 1,
        "name_ar": "المركز الصحي لنقابة الصيادلة - غزة",
        "name_en": "Pharmacists Syndicate Health Center - Gaza"
      }
    }
  ]
}
```

---

## 5. PHARMACIES

### GET `/pharmacies` _(optional: `?gov_id=4`)_

**Response 200:**

```json
[
  {
    "id": 1,
    "name": "نقطة صيدلية الشفاء",
    "name_en": "Al-Shifa Pharmacy Point",
    "location": "غزة - Gaza City",
    "lat": 31.5223,
    "lng": 34.4431,
    "address_note": "Near Al-Shifa medical area",
    "governorate": {
      "governorate_id": 2,
      "name_en": "Gaza",
      "name_ar": "غزة",
      "main_city": "Gaza City"
    },
    "medicines": [
      {
        "id": 4,
        "medicine_id": 3,
        "nameAr": "سالبوتامول",
        "nameEn": "Salbutamol",
        "dosage_form": "Inhaler",
        "strength": "100 mcg",
        "price": 22,
        "available": true,
        "stock_status": "In Stock",
        "expiry_date": "2027-03-01"
      }
    ]
  },
  {
    "id": 2,
    "name": "صيدلية مجمع ناصر الطبي",
    "name_en": "Nasser Medical Pharmacy",
    "location": "خانيونس - Khan Younis",
    "lat": 31.3447,
    "lng": 34.3033,
    "address_note": "Inside Nasser medical complex",
    "governorate": {
      "governorate_id": 4,
      "name_en": "Khan Younis",
      "name_ar": "خانيونس",
      "main_city": "Khan Younis"
    },
    "medicines": [
      {
        "id": 1,
        "medicine_id": 1,
        "nameAr": "باراسيتامول",
        "nameEn": "Paracetamol",
        "dosage_form": "Tablet",
        "strength": "500 mg",
        "price": 7.5,
        "available": true,
        "stock_status": "In Stock",
        "expiry_date": "2027-01-15"
      },
      {
        "id": 2,
        "medicine_id": 4,
        "nameAr": "ميتفورمين",
        "nameEn": "Metformin",
        "dosage_form": "Tablet",
        "strength": "500 mg",
        "price": 12,
        "available": true,
        "stock_status": "Low Stock",
        "expiry_date": "2026-11-20"
      }
    ]
  }
]
```

> Use `?gov_id=4` to filter — returns same shape but scoped to that governorate only.

---

### GET `/pharmacies/{id}`

**Response 200:**

```json
{
  "id": 2,
  "name": "صيدلية مجمع ناصر الطبي",
  "name_en": "Nasser Medical Pharmacy",
  "location": "خانيونس - Khan Younis",
  "lat": 31.3447,
  "lng": 34.3033,
  "address_note": "Inside Nasser medical complex",
  "governorate": {
    "governorate_id": 4,
    "name_en": "Khan Younis",
    "name_ar": "خانيونس",
    "main_city": "Khan Younis"
  },
  "medicines": [
    {
      "id": 1,
      "medicine_id": 1,
      "nameAr": "باراسيتامول",
      "nameEn": "Paracetamol",
      "dosage_form": "Tablet",
      "strength": "500 mg",
      "price": 7.5,
      "available": true,
      "stock_status": "In Stock",
      "expiry_date": "2027-01-15"
    }
  ],
  "offers": [
    {
      "id": 1,
      "title": "Diabetes Follow-up Support",
      "description": "Free medicine timing guidance for diabetes patients at the pharmacy.",
      "image": "https://example.com/images/promo-diabetes-pharmacy.jpg",
      "start_date": "2026-04-01",
      "end_date": "2026-06-30",
      "is_active": true
    }
  ]
}
```

---

### POST `/pharmacies` 👑

**Body:**

```json
{
  "governorate_id": 1,
  "pharmacy_name_en": "New Pharmacy",
  "pharmacy_name_ar": "صيدلية جديدة",
  "area_name": "Jabalia",
  "address_note": "Near the school",
  "latitude": 31.53,
  "longitude": 34.49
}
```

**Response 201:**

```json
{
  "governorate_id": 1,
  "pharmacy_name_en": "New Pharmacy",
  "pharmacy_name_ar": "صيدلية جديدة",
  "area_name": "Jabalia",
  "address_note": "Near the school",
  "latitude": 31.53,
  "longitude": 34.49,
  "pharmacy_id": 7,
  "created_at": "2026-05-11T09:00:00.000000Z",
  "updated_at": "2026-05-11T09:00:00.000000Z",
  "governorate": {
    "governorate_id": 1,
    "name_en": "North Gaza",
    "name_ar": "شمال غزة",
    "main_city": "Jabalia"
  }
}
```

---

### GET `/pharmacies/{id}/inventory`

**Response 200:**

```json
{
  "pharmacy_id": 2,
  "inventory": [
    {
      "inventory_id": 1,
      "quantity": 200,
      "price_ils": 7.5,
      "expiry_date": "2027-01-15",
      "stock_status": "In Stock",
      "last_updated": "2026-05-10 11:28:57",
      "medicine": {
        "id": 1,
        "name_ar": "باراسيتامول",
        "name_en": "Paracetamol",
        "dosage_form": "Tablet",
        "strength": "500 mg"
      }
    },
    {
      "inventory_id": 2,
      "quantity": 40,
      "price_ils": 12,
      "expiry_date": "2026-11-20",
      "stock_status": "Low Stock",
      "last_updated": "2026-05-10 11:28:57",
      "medicine": {
        "id": 4,
        "name_ar": "ميتفورمين",
        "name_en": "Metformin",
        "dosage_form": "Tablet",
        "strength": "500 mg"
      }
    }
  ]
}
```

---

### GET `/pharmacies/{id}/promotions`

**Response 200:**

```json
{
  "pharmacy_id": 2,
  "promotions": [
    {
      "id": 1,
      "title": "Diabetes Follow-up Support",
      "description": "Free medicine timing guidance for diabetes patients at the pharmacy.",
      "image_url": "https://example.com/images/promo-diabetes-pharmacy.jpg",
      "start_date": "2026-04-01",
      "end_date": "2026-06-30",
      "is_active": true,
      "pharmacy_id": 2,
      "center_id": null,
      "pharmacy": {
        "id": 2,
        "name_ar": "صيدلية مجمع ناصر الطبي",
        "name_en": "Nasser Medical Pharmacy"
      },
      "health_center": null
    }
  ]
}
```
