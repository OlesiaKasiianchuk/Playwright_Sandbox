
import { test } from '@playwright/test';
import { WebTablesPage } from './WebTablesPage';

test('verify web table', async ({ page }) => {
  const web = new WebTablesPage(page);

  await web.goto();
  await web.waitForTable();

  const row = web.getRowByEmail('cierra@example.com');

  await web.expectRow(row, [
    'Cierra',
    'Vega',
    '39',
    'cierra@example.com',
    '10000',
    'Insurance',
  ]);
});
