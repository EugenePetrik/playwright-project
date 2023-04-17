import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';
import logger from '../../configs/logger';
import type { IUser } from '../../utils/types';

export default class SignUpPage extends BasePage {
  readonly usernameInput: Locator;

  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly signUpButton: Locator;

  constructor(page: Page, readonly url: string = '/register') {
    super(page);
    this.url = url;
    this.usernameInput = this.page.getByPlaceholder('Username');
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.signUpButton = this.page.locator('button', { hasText: 'Sign up' });
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async register(user: IUser): Promise<void> {
    const { username, email, password } = user;

    logger.debug(`Sign up user with - ${JSON.stringify(user)}`);

    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }
}
