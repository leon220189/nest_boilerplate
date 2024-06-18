# Use the official Node.js 18 image as a base
FROM node:18-alpine as deps
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
# Copy package files
COPY package.json pnpm-lock.yaml ./
# Install dependencies using pnpm
RUN pnpm install

# Use the same Node.js image for the builder stage
FROM node:18-alpine as builder
WORKDIR /app
# Copy the entire project
COPY . .
# Use previously installed dependencies
COPY --from=deps /app/node_modules ./node_modules
# Build the application
RUN pnpm run build && pnpm install --prod --frozen-lockfile

# Setup the runtime container
FROM node:18-alpine as runner
WORKDIR /app
# Create a non-root user and group
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 appuser -G appgroup
# Change ownership to the non-root user
RUN chown -R appuser:appgroup /app
USER appuser
# Copy necessary files from the builder stage
COPY --from=builder --chown=appuser:appgroup /app/package.json ./
COPY --from=builder --chown=appuser:appgroup /app/tsconfig.json ./
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
# Define the command to run the application
CMD ["npm", "run", "start:prod"]
