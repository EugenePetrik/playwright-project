import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures';
import { expectElementToBeVisible } from '../../utils/expect';

test.describe('Home page', () => {
  test('should not have accessibility issues', async ({ homePage }, testInfo) => {
    await homePage.goto();

    await homePage.checkPageUrl();
    await homePage.checkPageTitle('Conduit');

    await expectElementToBeVisible(homePage.header.brandLogo);

    await homePage.globalFeedTab.article.waitForArticles();

    expect(await homePage.accessibilityScan(testInfo)).toBe(0);
  });
});
