import { Page, Locator, expect } from '@playwright/test';

export class DemoQAPage {
private page: Page;

private cardTitles: Locator;

private baseUrl = 'https://demoqa.com';

constructor(page: Page) {
this.page = page;
this.cardTitles = page.locator('div.card-body h5');
}

/**
* Navigate to homepage
*/
async goto(): Promise<void> {
await this.page.goto(this.baseUrl);
await this.page.waitForLoadState('domcontentloaded');
}
/** Generic navigation to any subpage
* Example:
* gotoSubPage('text-box') → https://demoqa.com/text-box
* gotoSubPage('radio-button') → https://demoqa.com/radio-button
*/
async gotoSubPage(path: string): Promise<void> {
const url = `${this.baseUrl}/${path}`;
await this.page.goto(url);
await this.page.waitForLoadState('domcontentloaded');
}
/**
* Click a card by visible text
*/
async clickCardByName(cardName: string): Promise<void> {
const card = this.cardTitles.filter({ hasText: cardName });
await expect(card).toBeVisible();
await card.click();
}

/**
* Click all main cards (Elements, Forms, Alerts, Widgets, Interactions)
*/
async clickAllCards(): Promise<void> {
const cards = [
'Elements',
'Forms',
'Alerts, Frame & Windows',
'Widgets',
'Interactions'
];

for (const name of cards) {
// Navigate back to home before each click (important as page changes)
await this.goto();
await this.clickCardByName(name);
}
}
/**
* Verify current URL matches expected value (exact or partial)
*/
async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
await expect(this.page).toHaveURL(expectedUrl);
}
}