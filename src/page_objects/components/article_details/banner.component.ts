import type { Locator, Page } from '@playwright/test';
import Component from '../base.component';
import UserInfo from '../user.info.component';
import { Action } from '../../../lib/core';

export class Banner extends Component {
  readonly page: Page;

  readonly userInfo: UserInfo;

  readonly title: Locator;

  readonly articleEditButton: Locator;

  readonly articleDeleteButton: Locator;

  readonly articleFollowButton: Locator;

  readonly articleFavoriteButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.userInfo = new UserInfo(this.rootElement.locator('div.article-meta'));
    this.title = this.rootElement.locator('[data-qa-id=article-title]');
    this.articleEditButton = this.rootElement.locator('[data-qa-id=article-edit]');
    this.articleDeleteButton = this.rootElement.locator('[data-qa-id=article-delete]');
    this.articleFollowButton = this.rootElement.locator('[data-qa-id=article-follow]');
    this.articleFavoriteButton = this.rootElement.locator('[data-qa-id=article-favorite]');
  }

  async clickOnArticleEditButton(): Promise<void> {
    await Action.click(this.articleEditButton);
  }

  async clickOnArticleDeleteButton(): Promise<void> {
    await Action.click(this.articleDeleteButton);
  }
}
