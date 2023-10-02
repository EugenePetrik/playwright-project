import type { Locator } from '@playwright/test';
import { TIMEOUTS } from '../../configs/timeouts';
import { ErrorHandling } from './error';

export class Element {
  public static async getText(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<string | void> {
    return element.textContent({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getInputValue(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<string | void> {
    return element.inputValue({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async isVisible(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<boolean | void> {
    return element.isVisible({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async isHidden(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<boolean | void> {
    return element.isHidden({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async isEnabled(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<boolean | void> {
    return element.isEnabled({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async isDisabled(element: Locator, { timeout = TIMEOUTS.TEN_SECS } = {}): Promise<boolean | void> {
    return element.isDisabled({ timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getAttribute(
    element: Locator,
    attribute: 'href' | 'src' | 'value' | 'title' | 'aria-disabled',
    { timeout = TIMEOUTS.TEN_SECS } = {},
  ): Promise<string | void> {
    return element.getAttribute(attribute, { timeout }).catch((error: Error) => ErrorHandling.errorHandling(error));
  }

  public static async getCSSProperty({
    element,
    property,
  }: {
    element: Locator;
    property: 'border-color' | 'background-color';
  }): Promise<string | void> {
    return element
      .evaluate((el, name) => {
        return window.getComputedStyle(el).getPropertyValue(name);
      }, property)
      .catch((error: Error) => ErrorHandling.errorHandling(error));
  }
}
