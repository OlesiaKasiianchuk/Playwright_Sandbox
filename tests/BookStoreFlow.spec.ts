import { test, expect } from '@playwright/test';
import { BookStorePage } from './page/BookStorePage';

test('should add books to the user collection and delete them', async ({ page, request }) => {
  const username = `playwright_${Date.now()}`;
  const password = 'Password1!';

  const createUserResponse = await request.post('/Account/v1/User', {
    data: { userName: username, password },
  });

  expect(createUserResponse.status()).toBe(201);

  const { userID } = await createUserResponse.json();
  const bookStore = new BookStorePage(page);

  try {
    await bookStore.openLogin();
    await bookStore.login(username, password);
    await bookStore.openBookStore();

    await bookStore.addSearchResultToCollection('git');

    await page.locator('#gotoStore').click();

    const javaBookTitle = await bookStore.addSearchResultToCollection('java');

    await bookStore.deleteBookFromCollection(javaBookTitle);
  } finally {
    const loginResponse = await request.post('/Account/v1/Login', {
      data: {
        userName: username,
        password,
      },
    });

    if (loginResponse.ok()) {
      const { token } = await loginResponse.json();

      const deleteResponse = await request.delete(`/Account/v1/User/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(deleteResponse.ok()).toBeTruthy();
    }
  }
});