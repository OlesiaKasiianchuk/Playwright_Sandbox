
import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  async waitForTable() {
    // ✅ use real HTML structure
    await expect(this.page.locator('table tbody tr')).toHaveCount(3);
  }

  getRowByEmail(email: string): Locator {
    return this.page.locator('table tbody tr', {
      has: this.page.locator('td', { hasText: email }),
    });
  }

  async expectRow(row: Locator, values: string[]) {
    const cells = row.locator('td');

    for (let i = 0; i < values.length; i++) {
      await expect(cells.nth(i)).toHaveText(values[i]);
    }
  }
}
