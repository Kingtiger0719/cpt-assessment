# Stage 1: Build React frontend
FROM node:18-alpine AS client-builder
WORKDIR /client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ .
RUN npm run build  # Outputs to /app/client/build

# Stage 2: Build backend + serve frontend
FROM node:18-alpine
WORKDIR /

# Copy backend dependencies
COPY .env package.json package-lock.json ./
RUN npm install

# Copy Prisma files
COPY prisma ./prisma
RUN npx prisma generate

# Copy built React app from Stage 1
COPY --from=client-builder client/build ./client/build

# Copy backend source code
COPY src ./src
COPY tsconfig.json nodemon.json ./

# Expose port (adjust if needed)
EXPOSE 5000

# Start the app (ensure your backend serves the React build)
CMD sh -c "npm run seed && npm run dev"