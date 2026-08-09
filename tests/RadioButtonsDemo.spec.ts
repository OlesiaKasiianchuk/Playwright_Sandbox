import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('DemoQA Radio Button page', () => {
  test('should load page and verify the radio button check', async ({ page }) => {
    const demoQA = new DemoQAPage(page);
    await demoQA.gotoSubPage('radio-button');
    // Verify page URL and heading
    await demoQA.verifyCurrentUrl(/radio-button/);
    await expect(page.getByRole('heading', { name: 'Radio Button' })).toBeVisible();

    //Verify that No option is disabled
    await expect(page.getByRole('radio',{name: 'No'})).toBeDisabled;

    //Select the Yes option
    await page.getByRole('radio',{name: 'Yes'}).check();

    //Verify it is selected
    await expect(page.getByRole('radio', { name: 'Yes' })).toBeChecked();
    
    //Verify the text message 'You have selected' appears 
    await expect(page.getByText("You have selected")).toBeVisible();

    //Verify the text message correctly displays  selected Yes value
    await expect(page.locator('.text-success')).toHaveText('Yes');

    //Select the Impressive option
    await page.getByRole('radio',{name: 'Impressive'}).check();

    //Verify it is selected
    await expect(page.getByRole('radio', { name: 'Impressive' })).toBeChecked();
    
    //Verify the text message 'You have selected Impressive' appears 
    await expect(page.getByText("You have selected")).toBeVisible();

    //Verify the text message correctly displays selected Impressive value
    await expect(page.locator('p.mt-3 span.text-success')).toHaveText('Impressive');
  });
});