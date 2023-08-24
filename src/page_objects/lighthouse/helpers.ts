import { type Browser, type BrowserContext, type Page, chromium } from '@playwright/test';

async function createBrowser(): Promise<Browser> {
  return chromium.launch({
    args: ['--remote-debugging-port=9222'],
    headless: false,
  });
}

async function createContext(browser: Browser): Promise<BrowserContext> {
  return browser.newContext();
}

async function createPage(context: BrowserContext): Promise<Page> {
  return context.newPage();
}

async function closeBrowser(browser: Browser): Promise<void> {
  await browser.close();
}

async function closeContext(context: BrowserContext): Promise<void> {
  await context.close();
}

async function closePage(page: Page): Promise<void> {
  await page.close();
}

export { createBrowser, createContext, createPage, closeBrowser, closeContext, closePage };
