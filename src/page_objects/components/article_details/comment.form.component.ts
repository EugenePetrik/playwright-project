import { Locator } from '@playwright/test';
import Component from '../base.component';

export class CommentForm extends Component {
  readonly commentInput: Locator;

  readonly postCommentButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.commentInput = this.rootElement.getByPlaceholder('Write a comment...');
    this.postCommentButton = this.rootElement.locator('button', { hasText: 'Post Comment' });
  }
}
