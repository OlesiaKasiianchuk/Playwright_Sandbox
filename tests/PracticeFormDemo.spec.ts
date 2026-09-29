import { test } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';
import { PracticeFormPage } from './page/PracticeFormPage';
import { practiceFormData } from './data/practiceFormData';

test.describe('DemoQA Practice Form page', () => {
  test('should load page and verify the form fields', async ({ page }) => {
    const demoQA = new DemoQAPage(page);
    const practiceFormPage = new PracticeFormPage(page);

    await demoQA.goto();
    await demoQA.clickCardAndMenu(
      'Forms',
      'Practice Form',
      /automation-practice-form/,
      'Practice Form'
    );

    await practiceFormPage.verifyFormFields();
  });

  test('should submit Practice Form successfully', async ({ page }) => {
    const demoQA = new DemoQAPage(page);
    const practiceFormPage = new PracticeFormPage(page);
    const formData = practiceFormData.johndoe;

    await demoQA.goto();
    await demoQA.clickCardAndMenu(
      'Forms',
      'Practice Form',
      /automation-practice-form/,
      'Practice Form'
    );

    await practiceFormPage.fillForm(formData);
    await practiceFormPage.submit();
    await practiceFormPage.verifySuccessfulSubmission(formData);
  });
});