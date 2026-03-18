/*
1. Run all sanity tests:
    npx playwright test tests/tagging.spec.ts --grep "@sanity" 


2. Run all regression tests:
    npx playwright test tests/tagging.spec.ts --grep "@regression"

3. Run tests which are belongs to both sanity & regression

npx playwright test tests/tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"

(?=.*@sanity)
(?=.*@regression)

(?=.*@sanity)(?=.*@regression)

4. Run tests belongs to either sanity or regression.
    npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression"

5. Run sanity tests which are not belongs to regression (special case)
    npx playwright test tests/tagging.spec.ts --grep "@sanity" --grep-invert "@regression"
    


*/
import { test, expect } from '@playwright/test';

/*
test('@sanity @regresion Check title of the home page', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});
*/

test('Check title of the home page', { tag: '@sanity' }, async ({ page }) => {
  await page.goto('https://www.google.es/');
  await expect(page).toHaveTitle('Google');
});


test('Check navigation to Store page', { tag: '@regression' }, async ({ page }) => {
  await page.goto('https://www.google.es/');
  await page.locator("text='Store'").click();
  await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
});


test('Check top recommendations', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
  await page.goto('https://www.google.es/');
  await page.locator("text='Store'").click();
  await expect(page.locator("text='Our Top Recommendations.'")).toHaveText('Our Top Recommendations.');
});


