import { type Page, type Locator, expect } from '@playwright/test';

class InteractionsPage {
  readonly page: Page;
  readonly interactionsLink: Locator;
  readonly droppableLink: Locator;
  readonly draggableSource: Locator;
  readonly dropTarget: Locator;
  readonly droppedElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.interactionsLink = page.getByRole('link', { name: 'Interactions' });
    this.droppableLink = page.getByRole('link', { name: 'Droppable' });
    this.draggableSource = page.locator('#draggableSource');
    this.dropTarget = page.locator('#dropTarget');
    this.droppedElement = page.locator('#dropTarget #draggableSource');
  }

  async goto() {
    // Navigate to elements page first, then to interactions
    const baseURL = this.page.context().baseURL || 'http://localhost:3000';
    await this.page.goto(`${baseURL}/elements`);
  }

  async navigateToDroppable() {
    await this.interactionsLink.click();
    await this.droppableLink.click();
  }

  async dragAndDrop() {
    await this.page.dragAndDrop('#draggableSource', '#dropTarget');
  }

  async verifyDropped() {
    await expect(this.droppedElement).toBeVisible();
  }
}

export default InteractionsPage;

