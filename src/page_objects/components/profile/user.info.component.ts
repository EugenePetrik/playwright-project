import { Locator } from '@playwright/test';
import Component from '../base.component';

export class UserInfo extends Component {
  readonly userImage: Locator;

  readonly username: Locator;

  readonly editProfileSettings: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.userImage = this.rootElement.locator('img.user-img');
    this.username = this.rootElement.locator('[data-qa-id=profile-username]');
    this.editProfileSettings = this.rootElement.locator('a', { hasText: 'Edit Profile Settings' });
  }
}
