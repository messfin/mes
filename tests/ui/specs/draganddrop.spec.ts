import { test, expect } from '@playwright/test';

test('test drag and drop', async ({ page }) => {
  await page.goto('http://localhost:3000/elements');
  await page.getByRole('link', { name: 'Interactions' }).click();
  await page.getByRole('link', { name: 'Droppable' }).click();
  await page.dragAndDrop('#draggableSource', '#dropTarget');
  await expect(page.locator('#dropTarget #draggableSource')).toBeVisible();
});


