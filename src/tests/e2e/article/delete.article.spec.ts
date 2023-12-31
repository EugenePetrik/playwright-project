import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures/fixturePages';
import { createUserAndGetToken, getAuthContext } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import { ArticleAPIClient } from '../../../api/core/articles.api';
import { expectElementsNotToContainText } from '../../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Delete an article', () => {
  let token: string;
  let slug: string;

  const { username, email, password } = generateUser();
  const { title, description, body, tagList } = getRandomArticle();

  test.beforeAll(async () => {
    token = await createUserAndGetToken({ username, email, password });
    const context = await getAuthContext({ token });
    const articleClient = new ArticleAPIClient(context);
    const createArticleResp = await articleClient.createArticleAPI({ title, description, body, tagList });
    ({ slug } = createArticleResp.article);
  });

  test.beforeEach(async ({ articleDetailsPage, homePage }) => {
    await homePage.loginViaAPI(token);
    await articleDetailsPage.goto(slug);
  });

  test('should remove an article', async ({ articleDetailsPage, homePage }) => {
    await articleDetailsPage.banner.clickOnArticleDeleteButton();

    await homePage.checkPageUrl('/');
    await homePage.checkPageTitle('Conduit');

    await homePage.globalFeedTab.article.waitForArticles();

    await expectElementsNotToContainText(homePage.globalFeedTab.article.title, title);
  });
});
