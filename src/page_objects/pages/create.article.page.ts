import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';
import { ICreateArticle } from '../../utils/types';
import logger from '../../configs/logger';

export default class CreateArticlePage extends BasePage {
  readonly titleInput: Locator;

  readonly descriptionInput: Locator;

  readonly bodyInput: Locator;

  readonly tagsInput: Locator;

  readonly publishArticleButton: Locator;

  constructor(page: Page, readonly url: string = '/editor') {
    super(page);
    this.url = url;
    this.titleInput = this.page.locator('[data-qa-id=editor-title]');
    this.descriptionInput = this.page.locator('[data-qa-id=editor-description]');
    this.bodyInput = this.page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = this.page.locator('[data-qa-id=editor-tags]');
    this.publishArticleButton = this.page.locator('[data-qa-id=editor-publish]');
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async createArticleWith(article: ICreateArticle): Promise<void> {
    const { title, description, body, tagList } = article;

    logger.debug(`Create an article with - ${JSON.stringify({ title, description, body, tagList })}`);

    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);

    // eslint-disable-next-line no-restricted-syntax
    for await (const tag of tagList) {
      await this.tagsInput.fill(tag);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(500);
    }

    await Promise.all([this.page.waitForNavigation(), this.publishArticleButton.click()]);
  }
}
