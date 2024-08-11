FROM node:17-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 9992

CMD ["node","server.js"]