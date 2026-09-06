import { test, expect } from '@playwright/test';
import { bookStoreUser } from './data/bookStoreUserData';
import { BookStorePage } from './page/BookStorePage';


test.describe('DemoQA Book Store login', () => {
  test('Log in with an existing user', async ({ page }) => {
    const bookStore = new BookStorePage(page);

    await bookStore.openLogin();
    await bookStore.login(
      bookStoreUser.username,
      bookStoreUser.password
    );

    await expect(page.locator('#userName-value'))
      .toHaveText(bookStoreUser.username);
    await expect(
      page.getByRole('button', { name: 'Logout', exact: true })
    ).toBeVisible();
  });
  
    test('Log in with invalid credentials', async ({ page }) => {


        const bookStore = new BookStorePage(page);
        await bookStore.openLogin();
        await bookStore.loginUnsuccessfully(
          bookStoreUser.username,
          'wrongpassword'
        );

        await expect(page.locator('#name'))
          .toHaveText('Invalid username or password!');

        await expect(page).toHaveURL(/login/);
        await expect(page.locator('#login')).toBeVisible();
    });
});