import type { Locator } from '@playwright/test';
import { TIMEOUTS } from '../../configs/timeouts';
import { ErrorHandling } from './error';

export class Action {
  public static async click(element: Locator, { timeout = TIMEOUTS.TEN_SECS, force = false } = {}): Promise<void> {
    await element.click({ force, timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async clear(element: Locator, { timeout = TIMEOUTS.TEN_SECS, force = false } = {}): Promise<void> {
    await element.clear({ force, timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async hover(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<void> {
    await element.hover({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async type(element: Locator, value: string, { timeout = TIMEOUTS.TWENTY_SECS } = {}): Promise<void> {
    await element.pressSequentially(value, { timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async fill(element: Locator, value: string, { timeout = TIMEOUTS.TWENTY_SECS } = {}): Promise<void> {
    await element.fill(value, { timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async press(
    element: Locator,
    value: 'Tab' | 'Enter' | 'Backspace' | 'ArrowRight',
    { timeout = TIMEOUTS.TEN_SECS } = {},
  ): Promise<void> {
    await element.press(value, { timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async setInputFiles(element: Locator, filePath: string, { timeout = TIMEOUTS.FIVE_SECS } = {}): Promise<void> {
    await element.setInputFiles(filePath, { timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getBoundingBox(element: Locator): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | void> {
    return element.boundingBox().catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async dragTo({
    element,
    boundingBox,
    value,
  }: {
    element: Locator;
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    value: number;
  }): Promise<void> {
    await element
      .dragTo(element, {
        force: true,
        targetPosition: {
          // moving the slider to the target value in %
          x: boundingBox.width * value,
          y: 0,
        },
      })
      .catch((error: Error) => ErrorHandling.errorHandling(error));
  }
}
