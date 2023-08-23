import { type APIRequestContext, test } from '@playwright/test';
import { generateUser } from '../../utils/models/user';
import { getRandomArticle, getRandomUpdateArticle } from '../../utils/models/article';
import { getAuthAPIContext } from '../../api/context/auth.context';
import { ArticleAPIClient } from '../../api/core/articles.api';
import { createUserAndGetToken } from '../../utils/api/helpers';
import type { IArticleResponse, IArticlesResponse } from '../../utils/types';
import { expectStatusCode } from '../../utils/api/assertions/solutions';
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
    const createArticleJson = (await createArticleResp.json()) as IArticleResponse;

    await expectStatusCode({ actual: createArticleResp.status(), expected: 200, api: createArticleResp.url() });
    await assertArticleTitle({ actualArticle: createArticleJson, expectedArticle: article });

    await validateSchema({ schema: articleSchema, json: createArticleJson });

    const { slug } = createArticleJson.article;

    const getArticleResponse = await articleClient.getArticleAPI(slug);
    await assertArticleSlug({ actualArticle: createArticleJson, expectedArticle: (await getArticleResponse.json()) as IArticleResponse });
  });

  test('Update article', async () => {
    const article = getRandomArticle();
    const articleClient = new ArticleAPIClient(context);

    const createArticleResp = await articleClient.createArticleAPI(article);
    const createArticleJson = (await createArticleResp.json()) as IArticleResponse;

    const { slug } = createArticleJson.article;

    const newArticle = getRandomUpdateArticle({ slug, user });
    const updateArticleResp = await articleClient.updateArticleAPI(slug, newArticle);
    const updateArticleJson = (await updateArticleResp.json()) as IArticleResponse;

    await assertArticleSlug({ actualArticle: updateArticleJson, expectedArticle: createArticleJson });
    await assertArticleTitle({ actualArticle: updateArticleJson, expectedArticle: newArticle });

    const getArticleResponse = await articleClient.getArticleAPI(slug);
    const getArticleJson = (await getArticleResponse.json()) as IArticleResponse;
    await assertArticleSlug({ actualArticle: updateArticleJson, expectedArticle: getArticleJson });
  });

  test('Delete article', async () => {
    const article = getRandomArticle();
    const articleClient = new ArticleAPIClient(context);

    const createArticleResp = await articleClient.createArticleAPI(article);
    const createArticleJson = (await createArticleResp.json()) as IArticleResponse;

    const { slug } = createArticleJson.article;

    await articleClient.deleteArticleAPI(slug);

    const getArticlesResp = await articleClient.getArticlesAPI();
    const getArticlesJson = (await getArticlesResp.json()) as IArticlesResponse;
    await assertArticlesNotContainArticle({ actualArticle: getArticlesJson, expectedArticle: createArticleJson });
  });
});
