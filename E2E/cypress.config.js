const { defineConfig } = require("cypress")
const mongo = require('cypress-mongodb')
require('dotenv').config()


module.exports = defineConfig({
  env: {
    mongodb: {
      uri: process.env.CYPRESS_MONGO_URI,
      database: process.env.DATABASE
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mongo.configurePlugin(on)
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    backendUrl: process.env.BACKEND_URL,
    video: false
  },
});
