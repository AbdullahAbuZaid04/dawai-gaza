# دوائي (Dawai)

A centralized digital platform bridging citizens, pharmacies, and the Pharmacists' Syndicate in the Gaza Strip. Citizens can locate medications, verify prices, and check availability; pharmacists manage digital inventory; the syndicate maintains oversight.

## Architecture

```
/dawai/
├── Backend/          # Laravel 13 API
│   ├── app/
│   │   ├── Http/Controllers/Api/   # Controllers (auth, pharmacy, medicine, …)
│   │   └── Models/                 # Eloquent models
│   ├── routes/api.php              # API route definitions
│   ├── database/migrations/        # Schema migrations
│   └── database/seeders/           # Seeders (HubSeeder, ViolationSeeder)
└── Frontend/         # React 19 SPA
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page-level components
    │   ├── context/      # React Context (Auth, Data)
    │   └── config/       # API base URL config
    └── public/
```

## Tech Stack

| Tier      | Technology                                      |
|-----------|-------------------------------------------------|
| Backend   | Laravel 13, PHP 8.2+, Sanctum, MySQL            |
| Frontend  | React 19, Tailwind CSS 3, MUI 7, GSAP           |
| API       | RESTful JSON (Axios)                            |

## Test Credentials

> **⚠️ WARNING:** Change these credentials immediately in production!

| Role        | Email                          | Password    |
|-------------|--------------------------------|-------------|
| Admin       | admin@dawai.ps                 | admin123    |
| Pharmacist  | ahmed.khaled@dawai.ps          | pharm123    |
| Pharmacist  | mona.sami@dawai.ps             | pharm123    |
| Pharmacist  | hassan.shifa@dawai.ps          | pharm123    |
| Pharmacist  | laila.awda@dawai.ps            | pharm123    |
| Pharmacist  | omar.icrc@dawai.ps             | pharm123    |

## Local Setup

### Prerequisites
- PHP 8.2+, Composer, Node.js (LTS), MySQL

### Backend
```bash
cd Backend
cp .env.example .env          # edit DB credentials
composer install
php artisan key:generate
php artisan storage:link
php artisan migrate --seed
php artisan serve              # http://localhost:8000
```

### Frontend
```bash
cd Frontend
npm install
cp .env.production .env        # or create .env.local with REACT_APP_API_URL
npm start                      # http://localhost:3000
```

## Deployment

### Option A: Vercel (Frontend) + Shared Hosting (Backend)

**Frontend → Vercel (free)**
1. Push to GitHub
2. Import repo in Vercel
3. Set `Root Directory` → `Frontend`
4. Add env variable `REACT_APP_API_URL` → your backend URL
5. Deploy (auto-builds on push)

**Backend → Hostinger / cPanel ($3–10/mo)**
1. Upload `Backend/` contents to server
2. Create MySQL database and user
3. Copy `.env.example` to `.env`, edit:
   - `APP_ENV=production`, `APP_DEBUG=false`
   - `DB_CONNECTION=mysql`, fill in DB credentials
   - `APP_URL=https://your-domain.com`
   - `SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app`
4. Run `php artisan key:generate`
5. Run `php artisan migrate --seed`
6. Point your domain to `Backend/public/`

### Option B: Render.com (both, free tier)
1. Create **Web Service** → point to `Backend/` → start command `php artisan serve --host=0.0.0.0 --port=10000`
2. Create **Static Site** → point to `Frontend/` → build command `npm run build` → publish dir `build`
3. Add env vars in Render dashboard

### Environment Variables

| Variable                  | Required | Default                    | Description              |
|---------------------------|----------|----------------------------|--------------------------|
| `REACT_APP_API_URL`       | Frontend | `http://localhost:8000/api`| Backend API base URL     |
| `APP_ENV`                 | Backend  | `production`               | App environment          |
| `APP_DEBUG`               | Backend  | `false`                    | Debug mode (always false in prod) |
| `DB_CONNECTION`           | Backend  | `mysql`                    | Database driver          |
| `SANCTUM_STATEFUL_DOMAINS`| Backend  | —                          | Frontend domain for SPA auth |
| `ALLOWED_ORIGINS`         | Backend  | `http://localhost:3000`     | CORS allowed origins     |

## API Endpoints

| Method | Endpoint                              | Auth         | Description              |
|--------|---------------------------------------|--------------|--------------------------|
| POST   | `/api/auth/login`                     | Public       | Login (throttled)        |
| POST   | `/api/auth/register`                  | Public       | Register (throttled)     |
| GET    | `/api/pharmacies`                     | Public       | List pharmacies          |
| GET    | `/api/medicines`                      | Public       | Search medicines         |
| GET    | `/api/inventory`                      | Public       | All inventory            |
| GET    | `/api/promotions`                     | Public       | All promotions           |
| POST   | `/api/logout`                         | Sanctum      | Logout                   |
| GET    | `/api/users/profile`                  | Sanctum      | User profile             |
| POST   | `/api/pharmacies/{id}/inventory`      | Pharm/Admin  | Add inventory item       |
| POST   | `/api/promotions`                     | Pharm/Admin  | Create promotion         |
| PATCH  | `/api/violations/{id}/status`         | Admin        | Update violation status  |

## License

MIT — see [LICENSE](LICENSE)
