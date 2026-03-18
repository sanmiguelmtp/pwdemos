import { test, expect, Locator } from "@playwright/test"

test("Bootsrtap hidden dropdown", async ({ page }) => {


  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  //Login steps
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  //click on the PIM
  await page.getByText('PIM').click();

  //click on Job TiTLE Dropdown
  await page.locator('form i').nth(2).click();
  await page.waitForTimeout(3000);


  // capture all the options from dropdown and count

  const options: Locator = page.locator("div[role='listbox'] span");

  const count: number = await options.count();
  console.log("Number of options in a dropdown:", count);

  // Print all the options

  console.log("All the text contenst:", await options.allTextContents());

  console.log("Pring all the options.....")
  for (let i = 0; i < count; i++) {
    //console.log(await options.nth(i).innerText());
    console.log(await options.nth(i).textContent());
  }

  //Select/click on option
  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    if (text === 'Automaton Tester') {
      await options.nth(i).click();
      break;
    }

  }

  await page.waitForTimeout(5000);


})