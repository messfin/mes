import { test } from '../fixtures/books-fixture';
import { APIRequestContext } from '@playwright/test';
import LoginPage from '../pages/login-page';
import baseAPIUrl from '../../utils/environmentBaseUrl';
import createBookAPIRequest from '../../api/requests/create-books-collection';
import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const env = process.env.ENV || 'local';
const password = '1234'; // Local credentials
const userName = 'mesfin'; // Local credentials
const userId = process.env.USERID || userName; // Use username as userId if not set

let apiContext: APIRequestContext;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ playwright }) => {
  const envConfig = baseAPIUrl[env as keyof typeof baseAPIUrl];
  const apiBaseUrl = (typeof envConfig === 'object' && 'api' in envConfig) 
    ? envConfig.api 
    : baseAPIUrl.local.api;
  apiContext = await playwright.request.newContext({
      baseURL: apiBaseUrl,
      extraHTTPHeaders: {
          Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
          Accept: 'application/json',
      },
  });
});

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
  await loginPage.doLogin(userName, password);
  await loginPage.checkLoggedIn();
});

test.describe('Book - Fixture & API with isolated auth', () => {
  test.use({ isDupe: true });

  test('Add duplicate book', async ({ bookPage }) => {
      await addBooks(userId, userData.books.duplicate);
      await bookPage.goto(userData.books.duplicate);
  });
});

async function addBooks(userId: string, isbn: string) {
  await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
  const response = await createBookAPIRequest.addBookToCollection(apiContext, userId, isbn);
  // Verify the book was added successfully
  const status = await response.status();
  if (status !== 201 && status !== 200) {
    const responseText = await response.text();
    throw new Error(`Failed to add book: ${status} ${responseText}`);
  }
  // Small delay to ensure server state is updated
  await new Promise(resolve => setTimeout(resolve, 100));
};
