import { test, expect } from '@playwright/test';
import { getBookStoreUserData } from './data/bookStoreUserData';
import { BookStoreActions } from './page/BookStoreActions';
import { BookStoreVerifications } from './page/BookStoreVerifications';


test.describe('DemoQA Book Store login', () => {
  let bookStore: BookStoreActions;
  let verifications: BookStoreVerifications;

  test.beforeEach(async ({ page }) => {
    bookStore = new BookStoreActions(page);
    verifications = new BookStoreVerifications(page);
    await bookStore.openBookStorePage('Book Store Application', 'Login', /login/);
  });

  test('Log in with an existing user', async ({ page }) => {
    const bookStoreUser = getBookStoreUserData();

    await bookStore.login(
      bookStoreUser.username,
      bookStoreUser.password
    );
    await verifications.expectProfilePage();
    await verifications.isElementHaveText(
      page.locator('#userName-value'),
      bookStoreUser.username
    );
    
    await verifications.isElementVisible(
      page.getByRole('button', { name: 'Logout', exact: true }),
      true
    );
  });
  
    test('Log in with invalid credentials', async ({ page }) => {
        const bookStoreUser = getBookStoreUserData();

        await bookStore.login(
          bookStoreUser.username,
          'wrongpassword'
        );

        
        await verifications.isElementHaveText(
          page.locator('#name'),
          'Invalid username or password!'
        );

        await expect(page).toHaveURL(/login/);
        await verifications.isElementVisible(
          page.locator('#login'),
          true
        );
    });
});