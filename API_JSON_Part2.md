# Dawai — API Reference with Real JSON Responses

### Part 2: Medicines · Inventory · Promotions · Errors

**Base URL:** `http://localhost:8000/api`
**Auth Header:** `Authorization: Bearer <token>`

---

## 6. MEDICINES

### GET `/medicines` _(optional: `?search=insulin`)_

**Response 200:**

```json
[
  {
    "medicine_id": 2,
    "name_en": "Amoxicillin",
    "name_ar": "أموكسيسيلين",
    "dosage_form": "Capsule",
    "strength": "500 mg",
    "leaflet_uses": "Used for bacterial infections when prescribed.",
    "leaflet_dosage": "Usually taken every 8 hours as prescribed by a doctor.",
    "leaflet_side_effects": "May cause stomach upset, diarrhea, or allergy.",
    "leaflet_contraindications": "Avoid if the patient has penicillin allergy.",
    "is_active": true,
    "created_at": null,
    "updated_at": null
  },
  {
    "medicine_id": 3,
    "name_en": "Salbutamol",
    "name_ar": "سالبوتامول",
    "dosage_form": "Inhaler",
    "strength": "100 mcg",
    "leaflet_uses": "Used to relieve bronchospasm and wheezing.",
    "leaflet_dosage": "Use 1 to 2 puffs when needed as directed.",
    "leaflet_side_effects": "May cause tremor or fast heartbeat.",
    "leaflet_contraindications": "Use carefully in severe heart conditions.",
    "is_active": true,
    "created_at": null,
    "updated_at": null
  },
  {
    "medicine_id": 4,
    "name_en": "Metformin",
    "name_ar": "ميتفورمين",
    "dosage_form": "Tablet",
    "strength": "500 mg",
    "leaflet_uses": "Used to help control blood sugar in type 2 diabetes.",
    "leaflet_dosage": "Usually taken with food once or twice daily.",
    "leaflet_side_effects": "May cause stomach upset or diarrhea.",
    "leaflet_contraindications": "Avoid in severe kidney problems.",
    "is_active": true,
    "created_at": null,
    "updated_at": null
  },
  {
    "medicine_id": 5,
    "name_en": "Human Insulin Regular",
    "name_ar": "أنسولين بشري منتظم",
    "dosage_form": "Injection",
    "strength": "100 IU/ml",
    "leaflet_uses": "Used to control blood sugar.",
    "leaflet_dosage": "Dose depends on the treatment plan from the doctor.",
    "leaflet_side_effects": "May cause low blood sugar.",
    "leaflet_contraindications": "Use carefully and monitor glucose regularly.",
    "is_active": true,
    "created_at": null,
    "updated_at": null
  }
]
```

> With `?search=insulin` only matching medicines are returned.

---

### GET `/medicines/dosage-forms`

**Response 200:**

```json
["Capsule", "Inhaler", "Injection", "Tablet"]
```

---

### GET `/medicines/{id}`

**Response 200:**

```json
{
  "medicine_id": 2,
  "name_en": "Amoxicillin",
  "name_ar": "أموكسيسيلين",
  "dosage_form": "Capsule",
  "strength": "500 mg",
  "leaflet_uses": "Used for bacterial infections when prescribed.",
  "leaflet_dosage": "Usually taken every 8 hours as prescribed by a doctor.",
  "leaflet_side_effects": "May cause stomach upset, diarrhea, or allergy.",
  "leaflet_contraindications": "Avoid if the patient has penicillin allergy.",
  "is_active": true,
  "availability": [
    {
      "inventory_id": 3,
      "quantity": 25,
      "price_ils": 18,
      "expiry_date": "2026-10-10",
      "stock_status": "Low Stock",
      "pharmacy": {
        "id": 3,
        "name_ar": "نقطة صيدلية شهداء الأقصى",
        "name_en": "Al-Aqsa Pharmacy Point",
        "location": "دير البلح - Deir al-Balah"
      }
    }
  ]
}
```

---

### POST `/medicines` 👑

**Body:**

```json
{
  "name_en": "Ibuprofen",
  "name_ar": "إيبوبروفين",
  "dosage_form": "Tablet",
  "strength": "400 mg",
  "leaflet_uses": "Used for pain and fever.",
  "leaflet_dosage": "1 tablet every 8 hours with food.",
  "leaflet_side_effects": "May cause stomach upset.",
  "leaflet_contraindications": "Avoid in kidney disease."
}
```

**Response 201:**

