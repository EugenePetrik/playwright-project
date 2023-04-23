import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { join, resolve } from 'path';
import BaseConfig from './base.config';

dotenvConfig({ path: resolve(__dirname, '.env'), override: true });

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests', 'accessibility'),

  timeout: 30 * 1000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  expect: {
    timeout: 5000,
  },

  reporter: [['html', { open: 'never', outputFolder: join(process.cwd(), 'html-report') }]],

  outputDir: join(process.cwd(), 'test-results'),

  use: {
    headless: false,

    ignoreHTTPSErrors: true,

    actionTimeout: 10_000,

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
