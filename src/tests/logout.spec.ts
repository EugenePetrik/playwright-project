import { test } from '../utils/fixtures';
import { generateUser } from '../utils/models/user';
import { expectToHaveCount, expectElementsText } from '../utils/expect';

test.describe('User Log Out', () => {
  const { username, email, password } = generateUser();

  let authToken: string;

  test.beforeAll(async ({ api }) => {
    await test.step('Sign up user via API', async () => {
      authToken = await api.createUser({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.loginViaApi(authToken);
  });

  test('should log out successfully', async ({ homePage, settingsPage }) => {
    await homePage.header.clickOnSettings();

    await settingsPage.checkPageUrl();
    await settingsPage.clickOnLogout();

    await homePage.checkPageUrl();
    await expectToHaveCount(homePage.header.allHeaderLinks, 3);
    await expectElementsText(homePage.header.allHeaderLinks, ['Home', 'Sign in', 'Sign up']);
  });
});
