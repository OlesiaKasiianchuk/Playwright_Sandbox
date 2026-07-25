import { test, expect } from '@playwright/test';

test('verify web table', async ({ page }) => {
// ---- goto ----
await page.goto('https://demoqa.com/webtables');

// ---- waitForTable ----
const rows = page.locator('table tbody tr');
await expect(rows).toHaveCount(3);

// ---- getRowByEmail ----
const email = 'cierra@example.com';
const row = page.locator('table tbody tr', {
has: page.locator('td', { hasText: email }),
});

// ---- expectRow ----
const cells = row.locator('td');

const expectedValues = [
'Cierra',
'Vega',
'39',
'cierra@example.com',
'10000',
'Insurance',
];

for (let i = 0; i < expectedValues.length; i++) {
await expect(cells.nth(i)).toHaveText(expectedValues[i]);
}
});