import { test } from '@playwright/test';
import { BookStoreApi } from './api/BookStoreApi';
import { createBookStoreUserData } from './data/bookStoreUserData';
import { BookStoreActions } from './page/BookStoreActions';
import { BookStoreVerifications } from './page/BookStoreVerifications';

test.describe('Test Book Store Flow', () => {
  let username: string;
  let password: string;
  let userID: string | undefined;
  let bookStore: BookStoreActions;
  let verifications: BookStoreVerifications;

  test.beforeEach(async ({ page, request }) => {
    bookStore = new BookStoreActions(page);
    verifications = new BookStoreVerifications(page);

    ({ username, password } = createBookStoreUserData());
    userID = await new BookStoreApi(request).createUser(username, password);
  });

  test('Should login with created user, search books, add books to the user collection and delete them', async ({ page }) => {
    await bookStore.openBookStorePage('Book Store Application', 'Login', /login/);
    await bookStore.login(username, password);
    await verifications.expectProfilePage();
    await bookStore.openBookStorePage('Book Store Application', 'Book Store', /books/);

    const gitBookTitle = await bookStore.addSearchResultToCollection('git');
    await verifications.expectBookInCollection(gitBookTitle);
    await bookStore.clickOnElement(page.locator('#gotoStore'));

    const javaBookTitle = await bookStore.addSearchResultToCollection('java');
    await verifications.expectBookInCollection(javaBookTitle);

    await bookStore.deleteBookFromCollection(javaBookTitle);
    await verifications.expectBookNotInCollection(javaBookTitle);
  });

  test.afterEach(async ({ request }) => {
    if (userID) {
      await new BookStoreApi(request).deleteUser(userID, username, password);
    }
  });
});
