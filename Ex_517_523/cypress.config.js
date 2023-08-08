const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '3jwjuv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    BACKEND: 'http://localhost:3001/api'
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
