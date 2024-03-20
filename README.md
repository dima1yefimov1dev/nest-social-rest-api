<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description:
This is nestJs API built for creating and managing different events, you can create, update, delete them.

## Features: 
-[X] NestJs: progressive framework for building APis,
-[X] TypeORM: modern ORM for workign with TypeScript,
-[X] Validators, Global pipes
-[X] database runs on docker
-[X] PostgreSQL

## Installation

```bash
$ npm cli

# compose docker:
$ docker-compose up
```
## Set .env variables: 
```bash
DB_HOST=localhost
DB_PORT='port u want to use | 5432 from docker'
DB_USER='your database username'
DB_PASSWORD=example
DB_NAME= 'your db name'
AUTH_SECRET= 'your jwt secret here'
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## USER endpoints: 

| Endpoint               | Method | Description                                       | 
|------------------------|--------|---------------------------------------------------| 
| /api/users             | GET    | Retrieve all users                                |          
| /api/users/:id         | GET    | Retrieve user with provided ID                    |         
| /api/users/signup      | POST   | Register a new user        

## EVENT endpoints: 

| Endpoint                     | Method | Description                                           | Need Auth |
|------------------------------|--------|-------------------------------------------------------| --------- | 
| /api/events                  | GET    | Retrieve all events                                   |           |                
| /api/events/:id              | GET    | Retrieve a specific event by ID                       |           |                
| /api/events                  | POST   | Create a new event                                    | YES       |                
| /api/events/:id              | PATCH  | Update a specific event by ID                         | YES       |                
| /api/events/:id              | DELETE | Delete a specific event by ID                         | YES       |                
| /api/users/organized/:id     | GET    | Retrieve all events created by a specific user        |           | 

## AUTH endpoints: 

| Endpoint         | Method | Description                                | Need Auth | 
|------------------|--------|--------------------------------------------| --------- | 
| /api/auth/signin | POST   | Log in with existing user credentials      |           |          
| /api/auth/profile| GET    | Retrieve profile of current authorized user| YES       | 



