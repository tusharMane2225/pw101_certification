import { chromium, Browser, Page } from 'playwright';
import { expect } from 'expect';
import * as cp from 'child_process';

const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    browserName: 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'Playwright Single Build',
      name: 'Playwright Sample Test',
      user: "tushar54mane", // process.env.LT_USERNAME can be used instead
      accessKey: "EQFrwGyeViIegkLbgAybbRAjHtA4EyBVhbAIZzF7w4lqeW26uJ", // process.env.LT_ACCESS_KEY can be used instead
      network: true,
      video: true,
      console: true,
      tunnel: false, // Add tunnel configuration if testing locally hosted webpage
      tunnelName: '', // Optional
      geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      playwrightClientVersion: playwrightClientVersion
    }
  };

  const browser: Browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  });

  const page: Page = await browser.newPage();

  await page.goto("https://duckduckgo.com");

  const element = page.locator("[name=\"q\"]");
  await element.click();
  await element.fill("LambdaTest");
  await element.press("Enter");
  const title = await page.title();

  try {
    expect(title).toEqual('LambdaTest at DuckDuckGo');
    // Mark the test as completed or failed
    await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`);
    await teardown(page, browser);
  } catch (e) {
    await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`);
    await teardown(page, browser);
    throw e;
  }

})();

async function teardown(page: Page, browser: Browser) {
  await page.close();
  await browser.close();
}
