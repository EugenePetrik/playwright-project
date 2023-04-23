/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect, test } from '@playwright/test';

type ExpectToEqual<T> = {
  actual: T;
  expected: T;
  description: string;
};

type ExpectToContain<T> = {
  actual: Array<T>;
  expected: T;
  description: string;
};

type ExpectStatusCode = { api: string } & Omit<ExpectToEqual<number>, 'description'>;

export const expectToEqual = async <T>({ actual, expected, description }: ExpectToEqual<T>): Promise<void> => {
  await test.step(`Checking that "${description}" is equal to "${expected}"`, () => {
    expect(actual).toEqual(expected);
  });
};

export const expectStatusCode = async ({ actual, expected, api }: ExpectStatusCode): Promise<void> => {
  await test.step(`Checking that response status code for API "${api}" equals to ${expected}`, async () => {
    await expectToEqual({ actual, expected, description: 'response status code' });
  });
};

export const expectToContain = async <T>({ actual, expected, description }: ExpectToContain<T>): Promise<void> => {
  await test.step(`Checking that "${description}" contains "${expected}"`, () => {
    expect(actual).toContain(expected);
  });
};

export const expectNotToContain = async <T>({ actual, expected, description }: ExpectToContain<T>): Promise<void> => {
  await test.step(`Checking that "${description}" does not contain "${expected}"`, () => {
    expect(actual).not.toContain(expected);
  });
};
