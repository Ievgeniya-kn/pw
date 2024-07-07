// @ts-check
const { defineConfig, devices } = require('@playwright/test');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  testMatch: '**.spec.ts',
  use: {
    headless: false,
    baseURL: 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    trace: 'on',
    testIdAttribute: 'qa-dont-touch'
  },
  projects: [
    {
      name: 'qauto',
      testMatch: '**.spec.ts'
    },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

