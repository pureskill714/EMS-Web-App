# Stage 1: Build the Angular app
FROM node:20.11.0 AS build
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean --force
RUN npm install -g npm && npm update && npm install
COPY . /usr/src/app
RUN npm run build -- --prod

# Stage 2: Serve the Angular app
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/webapp /usr/share/nginx/html

# Expose the port your application will run on
EXPOSE 80
EXPOSE 4200
# Start the application
CMD ["npm", "start"]
CMD ["nginx", "-g", "daemon off;"]