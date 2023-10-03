/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type ConsoleMessage, test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.setViewportSize({ height: 1080, width: 1920 });

    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        console.log('Page', msg.page());
        console.log('Text', msg.text());
        // throw new Error('Error');
      }
    });

    await use(page);
  },
});
