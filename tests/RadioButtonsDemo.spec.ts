import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('DemoQA Radio Button page', () => {
  test('should load page and verify the radio button check', async ({ page }) => {
    const demoQA = new DemoQAPage(page);

    await demoQA.goto();

    // Click on 'Elements'
    await demoQA.clickCardByName('Elements');

    //Click on Radio Button menu item
    await demoQA.clickMenuItem('Radio Button');

    // Verify URL contains "radio-button"
    await demoQA.verifyCurrentUrl(/radio-button/);

    // Verify header is "Radio Button"
    await demoQA.verifyCurrentHeader('Radio Button');
    
    //Verify that No option is disabled
    await expect(page.getByRole('radio', { name: 'No' })).toBeDisabled;

    //Select the Yes option
    await page.getByRole('radio', { name: 'Yes' }).check();

    //Verify it is selected
    await expect(page.getByRole('radio', { name: 'Yes' })).toBeChecked();

    //Verify the text message 'You have selected' appears 
    await expect(page.getByText("You have selected")).toBeVisible();

    //Verify the text message correctly displays  selected Yes value
    await expect(page.locator('.text-success')).toHaveText('Yes');

    //Select the Impressive option
    await page.getByRole('radio', { name: 'Impressive' }).check();

    //Verify it is selected
    await expect(page.getByRole('radio', { name: 'Impressive' })).toBeChecked();

    //Verify the text message 'You have selected Impressive' appears 
    await expect(page.getByText("You have selected")).toBeVisible();

    //Verify the text message correctly displays selected Impressive value
    await expect(page.locator('p.mt-3 span.text-success')).toHaveText('Impressive');
  });
});