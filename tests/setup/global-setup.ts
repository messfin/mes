import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

async function globalSetup(config: FullConfig) {
  const user = 'mesfin';
  const password = '1234';
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  await page.goto(baseURL+uiPages.login);
  await loginPage.doLogin(user, password);
  // Wait for navigation after login
  await page.waitForURL(/.*profile/, { timeout: 20000, waitUntil: 'domcontentloaded' }).catch(async (e) => {
    throw new Error(`Login failed: Did not navigate to profile page. Error: ${e.message}`);
  });
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
