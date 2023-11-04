FROM node:18

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD ["sh", "-c", "yarn migrate && yarn dev"]