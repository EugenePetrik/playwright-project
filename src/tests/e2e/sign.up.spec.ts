import { test } from '../../utils/fixtures';
import { generateUser } from '../../utils/models/user';
import { expectElementToBeVisible, expectToHaveAttribute } from '../../utils/expect';

test.describe.configure({ mode: 'serial' });

test.describe('Sign Up', () => {
  const { username, email, password } = generateUser();

  test('should successfully sign up', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.header.clickOnSignUp();

    await signUpPage.checkPageUrl();
    await signUpPage.checkPageTitle('Conduit');

    await expectElementToBeVisible(signUpPage.title);
    await expectElementToBeVisible(signUpPage.haveAnAccountLink);
    await expectToHaveAttribute(signUpPage.haveAnAccountLink, 'href', '/login');

    await signUpPage.register({ username, email, password });

    await homePage.checkPageUrl();

    await expectElementToBeVisible(homePage.header.newArticleButton);
    await expectElementToBeVisible(homePage.header.settingsButton);
  });
});
