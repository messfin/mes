import { test } from '../fixtures/interactions-fixture';

test('test drag and drop', async ({ interactionsPage }) => {
  await interactionsPage.dragAndDrop();
  await interactionsPage.verifyDropped();
});

