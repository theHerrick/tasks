FROM node:18.16.0-alpine3.17
WORKDIR /app
COPY package*.json .
RUN apk update && apk add bash
RUN npm install
COPY server.js .
EXPOSE 5000