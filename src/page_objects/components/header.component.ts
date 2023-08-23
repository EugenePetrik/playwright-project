import type { Locator } from '@playwright/test';
import Component from './base.component';

export default class Header extends Component {
  readonly brandLogo: Locator;

  readonly signUpButton: Locator;

  readonly signInButton: Locator;

  readonly settingsButton: Locator;

  readonly newArticleButton: Locator;

  readonly allHeaderLinks: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.brandLogo = this.rootElement.locator('a.navbar-brand');
    this.signUpButton = this.rootElement.locator('a.nav-link', { hasText: 'Sign up' });
    this.signInButton = this.rootElement.locator('a.nav-link', { hasText: 'Sign in' });
    this.settingsButton = this.rootElement.locator('a.nav-link', { hasText: 'Settings' });
    this.newArticleButton = this.rootElement.locator('a.nav-link', { hasText: 'New article' });
    this.allHeaderLinks = this.rootElement.locator('li.nav-item');
  }

  async clickOnSignUp() {
    await this.signUpButton.click();
  }

  async clickOnSignIn() {
    await this.signInButton.click();
  }

  async clickOnSettings() {
    await this.settingsButton.click();
  }
}
