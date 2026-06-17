# Beta Softnet Admin API

Backend API for Beta Softnet admin dashboard.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI`, `JWT_SECRET`, and `PORT`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Seed sample users and data:
   ```bash
   npm run seed
   ```
5. Start the API server:
   ```bash
   npm run dev
   ```

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/jobs`
- `GET /api/contacts`
- `GET /api/content`
- `GET /api/partners`
- `GET /api/employees`
- `GET /api/settings`
- `GET /api/analytics`

> Use Bearer token authentication for protected routes.
