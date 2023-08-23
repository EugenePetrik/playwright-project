/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect, type Locator } from '@playwright/test';

export const expectElementToBeVisible = async (element: Locator): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator is visible`).toBeVisible();
};

export const expectElementToBeHidden = async (element: Locator): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator is visible`).toBeHidden();
};

export const expectElementToHaveText = async (element: Locator, text: string, ignoreCase = true): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator has text ${text} text`).toHaveText(text, { ignoreCase });
};

export const expectElementToContainText = async (element: Locator, toContain: string | string[], ignoreCase = true): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator contains ${toContain} text`).toContainText(toContain, {
    ignoreCase,
  });
};

export const expectToHaveValue = async (element: Locator, value: string): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator has ${value} value`).toHaveValue(value);
};

export const expectToHaveAttribute = async (element: Locator, attribute: string, value: string): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator has attribute "${attribute}" with "${value}" value`).toHaveAttribute(
    attribute,
    value,
  );
};

export const expectToHaveCount = async (element: Locator, count: number): Promise<void> => {
  await expect(element, `Assert the ${JSON.stringify(element)} locator has length ${count}`).toHaveCount(count);
};

export const expectElementsText = async (element: Locator, expectedText: string[]): Promise<void> => {
  // const actualText = await Promise.all((await element.all()).map(async el => (await el.textContent())?.trim()));
  // expect(actualText, `Assert the "${actualText}" text to equal "${expectedText}" text`).toEqual(expectedText);
  const actualText = (await element.allTextContents()).map(text => text.trim());
  expect(actualText, `Assert the "${actualText}" text to equal "${expectedText}" text`).toEqual(expectedText);
};

export const expectElementsToContainText = async (element: Locator, expectedText: string): Promise<void> => {
  const actualText = await Promise.all((await element.all()).map(async el => (await el.textContent())?.trim()));
  expect(actualText, `Assert the "${actualText}" text contains "${expectedText}" text`).toContain(expectedText);
};

export const expectElementsNotToContainText = async (element: Locator, expectedText: string): Promise<void> => {
  const actualText = await Promise.all((await element.all()).map(async el => (await el.textContent())?.trim()));
  expect(actualText, `Assert the "${actualText}" text not contains "${expectedText}" text`).not.toContain(expectedText);
};

export const expectElementsToBeGreaterThan = async (element: Locator, count: number): Promise<void> => {
  const elements = await element.count();
  expect(elements, `Assert the ${JSON.stringify(element)} locator length to be grather than ${count}`).toBeGreaterThan(count);
};

export const expectElementSnapshot = async (
  element: Locator,
  name: string,
  {
    threshold = 0,
    maxDiffPixels = 0,
    maxDiffPixelRatio = 0,
  }: { threshold?: number; maxDiffPixels?: number; maxDiffPixelRatio?: number } = {},
): Promise<void> => {
  expect(await element.screenshot()).toMatchSnapshot(name, { threshold, maxDiffPixels, maxDiffPixelRatio });
};
