import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const userName = 'mesfin';
const password = '1234';
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe('Book Store - Login', () => {
  test(`successfull login`, async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn();
  });

  test(`failing login - invalid username`, async ({ page }) => {
    const invalidUsername = userData.invalidUsername;
    
    // Set up dialog handler before login attempt
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Incorrect');
      await dialog.accept();
    });
    
    await loginPage.doLogin(invalidUsername, password);
    
    // Verify still on login page
    await expect(page).toHaveURL(/.*login/);
  });

  test(`failing login - invalid password`, async ({ page }) => {
    const invalidPassword = userData.invalidPassword;
    
    // Set up dialog handler before login attempt
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Incorrect');
      await dialog.accept();
    });
    
    await loginPage.doLogin(userName, invalidPassword);
    
    // Verify still on login page
    await expect(page).toHaveURL(/.*login/);
  });
});

