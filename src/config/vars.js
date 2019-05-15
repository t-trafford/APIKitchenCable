const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  foodAPI: {
    url: process.env.FOODAPI_URI || 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    key: process.env.FOODAPI_KEY || '613a29e948msh9ae0998bc704e62p17b6a4jsn3b0f0d0f3623',
  },
};
