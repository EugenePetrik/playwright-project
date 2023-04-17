import { Locator } from '@playwright/test';
import Component from './base.component';

export default class Footer extends Component {
  readonly brandLogo: Locator;

  readonly attribution: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.brandLogo = this.rootElement.locator('a.logo-font');
    this.attribution = this.rootElement.locator('span.attribution');
  }
}
