FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Fix better deluge issue
COPY bd_index.js node_modules/better-deluge/index.js

ENV PORT=8083
EXPOSE 8083

CMD [ "npm", "start" ]
