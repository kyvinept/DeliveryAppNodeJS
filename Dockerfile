FROM node:14.16.0
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev"]