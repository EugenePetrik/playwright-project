import type { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../../configs/timeouts';

export class Waiter {
  public static async waitFor({
    element,
    state = 'visible',
    timeout = TIMEOUTS.TEN_SECS,
  }: {
    element: Locator;
    state?: 'visible' | 'hidden' | 'attached';
    timeout?: TIMEOUTS;
  }): Promise<void> {
    await element.waitFor({ state, timeout });
  }

  public static async waitForTimeout({ page, timeout }: { page: Page; timeout: TIMEOUTS }): Promise<void> {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(timeout);
  }
}
