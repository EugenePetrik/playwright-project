import { expect, Page, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AxeResults } from 'axe-core';
import { attachAxeReport } from '../../utils/axe.reporter';
import logger from '../../configs/logger';
import BaseConfig from '../../configs/base.config';
import Header from '../components/header.component';
import Footer from '../components/footer.component';

interface IPage {
  readonly page: Page;
  readonly url?: string;
  goto(url: string): Promise<void>;
}

export default abstract class BasePage implements IPage {
  readonly url: string;

  readonly header: Header;

  readonly footer: Footer;

  constructor(readonly page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator('[data-qa-id=site-header]'));
    this.footer = new Footer(this.page.locator('[data-qa-id=site-footer]'));
  }

  async goto(url: string): Promise<void> {
    logger.debug(`Navigate to URL - ${BaseConfig.webURL}${url}`);
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  async checkPageUrl(url = this.url): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(url));
  }

  async checkPageTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async waitForTimeout(time = 2_000): Promise<void> {
    await this.page.waitForTimeout(time);
  }

  async mockResponse<T>(route: string, data: T): Promise<void> {
    logger.debug(`Mock API data for the User request - /api/user/`);

    await this.page.route(route, async route => {
      return route.fulfill({
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*', contentType: 'application/json; charset=utf-8' },
        body: JSON.stringify(data),
      });
    });
  }

  async checkPageSnapshot(
    name: string,
    {
      threshold = 0.3,
      maxDiffPixels = 0,
      maxDiffPixelRatio = 0,
    }: { threshold?: number; maxDiffPixels?: number; maxDiffPixelRatio?: number } = {},
  ): Promise<void> {
    expect(await this.page.screenshot()).toMatchSnapshot(name, { threshold, maxDiffPixels, maxDiffPixelRatio });
  }

  async accessibilityScan(
    testInfo: TestInfo,
    {
      withTags = BaseConfig.accessibilityTags,
      withRules = BaseConfig.accessibilityRules,
      include = 'body',
    }: {
      withTags?: string | string[];
      withRules?: string | string[];
      include?: string | string[];
    } = {},
  ): Promise<number> {
    const accessibilityScanResults: AxeResults = await new AxeBuilder({ page: this.page })
      .withTags(withTags)
      .withRules(withRules)
      .include(include)
      .analyze();

    await attachAxeReport(testInfo, accessibilityScanResults);
    return accessibilityScanResults.violations.length;
  }
}
