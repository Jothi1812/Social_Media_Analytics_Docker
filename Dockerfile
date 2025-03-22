# Use Node.js for building the app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY SocialInsight/package.json SocialInsight/package-lock.json ./
RUN npm install

# Copy the entire project into the container
COPY SocialInsight ./

# Build the project
RUN npm run build

# Use Nginx for serving static files
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf ./*

# Copy built files from builder stage
COPY --from=builder /app/dist ./

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
