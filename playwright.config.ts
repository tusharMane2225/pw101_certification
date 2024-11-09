import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  platform: 'Windows 10',
  lt: {
    username: 'tushar54mane',
    accessKey: 'EQFrwGyeViIegkLbgAybbRAjHtA4EyBVhbAIZzF7w4lqeW26uJ',
    build: 'Playwright LambdaTest Build',
    name: 'Playwright LambdaTest Test',
    w3c: true
  }
};

// Construct the wsEndpoint using the `LT_GRID_URL` and `capabilities`
const wsEndpoint = `${process.env.LT_GRID_URL}${encodeURIComponent(JSON.stringify(capabilities))}`;

console.log("wsEndpoint:", wsEndpoint); // Debug: log the wsEndpoint to ensure it’s correct
console.log("username:", process.env.LT_USERNAME); // Debug: log the wsEndpoint to ensure it’s correct
console.log("accessKey:", process.env.LT_ACCESS_KEY); // Debug: log the wsEndpoint to ensure it’s correct

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    connectOptions: {
      wsEndpoint,
    },
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    }
  ],
});
