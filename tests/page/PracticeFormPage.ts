import { expect, Page } from '@playwright/test';

export type PracticeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  number: string;
  subject: string;
  adress: string;
  picture: string;
};

export class PracticeFormPage {
  constructor(private readonly page: Page) {}

  async verifyFormFields(): Promise<void> {
    await expect(this.page.locator('#firstName')).toBeVisible();
    await expect(this.page.locator('#lastName')).toBeVisible();
    await expect(this.page.locator('#userEmail')).toBeVisible();
    await expect(this.page.getByText('Gender')).toBeVisible();
    await expect(this.page.locator('#userNumber')).toBeVisible();
    await expect(
      this.page.getByRole('button', { name: 'Submit' })
    ).toBeVisible();
  }

  async fillForm(data: PracticeFormData): Promise<void> {
    await this.page.locator('#firstName').fill(data.firstName);
    await this.page.locator('#lastName').fill(data.lastName);
    await this.page.locator('#userEmail').fill(data.email);

    await this.page.locator('label[for="gender-radio-1"]').click();

    await this.page.locator('#userNumber').fill(data.number);

    await this.page.locator('#dateOfBirthInput').click();
    await this.page.locator('.react-datepicker__year-select')
      .selectOption('1990');
    await this.page.locator('.react-datepicker__month-select')
      .selectOption('0');
    await this.page
      .locator(
        '.react-datepicker__day--015:not(.react-datepicker__day--outside-month)'
      )
      .click();

    await this.page.locator('#subjectsInput').fill(data.subject);
    await this.page.locator('#subjectsInput').press('Enter');

    await this.page.locator('label[for="hobbies-checkbox-1"]').click();

    await this.page.locator('#currentAddress').fill(data.adress);

    await this.page.locator('#state').click();
    await this.page.getByText('NCR', { exact: true }).click();

    await this.page.locator('#city').click();
    await this.page.getByText('Delhi', { exact: true }).click();

    await this.page
      .locator('#uploadPicture')
      .setInputFiles(`tests/data/${data.picture}`);
  }

  async submit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async verifySuccessfulSubmission(data: PracticeFormData): Promise<void> {
    await expect(
      this.page.getByText('Thanks for submitting the form')
    ).toBeVisible();

    const submittedData = this.page.locator('.table-responsive');

    await expect(submittedData).toContainText(data.firstName);
    await expect(submittedData).toContainText(data.lastName);
    await expect(submittedData).toContainText(data.email);
    await expect(submittedData).toContainText(data.gender);
    await expect(submittedData).toContainText(data.number);
    await expect(submittedData).toContainText(data.picture);
  }
}