import { createUser } from '../../utils/api/helpers';
import { test } from '../../utils/fixtures';
import { generateUser } from '../../utils/models/user';
import { expectToHaveCount, expectElementsText, expectElementToBeVisible, expectToHaveAttribute } from '../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Sign In', () => {
  const { username, email, password } = generateUser();

  test.beforeAll(async () => {
    await test.step('Sign up user via API', async () => {
      await createUser({ username, email, password });
    });
  });

  test.beforeEach(async ({ homePage }) => {
    await test.step('Open Home page', async () => {
      await homePage.goto();
    });

    await homePage.header.clickOnSignIn();
  });

  test('should successfully sign in', async ({ homePage, signInPage }) => {
    await signInPage.checkPageUrl();
    await signInPage.checkPageTitle('Conduit');

    await expectElementToBeVisible(signInPage.title);
    await expectElementToBeVisible(signInPage.needAnAccountLink);
    await expectToHaveAttribute(signInPage.needAnAccountLink, 'href', '/register');

    await signInPage.login({ email, password });

    await homePage.checkPageUrl();
    await expectToHaveCount(homePage.header.allHeaderLinks, 4);
    await expectElementsText(homePage.header.allHeaderLinks, ['Home', 'New Article', 'Settings', username]);
  });
});
