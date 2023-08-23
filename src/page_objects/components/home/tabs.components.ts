import type { Locator } from '@playwright/test';
import Component from '../base.component';

export class Tabs extends Component {
  readonly yourFeedTab: Locator;

  readonly globalFeedTab: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.yourFeedTab = this.rootElement.locator('[data-qa-type=feed-tab]').first();
    this.globalFeedTab = this.rootElement.locator('[data-qa-type=feed-tab]').last();
  }

  async clickOnYourFeedTab(): Promise<void> {
    await this.yourFeedTab.click();
  }
}
