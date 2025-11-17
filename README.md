# NextStore Monorepo (Frontend + Payload CMS)

This repository is a Turborepo-powered monorepo containing:

- **Frontend** — Next.js App Router storefront based on [`yournextstore`](https://github.com/yournextstore/yournextstore)
- **CMS backend** — Payload CMS for product, media, and content management
- **Shared packages** — Reusable schemas, shared TypeScript utilities, and lint configs

---

## 📁 Project Structure

/
├── apps/
│ ├── frontend/ # Next.js storefront (public site)
│ └── payloadcms/ # Payload CMS backend
├── packages/
│ ├── schemas
│ ├── shared-data
└── turbo.json # Turborepo task pipeline

---

## 🚀 Applications

### `frontend/` — Next.js Storefront

- App Router + Server Components
- Fetches catalog, categories, and media from the Payload CMS API
- Static assets delivered through S3 + CloudFront
- Supports SSR/ISR for product pages
- Uses shared schemas for strong typing between frontend and backend

### `payloadcms/` — Payload CMS Backend

- Manages products, categories, orders, customers, media
- PostgreSQL support (RDS recommended for production)
- Media storage via S3
- Authentication, access control, admin UI out-of-the-box
- Deployable to Elastic Beanstalk

---

## Environment Variables

Frontend (apps/frontend/.env)

```sh
  PAYLOAD_SECRET=XXXXXXXXXXXXXX
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=XXXXXXXXXXXXXX
```

Payloadcms (apps/cms/.env)

```sh
  APP_ENV=development   # or: production

  PAYLOAD_SECRET=XXXXXXXXXXXXXX
  DATABASE_URI=postgres://USER:PASS@HOST:5432/DATABASE
  NEXT_PUBLIC_CLIENT_URL=http://localhost:8080
  NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  # Added by Payload

  SMTP_SERVICE=gmail
  SMTP_USER=XXXXXXXXXXXXXX@gmail.com
  SMTP_PASS=XXXXXXXXXXXXXX
  EMAIL_FROM_NAME=NextStore
  EMAIL_FROM_ADDRESS=XXXXXXXXXXXXXX@gmail.com

  S3_BUCKET=XXXXXXXXXXXXXX
  S3_ENDPOINT=https://<bucket>.s3.<region>.amazonaws.com
  S3_REGION=XXXXXXXXXXXXXX
  S3_ACCESS_KEY_ID=XXXXXXXXXXXXXX
  S3_SECRET_ACCESS_KEY=XXXXXXXXXXXXXX

  STRIPE_SECRET_KEY=XXXXXXXXXXXXXX
  STRIPE_PUBLIC_KEY=XXXXXXXXXXXXXX
```

# APP_ENV

Controls how Payload handles file uploads:

- development:
  Media files are stored locally on the filesystem. This avoids accidental S3 charges and speeds up development.
- production:
  Media files are uploaded to Amazon S3 using the S3 variables below. Use this mode for all hosted deployments.

---

## 🛠 Development

Install dependencies:

```sh
pnpm install
```

Run all apps:

```sh
pnpm dev
```

CMS runs at [`http://localhost:8080`](http://localhost:8080)

Frontend runs at [`http://localhost:3000`](http://localhost:3000)

---

## 🛠 Production

Build all apps:

```sh
pnpm run build
```

Start each app:

```sh
pnpm start
```
