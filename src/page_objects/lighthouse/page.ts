import { join } from 'path';
import { playAudit } from 'playwright-lighthouse';
import { Page } from '@playwright/test';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';
import logger from '../../configs/logger';
import BaseConfig from 'src/configs/base.config';

export class LighthousePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    logger.debug(`Navigate to URL - ${BaseConfig.webURL}${url}`);
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  public async lighthouseResults(optioons: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    reportName: string;
    isMobile: boolean;
    logLevel?: string;
  }) {
    const { performance, accessibility, bestPractices, seo, reportName, isMobile, logLevel } = optioons;

    await playAudit({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      config: isMobile ? undefined : lighthouseDesktopConfig, // run tests for mobile or desktop
      page: this.page,
      thresholds: {
        performance,
        accessibility,
        'best-practices': bestPractices,
        seo,
      },
      port: 9222,
      opts: {
        disableStorageReset: false,
        loglevel: logLevel ?? 'info',
      },
      reports: {
        formats: {
          html: true,
        },
        name: `${isMobile ? 'mobile-' : 'desktop-'}report-${reportName}`,
        directory: join(process.cwd(), 'reports', 'lighthouse-html-report'),
      },
      ignoreError: false,
      disableLogs: false,
    });
  }
}
