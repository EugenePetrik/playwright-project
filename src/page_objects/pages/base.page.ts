import { expect, Page } from '@playwright/test';
import logger from '../../configs/logger';
import BaseConfig from '../../configs/base.config';
import Header from '../components/header.component';
import Footer from '../components/footer.component';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

export default abstract class BasePage implements IPage {
  readonly url: string;

  readonly header: Header;

  readonly footer: Footer;

  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator('[data-qa-id=site-header]'));
    this.footer = new Footer(this.page.locator('[data-qa-id=site-footer]'));
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
