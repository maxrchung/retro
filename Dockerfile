# Referenced from: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# But did not do a multi-stage build to have an easier time working with yarn workspaces

FROM node:17.3.0-alpine3.15 AS builder

WORKDIR /app
COPY . /app

WORKDIR /app/frontend
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM node:17.3.0-alpine3.15 AS runner

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/frontend/next.config.js ./
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 5001
ENV PORT 5001

CMD ["node", "frontend/server.js"]