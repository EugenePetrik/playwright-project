/* eslint-disable no-empty-function */
/* eslint-disable max-classes-per-file */

import { Page } from '@playwright/test';
import SignUpPage from './pages/sign.up.page';
import SignInPage from './pages/sign.in.page';
import HomePage from './pages/home.page';
import SettingsPage from './pages/settings.page';
import ProfilePage from './pages/profile.page';
import CreateArticlePage from './pages/article/create.page';
import UpdateArticlePage from './pages/article/update.page';
import ArticleDetailsPage from './pages/article/details.page';

abstract class PageHolder {
  constructor(protected page: Page) {}
}

export class Application extends PageHolder {
  public homePage = new HomePage(this.page);

  public signUpPage = new SignUpPage(this.page);

  public signInPage = new SignInPage(this.page);

  public settingsPage = new SettingsPage(this.page);

  public profilePage = new ProfilePage(this.page);

  public createArticlePage = new CreateArticlePage(this.page);

  public updateArticlePage = new UpdateArticlePage(this.page);

  public articleDetailsPage = new ArticleDetailsPage(this.page);
}
