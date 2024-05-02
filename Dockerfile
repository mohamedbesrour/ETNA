FROM node:16

WORKDIR /usr/src/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

EXPOSE 3000