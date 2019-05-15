# API Kitchen Cable

RESTful APIs using Node.js, Express and MongoDB to maintain kitchen cable application backend.

## Packages & Dependencies

    "axios": "^0.18.0",
    "bcryptjs": "2.4.3",
    "bluebird": "^3.5.0",
    "body-parser": "^1.17.0",
    "compression": "^1.6.2",
    "cors": "^2.8.3",
    "cross-env": "^5.0.1",
    "dotenv-safe": "^6.0.0",
    "express": "^4.15.2",
    "express-validation": "^1.0.2",
    "helmet": "^3.5.0",
    "http-status": "^1.0.1",
    "joi": "^10.4.1",
    "jwt-simple": "0.5.2",
    "lodash": "^4.17.4",
    "method-override": "^3.0.0",
    "moment-timezone": "^0.5.13",
    "mongoose": "^5.2.17",
    "morgan": "^1.8.1",
    "passport": "^0.4.0",
    "passport-http-bearer": "^1.0.1",
    "passport-jwt": "4.0.0",
    "pm2": "^3.0.0",
    "unirest": "^0.6.0",
    "uuid": "^3.1.0",
    "winston": "^3.1.0"

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)


## Getting Started

Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/t-trafford/APIKitchenCable
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
