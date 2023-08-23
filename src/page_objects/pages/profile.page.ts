import type { Page } from '@playwright/test';
import BasePage from './base.page';
import { FavoritedArticles, MyArticles, Tabs, UserInfo } from '../components/profile';

export default class ProfilePage extends BasePage {
  readonly favoritedArticles: FavoritedArticles;

  readonly myArticles: MyArticles;

  readonly userInfo: UserInfo;

  readonly tabs: Tabs;

  constructor(
    page: Page,
    readonly url: string = '/@',
  ) {
    super(page);
    this.url = url;
    this.favoritedArticles = new FavoritedArticles(this.page.locator('[data-qa-type=article-list]'));
    this.myArticles = new MyArticles(this.page.locator('[data-qa-type=article-list]'));
    this.userInfo = new UserInfo(this.page.locator('div.user-info'));
    this.tabs = new Tabs(this.page.locator('[data-qa-id=profile-tabs]'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(`/@${url}`);
  }
}
