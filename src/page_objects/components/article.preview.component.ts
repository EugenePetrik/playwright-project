import { Locator } from '@playwright/test';
import Component from './base.component';

export class ArticlePreview extends Component {
  readonly title: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootElement.locator('[data-qa-type=preview-title]');
  }
}
