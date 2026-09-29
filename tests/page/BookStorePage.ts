import { expect, Page } from '@playwright/test';
import { DemoQAPage } from './DemoQAPage';

export class BookStorePage {
  private readonly demoQA: DemoQAPage;

  constructor(private readonly page: Page) {
    this.demoQA = new DemoQAPage(page);
  }

  //add parameter to make this method more general
  async openLogin(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Login',
      /login/
    );
  }

  //Add annotation to the all methods
  //e.g.
  /**
   * login description method
   * @username - username parameter
   */
  async login(username: string, password: string): Promise<void> {
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login').click();
    await expect(this.page).toHaveURL(/profile/);
  }

//
  async loginUnsuccessfully(
    username: string,
    password: string
  ): Promise<void> {
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login').click();
  }

  //could be remover after fix first comment
  async openBookStore(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Book Store',
      /books/
    );
  }

  //split this file into three 1 - locators, 2 - actions, 3 - verifications
  async searchBook(searchText: string): Promise<void> {
    await this.page.locator('#searchBox').fill(searchText);
  }
//do we need await here? is yes - why? no - why?
//why do we need this method?
  book(bookTitle: string) {
    return this.page
    //is it possible to find more maintainable locator?
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
//could be remover after fix first comment
  async openProfile(): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      'Book Store Application',
      'Profile',
      /profile/
    );
  }

  //duplicated method with book(bookTitle: string)  (60 row)
  collectionBook(bookTitle: string) {
    return this.page
    //is it possible to find more maintainable locator?
      .locator('span[id^="see-book-"] > a')
      .filter({ hasText: new RegExp(`^${bookTitle}$`) });
  }
//do we need await here? is yes - why? no - why?
//is it possible to find more maintainable locator?
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
//what results.nth(index) do?
    for (let index = 0; index < count; index++) {
      await expect(results.nth(index)).toContainText(expectedText);
    }
  }
//is it enaught? looks like in this verification you just verify that we have only one biik with this title
// is it possible that two different authors create the book with the same title?
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
//why do we need rturn here?
  return title;
  }
//describe how this method works
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