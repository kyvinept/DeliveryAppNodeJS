FROM node:16.14

WORKDIR /usr/src/app/media_service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "run", "dev" ]