```json
{
  "medicine_id": 6,
  "name_en": "Ibuprofen",
  "name_ar": "إيبوبروفين",
  "dosage_form": "Tablet",
  "strength": "400 mg",
  "leaflet_uses": "Used for pain and fever.",
  "leaflet_dosage": "1 tablet every 8 hours with food.",
  "leaflet_side_effects": "May cause stomach upset.",
  "leaflet_contraindications": "Avoid in kidney disease.",
  "is_active": true,
  "created_at": "2026-05-11T09:00:00.000000Z",
  "updated_at": "2026-05-11T09:00:00.000000Z"
}
```

---

### PATCH `/medicines/{id}` 👑

**Body (all fields optional):**

```json
{ "is_active": false }
```

**Response 200:**

```json
{
  "message": "Medicine updated successfully.",
  "medicine": {
    "medicine_id": 1,
    "name_en": "Paracetamol",
    "name_ar": "باراسيتامول",
    "dosage_form": "Tablet",
    "strength": "500 mg",
    "leaflet_uses": "Used for fever and mild to moderate pain.",
    "leaflet_dosage": "Adults: 1 tablet every 6 to 8 hours when needed.",
    "leaflet_side_effects": "May cause nausea or rash in some cases.",
    "leaflet_contraindications": "Use carefully in liver disease.",
    "is_active": false,
    "created_at": null,
    "updated_at": "2026-05-11T08:29:17.000000Z"
  }
}
```

---

## 7. INVENTORY

### GET `/inventory/search?medicine_id=4`

**Response 200:**

```json
[
  {
    "inventory_id": 2,
    "quantity": 40,
    "price_ils": 12,
    "expiry_date": "2026-11-20",
    "stock_status": "Low Stock",
    "pharmacy": {
      "id": 2,
      "name_ar": "صيدلية مجمع ناصر الطبي",
      "name_en": "Nasser Medical Pharmacy",
      "location": "خانيونس - Khan Younis",
      "lat": 31.3447,
      "lng": 34.3033
    },
    "medicine": {
      "id": 4,
      "name_ar": "ميتفورمين",
      "name_en": "Metformin",
      "dosage_form": "Tablet",
      "strength": "500 mg"
    }
  }
]
```

---

### GET `/inventory/low-stock` 🛡️

**Response 200 (Admin — sees all):**

```json
{
  "count": 3,
  "items": [
    {
      "inventory_id": 2,
      "quantity": 40,
      "price_ils": 12,
      "expiry_date": "2026-11-20",
      "stock_status": "Low Stock",
      "last_updated": "2026-05-10 11:28:57",
      "pharmacy": {
        "id": 2,
        "name_ar": "صيدلية مجمع ناصر الطبي",
        "name_en": "Nasser Medical Pharmacy"
      },
      "medicine": {
        "id": 4,
        "name_ar": "ميتفورمين",
        "name_en": "Metformin",
        "dosage_form": "Tablet",
        "strength": "500 mg"
      }
    },
    {
      "inventory_id": 3,
      "quantity": 25,
      "price_ils": 18,
      "expiry_date": "2026-10-10",
      "stock_status": "Low Stock",
      "last_updated": "2026-05-10 11:28:57",
      "pharmacy": {
        "id": 3,
        "name_ar": "نقطة صيدلية شهداء الأقصى",
        "name_en": "Al-Aqsa Pharmacy Point"
      },
      "medicine": {
        "id": 2,
        "name_ar": "أموكسيسيلين",
        "name_en": "Amoxicillin",
        "dosage_form": "Capsule",
        "strength": "500 mg"
      }
    },
    {
      "inventory_id": 5,
      "quantity": 10,
      "price_ils": 35,
      "expiry_date": "2026-09-01",
      "stock_status": "Low Stock",
      "last_updated": "2026-05-10 11:28:57",
      "pharmacy": {
        "id": 5,
        "name_ar": "نقطة صيدلية المستشفى الميداني للجنة الدولية للصليب الأحمر",
        "name_en": "ICRC Field Hospital Pharmacy Point"
      },
      "medicine": {
        "id": 5,
        "name_ar": "أنسولين بشري منتظم",
        "name_en": "Human Insulin Regular",
        "dosage_form": "Injection",
        "strength": "100 IU/ml"
      }
    }
  ]
}
```

> **Pharmacist** sees only their own pharmacy's low stock (`count` and `items` scoped).

---

### POST `/inventory` 🛡️

**Body:**

