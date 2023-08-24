import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import { join } from 'path';
import BaseConfig from './base.config';

config();

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests', 'accessibility'),

  timeout: 30 * 1000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never', outputFolder: join(process.cwd(), 'reports', 'html-report') }],
  ],

  outputDir: join(process.cwd(), 'reports', 'test-results'),

  use: {
    headless: false,

    ignoreHTTPSErrors: true,

    actionTimeout: 10 * 1000,

    baseURL: BaseConfig.webURL,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    launchOptions: {
      slowMo: 100,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
