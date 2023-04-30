import { defineConfig } from 'cypress';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: ['cypress/**/*.*', 'instrumented/**/*.*'],
      url: 'http://localhost:3001/__coverage__',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
});
