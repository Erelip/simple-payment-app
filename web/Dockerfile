FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 8081

CMD ["yarn", "start"]