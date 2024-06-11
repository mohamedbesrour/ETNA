FROM node:16

WORKDIR /server

COPY ./server/packa4ge*.json ./

RUN npm install

COPY ./server .

EXPOSE 3000

CMD [ "npm" , "start"]