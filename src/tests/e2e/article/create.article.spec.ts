import dayjs from 'dayjs';
import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures';
import { createUserAndGetToken } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import {
  expectElementToBeVisible,
  expectElementToHaveText,
  expectElementsText,
  expectToHaveCount,
  expectElementsToContainText,
} from '../../../utils/expect';

test.describe('Create a new article', () => {
  let token: string;

  const { username, email, password } = generateUser();
  const { title, description, body, tagList } = getRandomArticle();

  test.beforeAll(async () => {
    token = await createUserAndGetToken({ username, email, password });
  });

  test.beforeEach(async ({ homePage, createArticlePage }) => {
    await homePage.loginViaAPI(token);
    await createArticlePage.goto();
  });

  test('should create a new article', async ({ createArticlePage, articleDetailsPage, profilePage }) => {
    await createArticlePage.form.fillInFormWith({ title, description, body, tagList });

    await articleDetailsPage.checkPageUrl();
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

    await profilePage.goto(username);

    await profilePage.checkPageUrl(`/@${username}`);
    await profilePage.myArticles.article.waitForArticles();

    await expectToHaveCount(profilePage.myArticles.article.rootElement, 1);
    await expectElementsToContainText(profilePage.myArticles.article.title, title);
  });
});
