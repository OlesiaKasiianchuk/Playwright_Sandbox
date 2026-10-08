import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Verifies that an element has the expected text.
   * @param locator - Element to check.
   * @param text - Expected text.
   */
  async isElementHaveText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toHaveText(text);
  }

  /**
   * Verifies whether an element is visible or hidden.
   * @param locator - Element to check.
   * @param isVisible - True to expect visibility; false to expect it hidden.
   */
  async isElementVisible(locator: Locator, isVisible: boolean): Promise<void> {
    if (isVisible) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).toBeHidden();
    }
  }
}
