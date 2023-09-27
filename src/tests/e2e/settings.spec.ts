import { createUserAndGetToken } from '../../utils/api/helpers';
import { test } from '../../utils/fixtures/fixturePages';
import { generateUser } from '../../utils/models/user';
import { expectToHaveValue, expectElementToBeVisible } from '../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Settings', () => {
  let authToken: string;
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API and get auth token', async () => {
      authToken = await createUserAndGetToken({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage, settingsPage }) => {
    await homePage.loginViaAPI(authToken);
    await settingsPage.goto();
  });

  test('should open the page', async ({ settingsPage }) => {
    await settingsPage.checkPageUrl();
    await settingsPage.checkPageTitle('Conduit');

    await expectElementToBeVisible(settingsPage.title);
    await expectToHaveValue(settingsPage.usernameInput, username);
    await expectToHaveValue(settingsPage.emailInput, email);
    await expectElementToBeVisible(settingsPage.updateSettingsButton);
    await expectElementToBeVisible(settingsPage.logoutButton);
  });
});
