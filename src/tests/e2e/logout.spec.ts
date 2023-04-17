import { createUserAndGetToken } from '../../utils/api/helpers';
import { test } from '../../utils/fixtures';
import { generateUser } from '../../utils/models/user';
import { expectToHaveCount, expectElementsText, expectElementToBeVisible } from '../../utils/expect';

test.describe('Log Out', () => {
  let authToken: string;
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API and get auth token', async () => {
      authToken = await createUserAndGetToken({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.loginViaApi(authToken);
  });

  test('should log out successfully', async ({ homePage, settingsPage }) => {
    await homePage.header.clickOnSettings();

    await settingsPage.checkPageUrl();
    await expectElementToBeVisible(settingsPage.logoutButton);

    await settingsPage.clickOnLogout();

    await homePage.checkPageUrl();
    await expectToHaveCount(homePage.header.allHeaderLinks, 3);
    await expectElementsText(homePage.header.allHeaderLinks, ['Home', 'Sign in', 'Sign up']);
  });
});
