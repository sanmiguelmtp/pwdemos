import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1280
  }
});

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  page.locator("button[onclick='logIn()']")
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();
});