# Express ES2017 REST API Boilerplate
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![npm version](https://badge.fury.io/js/god-of-mischief-api.svg)](https://badge.fury.io/js/god-of-mischief-api) [![Build Status](https://travis-ci.org/lokeshboran/god-of-mischief-api.svg?branch=master)](https://travis-ci.org/lokeshboran/god-of-mischief-api) [![Coverage Status](https://coveralls.io/repos/github/lokeshboran/god-of-mischief-api/badge.svg?branch=master)](https://coveralls.io/github/lokeshboran/god-of-mischief-api?branch=master)[![Greenkeeper badge](https://badges.greenkeeper.io/lokeshboran/god-of-mischief-api.svg)](https://greenkeeper.io/)

Boilerplate/Generator/Starter Project for building RESTful APIs and microservices using Node.js, Express and MongoDB

## Features

 - No transpilers, just vanilla javascript
 - ES2017 latest features like Async/Await
 - CORS enabled
 - Uses [yarn](https://yarnpkg.com)
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - [Docker](https://www.docker.com/) support
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
 - Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
 - Git hooks with [husky](https://github.com/typicode/husky) 
 - Logging with [morgan](https://github.com/expressjs/morgan)
 - Authentication and Authorization with [passport](http://passportjs.org)
 - API documentation geratorion with [apidoc](http://apidocjs.com)
 - Continuous integration support with [travisCI](https://travis-ci.org)
 - Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/lokeshboran/god-of-mischief-api
cd apikitchencable
rm -rf .git
```

Install dependencies:

```bash
npm
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```

## Steps

1. Install node.js and mongodb globally inside local environment.
2. install all packages by navigating to project director using command cd apikitchencab
3. run command npm install inside apikitchencable directory from terminal/cmd.
4. type mongod in terminal to start mongodb services
5. npm run dev inorder to run api on node server.
