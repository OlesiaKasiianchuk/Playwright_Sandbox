import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';
import { WebTableHelper } from './page/WebTableHelper';
import { webTableData } from './data/webTableData';

test.describe('DemoQA Web Tables page', () => {
    test.beforeEach(async ({ page }) => {
        const demoQA = new DemoQAPage(page);
        await demoQA.goto();
        await demoQA.clickCardAndMenu('Elements', 'Web Tables', /webtables/, 'Web Tables');
    })
test('Verify web table', async ({ page }) => {
 
    const tableHelper = new WebTableHelper(page);
    await tableHelper.waitForTable(3);

    const employee = webTableData.existingEmployee;
    const row = tableHelper.getRowByEmail(employee.email);

    const expectedValues = [
        employee.firstName,
        employee.lastName,
        employee.age.toString(),
        employee.email,
        employee.salary.toString(),
        employee.department,
    ];

    await tableHelper.verifyRowData(row, expectedValues);
});

test('Web Table create and edit flow', async ({ page }) => {

    const tableHelper = new WebTableHelper(page);

    await tableHelper.waitForTable(3);

    const newEmployee = webTableData.newEmployee;
    await tableHelper.addEmployee(newEmployee);

    const newRow = tableHelper.getRowByEmail(newEmployee.email);
    await expect(newRow).toBeVisible();

    const expectedNewValues = [
        newEmployee.firstName,
        newEmployee.lastName,
        newEmployee.age.toString(),
        newEmployee.email,
        newEmployee.salary.toString(),
        newEmployee.department,
    ];

    await tableHelper.verifyRowData(newRow, expectedNewValues);

    const updatedEmployee = webTableData.updatedEmployee;
    await tableHelper.editEmployee(newRow, updatedEmployee);

    const updatedRow = tableHelper.getRowByEmail(updatedEmployee.email);
    await expect(updatedRow).toBeVisible();

    const expectedUpdatedValues = [
        updatedEmployee.firstName,
        updatedEmployee.lastName,
        updatedEmployee.age.toString(),
        updatedEmployee.email,
        updatedEmployee.salary.toString(),
        updatedEmployee.department,
    ];

    await tableHelper.verifyRowData(updatedRow, expectedUpdatedValues);

    await tableHelper.deleteEmployee(updatedRow);
    await expect(updatedRow).toHaveCount(0);

    await tableHelper.waitForTable(3);
});
});
