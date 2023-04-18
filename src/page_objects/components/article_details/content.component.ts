import { Locator } from '@playwright/test';
import Component from '../base.component';

export class Content extends Component {
  readonly body: Locator;

  readonly tags: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.body = this.rootElement.locator('[data-qa-id=article-body]');
    this.tags = this.rootElement.locator('[data-qa-id=article-tags] a');
  }
}
