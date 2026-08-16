import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';
import { practiceFormData } from './data/practiceFormData';
import { textBoxTestData } from './data/textBoxData';

test.describe('DemoQA Practice Form page', () => {
    test('Should load page and verify the form fields', async ({ page }) => {
        const demoQA = new DemoQAPage(page);

        await demoQA.goto();

        // Click on 'Forms'
        await demoQA.clickCardByName('Forms');

        //Click on Buttons menu item
        await demoQA.clickMenuItem('Practice Form');

        // Verify URL contains "automation-practice-form"
        await demoQA.verifyCurrentUrl(/automation-practice-form/);

        // Verify header is "Practice Form"
        await demoQA.verifyCurrentHeader('Practice Form');

        // Verify key form fields exist
        await expect(page.locator('#firstName')).toBeVisible();
        await expect(page.locator('#lastName')).toBeVisible();
        await expect(page.locator('#userEmail')).toBeVisible();

        // Verify gender section
        await expect(page.getByText('Gender')).toBeVisible();

        // Verify mobile number field
        await expect(page.locator('#userNumber')).toBeVisible();

        // Verify submit button
        await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    });

    test('should submit Practice Form successfully', async ({ page }) => {
        const demoQA = new DemoQAPage(page);

        await demoQA.goto();

        // Click on 'Forms'
        await demoQA.clickCardByName('Forms');

        //Click on Buttons menu item
        await demoQA.clickMenuItem('Practice Form');

        // Verify URL contains "automation-practice-form"
        await demoQA.verifyCurrentUrl(/automation-practice-form/);

        // Verify header is "Practice Form"
        await demoQA.verifyCurrentHeader('Practice Form');


        // Fill basic information
        await page.locator('#firstName').fill(practiceFormData.johndoe.firstName);
        await page.locator('#lastName').fill(practiceFormData.johndoe.lastName);
        await page.locator('#userEmail').fill(practiceFormData.johndoe.email);

        // Select Gender
        await page.locator('label[for="gender-radio-1"]').click(); // Male

        // Mobile number
        await page.locator('#userNumber').fill(practiceFormData.johndoe.number);

        // Date of Birth
        await page.locator('#dateOfBirthInput').click();
        await page.locator('.react-datepicker__year-select').selectOption('1990');
        await page.locator('.react-datepicker__month-select').selectOption('0'); // January
        await page.locator('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();

        // Subjects
        await page.locator('#subjectsInput').fill(practiceFormData.johndoe.subject);
        await page.locator('#subjectsInput').press('Enter');

        // Hobbies
        await page.locator('label[for="hobbies-checkbox-1"]').click(); // Sports

        // Address
        await page.locator('#currentAddress').fill(practiceFormData.johndoe.adress);

        // State and City
        await page.locator('#state').click();
        await page.getByText('NCR', { exact: true }).click();

        await page.locator('#city').click();
        await page.getByText('Delhi', { exact: true }).click();

        //Add a picture
        await page.locator('#uploadPicture').setInputFiles(`tests/data/${practiceFormData.johndoe.picture}`);
        

        // Submit
        await page.getByRole('button', { name: 'Submit' }).click();

        // Verify success modal
        await expect(page.getByText('Thanks for submitting the form')).toBeVisible();

        // Verify submitted data
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.firstName);
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.lastName);
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.email);
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.gender);
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.number);
        await expect(page.locator('.table-responsive')).toContainText(practiceFormData.johndoe.picture);
    });
});
