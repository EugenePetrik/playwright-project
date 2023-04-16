import { test as baseTest } from '@playwright/test';
import SignUpPage from '../page_objects/pages/sign.up.page';
import SignInPage from '../page_objects/pages/sign.in.page';
import HomePage from '../page_objects/pages/home.page';
import SettingsPage from '../page_objects/pages/settings.page';
import Api from '../api/api';

export const test = baseTest.extend<{
  api: Api;
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  settingsPage: SettingsPage;
}>({
  api: async ({ request }, use) => {
    await use(new Api(request));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
});
