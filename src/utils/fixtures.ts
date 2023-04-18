import { test as baseTest } from '@playwright/test';
import SignUpPage from '../page_objects/pages/sign.up.page';
import SignInPage from '../page_objects/pages/sign.in.page';
import HomePage from '../page_objects/pages/home.page';
import SettingsPage from '../page_objects/pages/settings.page';
import ProfilePage from '../page_objects/pages/profile.page';
import CreateArticlePage from '../page_objects/pages/create.article.page';
import ArticleDetailsPage from '../page_objects/pages/article.details.page';

export const test = baseTest.extend<{
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  settingsPage: SettingsPage;
  profilePage: ProfilePage;
  createArticlePage: CreateArticlePage;
  articleDetailsPage: ArticleDetailsPage;
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
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  articleDetailsPage: async ({ page }, use) => {
    await use(new ArticleDetailsPage(page));
  },
});
