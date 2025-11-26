import { test as base } from '@playwright/test';
import InteractionsPage from '../pages/interactions-page';

type MyFixtures = {
  interactionsPage: InteractionsPage;
}

export const test = base.extend<MyFixtures>({
  interactionsPage: async ({ page }, use) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.goto();
    await interactionsPage.navigateToDroppable();
    
    await use(interactionsPage);
  },
});

export { expect } from '@playwright/test';

