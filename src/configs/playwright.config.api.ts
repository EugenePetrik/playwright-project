import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';
import { join } from 'path';

config();

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests', 'api'),

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 0 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never', outputFolder: join(process.cwd(), 'reports', 'html-report') }],
  ],

  use: {
    actionTimeout: 0,
  },
});
