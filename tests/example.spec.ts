import {test, expect} from '@playwright/test';

test ('Simple basic test', async ({page}) =>{
    //Some comment
    await page.goto('https://example.com/')
    const pageTitle=await page.locator('h1')
    await expect (pageTitle).toContainText('Example Domain')
}

)