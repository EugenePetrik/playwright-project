import { join } from 'path';
import { type Browser, type BrowserContext, type Page, test } from '@playwright/test';
import { createBrowser, createContext, createPage, closeBrowser, closeContext, closePage } from '../../page_objects/lighthouse/helpers';
import { LighthousePage } from '../../page_objects/lighthouse/page';
import { LIGHTHOUSE_DESKTOP_LINKS } from '../../test_data/lighthouse';

LIGHTHOUSE_DESKTOP_LINKS.forEach(({ testName, url, performance, accessibility, bestPractices, seo, isMobile, reportName }) => {
  test.describe('Desktop Lighthouse Verification', () => {
    let browser: Browser = null;
    let context: BrowserContext = null;
    let page: Page = null;
    let lighthousePage: LighthousePage = null;

    test.beforeEach(async () => {
      await test.step('Create browser, context, and page', async () => {
        browser = await createBrowser();
        context = await createContext(browser);
        page = await createPage(context);
      });

      lighthousePage = new LighthousePage(page);
    });

    test.afterEach(async ({}, testInfo) => {
      await test.step('Attach Lighthouse report', async () => {
        const reportPath = join(process.cwd(), 'reports', 'lighthouse-html-report', `desktop-report-${reportName}.html`);
        await testInfo.attach('lighthouse-report', { path: reportPath });
      });

      await test.step('Close browser, context, and page', async () => {
        await closePage(page);
        await closeContext(context);
        await closeBrowser(browser);
      });
    });

    test(`${testName}`, async () => {
      await test.step('Open page', async () => {
        await lighthousePage.goto(url);
      });

      await test.step('Lighthouse verifications', async () => {
        await lighthousePage.lighthouseResults({ performance, accessibility, bestPractices, seo, reportName, isMobile });
      });
    });
  });
});
