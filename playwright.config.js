// @ts-check
const { defineConfig, devices } = require('@playwright/test');

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  // testMatch: '**.spec.ts',
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD
    },
    trace: 'on',
    testIdAttribute: 'qa-dont-touch'
  },
  projects: [
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: '*auth.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'registration',
      testDir: './tests/registration',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'user',
      testDir: './tests/user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'session-storage.json',
      },
      dependencies: ['setup'],
    },
  ],

});

