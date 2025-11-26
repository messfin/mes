import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Sortable interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/elements`);
    await page.getByRole('link', { name: 'Interactions' }).click();
    await page.getByRole('link', { name: 'Sortable' }).click();
  });

  test('moves list item to top', async ({ page }) => {
    const listItems = page.locator('#sortable-list .sortable-item');
    const itemSix = listItems.filter({ hasText: 'Six' });
    const itemOne = listItems.filter({ hasText: 'One' });

    await itemSix.dragTo(itemOne);

    const order = await listItems.allTextContents();
    expect(order.slice(0, 3)).toEqual(['Six', 'One', 'Two']);
  });

  test('moves list item before target', async ({ page }) => {
    const listItems = page.locator('#sortable-list .sortable-item');
    const itemOne = listItems.filter({ hasText: 'One' });
    const itemSix = listItems.filter({ hasText: 'Six' });

    await itemOne.dragTo(itemSix);

    const order = await listItems.allTextContents();
    const indexOfOne = order.indexOf('One');
    const indexOfSix = order.indexOf('Six');

    expect(order.slice(-2)).toEqual(['One', 'Six']);
    expect(indexOfOne).toBe(indexOfSix - 1);
  });

  test('moves grid item to first position', async ({ page }) => {
    await page.getByRole('button', { name: 'Grid' }).click();

    const gridItems = page.locator('#sortable-grid .sortable-item');
    const itemNine = gridItems.filter({ hasText: 'Nine' });
    const itemOne = gridItems.filter({ hasText: 'One' });

    await itemNine.dragTo(itemOne);

    const order = await gridItems.allTextContents();
    expect(order[0]).toBe('Nine');
  });
});