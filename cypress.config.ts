import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents() {},
    baseUrl: 'http://localhost:3000',
  },
});
