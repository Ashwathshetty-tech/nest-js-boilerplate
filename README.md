# NodeJS Boilerplate - NestJS Rewrite

This workspace is a NestJS rewrite of the original Express boilerplate. It provides a minimal, working NestJS project structure with example `Actor` and `User` modules, database providers (MongoDB, Postgres, Redis), and basic middleware/filters.

Quick start

1. Install deps:

```bash
npm install
```

2. Run in development mode:

```bash
npm run start:dev
```

3. Build and run:

```bash
npm run build
npm run start
```

Notes
- Environment variables: `PORT`, `MONGODB_URI`, `POSTGRES_*`, `REDIS_URL`.
- This rewrite uses in-memory stores for `ActorService` and `UserService` as placeholders — replace with DB integrations as needed.

Docker

- Start services with Docker Compose (uses the included `dockerfile` and `docker-compose.yml`):

```bash
cp .env.example .env
docker-compose up -d --build
```

- Stop services:

```bash
docker-compose down
```

CI / Jenkins

- The included `Jenkinsfile.slave` builds the Docker image and runs `docker-compose up` on the agent. Ensure the Jenkins agent has Docker and Docker Compose installed and permissions to run them.
# 🚀  Node.js Boilerplate
A production-ready Node.js Boilerplate with built-in support for Docker, Docker Compose, Jenkins CI/CD, MongoDB, PostgreSQL, Redis, and NewRelic Monitoring.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Prerequisites
List the required software and versions to run the project.

- Node.js 18.x
- Docker & Docker Compose
- MongoDB
- PostgreSQL
- Redis
- Jenkins

---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Ashwathshetty-tech/nodeJS-BoilerPlate-CICD.git
cd repository

```
### 🐳 Docker Setup
### Build and Run
docker-compose up --build -d


### Services Overview

| Service    | Port   | Description       |
|-----------|-------|------------------|
| App       | 3000   | Node.js API      |
| MongoDB   | 27017  | NoSQL Database   |
| PostgreSQL| 5432   | Relational DB    |
| Redis     | 6379   | Caching Service  |


