import { test } from '@playwright/test';
import { DemoQAPage } from './DemoQAPage';

test('Click all main cards on DemoQA homepage', async ({ page }) => {
const demoQA = new DemoQAPage(page);

await demoQA.goto();

// Click on 'Elements'
await demoQA.clickCardByName('Elements');

// Verify URL contains "elements"
await demoQA.verifyCurrentUrl(/elements/);

//Click all cards
await demoQA.clickAllCards();
});