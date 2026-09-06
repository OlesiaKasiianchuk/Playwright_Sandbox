import { test, expect } from '@playwright/test';
import { BookStorePage } from './page/BookStorePage';

test.describe('Book Store Search', () => {
    test.beforeEach(async ({ page }) => {
        const bookStore = new BookStorePage(page);
        await bookStore.openBookStore();
    });

    test('should return 1 result when searching for "git"', async ({ page }) => {
        const bookStore = new BookStorePage(page);
        await bookStore.searchAndVerifyResults('git', 1);
        await bookStore.expectAllResultsToContain('git');
    });

    test('should return 4 results when searching for "Java"', async ({ page }) => {
        const bookStore = new BookStorePage(page);
        await bookStore.searchAndVerifyResults('Java', 4);
        await bookStore.expectAllResultsToContain('Java');
    });
});
