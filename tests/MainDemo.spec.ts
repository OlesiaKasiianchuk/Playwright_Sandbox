import { test } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test('Navigation from main page', async ({ page }) => {
const demoQA = new DemoQAPage(page);

await demoQA.goto();

// Click on 'Elements'
await demoQA.clickCardByName('Elements');

// Verify URL contains "elements"
await demoQA.verifyCurrentUrl(/elements/);

//Click on Text Box menu item
await demoQA.clickMenuItem('Text Box');

// Verify URL contains "text-box"
await demoQA.verifyCurrentUrl(/text-box/);

//Click all cards
await demoQA.clickAllCards();
});