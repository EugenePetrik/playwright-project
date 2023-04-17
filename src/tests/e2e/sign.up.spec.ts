import { test } from '../../utils/fixtures';
import { generateUser } from '../../utils/models/user';
import { expectElementVisibility, expectToAttribute } from '../../utils/expect';

test.describe('Sign Up', () => {
  const { username, email, password } = generateUser();

  test('should successfully sign up', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.header.clickOnSignUp();

    await signUpPage.checkPageUrl();
    await expectElementVisibility(signUpPage.title);
    await expectElementVisibility(signUpPage.haveAnAccountLink);
    await expectToAttribute(signUpPage.haveAnAccountLink, 'href', '/login');

    await signUpPage.register({ username, email, password });

    await homePage.checkPageUrl();

    await expectElementVisibility(homePage.header.newArticleButton);
    await expectElementVisibility(homePage.header.settingsButton);
  });
});
