import { test, expect } from '@playwright/test';

test('CSS Locators in Playwright', async ({ page }) => {
  // Launch the URL
  await page.goto('https://demowebshop.tricentis.com/');

  // logo (CSS locator)
  const relativeLogo = page.locator('img[alt="Tricentis Demo Web Shop"]');
  await expect(relativeLogo).toBeVisible();


  // Products containing "computer" in href attribute 
  let products = page.locator('h2 > a[href*="computer"]');   //[href*="computer"] mimics XPath's contains().
  const productsCount: number = await products.count();
  expect(productsCount).toBeGreaterThan(0);

  console.log("First Computer product: ", await products.first().textContent());
  console.log("N-th Computer product: ", await products.nth(1).textContent());

  let productTitles: string[] = await products.allTextContents();
  console.log("All computer related product names:", productTitles);

  for (let pt of productTitles) {
    console.log(pt);
  }

  // Products starting with "/build" in href attribute
  const buildingProducts = page.locator('h2 > a[href^="/build"]');  //[href^="/build"] mimics XPath's starts-with().
  const count = await buildingProducts.count();
  expect(count).toBeGreaterThan(0);

  // Register link using CSS selector with exact text match
  const registerLink = page.locator('a[href="/register"]');
  await expect(registerLink).toBeVisible();

  // Last social media link (Google+) using :last-child
  const googlePlusLinkText: string = await page.locator('.follow-us ul li:last-child').innerText();
  expect(googlePlusLinkText).toBe('Google+');

  // Second social media link (Twitter) using :nth-child(2)
  const twitterText: string = await page.locator('.follow-us ul li:nth-child(2)').innerText();
  expect(twitterText).toBe('Twitter');

  
});
