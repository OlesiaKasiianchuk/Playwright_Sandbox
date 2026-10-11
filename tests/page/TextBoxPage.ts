import { expect, Page } from '@playwright/test';

export type TextBoxData = {
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
};

export class TextBoxPage {
    constructor(private readonly page: Page) { }

    async fillTextBoxForm(data: TextBoxData): Promise<void> {
        await this.page.locator('#userName').fill(data.name);
        await this.page.locator('#userEmail').fill(data.email);
        await this.page.locator('#currentAddress').fill(data.currentAddress);
        await this.page.locator('#permanentAddress').fill(data.permanentAddress);
    }

    async submitTextBoxForm(): Promise<void> {
        await this.page.locator('#submit').click();
    }

    async verifyTextBoxOutput(data: TextBoxData): Promise<void> {
        const output = this.page.locator('#output');

        await expect(output).toBeVisible();
        await expect(output.locator('#name')).toContainText(data.name);
        await expect(output.locator('#email')).toContainText(data.email);
        await expect(output.locator('#currentAddress'))
            .toContainText(data.currentAddress);
        await expect(output.locator('#permanentAddress'))
            .toContainText(data.permanentAddress);
    }
}