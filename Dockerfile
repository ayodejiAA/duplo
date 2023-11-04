FROM node:20-alpine

WORKDIR /app

COPY yarn.lock .

COPY package.json  . 

RUN yarn install

COPY . .

RUN yarn build
