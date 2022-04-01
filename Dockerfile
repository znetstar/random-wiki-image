FROM node:16-slim

ARG NODE_OPTIONS

WORKDIR /app

ADD . /app

RUN npm ci

EXPOSE 3000

CMD npm start
