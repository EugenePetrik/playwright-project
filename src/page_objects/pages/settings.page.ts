import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';

export default class SettingsPage extends BasePage {
  readonly logoutButton: Locator;

  constructor(page: Page, readonly url: string = '/settings') {
    super(page);
    this.url = url;
    this.logoutButton = this.page.locator('button', { hasText: 'Or click here to logout.' });
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async clickOnLogout(): Promise<void> {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.press('Enter');
  }
}
