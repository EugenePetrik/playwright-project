import { test } from '../../utils/fixtures';
import { expectElementToBeVisible } from '../../utils/expect';

test.describe('Sign In page - snapshots', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.goto();
  });

  test('should open the page', async ({ signInPage }) => {
    await expectElementToBeVisible(signInPage.title);
    await expectElementToBeVisible(signInPage.emailInput);
    await signInPage.waitForTimeout();
    await signInPage.checkPageSnapshot('sign-in-page.png');
  });
});
