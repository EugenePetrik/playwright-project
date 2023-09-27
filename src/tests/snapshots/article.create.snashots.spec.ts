import { test } from '../../utils/fixtures/fixturePages';
import { generateUser } from '../../utils/models/user';
import { createUserAndGetToken } from '../../utils/api/helpers';
import { expectElementToBeVisible } from '../../utils/expect';
import userResponse from '../../utils/mocks/user.json';
import MOCK_ROUTES from '../../utils/mock.routes';

test.describe('Create Article page - snapshots', () => {
  let authToken: string;
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API and get auth token', async () => {
      authToken = await createUserAndGetToken({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage, createArticlePage }) => {
    await homePage.loginViaAPI(authToken);

    await createArticlePage.mockResponse(MOCK_ROUTES.USER, userResponse);
    await createArticlePage.goto();
  });

  test('should open the page', async ({ createArticlePage }) => {
    await expectElementToBeVisible(createArticlePage.form.titleInput);
    await expectElementToBeVisible(createArticlePage.form.publishArticleButton);

    await createArticlePage.waitForTimeout();
    await createArticlePage.checkPageSnapshot('create-article-page.png');
  });
});
