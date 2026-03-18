import { test, expect, Locator } from "@playwright/test"

test("XPath Axes demo", async ({ page }) => {

  await page.goto("https://www.w3schools.com/html/html_tables.asp");

  // 1. self axis - Select <td> element that contains "Germany"

  const germanyCell = page.locator("//td[text()='Germany']/self::td");
  await expect(germanyCell).toHaveText('Germany');

  // 2. parent axis - Get parent <tr> of the "Germany" cell

  const parentRow = page.locator("//td[text()='Germany']/parent::tr")
  await expect(parentRow).toContainText("Maria Anders");
  //await expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany"); //working
  //console.log(await parentRow.textContent())

  // 3. child axis - Get all <td> children of the second <tr> in the table

  const secondRowCells = page.locator("//table[@id='customers']//tr[2]/child::td"); // returns multiple elements( td's)
  await expect(secondRowCells).toHaveCount(3);

  // 4. ancestor axis - Get ancestor <table> of the "Germany" cell

  const table = page.locator("//td[text()='Germany']/ancestor::table")
  await expect(table).toHaveAttribute('id', 'customers');


  // 5. descendant axis - Get all <td> elements under the table
  const allTds = page.locator("//table[@id='customers']/descendant::td")
  await expect(allTds).toHaveCount(18);

  // 6. following axis - Get the <td> that comes after "Germany" in document order

  const followingCell = page.locator("//td[normalize-space()='Germany']/following::td[1]");
  await expect(followingCell).toHaveText("Centro comercial Moctezuma");

  // 7. following-sibling axis - Get <td>s to the right of "Germany"
  //const rightsiblings:Locator=page.locator("//td[normalize-space()='Germany']/following-sibling::td");
  //await expect(rightsiblings).toHaveCount(0);

  const rightsiblings = page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
  await expect(rightsiblings).toHaveCount(1);


  // 8. preceding axis - Get the <td> just before "Germany"

  const precedingCell = page.locator("//td[text()='Germany']/preceding::td[1]");
  await expect(precedingCell).toHaveText("Maria Anders");

  // 9. preceding-sibling axis - Get <td>s to the left of "Germany"

  const leftSiblings = page.locator("//td[text()='Germany']/preceding-sibling::td");
  await expect(leftSiblings).toHaveCount(2);

  await expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste")
  await expect(leftSiblings.nth(1)).toHaveText("Maria Anders")
})