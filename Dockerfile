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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]