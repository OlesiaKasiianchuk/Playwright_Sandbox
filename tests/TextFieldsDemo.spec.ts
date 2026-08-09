import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('DemoQA Text Box page', () => {
  test('should load page, submit form and verify output', async ({ page }) => {
        const demoQA = new DemoQAPage(page);
    
        await demoQA.goto();
    
        // Click on 'Elements'
        await demoQA.clickCardByName('Elements');
    
        //Click on Text Box menu item
        await demoQA.clickMenuItem('Text Box');
    
        // Verify URL contains "text-box"
        await demoQA.verifyCurrentUrl(/text-box/);
    
        // Verify header is "Text Box"
        await demoQA.verifyCurrentHeader('Text Box');
    
  /*   await page.goto('https://demoqa.com/text-box');

    // Verify page URL and heading
    await expect(page).toHaveURL(/text-box/);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible(); */

    // Verify form fields are visible
    const fullName = page.locator('#userName');
    const email = page.locator('#userEmail');
    const currentAddress = page.locator('#currentAddress');
    const permanentAddress = page.locator('#permanentAddress');
    const submitBtn = page.locator('#submit');

    await expect(fullName).toBeVisible();
    await expect(email).toBeVisible();
    await expect(currentAddress).toBeVisible();
    await expect(permanentAddress).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill form
    const testData = {
      name: 'Olesia Kasiianchuk',
      email: 'olesia.qa@example.com',
      currentAddress: 'Dnipro, Ukraine',
      permanentAddress: 'Khmelnytskyi, Ukraine',
    };

    await fullName.fill(testData.name);
    await email.fill(testData.email);
    await currentAddress.fill(testData.currentAddress);
    await permanentAddress.fill(testData.permanentAddress);

    // Submit form
    await submitBtn.click();

    // Verify output section appears
    const output = page.locator('#output');
    await expect(output).toBeVisible();

    // Validate output values
    await expect(output.locator('#name')).toContainText(testData.name);
    await expect(output.locator('#email')).toContainText(testData.email);
    await expect(output.locator('#currentAddress')).toContainText(testData.currentAddress);
    await expect(output.locator('#permanentAddress')).toContainText(testData.permanentAddress);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    await page.fill('#userName', 'Test User');
    await page.fill('#userEmail', 'invalid-email');
    await page.click('#submit');

    // Email field should be marked invalid
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
    
    // Hover over email field to trigger tooltip
    await page.locator('#userEmail').hover();
    // Verify native validation message
    const validationMessage = await page.locator('#userEmail').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toContain("Please include an '@' in the email address");
  });
});