# Simple payment app

## How to Setup

- Copy environment variables. Replace values to your own.

```bash
cp .env.example .env
cp ./server/.env.example ./server/.env
cp ./web/.env.example ./web/.env
```

- Build the project with [docker-compose](https://docs.docker.com/compose/).

```bash
docker-compose up --build -d
```

## Stack :zap:

```javascript
    stack: [
        "nodejs",
        "typescript",
        "express",
        "prisma",
        "mysql",
        "react",
    ];
```