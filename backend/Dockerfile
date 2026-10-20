# Build stage
FROM node:20-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy backend code (includes schema.prisma used by Prisma)
COPY backend/ ./backend/

# Generate Prisma Client
WORKDIR /app/backend
RUN npx prisma generate

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>&1 || wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "server.js"]
