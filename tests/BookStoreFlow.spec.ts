import { test } from '@playwright/test';
import { BookStorePage } from './page/BookStorePage';
import { bookStoreUser } from './data/bookStoreUserData';

test('should add Git Pocket Guide to the user collection', async ({ page }) => {
  const bookStore = new BookStorePage(page);
  const bookTitle = 'Git Pocket Guide';

  await bookStore.openLogin();
  await bookStore.login(
    bookStoreUser.username,
    bookStoreUser.password
  );

  await bookStore.openBookStore();
  await bookStore.searchAndVerifyResults('git', 1);
  await bookStore.openBook(bookTitle);

  await bookStore.addToCollection();
  await bookStore.openProfile();
  await bookStore.expectBookInCollection(bookTitle);
});