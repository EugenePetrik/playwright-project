import { test } from '../../utils/fixtures/fixturePages';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import userResponse from '../../utils/mocks/user.json';
import profilesResponse from '../../utils/mocks/profiles.json';
import myArticlesResponse from '../../utils/mocks/my.articles.json';
import myArticlesEmptyResponse from '../../utils/mocks/my.articles.empty.json';
import { expectElementToBeVisible } from '../../utils/expect';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Profile page > My articles - snapshots', () => {
  let authToken: string;
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API and get auth token', async () => {
      authToken = await createUserAndGetToken({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.loginViaAPI(authToken);
  });

  test.describe('with articles', () => {
    test.beforeEach(async ({ profilePage }) => {
      await profilePage.mockResponse(MOCK_ROUTES.USER, userResponse);
      await profilePage.mockResponse(MOCK_ROUTES.PROFILE, profilesResponse);
      await profilePage.mockResponse(MOCK_ROUTES.MY_ARTICLE, myArticlesResponse);
      await profilePage.goto(username);
    });

    test('should open the page', async ({ profilePage }) => {
      await expectElementToBeVisible(profilePage.userInfo.rootElement);
      await expectElementToBeVisible(profilePage.tabs.rootElement);
      await profilePage.waitForTimeout();
      await profilePage.checkPageSnapshot('profile-page-my-articles-with-articles.png');
    });
  });

  test.describe('without articles', () => {
    test.beforeEach(async ({ profilePage }) => {
      await profilePage.mockResponse(MOCK_ROUTES.USER, userResponse);
      await profilePage.mockResponse(MOCK_ROUTES.PROFILE, profilesResponse);
      await profilePage.mockResponse(MOCK_ROUTES.MY_ARTICLE, myArticlesEmptyResponse);
      await profilePage.goto(username);
    });

    test('should open the page', async ({ profilePage }) => {
      await expectElementToBeVisible(profilePage.userInfo.rootElement);
      await expectElementToBeVisible(profilePage.tabs.rootElement);
      await profilePage.waitForTimeout();
      await profilePage.checkPageSnapshot('profile-page-my-articles-without-articles.png');
    });
  });
});
