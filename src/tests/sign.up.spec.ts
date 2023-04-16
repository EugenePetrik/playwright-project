import { test } from '../utils/fixtures';
import { generateUser } from '../utils/models/user';
import { expectElementVisibility } from '../utils/expect';

test.describe('User Sign Up', () => {
  const { username, email, password } = generateUser();

  test('should successfully sign up', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.header.clickOnSignUp();

    await signUpPage.checkPageUrl();
    await signUpPage.register({ username, email, password });

    await homePage.checkPageUrl();

    await expectElementVisibility(homePage.header.newArticleButton);
    await expectElementVisibility(homePage.header.settingsButton);
  });
});
