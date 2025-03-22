# Use Node.js as base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the Vite project
RUN npm run build

# Use Nginx for production
FROM nginx:alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3003
EXPOSE 3003

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
