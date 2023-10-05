/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type ConsoleMessage, test as base } from '@playwright/test';
import logger from '../../configs/logger';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.setViewportSize({ height: 1080, width: 1920 });

    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        logger.debug(`Page URL ${page.url()}`);
        logger.debug(`Page ${JSON.stringify(msg.page())}`);
        logger.debug(`Text ${JSON.stringify(msg.text())}`);
        // throw new Error('Error');
      }
    });

    await use(page);
  },
});
