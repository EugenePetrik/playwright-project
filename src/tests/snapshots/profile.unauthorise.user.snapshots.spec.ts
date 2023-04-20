import { test } from '../../utils/fixtures';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import profilesResponse from '../../utils/mocks/profiles.json';
import { expectElementToBeVisible, expectElementSnapshot } from '../../utils/expect';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Profile page > Unauthorise user - snapshots', () => {
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await createUserAndGetToken({ username, email, password });
  });

  test.beforeEach(async ({ profilePage }) => {
    await profilePage.mockResponse(MOCK_ROUTES.PROFILE, profilesResponse);
    await profilePage.goto(username);
  });

  test('should open the page', async ({ profilePage }) => {
    await expectElementToBeVisible(profilePage.userInfo.rootElement);
    await profilePage.waitForTimeout();
    await expectElementSnapshot(profilePage.userInfo.rootElement, 'profile-page-unauthorise-user.png', { threshold: 0.3 });
  });
});
