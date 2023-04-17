import { test as baseTest } from '@playwright/test';
import SignUpPage from '../page_objects/pages/sign.up.page';
import SignInPage from '../page_objects/pages/sign.in.page';
import HomePage from '../page_objects/pages/home.page';
import SettingsPage from '../page_objects/pages/settings.page';
import ProfilePage from '../page_objects/pages/profile.page';

export const test = baseTest.extend<{
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  settingsPage: SettingsPage;
  profilePage: ProfilePage;
}>({
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
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});
