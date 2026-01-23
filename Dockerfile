# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src

# Copy package files first for better layer caching
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /usr/src

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Copy built artifacts from builder
COPY --from=builder /usr/src/dist ./dist
COPY --from=builder /usr/src/frontend/build ./frontend/build

CMD ["npm", "start"]