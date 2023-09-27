import { test } from '../../utils/fixtures/fixturePages';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import userResponse from '../../utils/mocks/user.json';
import profilesResponse from '../../utils/mocks/profiles.json';
import favoritedArticlesResponse from '../../utils/mocks/favorited.articles.json';
import favoritedArticlesEmptyResponse from '../../utils/mocks/favorited.articles.empty.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Profile page > Favorited articles - snapshots', () => {
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
      await profilePage.mockResponse(MOCK_ROUTES.FAVORITE_ARTICLE, favoritedArticlesResponse);
      await profilePage.goto(username);
      await profilePage.tabs.clickOnFavoritedArticlesTab();
    });

    test('should open the page', async ({ profilePage }) => {
      await profilePage.waitForTimeout();
      await profilePage.checkPageSnapshot('profile-page-favorited-with-articles.png');
    });
  });

  test.describe('without articles', () => {
    test.beforeEach(async ({ profilePage }) => {
      await profilePage.mockResponse(MOCK_ROUTES.USER, userResponse);
      await profilePage.mockResponse(MOCK_ROUTES.PROFILE, profilesResponse);
      await profilePage.mockResponse(MOCK_ROUTES.FAVORITE_ARTICLE, favoritedArticlesEmptyResponse);
      await profilePage.goto(username);
      await profilePage.tabs.clickOnFavoritedArticlesTab();
    });

    test('should open the page', async ({ profilePage }) => {
      await profilePage.waitForTimeout();
      await profilePage.checkPageSnapshot('profile-page-favorited-without-articles.png');
    });
  });
});
