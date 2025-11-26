import { test as base } from '@playwright/test';
import SortablePage from '../pages/sortable-page';

type SortableFixtures = {
  sortablePage: SortablePage;
};

export const test = base.extend<SortableFixtures>({
  sortablePage: async ({ page }, use) => {
    const sortablePage = new SortablePage(page);
    await sortablePage.goto();
    await use(sortablePage);
  },
});

export { expect } from '@playwright/test';

