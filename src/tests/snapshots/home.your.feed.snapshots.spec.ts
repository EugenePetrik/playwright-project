import { test } from '../../utils/fixtures/fixturePages';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import userResponse from '../../utils/mocks/user.json';
import feedResponse from '../../utils/mocks/your.feed.json';
import feedEmptyResponse from '../../utils/mocks/your.feed.empty.json';
import tagsResponse from '../../utils/mocks/tags.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Home page > Your feed - snapshots', () => {
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
    test.beforeEach(async ({ homePage }) => {
      await homePage.mockResponse(MOCK_ROUTES.USER, userResponse);
      await homePage.mockResponse(MOCK_ROUTES.YOUR_FEED, feedResponse);
      await homePage.mockResponse(MOCK_ROUTES.TAGS, tagsResponse);

      await homePage.goto();
      await homePage.tabs.clickOnYourFeedTab();
    });

    test('should open the page', async ({ homePage }) => {
      await homePage.waitForTimeout();
      await homePage.checkPageSnapshot('home-page-your-feed-with-articles.png');
    });
  });

  test.describe('without articles', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.mockResponse(MOCK_ROUTES.USER, userResponse);
      await homePage.mockResponse(MOCK_ROUTES.YOUR_FEED, feedEmptyResponse);
      await homePage.mockResponse(MOCK_ROUTES.TAGS, tagsResponse);

      await homePage.goto();
      await homePage.tabs.clickOnYourFeedTab();
    });

    test('should open the page', async ({ homePage }) => {
      await homePage.waitForTimeout();
      await homePage.checkPageSnapshot('home-page-your-feed-without-articles.png');
    });
  });
});
