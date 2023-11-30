import { type APIRequestContext, test } from '@playwright/test';
import { generateUser } from '../../utils/models/user';
import { getRandomArticle, getRandomUpdateArticle } from '../../utils/models/article';
import { getAuthAPIContext } from '../../api/context/auth.context';
import { ArticleAPIClient } from '../../api/core/articles.api';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { assertArticleSlug, assertArticleTitle, assertArticlesNotContainArticle } from '../../utils/api/assertions/api/articles';
import { validateSchema } from '../../utils/api/schema/validator';
import { articleSchema } from '../../utils/api/schema/api/articles.schema';

test.describe('Articles', () => {
  let context: APIRequestContext;
  let token: string;

  const user = generateUser();

  test.beforeAll(async () => {
    token = await createUserAndGetToken(user);
    context = await getAuthAPIContext({ token });
  });

  test('Create article', async () => {
    const article = getRandomArticle();
    const articleClient = new ArticleAPIClient(context);

    const createArticleResp = await articleClient.createArticleAPI(article);

    await assertArticleTitle({ actualArticle: createArticleResp, expectedArticle: article });

    await validateSchema({ schema: articleSchema, json: createArticleResp });

    const { slug } = createArticleResp.article;

    const getArticleResponse = await articleClient.getArticleAPI(slug);
    await assertArticleSlug({ actualArticle: createArticleResp, expectedArticle: getArticleResponse });
  });

  test('Update article', async () => {
    const article = getRandomArticle();
    const articleClient = new ArticleAPIClient(context);

    const createArticleResp = await articleClient.createArticleAPI(article);

    const { slug } = createArticleResp.article;

    const newArticle = getRandomUpdateArticle({ slug, user });
    const updateArticleResp = await articleClient.updateArticleAPI(slug, newArticle);

    await assertArticleSlug({ actualArticle: updateArticleResp, expectedArticle: createArticleResp });
    await assertArticleTitle({ actualArticle: updateArticleResp, expectedArticle: newArticle });

    const getArticleResponse = await articleClient.getArticleAPI(slug);
    await assertArticleSlug({ actualArticle: updateArticleResp, expectedArticle: getArticleResponse });
  });

  test('Delete article', async () => {
    const article = getRandomArticle();
    const articleClient = new ArticleAPIClient(context);

    const createArticleResp = await articleClient.createArticleAPI(article);

    const { slug } = createArticleResp.article;

    await articleClient.deleteArticleAPI(slug);

    const getArticlesResp = await articleClient.getArticlesAPI();
    await assertArticlesNotContainArticle({ actualArticle: getArticlesResp, expectedArticle: createArticleResp });
  });
});
