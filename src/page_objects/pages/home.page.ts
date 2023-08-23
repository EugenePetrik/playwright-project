import type { Page } from '@playwright/test';
import BasePage from './base.page';
import { Banner, GlobalFeedTab, PopularTags, Tabs, YourFeedTab } from '../components/home';

export default class HomePage extends BasePage {
  readonly globalFeedTab: GlobalFeedTab;

  readonly banner: Banner;

  readonly tabs: Tabs;

  readonly popularTags: PopularTags;

  readonly yourFeedTab: YourFeedTab;

  constructor(
    page: Page,
    readonly url: string = '/',
  ) {
    super(page);
    this.url = url;
    this.globalFeedTab = new GlobalFeedTab(this.page.locator('div.home-global'));
    this.banner = new Banner(this.page.locator('div.banner'));
    this.tabs = new Tabs(this.page.locator('[data-qa-id=feed-tabs]'));
    this.popularTags = new PopularTags(this.page.locator('div.sidebar'));
    this.yourFeedTab = new YourFeedTab(this.page.locator('div.home-my-feed'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async loginViaAPI(authToken: string): Promise<void> {
    await this.goto();

    await this.page.evaluate(token => {
      localStorage.setItem('id_token', token);
    }, authToken);

    await this.page.reload();
  }
}
