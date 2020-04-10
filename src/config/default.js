const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
  },
};
