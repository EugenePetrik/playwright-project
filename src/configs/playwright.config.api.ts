import { defineConfig } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { join, resolve } from 'path';

dotenvConfig({ path: resolve(__dirname, '.env'), override: true });

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests', 'api'),

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 0 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never', outputFolder: join(process.cwd(), 'html-report') }]],

  use: {
    actionTimeout: 0,
  },
});
