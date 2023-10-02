import type { Locator } from '@playwright/test';
import Component from '../base.component';
import { waitFor } from '../../../utils/common';
import { Elements } from '../../../lib/core';

export class PopularTags extends Component {
  readonly title: Locator;

  readonly tags: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootElement.locator('p');
    this.tags = this.rootElement.locator('div.tag-list a');
  }

  async waitForPopularTags(): Promise<void> {
    await waitFor(async () => {
      const tags = (await Elements.getCount(this.tags)) as number;
      return tags > 0;
    });
  }
}
