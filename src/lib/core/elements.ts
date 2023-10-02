import type { Locator } from '@playwright/test';
import { ErrorHandling } from './error';

export class Elements {
  public static async getText(locator: Locator): Promise<string[] | void> {
    const elements = await locator.all();
    return Promise.all(elements.map(async element => (await element.textContent()).trim())).catch((error: Error) =>
      ErrorHandling.errorHandling(error),
    );
  }

  public static async getCount(elements: Locator): Promise<number | void> {
    return elements.count().catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getElements(elements: Locator): Promise<Locator[] | void> {
    return elements.all().catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getElementsLinksHref(elements: Locator): Promise<string[] | void> {
    return Promise.all((await elements.all()).map(link => link.getAttribute('href'))).catch((error: Error) =>
      ErrorHandling.errorHandling(error),
    );
  }
}
