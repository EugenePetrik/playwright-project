import type { Locator } from '@playwright/test';

interface IComponent {
  readonly rootElement: Locator;
}

export default class BaseComponent implements IComponent {
  readonly rootElement: Locator;

  constructor(readonly locator: Locator) {
    this.rootElement = locator;
  }
}
