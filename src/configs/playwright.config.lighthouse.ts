import { join } from 'path';
import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import BaseConfig from './base.config';

config();

export default defineConfig({
  // globalSetup: require.resolve(join(process.cwd(), 'src', 'tests', 'lighthouse', 'global.setup.ts')),

  testDir: join(process.cwd(), 'src', 'tests', 'lighthouse'),

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  fullyParallel: !!process.env.CI,

  workers: 1,

  retries: process.env.CI ? 2 : 0,

  forbidOnly: !!process.env.CI,

  reporter: process.env.CI
    ? [['list', { printSteps: true }], ['blob']]
    : [
        ['list', { printSteps: true }],
        ['html', { outputFolder: join(process.cwd(), 'reports', 'html-report'), open: 'never' }],
      ],

  outputDir: join(process.cwd(), 'reports', 'test-results'),

  use: {
    baseURL: BaseConfig.webURL,

    headless: false,

    actionTimeout: 0,

    navigationTimeout: 30 * 1000,

    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',

    video: 'off',

    trace: 'off',

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
