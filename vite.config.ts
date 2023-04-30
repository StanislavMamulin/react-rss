/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/**/*.{ts,tsx}',
      exclude: ['**/node_modules/**', '**/public/**', '**/mocks/**', '**/instrumented/**'],
      cypress: true,
      requireEnv: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [
      ...configDefaults.exclude,
      '**/public/**',
      '**/mocks/**',
      'src/main.tsx',
      '**/instrumented/**',
    ],
    coverage: {
      provider: 'istanbul',
      all: true,
      exclude: [
        ...configDefaults.exclude,
        '**/public/**',
        '**/mocks/**',
        'src/main.tsx',
        '**/instrumented/**',
      ],
    },
  },
  server: {
    host: true,
    port: 3001,
  },
});
