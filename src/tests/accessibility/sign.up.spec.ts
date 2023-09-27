import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/fixturePages';
import { expectElementToBeVisible } from '../../utils/expect';

test.describe('Sign Up page', () => {
  test('should not have accessibility issues', async ({ signUpPage }, testInfo) => {
    await signUpPage.goto();

    await signUpPage.checkPageUrl();
    await signUpPage.checkPageTitle('Conduit');

    await expectElementToBeVisible(signUpPage.title);
    await expectElementToBeVisible(signUpPage.signUpButton);

    expect(await signUpPage.accessibilityScan(testInfo)).toBe(0);
  });
});
