import { Page, Locator, expect } from '@playwright/test';

export interface EmployeeData {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    salary: number;
    department: string;
}

export class WebTableHelper {
    constructor(private page: Page) {}

    async waitForTable(expectedRowCount: number): Promise<void> {
        const rows = this.page.locator('table tbody tr');
        await expect(rows).toHaveCount(expectedRowCount);
    }

    getRowByEmail(email: string): Locator {
        return this.page.locator('table tbody tr', {
            has: this.page.locator('td', { hasText: email }),
        });
    }

    async verifyRowData(row: Locator, expectedValues: string[]): Promise<void> {
        const cells = row.locator('td');
        for (let i = 0; i < expectedValues.length; i++) {
            await expect(cells.nth(i)).toHaveText(expectedValues[i]);
        }
    }

    async addEmployee(employee: EmployeeData): Promise<void> {
        const addButton = this.page.locator('#addNewRecordButton');
        await addButton.click();

        await this.fillEmployeeForm(employee);
        await this.page.locator('#submit').click();
    }

    async editEmployee(row: Locator, employee: EmployeeData): Promise<void> {
        const editButton = row.locator('span[title="Edit"]');
        await editButton.click();

        await this.fillEmployeeForm(employee);
        await this.page.locator('#submit').click();
    }

    async deleteEmployee(row: Locator): Promise<void> {
        const deleteButton = row.locator('span[title="Delete"]');
        await deleteButton.click();
    }

    private async fillEmployeeForm(employee: EmployeeData): Promise<void> {
        await this.page.locator('#firstName').fill(employee.firstName);
        await this.page.locator('#lastName').fill(employee.lastName);
        await this.page.locator('#userEmail').fill(employee.email);
        await this.page.locator('#age').fill(employee.age.toString());
        await this.page.locator('#salary').fill(employee.salary.toString());
        await this.page.locator('#department').fill(employee.department);
    }
}