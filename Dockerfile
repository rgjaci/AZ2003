# Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

# Build the Next.js application
RUN npm run build

# Run the application
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

# Expose the port your Next.js app runs on (default is 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
