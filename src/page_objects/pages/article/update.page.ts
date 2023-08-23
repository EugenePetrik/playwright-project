import type { Page } from '@playwright/test';
import BasePage from '../base.page';
import { Form } from '../../components/form.component';

export default class UpdateArticlePage extends BasePage {
  readonly form: Form;

  constructor(
    page: Page,
    readonly url: string = '/editor/',
  ) {
    super(page);
    this.url = url;
    this.form = new Form(this.page.locator('div.editor-page'), this.page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(`/editor/${url}`);
  }
}
