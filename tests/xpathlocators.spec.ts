import { test, expect } from '@playwright/test';


test('XPath Demo in Playwright', async ({ page }) => {

  // Launch the URL and maximize window
  await page.goto('https://demowebshop.tricentis.com/');

  // 1. Absolute XPath (Full XPath) - Not recomended
  const logo = page.locator('//html/body/div[4]/div[1]/div[1]/div[1]/a/img');
  await expect(logo).toBeVisible();  // Expect the logo to be visible


  // 2. Relative XPath (Partial XPath)
  const relativeLogo = page.locator('//img[@alt="Tricentis Demo Web Shop"]');
  await expect(relativeLogo).toBeVisible(); // Expect the logo to be visible


  // 3. XPath with contains() 
  let products = page.locator('//h2//a[contains(@href,"computer")]'); // Matches with multipe elements

  const productsCount: number = await products.count();   //Returns number of computer-related products 
  expect(productsCount).toBeGreaterThan(0);  // Expect the number of computer-related products to be greater than 0

  //console.log(await products.textContent()); //Error: strict mode violation: 
  console.log("First Computer product: ", await products.first().textContent());
  console.log("N-th Computer product: ", await products.nth(1).textContent());

  let productTitles: string[] = await products.allTextContents();// getting all the matched products in to an array
  console.log("All computer related product names:", productTitles);

  for (let pt of productTitles)  // Printing product using loop
  {
    console.log(pt);
  }


  // 4. XPath with starts-with()
  const buildingProducts = page.locator('//h2//a[starts-with(@href,"/build")]'); // Matches with multipe elements
  const count = await buildingProducts.count();
  expect(count).toBeGreaterThan(0);  // Expect the number of build products to be greater than 0


  // 5. XPath with text()
  const registerLink = page.locator('//a[text()="Register"]');
  await expect(registerLink).toBeVisible(); // Expect the register link to be visible


  // 6. XPath with last()
  const googlePlusLinkText: string = await page.locator('//div[@class="column follow-us"]//li[last()]').innerText();
  expect(googlePlusLinkText).toBe('Google+');  // Expect the last social media link to be "Google+"


  // 7. XPath with position()
  const twitterText: string = await page.locator('//div[@class="column follow-us"]//li[position()=2]').innerText();
  expect(twitterText).toBe('Twitter'); // Expect the second social media link to be "Twitter"

});