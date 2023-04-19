import { Locator } from '@playwright/test';
import Component from '../base.component';
import { ArticlePreview } from '../article.preview.component';

export class GlobalFeedTab extends Component {
  readonly article: ArticlePreview;

  constructor(locator: Locator) {
    super(locator);
    this.article = new ArticlePreview(this.rootElement.locator('[data-qa-type=article-preview]'));
  }
}
