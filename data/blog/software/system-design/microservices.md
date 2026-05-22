---
draft: false
date: '2022-09-01'
title: 'System Design: Containerization of Microservices using Docker'
summary: 'Containerize multiple services using Docker for cloud deployment. Using NPM, ExpressJS, NodeJS, and Docker we create two microservices that work together to create a web app which help users learn about the wizards of Hogwarts.'
tags: ['system design', 'micro services', 'docker']
---

# Introduction

![Microservice](https://s1.gifyu.com/images/microservices.gif)
[Github Repo](https://github.com/PrimeTimeTran/microservices/blob/main/api/app.js)

In this tutorial we'll create a full stack web application following the micro service architecture.

We'll use [npm](https://www.npmjs.com/), [express](https://expressjs.com/), and [nodejs](https://nodejs.org/en/) to build a client web app which requests data from an api server.

Both client and api will be containerized into their own service using [Docker](https://www.docker.com/).

Lastly we'll use Docker compose to spin up both containers with volumes so that we can work quickly, without having to stop, rebuild, and start our containers.

### Create client web app

Create root working directory.

```sh
mkdir microservices
cd microservices
```

Create client microservice directory.

```sh
mkdir client
cd client
```

Generate project files.

```sh
npx express-generator .
npm install
```

Implement looping request for an outside service's resources.

```js
// ./client/views/layout.jade

script((type = 'text/javascript')).setInterval(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => {
      console.log('JSON:', json);
      document.getElementsByTagName('p')[0].innerHTML = new Date(Date.now());
    });
}, 1500);
```

Run application to check it works.

```sh
npm start
```

We should now see we've got a working web application, awesome.

### Define client service

Begin containerization of client.

```sh
touch Dockerfile
```

Define containerization strategy.

```dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json ./

RUN yarn
COPY . .

CMD ["yarn", "start"]
```

Build docker image for this service.

```sh
docker build -t client .
```

- The `-t client` [specifies](https://docs.docker.com/engine/reference/commandline/build/) that we're naming/tagging this image as `client`.

---

Check client image exists locally.

```sh
docker images
```

Run the service using the image we just created to start a new container.

```sh
docker run -dp 80:3000 client
```

- mapping host post `80` to container's internal `3000` port.
- The `-dp` flag [specifies](https://docs.docker.com/engine/reference/commandline/run/) that we're running the container in detached mode

---

Check running containers.

```sh
docker ps
```

If we go to `http:localhost:80` in our web browser we'll now see that our service is running and being handled by Docker, awesome.

### Begin creating api service

Create api service directory.

```sh
cd ..
mkdir api
cd api
```

Generate api project files.

```sh
npx express-generator --no-view .
```

Define custom business logic.

```js
// ./api/routes/index.js
const wizards = [
  'Harry Potter',
  'Hermione Granger',
  'Ronald Weasley',
  'Neville Longbottom',
  'Mad-Eye Moody',
  'Bartemius Crouch Sr.',
  'Newt Scamander',
  'Sirius Black',
  'Kingsley Shacklebolt',
  'Draco Malfoy',
  'Albus Dumberdore',
  'Thomas Riddle',
  'Salazar Slytherin',
  'Godric Gryffindor',
  'Gellert Grindelwald',
];

router.get('/magic', function (req, res, next) {
  const wizard = wizards[Math.floor(Math.random() * wizards.length)];
  res.json(wizard);
});
```

Run api on different port in order to avoid port number collision.

```sh
PORT=3001 npm start
```

Refactor client business logic.

```js {3}
// ./client/views/layout.jade
script((type = 'text/javascript')).setInterval(() => {
  fetch('http://localhost:3001/magic')
    .then((response) => response.json())
    .then((json) => {
      console.log('JSON:', json);
      const p = document.getElementsByTagName('p')[0];
      const br = document.createElement('br');
      p.appendChild(br);
      p.append(new Date(Date.now()) + ' ' + json);
    });
}, 1500);
```

Resolve CORS issue.

```sh
npm install cors
```

Update api service config.

```js
// ./api/app.js
var cors = require('cors');

var app = express();
app.use(cors());
```

Start api service.

```sh
PORT=3001 npm start
```

Define api service containerization strategy.

```dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json ./

RUN yarn
COPY . .

CMD ["yarn", "start"]
```

Build api service docker image.

```sh
docker build -t api .
```

Run api service container mapping host machine port `3001` to docker container port `3000`.

```sh
docker run -dp 3001:3000 api
```

We should now see docker running both of our containers.

We can use a docker compose file to run multiple containers if we want.

Create `docker-compose.yml` file and define two services.

```yaml
version: '3.9'
services:
  web-app-service:
    build: ./client
    ports:
      - 80:3000

  rest-api-service:
    build: ./api
    ports:
      - 3001:3000
    depends_on:
      - web-app-service
```

### Implement hot reloading for developer happiness

Install nodemon.

```bash
cd api
npm i nodemon
```

Configure api service to use nodemon when it starts.

```json {6}
{
  "name": "responder",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www" // Change me
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "cors-anywhere": "^0.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "morgan": "~1.9.1",
    "nodemon": "^2.0.19"
  }
}
```

Add volumes inside of docker compose file.

```yaml {15-20}
version: '3.9'
services:
  web-app-service:
    build: ./client
    ports:
      - 80:3000

  rest-api-service:
    build: ./api
    ports:
      - 3001:3000
    depends_on:
      - web-app-service

    volumes: # Add us
      - ./api:/usr/src/app # Add us

volumes: # Add us
  api: # Add us
```

You should now see that when you change the list of wizards to one person, the changes are reflected immediately, without needing to stop the container, rebuild the image, and restart it, awesome!

![Microservice](https://s1.gifyu.com/images/microservices-end.gif)

Could this article be improved? Please make a suggestion.

Your thoughts and comments are welcome and appreciated.
