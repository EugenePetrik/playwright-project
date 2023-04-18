import { Locator } from '@playwright/test';
import Component from '../base.component';
import { ArticlePreview } from '../article.preview.component';
import { waitFor } from '../../../utils/common';

export class FavoritedArticles extends Component {
  readonly article: ArticlePreview;

  readonly noArticlesTitle: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.article = new ArticlePreview(this.rootElement.locator('[data-qa-type=article-preview]'));
    this.noArticlesTitle = this.rootElement.locator('div.article-preview');
  }

  async waitForArticles(): Promise<void> {
    await waitFor(async () => {
      const articles = await this.article.rootElement.count();
      return articles > 0;
    });
  }
}