```json
{
  "pharmacy_id": 2,
  "medicine_id": 3,
  "quantity": 50,
  "price_ils": 15.0,
  "expiry_date": "2027-06-01"
}
```

> `stock_status` is optional — auto-derived: `0` → `Out of Stock` | `1–10` → `Low Stock` | `>10` → `In Stock`

**Response 201:**

```json
{
  "inventory_id": 6,
  "pharmacy_id": 2,
  "medicine_id": 3,
  "quantity": 50,
  "price_ils": "15.00",
  "expiry_date": "2027-06-01",
  "stock_status": "In Stock",
  "medicine": {
    "medicine_id": 3,
    "name_en": "Salbutamol",
    "name_ar": "سالبوتامول",
    "dosage_form": "Inhaler",
    "strength": "100 mcg"
  },
  "pharmacy": {
    "pharmacy_id": 2,
    "pharmacy_name_en": "Nasser Medical Pharmacy",
    "pharmacy_name_ar": "صيدلية مجمع ناصر الطبي"
  }
}
```

---

### PUT `/inventory/{id}` 🛡️

**Body (all fields optional):**

```json
{
  "quantity": 200,
  "price_ils": 7.5
}
```

**Response 200:**

```json
{
  "message": "Inventory updated successfully.",
  "inventory": {
    "inventory_id": 1,
    "pharmacy_id": 2,
    "medicine_id": 1,
    "quantity": 200,
    "price_ils": "7.50",
    "expiry_date": "2027-01-15T00:00:00.000000Z",
    "stock_status": "In Stock",
    "last_updated": "2026-05-10 11:28:57",
    "medicine": {
      "medicine_id": 1,
      "name_en": "Paracetamol",
      "name_ar": "باراسيتامول",
      "dosage_form": "Tablet",
      "strength": "500 mg",
      "is_active": true
    }
  }
}
```

---

### DELETE `/inventory/{id}` 🛡️

**Response 200:**

```json
{ "message": "Medicine removed from pharmacy inventory." }
```

---

## 8. PROMOTIONS

### GET `/promotions`

**Response 200:**

```json
[
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
  },
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
```

---

### POST `/promotions` 🛡️

**Body:**

```json
{
  "pharmacy_id": 2,
  "center_id": null,
  "title": "Summer Campaign",
  "description": "Free blood pressure checks.",
  "image_url": "https://example.com/img.jpg",
  "start_date": "2026-06-01",
  "end_date": "2026-08-31"
}
```

**Response 201:** Full promotion object (same shape as `GET /promotions` items).

---

### DELETE `/promotions/{id}` 🛡️

**Response 200:**

```json
{ "message": "Promotion deactivated successfully." }
```

---

## ⚠️ ERROR RESPONSES

### 401 — Unauthenticated

```json
{ "message": "Unauthenticated." }
```

### 403 — Wrong Role

```json
{ "message": "Unauthorized. Required role: Admin" }
```

### 403 — Pharmacist accessing another pharmacy

```json
{ "message": "Pharmacists may only manage their own pharmacy inventory." }
```

### 404 — Not Found

```json
{ "message": "Pharmacy not found." }
```

### 422 — Validation Failed

```json
{
  "message": "The email field must be a valid email address.",
  "errors": {
    "email": ["The email field must be a valid email address."]
  }
}
```

### 422 — Duplicate inventory entry

```json
{
  "message": "This medicine already exists in this pharmacy's inventory. Use PUT /api/inventory/{id} to update it."
}
```

---

## 🧪 TEST CREDENTIALS

| Email                   | Password   | Role       | Pharmacy               |
| ----------------------- | ---------- | ---------- | ---------------------- |
| `admin@dawai.ps`        | `admin123` | Admin      | —                      |
| `ahmed.khaled@dawai.ps` | `pharm123` | Pharmacist | Nasser Medical (ID: 2) |
| `mona.sami@dawai.ps`    | `pharm123` | Pharmacist | Al-Aqsa (ID: 3)        |
| `yousef.adel@mail.ps`   | `user123`  | Citizen    | —                      |
| `sara.nabil@mail.ps`    | `user123`  | Citizen    | —                      |

---

## 🔑 ROLE LEGEND

| Symbol   | Who                                |
| -------- | ---------------------------------- |
| _(none)_ | 🌐 Public — no token needed        |
| 🔒       | Any logged-in user                 |
| 🛡️       | Pharmacist (own pharmacy) or Admin |
| 👑       | Admin only                         |
