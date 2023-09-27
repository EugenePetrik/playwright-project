import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/fixturePages';
import { expectElementToBeVisible } from '../../utils/expect';

test.describe('Sign In page', () => {
  test('should not have accessibility issues', async ({ signInPage }, testInfo) => {
    await signInPage.goto();

    await signInPage.checkPageUrl();
    await signInPage.checkPageTitle('Conduit');

    await expectElementToBeVisible(signInPage.title);
    await expectElementToBeVisible(signInPage.needAnAccountLink);

    expect(await signInPage.accessibilityScan(testInfo)).toBe(0);
  });
});
