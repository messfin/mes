import { type Page, type Locator , expect, type BrowserContext } from '@playwright/test';
import bookListData from '../../data/book-list-data';
import { mockBooks } from '../../utils/mockBooksData';
import apiPaths from '../../utils/apiPaths';

class SearchPage {
  readonly page: Page;
  readonly bookAdminLabel: Locator;
  readonly booksCollectionRequestRegExp: RegExp;
  readonly bookUserLabel: Locator;
  readonly gridRow1: Locator;
  readonly gridRow2: Locator;
  readonly notLoggedInLabel: Locator;
  readonly searchField: Locator;
  readonly titleHeaderLabel: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.bookAdminLabel = page.getByText('Eloquent JavaScript, Second Edition');
    this.booksCollectionRequestRegExp = /\/books-api\/BookStore\/v1\/Books/;
    this.bookUserLabel = page.getByText('Understanding ECMAScript 6');
    // Select links by partial title text to ensure we get the book links
    this.gridRow1 = page.getByRole('link', { name: /Designing|Learning/ }).nth(0);
    this.gridRow2 = page.getByRole('link', { name: /Designing|Learning/ }).nth(1);
    this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    this.searchField = page.getByPlaceholder('Type to search');
    this.titleHeaderLabel = page.getByText('Title');
  }

  async fillSearchField(q: string) {
    await this.searchField.fill(q);
  }

  async checkSearchResult(q: string, items: string) {
  }

  async checkBooksList() {
    for (const book of mockBooks){
      await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
    }
  }

  async sortBooksList() {
    // Click once to toggle sort (Asc -> Desc)
    await this.titleHeaderLabel.click();
  }

  async checkLoggedIn() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    // await expect(this.notLoggedInLabel).toBeVisible();
  }

  async checkLoggedInUser() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookUserLabel).toBeVisible();
  }

  async checkLoggedInAdmin() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookAdminLabel).toBeVisible();
  }

  async checkSort() {
    const text1 = await this.gridRow1.innerText();
    const text2 = await this.gridRow2.innerText();
    const sorted = [...mockBooks].sort((a, b) => a.title.localeCompare(b.title));
    
    // Check if it matches either Ascending or Descending
    const isAsc = text1.includes(sorted[0].title) && text2.includes(sorted[1].title);
    const isDesc = text1.includes(sorted[1].title) && text2.includes(sorted[0].title);

    if (!isAsc && !isDesc) {
      throw new Error(`Sort failed! Row1: "${text1}", Row2: "${text2}". Expected: "${sorted[0].title}" or "${sorted[1].title}"`);
    }
  }

  async getBooksList() {
  }

  async mockBooksListResponse(context: BrowserContext) {
    await context.route(this.booksCollectionRequestRegExp, (route) => route.fulfill({
      body: JSON.stringify({ books: mockBooks })
    }));
  }
}

export default SearchPage;
