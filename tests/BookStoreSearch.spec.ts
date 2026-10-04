//delete not used expected
import { test, expect } from '@playwright/test';
import { BookStoreActions } from './page/BookStoreActions';
import { BookStoreVerifications } from './page/BookStoreVerifications';

test.describe('Book Store Search', () => {
    let bookStore: BookStoreActions;
    let verifications: BookStoreVerifications;   
    test.beforeEach(async ({ page }) => {
        //move to the describe level
        bookStore = new BookStoreActions(page);
        verifications = new BookStoreVerifications(page);
        await bookStore.openBookStorePage('Book Store Application', 'Book Store', /books/);
    });

    test('should return 1 result when searching for "git"', async ({ page }) => {
        await bookStore.searchBook('git');
        await verifications.expectSearchResultsCount(1);
        await verifications.expectAllResultsToContain('git');
    });

    test('should return 4 results when searching for "Java"', async ({ page }) => {
        await bookStore.searchBook('Java');
        await verifications.expectSearchResultsCount(4);
        await verifications.expectAllResultsToContain('Java');
    });
});
