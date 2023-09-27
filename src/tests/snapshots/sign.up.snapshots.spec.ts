import { test } from '../../utils/fixtures/fixturePages';
import { expectElementToBeVisible } from '../../utils/expect';

test.describe('Sign Up page - snapshots', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.goto();
  });

  test('should open the page', async ({ signUpPage }) => {
    await expectElementToBeVisible(signUpPage.title);
    await expectElementToBeVisible(signUpPage.emailInput);
    await signUpPage.waitForTimeout();
    await signUpPage.checkPageSnapshot('sign-up-page.png');
  });
});
