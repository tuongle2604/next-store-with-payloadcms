# Run this docker file from the root of the monorepo 

FROM node:22-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm turbo
WORKDIR /app
# RUN corepack enable pnpm
# RUN pnpm add turbo --global
# RUN corepack enable && corepack prepare pnpm@latest --activate && corepack prepare turbo@latest --activate
# Set working directory

# ---
FROM base AS prepare
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN turbo prune @repo/frontend --docker --use-gitignore=false

# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN pnpm install --frozen-lockfile
# Build the project
COPY --from=prepare /app/out/full/ .

RUN pnpm turbo build

# ---
FROM node:22-alpine AS runner
# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
WORKDIR /app
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD node apps/frontend/server.js