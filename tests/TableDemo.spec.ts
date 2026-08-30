import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';
import { webTableData } from './data/webTableData';


test('verify web table', async ({ page }) => {
    // ---- goto Web Tables page----
    const demoQA = new DemoQAPage(page);

    await demoQA.goto();
    
    // Click on 'Elements', then select 'Web Tables' from the menu, and verify the URL and header
    await demoQA.clickCardAndMenu('Elements', 'Web Tables', /webtables/, 'Web Tables');

    // ---- waitForTable ----
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(3);

    // ---- getRowByEmail ----
    const employee = webTableData.existingEmployee;
    const row = page.locator('table tbody tr', {
        has: page.locator('td', { hasText: employee.email }),
    });

    // ---- expectRow ----
    const cells = row.locator('td');

    const expectedValues = [
        employee.firstName,
        employee.lastName,
        employee.age,
        employee.email,
        employee.salary,
        employee.department,
    ];

    for (let i = 0; i < expectedValues.length; i++) {
        await expect(cells.nth(i)).toHaveText(expectedValues[i]);
    }
});