# Use Node.js base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Vite project
RUN npm run build

# Use Nginx for serving the built files
FROM nginx:alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3003

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
