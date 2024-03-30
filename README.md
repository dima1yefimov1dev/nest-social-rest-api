## Description:
This is nestJs API built for social network. With these endpoints you can create users, posts, comments, like posts and etc, typical functionality of modern social nw. JWT tokens are used here and set to cookies.

## Features: 
- [X] NestJs: progressive framework for building APis,
- [X] TypeORM: modern ORM for workign with TypeScript,
- [X] Validators, Global pipes
- [X] database runs on docker
- [X] PostgreSQL
- [X] Auth with cookies
- [X] All simple functionality for network  

## Installation

```bash
$ npm ci

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
SALT='salt for hashing password'
TOKEN_LIFE_TIME='time for what your token is alive'
PORT='port for your server'
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

| Endpoint         | Method | Description                                | Need Auth | 
|------------------|--------|--------------------------------------------| --------- | 
| /users           | GET    | Retrieve all users                         |           |          
| /users/:id       | GET    | Retrieve user with provided ID             |           |     

## POSTS endpoints: 
| Method | Endpoint               | Description                   | Auth Required | Body                                 |
|--------|------------------------|-------------------------------|--------------|--------------------------------------|
| GET    | /posts                 | Get all posts                 | No           |                                      |
| GET    | /posts/:id             | Get a post by ID              | No           |                                      |
| POST   | /posts                 | Create a new post             | Yes          | { title: string, body: string }      |
| PATCH  | /posts/:id             | Update a post by ID           | Yes          | { title?: string, body?: string }    |
| DELETE | /posts/:id             | Delete a post by ID           | Yes          |                                      |
| POST   | /posts/comment/:id     | Comment on a post             | Yes          | { text: string }                     |
| GET    | /posts/comment/:id     | Get comments on a post        | No           |                                      |
| PATCH  | /posts/like/:id        | Like or unlike a post         | Yes          |                                      |
| GET    | /posts/like/:id        | Get users who liked a post    | No           |                                      |

## COMENTS endpoints: 
| Method | Endpoint           | Description              | Auth Required | Body            |
|--------|--------------------|--------------------------|--------------|------------------|
| GET    | /comments          | Get all comments         | No           |                  |
| GET    | /comments/:id      | Get a comment by ID      | No           |                  |
| DELETE | /comments/:id      | Delete a comment by ID   | Yes          |                  |
| PATCH  | /comments/:id      | Update a comment by ID   | Yes          | { text: string } |

## AUTH endpoints: 

| Endpoint         | Method | Description                                | Need Auth | Body |
|------------------|--------|--------------------------------------------| --------- | ---- |
| /auth/signin     | POST   | Log in with existing user credentials      |           |      |
| /auth/profile    | GET    | Retrieve profile of current authorized user| YES       |      |
| /auth/signup     | POST   | Endpoint for user registration. Retrieve new user| YES  | {"name": "John Doe", "username": "johndoe", "email": "john@example.com", "password": "password123"} |


