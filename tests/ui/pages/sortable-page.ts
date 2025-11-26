import { type Page, type Locator } from '@playwright/test';

class SortablePage {
  readonly page: Page;
  readonly interactionsLink: Locator;
  readonly sortableLink: Locator;
  readonly listItems: Locator;
  readonly gridTabButton: Locator;
  readonly gridItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.interactionsLink = page.getByRole('link', { name: 'Interactions' });
    this.sortableLink = page.getByRole('link', { name: 'Sortable' });
    this.listItems = page.locator('#sortable-list .sortable-item');
    this.gridTabButton = page.getByRole('button', { name: 'Grid' });
    this.gridItems = page.locator('#sortable-grid .sortable-item');
  }

  async goto() {
    const baseURL = this.page.context().baseURL || 'http://localhost:3000';
    await this.page.goto(`${baseURL}/elements`);
    await this.interactionsLink.click();
    await this.sortableLink.click();
  }

  async dragListItem(sourceText: string, targetText: string) {
    const source = this.listItems.filter({ hasText: sourceText });
    const target = this.listItems.filter({ hasText: targetText });
    await source.dragTo(target);
  }

  async dragGridItem(sourceText: string, targetText: string) {
    await this.switchToGrid();
    const source = this.gridItems.filter({ hasText: sourceText });
    const target = this.gridItems.filter({ hasText: targetText });
    await source.dragTo(target);
  }

  async getListOrder() {
    return this.listItems.allTextContents();
  }

  async getGridOrder() {
    await this.switchToGrid();
    return this.gridItems.allTextContents();
  }

  async switchToGrid() {
    await this.gridTabButton.click();
  }
}

export default SortablePage;

