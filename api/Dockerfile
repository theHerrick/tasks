# build environment
FROM node:21-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3002

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && node server.js