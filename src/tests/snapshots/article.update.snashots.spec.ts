import { test } from '../../utils/fixtures/fixturePages';
import { generateUser } from '../../utils/models/user';
import { getRandomArticle } from '../../utils/models/article';
import { createUserAndGetToken, getAuthContext } from '../../utils/api/helpers';
import { ArticleAPIClient } from '../../api/core/articles.api';
import { expectElementSnapshot, expectElementToBeVisible } from '../../utils/expect';
import updateArticleResponse from '../../utils/mocks/article.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Update Article page - snapshots', () => {
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

  test.beforeEach(async ({ homePage, updateArticlePage }) => {
    await homePage.loginViaAPI(token);

    await updateArticlePage.mockResponse(MOCK_ROUTES.UPDATE_ARTICLE, updateArticleResponse);
    await updateArticlePage.goto(slug);
  });

  test('should open the page', async ({ updateArticlePage }) => {
    await expectElementToBeVisible(updateArticlePage.form.titleInput);
    await expectElementToBeVisible(updateArticlePage.form.publishArticleButton);

    await updateArticlePage.waitForTimeout();
    await expectElementSnapshot(updateArticlePage.form.rootElement, 'update-article-page.png');
  });
});
