import type { Locator } from '@playwright/test';
import Component from './base.component';
import { waitFor } from '../../utils/common';
import { Action, Element, Elements } from '../../lib/core';

export class ArticlePreview extends Component {
  readonly title: Locator;

  readonly likeButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootElement.locator('[data-qa-type=preview-title]');
    this.likeButton = this.rootElement.locator('[data-qa-type=article-favorite]');
  }

  async waitForArticles(): Promise<void> {
    await waitFor(async () => {
      const articles = (await Elements.getCount(this.rootElement)) as number;
      return articles >= 1;
    });
  }

  async getArticleTitle(index = 0): Promise<string> {
    return (await Element.getText(this.title.nth(index))) as string;
  }

  async clickOnLikeButton(index = 0): Promise<void> {
    await Action.click(this.likeButton.nth(index));
  }
}
