import type { Locator, Page } from '@playwright/test';
import Component from './base.component';
import type { ICreateArticle } from '../../utils/types';
import logger from '../../configs/logger';
import { Action, Waiter } from '../../lib/core';
import { TIMEOUTS } from '../../configs/timeouts';

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

    await Action.fill(this.titleInput, title);
    await Action.fill(this.descriptionInput, description);
    await Action.fill(this.bodyInput, body);

    // eslint-disable-next-line no-restricted-syntax
    for await (const tag of tagList) {
      await Action.fill(this.tagsInput, tag);
      await Action.press(this.tagsInput, 'Enter');
      await Waiter.waitForTimeout({ page: this.page, timeout: TIMEOUTS.HALF_A_SEC });
    }

    await Action.click(this.publishArticleButton);
  }
}
