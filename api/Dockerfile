FROM node:12

WORKDIR /app

COPY . .
RUN npm install


EXPOSE 3002

# CMD npm start
CMD [ "node", "server.js" ]