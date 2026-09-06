import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';
import { textBoxTestData } from './data/textBoxData';
import { TextBoxPage } from './page/TextBoxPage';

test.describe('DemoQA Text Box page', () => {
  test('should load page, submit form and verify output', async ({ page }) => {
    const demoQA = new DemoQAPage(page);
    const textBoxPage = new TextBoxPage(page);

    await demoQA.goto();

    await demoQA.clickCardAndMenu(
      'Elements',
      'Text Box',
      /text-box/,
      'Text Box'
    );

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

    await textBoxPage.fillTextBoxForm(textBoxTestData.validUser);
    await textBoxPage.submitTextBoxForm();
    await textBoxPage.verifyTextBoxOutput(textBoxTestData.validUser);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    const demoQA = new DemoQAPage(page);
    const textBoxPage = new TextBoxPage(page);

    await demoQA.goto();

    await demoQA.clickCardAndMenu(
      'Elements',
      'Text Box',
      /text-box/,
      'Text Box'
    );

    await textBoxPage.fillTextBoxForm(textBoxTestData.invalidUser);
    await textBoxPage.submitTextBoxForm();

    const emailField = page.locator('#userEmail');

    await expect(emailField).toHaveClass(/field-error/);

    await emailField.hover();

    const validationMessage = await emailField.evaluate(
      (element: HTMLInputElement) => element.validationMessage
    );

    expect(validationMessage).toContain(
      "Please include an '@' in the email address"
    );
  });
});