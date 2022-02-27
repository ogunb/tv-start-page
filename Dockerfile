FROM node:17.4.0-alpine3.15

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY ./ .

RUN yarn build

EXPOSE 3000
ENTRYPOINT yarn start
