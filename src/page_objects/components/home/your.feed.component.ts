import { Locator } from '@playwright/test';
import Component from '../base.component';

export class YourFeedTab extends Component {
  readonly noArticlesTitle: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.noArticlesTitle = this.rootElement.locator('div.article-preview');
  }
}
