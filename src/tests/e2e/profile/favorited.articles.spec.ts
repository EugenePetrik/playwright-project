import type { APIRequestContext } from '@playwright/test';
import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures';
import { createUserAndGetToken, getAuthContext } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import { ArticleAPIClient } from '../../../api/core/articles.api';
import {
  expectElementToContainText,
  expectElementsToContainText,
  expectElementToBeVisible,
  expectElementToHaveText,
  expectToHaveCount,
} from '../../../utils/expect';
import type { ArticleResponse } from '../../../utils/types';

test.describe('Profile - Favorited articles', () => {
  let context: APIRequestContext;
  let token: string;

  const { username, email, password } = generateUser();
  const { title, description, body, tagList } = getRandomArticle();

  test.beforeAll(async () => {
    token = await createUserAndGetToken({ username, email, password });
    context = await getAuthContext({ token });
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.loginViaAPI(token);
  });

  test.describe('without articles', () => {
    test.beforeEach(async ({ profilePage }) => {
      await profilePage.goto(username);
      await profilePage.tabs.clickOnFavoritedArticlesTab();
    });

    test('should not display articles', async ({ profilePage }) => {
      await profilePage.checkPageUrl(`/@${username}/favorites`);
      await profilePage.checkPageTitle('Conduit');

      await expectElementToContainText(profilePage.favoritedArticles.noArticlesTitle, 'No articles are here... yet.');
    });
  });

  test.describe('with articles', () => {
    test.beforeAll(async () => {
      const articleClient = new ArticleAPIClient(context);
      const createArticleResp = await articleClient.createArticleAPI({ title, description, body, tagList });
      const { slug } = ((await createArticleResp.json()) as ArticleResponse).article;
      await articleClient.addArticleToFavoriteAPI(slug);
    });

    test.beforeEach(async ({ profilePage }) => {
      await profilePage.goto(username);
      await profilePage.tabs.clickOnFavoritedArticlesTab();
    });

    test('should open the page', async ({ profilePage }) => {
      await profilePage.checkPageUrl(`/@${username}/favorites`);
      await profilePage.checkPageTitle('Conduit');

      await expectElementToBeVisible(profilePage.userInfo.userImage);
      await expectElementToHaveText(profilePage.userInfo.username, username);
      await expectElementToBeVisible(profilePage.userInfo.editProfileSettings);
    });

    test('should display articles', async ({ profilePage }) => {
      await profilePage.myArticles.article.waitForArticles();

      await expectToHaveCount(profilePage.myArticles.article.rootElement, 1);
      await expectElementsToContainText(profilePage.myArticles.article.title, title);
    });
  });
});
