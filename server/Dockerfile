FROM node:16

WORKDIR /server

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]