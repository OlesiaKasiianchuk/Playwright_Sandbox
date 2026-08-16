import { Page, Locator, expect } from '@playwright/test';

export class DemoQAPage {
private page: Page;

private baseUrl = 'https://demoqa.com';

constructor(page: Page) {
this.page = page;
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
const card = this.page.getByRole('link', {
name: cardName,
exact: true
});

await expect(card).toBeVisible();
await card.click();
}

/*Click menu item*/
async clickMenuItem(itemName: string): Promise<void> {
  const menuItem = this.page.getByRole('link', {
    name: itemName,
    exact: true,
  });

  await expect(menuItem).toBeVisible();
  await menuItem.click();
  await this.page.waitForLoadState('domcontentloaded');
}

/**
* Click all main cards (Elements, Forms, Alerts, Widgets, Book Store Application)
*/
async clickAllCards(): Promise<void> {
const cards = [
'Elements',
'Forms',
'Alerts, Frame & Windows',
'Widgets',
'Interactions',
'Book Store Application'
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

/**
* Verify current Header matches expected value
*/
async verifyCurrentHeader(expectedHeader: string | RegExp): Promise<void> {
    await expect(this.page.getByRole('heading', { name: expectedHeader })).toBeVisible();
}
}