import { test } from '../../utils/fixtures';
import { generateUser } from '../../utils/models/user';
import { getRandomArticle } from '../../utils/models/article';
import { createUserAndGetToken, getAuthContext } from '../../utils/api/helpers';
import { ArticleAPIClient } from '../../api/core/articles.api';
import type { IArticleResponse } from '../../utils/types';
import { expectElementToBeVisible } from '../../utils/expect';
import userResponse from '../../utils/mocks/user.json';
import updateArticleResponse from '../../utils/mocks/article.json';
import commentsResponse from '../../utils/mocks/comments.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Article Details page - snapshots', () => {
  let token: string;
  let slug: string;

  const { username, email, password } = generateUser();
  const { title, description, body, tagList } = getRandomArticle();

  test.beforeAll(async () => {
    token = await createUserAndGetToken({ username, email, password });
    const context = await getAuthContext({ token });
    const articleClient = new ArticleAPIClient(context);
    const createArticleResp = await articleClient.createArticleAPI({ title, description, body, tagList });
    ({ slug } = ((await createArticleResp.json()) as IArticleResponse).article);
  });

  test.beforeEach(async ({ homePage, articleDetailsPage }) => {
    await homePage.loginViaAPI(token);

    await articleDetailsPage.mockResponse(MOCK_ROUTES.USER, userResponse);
    await articleDetailsPage.mockResponse(MOCK_ROUTES.ARTICLE_DETAILS, updateArticleResponse);
    await articleDetailsPage.mockResponse(MOCK_ROUTES.COMMENTS, commentsResponse);
    await articleDetailsPage.goto(slug);
  });

  test('should open the page', async ({ articleDetailsPage }) => {
    await expectElementToBeVisible(articleDetailsPage.banner.title);
    await expectElementToBeVisible(articleDetailsPage.content.body);
    await expectElementToBeVisible(articleDetailsPage.actions.articleEditButton);
    await expectElementToBeVisible(articleDetailsPage.commentForm.commentInput);

    await articleDetailsPage.waitForTimeout();
    await articleDetailsPage.checkPageSnapshot('details-article-page.png');
  });
});
