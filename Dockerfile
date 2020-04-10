FROM node:10

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]