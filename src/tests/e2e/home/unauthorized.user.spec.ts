import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures';
import { createUserAndGetToken, getAuthContext } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import { ArticleAPIClient } from '../../../api/core/articles.api';
import {
  expectElementToContainText,
  expectElementToBeVisible,
  expectElementToBeHidden,
  expectToHaveAttribute,
  expectElementsToBeGreaterThan,
  expectElementsToContainText,
} from '../../../utils/expect';
import type { ArticleResponse } from '../../../utils/types';

test.describe('Home page for unauthorized user', () => {
  const { username, email, password } = generateUser();
  const article = getRandomArticle();

  test.beforeAll(async () => {
    const token = await createUserAndGetToken({ username, email, password });
    const context = await getAuthContext({ token });

    const articleClient = new ArticleAPIClient(context);
    const createArticleResp = await articleClient.createArticleAPI(article);
    const { slug } = ((await createArticleResp.json()) as ArticleResponse).article;
    await articleClient.addArticleToFavoriteAPI(slug);
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should have brand logo in navigation bar', async ({ homePage }) => {
    await expectElementToBeVisible(homePage.header.brandLogo);
    await expectToHaveAttribute(homePage.header.brandLogo, 'href', '/');
  });

  test('should have banner', async ({ homePage }) => {
    await expectElementToContainText(homePage.banner.title, 'conduit');
    await expectElementToContainText(homePage.banner.description, 'A place to share your knowledge.');
  });

  test('should not have your feed', async ({ homePage }) => {
    await expectElementToBeHidden(homePage.yourFeedTab.rootElement);
  });

  test('should have global feed', async ({ homePage }) => {
    await homePage.checkPageUrl('/');
    await homePage.globalFeedTab.waitForArticles();

    await expectElementsToBeGreaterThan(homePage.globalFeedTab.article.rootElement, 3);
    await expectElementsToContainText(homePage.globalFeedTab.article.title, article.article.title);
  });

  test('should have popular tags', async ({ homePage }) => {
    await homePage.checkPageUrl('/');
    await homePage.popularTags.waitForPopularTags();

    await expectElementToContainText(homePage.popularTags.title, 'Popular Tags');
    await expectElementsToBeGreaterThan(homePage.popularTags.tags, 3);

    // eslint-disable-next-line no-restricted-syntax
    for (const tag of article.article.tagList) {
      await expectElementsToContainText(homePage.popularTags.tags, tag);
    }
  });

  test('should have footer', async ({ homePage }) => {
    await expectElementToBeVisible(homePage.footer.brandLogo);
    await expectToHaveAttribute(homePage.footer.brandLogo, 'href', '/');
    await expectElementToContainText(homePage.footer.attribution, 'An interactive learning project from');
    await expectElementToContainText(homePage.footer.attribution, 'Thinkster. Code & design licensed under MIT.');
  });
});
