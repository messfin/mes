import { test as setup, type Page } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

const adminFile = '.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const user = 'mesfin';
  const password = '1234';
  await doLogin(page, user, password);

  await page.context().storageState({ path: adminFile });
});

const userFile = '.auth/user.json';

setup('authenticate as user', async ({ page }) => {
    const user = 'mesfin';
    const password = '1234';
    await doLogin(page, user, password);
    await page.context().storageState({ path: userFile });
});

async function doLogin(page: Page, user:string, password: string) {
    const baseURL = setup.info().project.use.baseURL!;
    const loginPage = new LoginPage(page);
  
    await page.goto(baseURL!+uiPages.login);
    await loginPage.doLogin(user, password);
    await page.waitForURL(/.*profile/);
    await loginPage.checkLoggedIn();
}
