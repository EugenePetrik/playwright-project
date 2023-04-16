import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';
import logger from '../../configs/logger';

export default class SignInPage extends BasePage {
  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly signInButton: Locator;

  constructor(page: Page, readonly url: string = '/login') {
    super(page);
    this.url = url;
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.signInButton = this.page.locator('button', { hasText: 'Sign in' });
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async login(user: Omit<IUser, 'username'>): Promise<void> {
    const { email, password } = user;

    logger.debug(`Sign in user with - ${JSON.stringify(user)}`);

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
