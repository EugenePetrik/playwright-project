import type { Locator } from '@playwright/test';
import Component from '../base.component';

export class Banner extends Component {
  readonly title: Locator;

  readonly description: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootElement.locator('h1');
    this.description = this.rootElement.locator('p');
  }
}
