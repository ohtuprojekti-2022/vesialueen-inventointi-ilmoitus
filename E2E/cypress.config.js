const { defineConfig } = require("cypress")
require('dotenv').config()


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    backendUrl: process.env.CYPRESS_BACKEND_URL,
    video: false
  },
});
