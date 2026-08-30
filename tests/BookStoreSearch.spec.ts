import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('Book Store Search', () => {
    test.beforeEach(async ({ page }) => {
        const demoQA = new DemoQAPage(page);

        await demoQA.goto();

        // Click on 'Book Store Application', then select 'Book Store' from the menu, and verify the URL
        await demoQA.clickCardAndMenu('Book Store Application', 'Book Store', /books/);
    });

    test('should return 1 result when searching for "git"', async ({ page }) => {
        const searchBox = page.locator('#searchBox');

        await searchBox.fill('git');

        const books = page.locator('span[id^="see-book-"] > a');

        await expect(books).toHaveCount(1);
        await expect(books.first()).toHaveText('Git Pocket Guide');
    });

    test('should return 4 results when searching for "Java"', async ({ page }) => {
        const searchBox = page.locator('#searchBox');

        await searchBox.fill('Java');

        const books = page.locator('span[id^="see-book-"] > a');

        await expect(books).toHaveCount(4);


        for (let index = 0; index < 4; index++) {
            await expect(books.nth(index)).toContainText(/Java/i);
        }
    });
});
