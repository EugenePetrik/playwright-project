import dayjs from 'dayjs';
import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures/fixturePages';
import { createUserAndGetToken, getAuthContext } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import { ArticleAPIClient } from '../../../api/core/articles.api';
import type { IArticleResponse } from '../../../utils/types';
import { expectElementToBeHidden, expectElementToBeVisible, expectElementToHaveText, expectElementsText } from '../../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Article Details', () => {
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

  test.describe('as unauthorized user', () => {
    test.beforeEach(async ({ articleDetailsPage }) => {
      await articleDetailsPage.goto(slug);
    });

    test('should open the page', async ({ articleDetailsPage }) => {
      await articleDetailsPage.checkPageUrl(`/articles/${slug}`);
      await articleDetailsPage.checkPageTitle('Conduit');

      await expectElementToHaveText(articleDetailsPage.banner.title, title);

      await expectElementToBeVisible(articleDetailsPage.banner.articleFollowButton);
      await expectElementToBeVisible(articleDetailsPage.banner.articleFavoriteButton);

      await expectElementToBeHidden(articleDetailsPage.banner.articleEditButton);
      await expectElementToBeHidden(articleDetailsPage.banner.articleDeleteButton);

      await expectElementToBeVisible(articleDetailsPage.banner.userInfo.authorAvatar);
      await expectElementToHaveText(articleDetailsPage.banner.userInfo.authorName, username);
      await expectElementToHaveText(articleDetailsPage.banner.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));

      await expectElementToHaveText(articleDetailsPage.content.body, body);
      await expectElementsText(articleDetailsPage.content.tags, tagList);

      await expectElementToBeVisible(articleDetailsPage.actions.userInfo.authorAvatar);
      await expectElementToHaveText(articleDetailsPage.actions.userInfo.authorName, username);
      await expectElementToHaveText(articleDetailsPage.actions.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));

      await expectElementToBeVisible(articleDetailsPage.actions.articleFollowButton);
      await expectElementToBeVisible(articleDetailsPage.actions.articleFavoriteButton);

      await expectElementToBeHidden(articleDetailsPage.commentForm.commentInput);
      await expectElementToBeHidden(articleDetailsPage.commentForm.postCommentButton);
    });
  });

  test.describe('as authorized user', () => {
    test.beforeEach(async ({ articleDetailsPage, homePage }) => {
      await homePage.loginViaAPI(token);
      await articleDetailsPage.goto(slug);
    });

    test('should open the page', async ({ articleDetailsPage }) => {
      await articleDetailsPage.checkPageUrl(`/articles/${slug}`);
      await articleDetailsPage.checkPageTitle('Conduit');

      await expectElementToHaveText(articleDetailsPage.banner.title, title);
      await expectElementToBeVisible(articleDetailsPage.banner.articleEditButton);
      await expectElementToBeVisible(articleDetailsPage.banner.articleDeleteButton);

      await expectElementToBeVisible(articleDetailsPage.banner.userInfo.authorAvatar);
      await expectElementToHaveText(articleDetailsPage.banner.userInfo.authorName, username);
      await expectElementToHaveText(articleDetailsPage.banner.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));

      await expectElementToHaveText(articleDetailsPage.content.body, body);
      await expectElementsText(articleDetailsPage.content.tags, tagList);

      await expectElementToBeVisible(articleDetailsPage.actions.userInfo.authorAvatar);
      await expectElementToHaveText(articleDetailsPage.actions.userInfo.authorName, username);
      await expectElementToHaveText(articleDetailsPage.actions.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));
      await expectElementToBeVisible(articleDetailsPage.actions.articleEditButton);
      await expectElementToBeVisible(articleDetailsPage.actions.articleDeleteButton);

      await expectElementToBeVisible(articleDetailsPage.commentForm.commentInput);
      await expectElementToBeVisible(articleDetailsPage.commentForm.postCommentButton);
    });
  });
});
