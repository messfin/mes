import { test, expect } from '../fixtures/sortable-fixture';

test.describe('Sortable interactions with POM', () => {
  test('moves list item to top', async ({ sortablePage }) => {
    await sortablePage.dragListItem('Six', 'One');
    const order = await sortablePage.getListOrder();
    expect(order.slice(0, 3)).toEqual(['Six', 'One', 'Two']);
  });

  test('moves list item before target', async ({ sortablePage }) => {
    await sortablePage.dragListItem('One', 'Six');
    const order = await sortablePage.getListOrder();
    expect(order.slice(-2)).toEqual(['One', 'Six']);
    expect(order.indexOf('One')).toBe(order.indexOf('Six') - 1);
  });

  test('moves grid item to first position', async ({ sortablePage }) => {
    await sortablePage.dragGridItem('Nine', 'One');
    const order = await sortablePage.getGridOrder();
    expect(order[0]).toBe('Nine');
  });
});

