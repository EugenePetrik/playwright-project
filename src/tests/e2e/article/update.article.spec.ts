import dayjs from 'dayjs';
import { generateUser } from '../../../utils/models/user';
import { test } from '../../../utils/fixtures/fixturePages';
import { createUserAndGetToken, getAuthContext } from '../../../utils/api/helpers';
import { getRandomArticle } from '../../../utils/models/article';
import { ArticleAPIClient } from '../../../api/core/articles.api';
import { expectElementToBeVisible, expectElementToHaveText, expectElementsText } from '../../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Update an article', () => {
  let token: string;
  let slug: string;

  const { username, email, password } = generateUser();
  const newArticle = getRandomArticle();

  test.beforeAll(async () => {
    token = await createUserAndGetToken({ username, email, password });
    const context = await getAuthContext({ token });
    const articleClient = new ArticleAPIClient(context);
    const createArticleResp = await articleClient.createArticleAPI(newArticle);
    ({ slug } = createArticleResp.article);
  });

  test.beforeEach(async ({ homePage, articleDetailsPage }) => {
    await homePage.loginViaAPI(token);
    await articleDetailsPage.goto(slug);
    await articleDetailsPage.banner.clickOnArticleEditButton();
  });

  test('should open the page', async ({ updateArticlePage }) => {
    await updateArticlePage.checkPageUrl(`/editor/${slug}`);
    await updateArticlePage.checkPageTitle('Conduit');

    await expectElementToBeVisible(updateArticlePage.form.titleInput);
    await expectElementToBeVisible(updateArticlePage.form.descriptionInput);
    await expectElementToBeVisible(updateArticlePage.form.bodyInput);
    await expectElementToBeVisible(updateArticlePage.form.tagsInput);
  });

  test('should update an article', async ({ updateArticlePage, articleDetailsPage }) => {
    const updateArticle = getRandomArticle();
    const { title, body } = updateArticle;

    await updateArticlePage.form.fillInFormWith(updateArticle);

    await articleDetailsPage.checkPageUrl(`/articles/${slug}`);
    await updateArticlePage.checkPageTitle('Conduit');

    await expectElementToHaveText(articleDetailsPage.banner.title, title);
    await expectElementToBeVisible(articleDetailsPage.banner.articleEditButton);
    await expectElementToBeVisible(articleDetailsPage.banner.articleDeleteButton);

    await expectElementToBeVisible(articleDetailsPage.banner.userInfo.authorAvatar);
    await expectElementToHaveText(articleDetailsPage.banner.userInfo.authorName, username);
    await expectElementToHaveText(articleDetailsPage.banner.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));

    await expectElementToHaveText(articleDetailsPage.content.body, body);
    await expectElementsText(articleDetailsPage.content.tags, [...newArticle.tagList, ...updateArticle.tagList]);

    await expectElementToBeVisible(articleDetailsPage.actions.userInfo.authorAvatar);
    await expectElementToHaveText(articleDetailsPage.actions.userInfo.authorName, username);
    await expectElementToHaveText(articleDetailsPage.actions.userInfo.articleDate, dayjs().format('MMMM D, YYYY'));
    await expectElementToBeVisible(articleDetailsPage.actions.articleEditButton);
    await expectElementToBeVisible(articleDetailsPage.actions.articleDeleteButton);

    await expectElementToBeVisible(articleDetailsPage.commentForm.commentInput);
    await expectElementToBeVisible(articleDetailsPage.commentForm.postCommentButton);
  });
});
