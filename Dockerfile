# Stage 1: Build the Angular application
FROM node:20.11.0 AS build

# Create the application directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built Angular application from the first stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
