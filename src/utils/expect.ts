/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect, Locator } from '@playwright/test';

export const expectElementVisibility = async (element: Locator): Promise<void> => {
  await expect(element, `Assert the ${element} locator is visible`).toBeVisible();
};

export const expectElementToContainText = async (element: Locator, toContain: string | string[], ignoreCase = true): Promise<void> => {
  await expect(element, `Assert the ${element} locator contains ${toContain} text`).toContainText(toContain, { ignoreCase });
};

export const expectToHaveValue = async (element: Locator, value: string): Promise<void> => {
  await expect(element, `Assert the ${element} locator has ${value} value`).toHaveValue(value);
};

export const expectToHaveCount = async (element: Locator, count: number): Promise<void> => {
  await expect(element, `Assert the ${element} locator has length ${count}`).toHaveCount(count);
};

export const expectElementsText = async (element: Locator, expectedText: string[]): Promise<void> => {
  const actualText = await Promise.all((await element.all()).map(async el => (await el.textContent())?.trim()));
  expect(actualText, `Assert the "${actualText}" text to equal "${expectedText}" text`).toEqual(expectedText);
};
