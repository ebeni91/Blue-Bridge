# --- Stage 1: Install dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm install

COPY package.json package-lock.json* ./
# Increase timeouts to 10 minutes, retry 5 times, and use a more stable registry
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm install --no-audit --no-fund


# --- Stage 2: Build the application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Tell Next.js to build in production mode
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# --- Stage 3: Production Server ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# SECURITY: Create a non-root user for Node
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the compiled output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Start the Next.js standalone server
CMD ["node", "server.js"]