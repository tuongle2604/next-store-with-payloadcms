# NextStore Monorepo (Frontend + Payload CMS)

This repository is a Turborepo-powered monorepo containing:

- **Frontend** — Next.js App Router based on [`yournextstore`](https://github.com/yournextstore/yournextstore)
- **CMS backend** — Payload CMS for product, media, and content management
- **Shared packages** — Reusable schemas, shared data, and lint configs

---

## 📁 Project Structure

```
/
├── apps/
│ ├── frontend/
│ └── payloadcms/
├── packages/
│ ├── schemas
│ ├── shared-data
│ ├── ts-config
└── turbo.json
```

## Environment Variables

Frontend (apps/frontend/.env)

```sh
  NEXT_PUBLIC_BASE_URL=http://localhost:8080
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=XXXXXXXXXXXXXX

  API_URL=http://localhost:3000
  IMAGE_DOMAIN=http://localhost:3000
  PAYLOAD_SECRET=XXXXXXXXXXXXXX
```

Payloadcms (apps/payloadcms/.env)

```sh
APP_ENV=development   # or: production

PAYLOAD_SECRET=XXXXXXXXXXXXXX
DATABASE_URI=postgres://USER:PASS@HOST:5432/DATABASE
NEXT_PUBLIC_CLIENT_URL=http://localhost:8080
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
IMAGE_BASE_URL=http://localhost:3000
# Added by Payload

SMTP_SERVICE=smtp.gmail.com
SMTP_USER=XXXXXXX@gmail.com
SMTP_PASS=XXXXXXXXXXXXXXXXX
EMAIL_FROM_NAME=NextStore
EMAIL_FROM_ADDRESS=XXXXXXX@gmail.com

STRIPE_SECRET_KEY=XXXXXXXXXXXXXX
STRIPE_PUBLIC_KEY=XXXXXXXXXXXXXX

# For production
S3_BUCKET=XXXXXXXXXXXXXX
S3_ENDPOINT=https://<bucket>.s3.<region>.amazonaws.com
S3_REGION=XXXXXXXXXXXXXX
S3_ACCESS_KEY_ID=XXXXXXXXXXXXXX
S3_SECRET_ACCESS_KEY=XXXXXXXXXXXXXX

```

### APP_ENV

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

## 🚀 Deployment (Docker)

Each app inside the apps/ folder is deployed independently using its own Dockerfile.

Build images from the repository root:

Payloadcms

```sh
docker build -t next-store-cms:latest -f apps/payload/Dockerfile .
```

Frontend

```sh
docker build -t next-store-fe:latest -f apps/frontend/Dockerfile .
```
