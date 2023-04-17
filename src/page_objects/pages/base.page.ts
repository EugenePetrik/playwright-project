import { expect, Page } from '@playwright/test';
import logger from '../../configs/logger';
import Header from '../components/header.component';
import BaseConfig from '../../configs/base.config';

export default abstract class BasePage {
  readonly url: string;

  readonly header: Header;

  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator('[data-qa-id=site-header]'));
  }

  async goto(url: string): Promise<void> {
    logger.debug(`Navigate to URL - ${BaseConfig.webURL}${url}`);
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  async checkPageUrl(url = this.url): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(url));
  }
}
