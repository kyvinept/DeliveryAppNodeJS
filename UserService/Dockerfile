FROM node:16.14

WORKDIR /usr/src/app/user_service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "npm", "run", "dev" ]