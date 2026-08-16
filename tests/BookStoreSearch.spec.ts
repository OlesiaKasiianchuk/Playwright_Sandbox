import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('Book Store Search', () => {
  test.beforeEach(async ({ page }) => {
     const demoQA = new DemoQAPage(page);

    await demoQA.goto();

    // Click on 'Book Store Application'
    await demoQA.clickCardByName('Book Store Application');

    //Click on Book Store menu item
    await demoQA.clickMenuItem('Book Store');

    // Verify URL contains "books"
    await demoQA.verifyCurrentUrl(/books/);
  });

  test('should return 1 result when searching for "git"', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    await searchBox.fill('git');

    const books = page.locator('a[href*="/books?search="]');

    await expect(books).toHaveCount(1);
    await expect(books.first()).toHaveText('Git Pocket Guide');
  });

  test('should return 4 results when searching for "Java"', async ({ page }) => {
    const searchBox = page.locator('#searchBox');

    await searchBox.fill('Java');

    const books = page.locator('a[href*="/books?search="]');

    await expect(books).toHaveCount(4);

    await expect(books.nth(0)).toContainText(/JavaScript/i);
    await expect(books.nth(1)).toBeVisible();
    await expect(books.nth(2)).toBeVisible();
    await expect(books.nth(3)).toBeVisible();
  });
});
