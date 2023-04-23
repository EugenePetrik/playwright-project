import { TestInfo } from '@playwright/test';
import { AxeResults } from 'axe-core';

export const attachAxeReport = async (testInfo: TestInfo, scanResults: AxeResults) => {
  if (scanResults.violations.length > 0) {
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(scanResults.violations, null, 2),
      contentType: 'application/json',
    });
  }
};
