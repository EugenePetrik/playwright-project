import type { Locator, Page } from '@playwright/test';
import BasePage from './base.page';
import logger from '../../configs/logger';
import type { IUser } from '../../utils/types';
import { Action } from '../../lib/core';

export default class SignInPage extends BasePage {
  readonly title: Locator;

  readonly emailInput: Locator;

  readonly passwordInput: Locator;

  readonly signInButton: Locator;

  readonly needAnAccountLink: Locator;

  constructor(
    page: Page,
    readonly url: string = '/login',
  ) {
    super(page);
    this.url = url;
    this.title = this.page.locator('h1', { hasText: 'Sign in' });
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.signInButton = this.page.locator('button', { hasText: 'Sign in' });
    this.needAnAccountLink = this.page.locator('a', { hasText: 'Need an account?' });
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async login(user: Omit<IUser, 'username'>): Promise<void> {
    const { email, password } = user;

    logger.debug(`Sign in user with - ${JSON.stringify(user)}`);

    await Action.fill(this.emailInput, email);
    await Action.fill(this.passwordInput, password);
    await Action.click(this.signInButton);
  }
}
