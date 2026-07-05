# Dawai — Backend API

**Dawai** is a centralized digital platform designed to bridge the gap between citizens and pharmacies in the Gaza Strip. This is the **Laravel API backend** that powers the platform.

## Tech Stack

- **Framework:** Laravel 13
- **Authentication:** Laravel Sanctum (token-based)
- **Database:** MySQL / SQLite
- **API:** RESTful API

## Setup

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate --seed
php artisan serve
```

## API Endpoints

### Public
- `POST /api/auth/login` — Login
- `POST /api/auth/register` — Register
- `GET /api/governorates` — List governorates
- `GET /api/pharmacies` — List pharmacies
- `GET /api/medicines` — List medicines
- `GET /api/inventory` — List inventory
- `GET /api/promotions` — List promotions

### Authenticated
- `POST /api/logout`
- `GET /api/users/profile`
- `POST /api/inventory` — Add inventory item
- `PUT/PATCH /api/inventory/{id}` — Update inventory
- `DELETE /api/inventory/{id}` — Remove inventory

### Admin
- `POST /api/pharmacies`
- `POST /api/medicines`
- `PATCH /api/medicines/{id}`
- `GET /api/users/pharmacists`
- `GET/PATCH /api/violations`

### Pharmacist
- `GET /api/inventory/low-stock`
- `POST /api/promotions`
- `DELETE /api/promotions/{id}`

Full API documentation is available in `API_JSON_Part1.md` and `API_JSON_Part2.md`.

## Testing

```bash
php artisan test
```
