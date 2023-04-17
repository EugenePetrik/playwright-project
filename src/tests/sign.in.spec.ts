import { createUser } from '../utils/api/helpers';
import { test } from '../utils/fixtures';
import { generateUser } from '../utils/models/user';
import { expectToHaveCount, expectElementsText } from '../utils/expect';

test.describe('User Sign In', () => {
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API', async () => {
      await createUser({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.header.clickOnSignIn();
  });

  test('should successfully sign in', async ({ homePage, signInPage }) => {
    await signInPage.checkPageUrl();
    await signInPage.login({ email, password });

    await homePage.checkPageUrl();
    await expectToHaveCount(homePage.header.allHeaderLinks, 4);
    await expectElementsText(homePage.header.allHeaderLinks, ['Home', 'New Article', 'Settings', username]);
  });
});
