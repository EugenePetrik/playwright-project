import { Locator } from '@playwright/test';
import Component from './base.component';
import { waitFor } from '../../utils/common';

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
      const articles = await this.rootElement.count();
      return articles >= 1;
    });
  }

  async getArticleTitle(index = 0): Promise<string> {
    return this.title.nth(index).textContent();
  }

  async clickOnLikeButton(index = 0): Promise<void> {
    return this.likeButton.nth(index).click();
  }
}
