import { expect, Page } from '@playwright/test';
import { DemoQAPage } from './DemoQAPage';

export class BookStorePage {
  private readonly demoQA: DemoQAPage;

  constructor(private readonly page: Page) {
    this.demoQA = new DemoQAPage(page);
  }

  async openLogin(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Login',
      /login/
    );
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login').click();
    await expect(this.page).toHaveURL(/profile/);
  }

  async loginUnsuccessfully(
    username: string,
    password: string
  ): Promise<void> {
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login').click();
  }

  async openBookStore(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Book Store',
      /books/
    );
  }

  async searchBook(searchText: string): Promise<void> {
    await this.page.locator('#searchBox').fill(searchText);
  }

  book(bookTitle: string) {
    return this.page
      .locator('span[id^="see-book-"] > a')
      .filter({ hasText: new RegExp(`^${bookTitle}$`) });
  }

  async openBook(bookTitle: string): Promise<void> {
    await this.book(bookTitle).click();
  }

  async addToCollection(): Promise<void> {
    await this.page.getByRole('button', {
      name: 'Add To Your Collection',
      exact: true,
    }).click();
  }

  async openProfile(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Profile',
      /profile/
    );
  }

  collectionBook(bookTitle: string) {
    return this.page
      .locator('span[id^="see-book-"] > a')
      .filter({ hasText: new RegExp(`^${bookTitle}$`) });
  }

  searchResults() {
    return this.page.locator('span[id^="see-book-"] > a');
  }

  async searchAndVerifyResults(
    searchText: string,
    expectedCount: number
  ): Promise<void> {
    await this.searchBook(searchText);
    await expect(this.searchResults()).toHaveCount(expectedCount);
  }

  async expectAllResultsToContain(text: string): Promise<void> {
    const results = this.searchResults();
    const count = await results.count();
    const expectedText = new RegExp(text, 'i');

    for (let index = 0; index < count; index++) {
      await expect(results.nth(index)).toContainText(expectedText);
    }
  }

  async expectBookInCollection(bookTitle: string): Promise<void> {
    await expect(this.collectionBook(bookTitle)).toHaveCount(1);
  }

async addSearchResultToCollection(searchTerm: string): Promise<string> {
  await this.searchBook(searchTerm);

  const book = this.searchResults().first();
  await expect(book).toBeVisible();

  const title = await book.innerText();

  await book.click();
  await this.addToCollection();
  await this.openProfile();
  await this.expectBookInCollection(title);

  return title;
  }

  async deleteBookFromCollection(title: string): Promise<void> {
    const href = await this.collectionBook(title).getAttribute('href');
    expect(href).toBeTruthy();

    const isbn = new URL(href!, 'https://demoqa.com').searchParams.get('search');
    expect(isbn).toBeTruthy();

    await this.page.locator(`#delete-record-${isbn}`).click();
    await this.page.locator('#closeSmallModal-ok').click();

    await expect(this.collectionBook(title)).toHaveCount(0);
  }
}