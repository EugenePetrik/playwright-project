import { Locator } from '@playwright/test';
import Component from '../base.component';
import UserInfo from '../user.info.component';

export class Actions extends Component {
  readonly userInfo: UserInfo;

  readonly title: Locator;

  readonly articleEditButton: Locator;

  readonly articleDeleteButton: Locator;

  readonly articleFollowButton: Locator;

  readonly articleFavoriteButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.userInfo = new UserInfo(this.rootElement.locator('div.article-meta'));
    this.title = this.rootElement.locator('[data-qa-id=article-title]');
    this.articleEditButton = this.rootElement.locator('[data-qa-id=article-edit]');
    this.articleDeleteButton = this.rootElement.locator('[data-qa-id=article-delete]');
    this.articleFollowButton = this.rootElement.locator('[data-qa-id=article-follow]');
    this.articleFavoriteButton = this.rootElement.locator('[data-qa-id=article-favorite]');
  }
}
