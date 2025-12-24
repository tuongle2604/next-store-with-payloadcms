# Run this docker file from the root of the monorepo 

FROM node:22-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm turbo
WORKDIR /app

# ---
FROM base AS prepare
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN turbo prune @repo/cms --docker --use-gitignore=false

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
COPY --from=builder --chown=nextjs:nodejs /app/apps/payloadcms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/payloadcms/.next/static ./apps/payloadcms/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/payloadcms/public ./apps/payloadcms/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/payloadcms/certs ./apps/payloadcms/certs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD node apps/payloadcms/server.js