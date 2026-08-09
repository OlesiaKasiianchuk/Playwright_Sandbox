import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test('verify web table', async ({ page }) => {
    // ---- goto Web Tables page----
    const demoQA = new DemoQAPage(page);

    await demoQA.goto();

    // Click on 'Elements'
    await demoQA.clickCardByName('Elements');

    //Click on Web Tables menu item
    await demoQA.clickMenuItem('Web Tables');

    // Verify URL contains "webtables"
    await demoQA.verifyCurrentUrl(/webtables/);

    // Verify header is "Web Tables"
    await demoQA.verifyCurrentHeader('Web Tables');

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