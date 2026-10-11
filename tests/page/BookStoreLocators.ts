import { Locator, Page } from '@playwright/test';

export class BookStoreLocators {
  constructor(private readonly page: Page) {}

  /** Returns the username input on the login form. */
  usernameInput(): Locator {
    return this.page.locator('#userName');
  }

  /** Returns the password input on the login form. */
  passwordInput(): Locator {
    return this.page.locator('#password');
  }

  /** Returns the login button. */
  loginButton(): Locator {
    return this.page.locator('#login');
  }

  /** Returns the bookstore search input. */
  searchInput(): Locator {
    return this.page.locator('#searchBox');
  }

  /** Returns all book title links currently shown on the page. */
  bookLinks(): Locator {
    return this.page.locator('span[id^="see-book-"] > a');
  }

  /**
   * Returns the book link whose complete title matches the given title.
   * @param title - Exact book title to match.
   */
  bookByTitle(title: string): Locator {
    return this.bookLinks().filter({
      hasText: new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`),
    });
  }

  /** Returns the button used to add a book to the user's collection. */
  addToCollectionButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Add To Your Collection',
      exact: true,
    });
  }

  /**
   * Returns the delete button for a book identified by ISBN.
   * @param isbn - ISBN used in the delete button's id.
   */
  deleteBookButton(isbn: string): Locator {
    return this.page.locator(`#delete-record-${isbn}`);
  }

  /** Returns the confirmation button in the delete dialog. */
  confirmDeleteButton(): Locator {
    return this.page.locator('#closeSmallModal-ok');
  }

  /** Returns the logout button. */
  logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout', exact: true });
  }
}
