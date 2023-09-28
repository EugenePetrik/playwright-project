import { test as base } from '@playwright/test';
import SignUpPage from '../../page_objects/pages/sign.up.page';
import SignInPage from '../../page_objects/pages/sign.in.page';
import HomePage from '../../page_objects/pages/home.page';
import SettingsPage from '../../page_objects/pages/settings.page';
import ProfilePage from '../../page_objects/pages/profile.page';
import CreateArticlePage from '../../page_objects/pages/article/create.page';
import UpdateArticlePage from '../../page_objects/pages/article/update.page';
import ArticleDetailsPage from '../../page_objects/pages/article/details.page';

type Pages = {
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  settingsPage: SettingsPage;
  profilePage: ProfilePage;
  createArticlePage: CreateArticlePage;
  updateArticlePage: UpdateArticlePage;
  articleDetailsPage: ArticleDetailsPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },
  updateArticlePage: async ({ page }, use) => {
    const updateArticlePage = new UpdateArticlePage(page);
    await use(updateArticlePage);
  },
  articleDetailsPage: async ({ page }, use) => {
    const articleDetailsPage = new ArticleDetailsPage(page);
    await use(articleDetailsPage);
  },
});
