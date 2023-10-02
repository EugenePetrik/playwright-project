import type { Locator } from '@playwright/test';
import Component from '../base.component';
import { Action } from '../../../lib/core';

export class Tabs extends Component {
  readonly myArticlesTab: Locator;

  readonly favoritedArticlesTab: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.myArticlesTab = this.rootElement.locator('[data-qa-type=feed-tab]').first();
    this.favoritedArticlesTab = this.rootElement.locator('[data-qa-type=feed-tab]').last();
  }

  async clickOnFavoritedArticlesTab(): Promise<void> {
    await Action.click(this.favoritedArticlesTab);
  }
}
