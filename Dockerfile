FROM node:14.17.0-alpine3.13

WORKDIR /usr/src/app  # Alinea con docker-compose.yml

COPY package.json .  
RUN npm install

COPY . .  
EXPOSE 3000
CMD npm start
