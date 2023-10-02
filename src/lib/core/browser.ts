import type { BrowserContext, Page } from '@playwright/test';
import BaseConfig from '../../configs/base.config';
import { TIMEOUTS } from '../../configs/timeouts';
import { ErrorHandling } from './error';

export class Browser {
  public static async goto({
    url,
    page,
    timeout = TIMEOUTS.THIRTY_SECS,
    waitUntil,
  }: {
    url: string;
    page: Page;
    timeout?: TIMEOUTS;
    waitUntil?: 'domcontentloaded' | 'load' | 'networkidle' | 'commit';
  }): Promise<void> {
    await page.goto(url, { timeout, waitUntil }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async addToken({ token, context }: { token: string; context: BrowserContext }): Promise<void> {
    await context
      .addCookies([
        {
          name: 'token',
          value: token,
          domain: BaseConfig.webURL,
          path: '/',
        },
      ])
      .catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async addLocalStorage({ authToken, page }: { authToken: string; page: Page }): Promise<void> {
    await page
      .evaluate(token => {
        localStorage.setItem('id_token', token);
      }, authToken)
      .catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async reload({
    state = 'domcontentloaded',
    page,
    timeout = TIMEOUTS.THIRTY_SECS,
  }: {
    state?: 'domcontentloaded' | 'load' | 'networkidle' | 'commit';
    page: Page;
    timeout?: TIMEOUTS;
  }): Promise<void> {
    await page.reload({ waitUntil: state, timeout });
  }
}
