import type { Locator, Page } from '@playwright/test';
import BasePage from './base.page';

export default class SettingsPage extends BasePage {
  readonly title: Locator;

  readonly usernameInput: Locator;

  readonly emailInput: Locator;

  readonly updateSettingsButton: Locator;

  readonly logoutButton: Locator;

  constructor(
    page: Page,
    readonly url: string = '/settings',
  ) {
    super(page);
    this.url = url;
    this.title = this.page.locator('h1', { hasText: 'Your Settings' });
    this.usernameInput = this.page.getByPlaceholder('Your username');
    this.emailInput = this.page.getByPlaceholder('Email');
    this.updateSettingsButton = this.page.locator('button', { hasText: 'Update Settings' });
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
