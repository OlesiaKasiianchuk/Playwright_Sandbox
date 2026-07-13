import { test, expect } from '@playwright/test';

test.describe('DemoQA Text Box page', () => {
  test('should load page, submit form and verify output', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    // Verify page URL and heading
    await expect(page).toHaveURL(/text-box/);
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

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
  });
});