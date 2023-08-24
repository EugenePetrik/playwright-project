import { test } from '../../utils/fixtures';
import feedResponse from '../../utils/mocks/global.feed.json';
import feedEmptyResponse from '../../utils/mocks/global.feed.empty.json';
import tagsResponse from '../../utils/mocks/tags.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Home page > Global feed - snapshots', () => {
  test.describe('with articles', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.mockResponse(MOCK_ROUTES.GLOBAL_FEED, feedResponse);
      await homePage.mockResponse(MOCK_ROUTES.TAGS, tagsResponse);
      await homePage.goto();
    });

    test('should open the page', async ({ homePage }) => {
      await homePage.waitForTimeout();
      await homePage.checkPageSnapshot('home-page-global-feed-with-articles.png');
    });
  });

  test.describe('without articles', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.mockResponse(MOCK_ROUTES.GLOBAL_FEED, feedEmptyResponse);
      await homePage.mockResponse(MOCK_ROUTES.TAGS, tagsResponse);
      await homePage.goto();
    });

    test('should open the page', async ({ homePage }) => {
      await homePage.waitForTimeout();
      await homePage.checkPageSnapshot('home-page-global-feed-without-articles.png');
    });
  });
});
