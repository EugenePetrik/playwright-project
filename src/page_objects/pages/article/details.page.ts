import type { Page } from '@playwright/test';
import BasePage from '../base.page';
import { Actions, Banner, CommentForm, Content } from '../../components/article_details';

export default class ArticleDetailsPage extends BasePage {
  readonly actions: Actions;

  readonly banner: Banner;

  readonly commentForm: CommentForm;

  readonly content: Content;

  constructor(
    page: Page,
    readonly url: string = '/articles/',
  ) {
    super(page);
    this.url = url;
    this.actions = new Actions(this.page.locator('div.article-actions'));
    this.banner = new Banner(this.page.locator('div.banner'), this.page);
    this.commentForm = new CommentForm(this.page.locator('form.comment-form'));
    this.content = new Content(this.page.locator('div.article-content'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(`/articles/${url}`);
  }
}
