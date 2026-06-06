# DIMONDTOX - Production Ready Gaming Reward Platform

DIMONDTOX is a full-stack Next.js 15 gaming rewards starter with a premium esports UI, rewarded-ad flow, referral rewards, task milestones, withdrawals, audit logging, Prisma/PostgreSQL models, Docker support and admin dashboard screens.

> Important: only connect real Free Fire/game rewards after you confirm publisher permission, ad-network policies and local legal compliance. The app stores reward requests; it does not bypass or automate any game publisher system.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS, Framer Motion, Lucide icons
- Prisma ORM with PostgreSQL
- JWT helper utilities and secure HTTP headers
- Docker Compose for PostgreSQL, Redis and web
- Ready placeholders for Google OAuth, Cloudinary, AdMob, Monetag, Adsterra and custom ad code

## Quick start

```bash
cp .env.example .env
npm install
docker compose up -d db redis
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Open `http://localhost:3000`.

## Main routes

- `/` - premium landing page
- `/login` - user login/register UI with OAuth placeholder
- `/dashboard` - user dashboard for diamonds, ads, referrals, profile and tasks
- `/admin` - admin command center for users, withdrawals and ad management

## API routes

- `POST /api/auth/register` - creates users, validates referral code and issues JWT
- `GET /api/profile` - returns authenticated user profile
- `PUT /api/profile` - updates profile fields
- `POST /api/ads/complete` - rewards only after a completion token is supplied; production deployments should verify this with the ad network callback
- `POST /api/withdrawals` - creates withdrawal requests at 100 diamonds
- `GET /api/admin/stats` - returns admin dashboard metrics

## Database tables

The Prisma schema includes `admins`, `users`, `referrals`, `withdrawals`, `rewards`, `tasks`, `ads`, `notifications`, `activity_logs` and `transactions`-equivalent models.

## Production notes

1. Replace all `.env` secrets before deployment.
2. Configure Google OAuth credentials in your provider dashboard.
3. Connect Cloudinary signed uploads from a server route before accepting image uploads.
4. Verify rewarded video completion server-side with your ad provider before crediting rewards.
5. Keep withdrawal fulfillment manual or integrate only with approved publisher/top-up APIs.
6. Add a persistent Redis-backed rate limiter for multi-instance deployments.
