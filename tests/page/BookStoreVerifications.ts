import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookStoreLocators } from './BookStoreLocators';

export class BookStoreVerifications extends BasePage {
  private readonly locators: BookStoreLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new BookStoreLocators(page);
  }

  /** Verifies that the current page is the user's profile page. */
  async expectProfilePage(): Promise<void> {
    await expect(this.page).toHaveURL(/profile/);
  }

  /**
   * Verifies the number of book links currently displayed.
   * @param expectedCount - Expected number of results.
   */
  async expectSearchResultsCount(expectedCount: number): Promise<void> {
    await expect(this.locators.bookLinks()).toHaveCount(expectedCount);
  }

  /**
   * Verifies that every displayed book title contains the given text.
   * @param text - Text expected in each result.
   */
  async expectAllResultsToContain(text: string): Promise<void> {
    const results = this.locators.bookLinks();
    const count = await results.count();
    const expectedText = new RegExp(text, 'i');

    for (let index = 0; index < count; index++) {
      await expect(results.nth(index)).toContainText(expectedText);
    }
  }

  /**
   * Verifies that exactly one book with the given title is in the collection.
   * @param bookTitle - Title to look for.
   */
  async expectBookInCollection(bookTitle: string): Promise<void> {
    await expect(this.locators.bookByTitle(bookTitle)).toHaveCount(1);
  }

  /**
   * Verifies that no book with the given title remains in the collection.
   * @param bookTitle - Title to look for.
   */
  async expectBookNotInCollection(bookTitle: string): Promise<void> {
    await expect(this.locators.bookByTitle(bookTitle)).toHaveCount(0);
  }
}
