/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 3000,
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      all: true,
      reporter: ['text', 'lcov'],
      exclude: [
        ...configDefaults.exclude,
        '**/public/**',
        '**/mocks/**',
        'src/main.tsx',
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/**/index.ts',
        '**/*.model.ts',
        '**/constants.ts',
        '**/types.ts',
        '**/*.config.ts',
        '**/*.d.ts',
      ],
    },
  },
});
