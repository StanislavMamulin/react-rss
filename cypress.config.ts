import codeCoverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: ['cypress/**/*.*', '**/mocks/**', '**/utilities/**'],
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      codeCoverageTask(on, config);
      return config;
    },
  },

  video: false,
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: false,
});
