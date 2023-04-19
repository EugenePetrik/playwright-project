import { Locator, Page } from '@playwright/test';
import Component from './base.component';
import { ICreateArticle } from '../../utils/types';
import logger from '../../configs/logger';

export class Form extends Component {
  readonly page: Page;

  readonly titleInput: Locator;

  readonly descriptionInput: Locator;

  readonly bodyInput: Locator;

  readonly tagsInput: Locator;

  readonly publishArticleButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.titleInput = this.rootElement.locator('[data-qa-id=editor-title]');
    this.descriptionInput = this.rootElement.locator('[data-qa-id=editor-description]');
    this.bodyInput = this.rootElement.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = this.rootElement.locator('[data-qa-id=editor-tags]');
    this.publishArticleButton = this.rootElement.locator('[data-qa-id=editor-publish]');
  }

  async fillInFormWith(article: ICreateArticle): Promise<void> {
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
