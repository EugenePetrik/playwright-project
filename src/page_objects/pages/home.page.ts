import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class HomePage extends BasePage {
  constructor(page: Page, readonly url: string = '/') {
    super(page);
    this.url = url;
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async loginViaApi(authToken: string): Promise<void> {
    await this.goto();

    await this.page.evaluate(token => {
      localStorage.setItem('id_token', token);
    }, authToken);

    await this.page.evaluate(() => {
      return localStorage.getItem('id_token');
    });

    await this.page.reload();
  }
}
