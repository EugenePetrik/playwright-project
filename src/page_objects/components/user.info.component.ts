import { Locator } from '@playwright/test';
import Component from './base.component';

export default class UserInfo extends Component {
  readonly authorName: Locator;

  readonly authorAvatar: Locator;

  readonly articleDate: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.authorName = this.rootElement.locator('[data-qa-type=author-name]');
    this.authorAvatar = this.rootElement.locator('[data-qa-type=author-avatar]');
    this.articleDate = this.rootElement.locator('[data-qa-type=article-date]');
  }
}
