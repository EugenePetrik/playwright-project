import { test } from '../../utils/fixtures';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import userResponse from '../../utils/mocks/user.json';
import { expectElementToBeVisible } from '../../utils/expect';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Settings page - snapshots', () => {
  let authToken: string;
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API and get auth token', async () => {
      authToken = await createUserAndGetToken({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage, settingsPage }) => {
    await homePage.loginViaAPI(authToken);

    await settingsPage.mockResponse(MOCK_ROUTES.USER, userResponse);
    await settingsPage.goto();
  });

  test('should open the page', async ({ settingsPage }) => {
    await expectElementToBeVisible(settingsPage.title);
    await expectElementToBeVisible(settingsPage.emailInput);
    await settingsPage.waitForTimeout();
    await settingsPage.checkPageSnapshot('settings-page.png');
  });
});
