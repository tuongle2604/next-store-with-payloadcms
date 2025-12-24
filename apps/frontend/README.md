# Next.js Application

This is a Next.js application with a simple, explicit script setup for development, build, and production.

## Requirements

* Node.js 18+ (recommended)
* npm, pnpm, or yarn

## Installation

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

## Available Scripts

The project defines the following scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --port 8080",
    "build": "next build",
    "start": "next start --port 8080"
  }
}
```

### `dev`

Runs the application in development mode on **[http://localhost:8080](http://localhost:8080)** with hot reloading.

```bash
npm run dev
```

Use this for local development only.

### `build`

Creates an optimized production build in the `.next` directory.

```bash
npm run build
```

This step is required before running the app in production.

### `start`

Starts the production server on **port 8080** using the previously generated build.

```bash
npm run start
```

Make sure `build` has been run before executing this command.

## Port Configuration

Both development and production servers are explicitly configured to use **port 8080**. If the port is already in use, either stop the conflicting process or update the scripts in `package.json`.

## Environment Variables

Create a `.env.local` file at the project root for local environment variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=XXXXXXXXXXXXXX

API_URL=http://localhost:3000
IMAGE_DOMAIN=XXXXXXXXXXXXXX
PAYLOAD_SECRET=XXXXXXXXXXXXXX
```

Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Production Notes

* Always run `npm run build` before `npm run start`.
* For deployments (Docker, VPS, or PaaS), ensure port **8080** is allowed and exposed.
* This setup assumes a single Next.js server process; scale accordingly if needed.

## License

MIT
