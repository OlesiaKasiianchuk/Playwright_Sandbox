import { Locator, Page } from '@playwright/test';
import { DemoQAPage } from './DemoQAPage';
import { BookStoreLocators } from './BookStoreLocators';

export class BookStoreActions {
  private readonly demoQA: DemoQAPage;
  private readonly locators: BookStoreLocators;

  constructor(page: Page) {
    this.demoQA = new DemoQAPage(page);
    this.locators = new BookStoreLocators(page);
  }

  /**
   * Opens a Book Store Application submenu and checks its URL.
   * @param menuItem - Name of the application card.
   * @param subMenuItem - Name of the submenu to open.
   * @param urlPattern - Expected URL pattern after navigation.
   */
  async openBookStorePage(
    menuItem: string,
    subMenuItem: string,
    urlPattern: RegExp
  ): Promise<void> {
    await this.demoQA.goto();
    await this.demoQA.clickCardAndMenu(
      menuItem,
      subMenuItem,
      urlPattern
    );
  }

  /**
   * Submits the supplied credentials on the login form.
   * @param username - Account username.
   * @param password - Account password.
   */
  async login(username: string, password: string): Promise<void> {
    await this.locators.usernameInput().fill(username);
    await this.locators.passwordInput().fill(password);
    await this.locators.loginButton().click();
  }

  /**
   * Enters text in the bookstore search field.
   * @param searchText - Text to search for.
   */
  async searchBook(searchText: string): Promise<void> {
    await this.locators.searchInput().fill(searchText);
  }

  /**
   * Clicks the supplied element.
   * @param locator - Playwright locator for the element to click.
   */
  async clickOnElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Opens a book by its exact title.
   * @param bookTitle - Title of the book to open.
   */
  async openBook(bookTitle: string): Promise<void> {
    await this.locators.bookByTitle(bookTitle).click();
  }

  /** Adds the currently open book to the user's collection. */
  async addToCollection(): Promise<void> {
    await this.locators.addToCollectionButton().click();
  }

  /**
   * Searches for the first matching book, adds it to the collection, and returns its title.
   * @param searchTerm - Text to search for.
   * @returns The title of the book added.
   */
  async addSearchResultToCollection(searchTerm: string): Promise<string> {
    await this.searchBook(searchTerm);

    const book = this.locators.bookLinks().first();
    await book.waitFor({ state: 'visible' });
    const title = await book.innerText();

    await book.click();
    await this.addToCollection();
    await this.openBookStorePage(
      'Book Store Application',
      'Profile',
      /profile/
    );

    return title;
  }

  /**
   * Deletes a book from the collection by title and confirms the dialog.
   * @param title - Title of the book to delete.
   */
  async deleteBookFromCollection(title: string): Promise<void> {
    const href = await this.locators.bookByTitle(title).getAttribute('href');
    if (!href) {
      throw new Error(`Could not find a collection link for "${title}".`);
    }

    const isbn = new URL(href, 'https://demoqa.com').searchParams.get('search');
    if (!isbn) {
      throw new Error(`Could not determine the ISBN for "${title}".`);
    }

    await this.locators.deleteBookButton(isbn).click();
    await this.locators.confirmDeleteButton().click();
  }
}
