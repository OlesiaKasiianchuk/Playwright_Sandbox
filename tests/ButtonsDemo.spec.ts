import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('DemoQA Buttons page', () => {
  test('should load page and verify the buttons click', async ({ page }) => {
    const demoQA = new DemoQAPage(page);

    await demoQA.goto();

    // Click on 'Elements', then select 'Buttons' from the menu, and verify the URL and header
    await demoQA.clickCardAndMenu('Elements', 'Buttons', /buttons/, 'Buttons');
    
    //Double-click on the button with name 'Double Click Me'
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();

    // Verify that the message 'You have done a double click' appears
    await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');

    //Right click on the button with name 'Right Click Me'
    await page.getByRole('button', { name: 'Right Click Me' }).click({button:'right'});

    // Verify that the message 'You have done a right click' appears
    await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');

    //Click on the button with name 'Click Me'
    await page.getByRole('button', { name: 'Click Me', exact:true }).click();

    // Verify that the message 'You have done a dynamic click' appears
    await expect(page.locator('#dynamicClickMessage')).toContainText('You have done a dynamic click');
   
  });
});