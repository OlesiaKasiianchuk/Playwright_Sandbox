import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('Book Store collection', () => {
    test('should add Git Pocket Guide to the user collection', async ({ page }) => {
        const demoQA = new DemoQAPage(page);

        await demoQA.goto();
        await demoQA.clickCardAndMenu(
            'Book Store Application',
            'Login',
            /login/
        );

        await page.locator('#userName').fill('OKBooks');
        await page.locator('#password').fill('OKBooks2026!');
        await page.locator('#login').click();

        await expect(page).toHaveURL(/profile/);

        await demoQA.goto();
        await demoQA.clickCardAndMenu(
            'Book Store Application',
            'Book Store',
            /books/
        );

        await page.locator('#searchBox').fill('git');

        const books = page.locator('span[id^="see-book-"] > a');

        await expect(books).toHaveCount(1);
        await expect(books.first()).toHaveText('Git Pocket Guide');
        await books.first().click();

        await page.getByRole('button', {
            name: 'Add To Your Collection',
            exact: true,
        }).click();
        await demoQA.goto();
        await demoQA.clickCardAndMenu(
            'Book Store Application',
            'Profile',
            /profile/
        );

        const collection = page.locator('span[id^="see-book-"] > a');

        const gitBook = collection.filter({
            hasText: /^Git Pocket Guide$/,
        });

        await expect(gitBook).toHaveCount(1);
    });
});