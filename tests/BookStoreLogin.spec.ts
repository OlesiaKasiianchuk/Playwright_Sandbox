import { test, expect } from '@playwright/test';
import { DemoQAPage } from './page/DemoQAPage';

test.describe('DemoQA Book Store login', () => {
    test.beforeEach(async ({ page }) => {
        const demoQA = new DemoQAPage(page);  
        await demoQA.goto();
        await demoQA.clickCardAndMenu(
          'Book Store Application',
          'Login',
          /login/
        );
    });

  test('should log in with an existing user', async ({ page }) => {

    await page.locator('#userName').fill('OKBooks');
    await page.locator('#password').fill('OKBooks2026!');
    await page.locator('#login').click();

    await expect(page).toHaveURL(/profile/);
    await expect(page.locator('#userName-value')).toHaveText('OKBooks');
    await expect(page.getByRole('button', { name: 'Logout', exact: true })).toBeVisible();
  });
  
    test('Log in with invalid credentials', async ({ page }) => {

    await page.locator('#userName').fill('OKBooks');
    await page.locator('#password').fill('test');
    await page.locator('#login').click();

    await expect(page.locator('p.mb-1')).toHaveText('Invalid username or password!')
    
    await expect(page).toHaveURL(/login/);
    
    await expect(page.locator('#login')).toBeVisible();
  });
});