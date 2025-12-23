# Next.js için Dockerfile
FROM node:20-alpine AS base

# Dependencies yükleme aşaması
FROM base AS deps
WORKDIR /app

# Package dosyalarını kopyala
COPY package.json package-lock.json* ./
RUN npm ci

# Build aşaması
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production aşaması
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public ve .next klasörlerini kopyala
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

