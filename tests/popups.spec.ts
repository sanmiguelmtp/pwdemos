import { test, expect, Page } from "@playwright/test";

test("handle popups", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Multple popups

    //page.waitForEvent('popup');
    //await page.locator("#PopUp").click();

    await Promise.all([page.waitForEvent('popup'), await page.locator("#PopUp").click()]);

    const allPopupWindows = context.pages(); // Returns array of pages
    console.log("Number of pages/windows:", allPopupWindows.length); //3

    console.log(allPopupWindows[0].url()); // returns url of main page/parent
    console.log(allPopupWindows[1].url()) //https://www.selenium.dev/
    console.log(allPopupWindows[2].url()) //https://playwright.dev/ 


    for (const pw of allPopupWindows) {
        const title = await pw.title();
        if (title.includes('Playwright')) {
            await pw.locator('.getStarted_Sjon').click();
            await page.waitForTimeout(5000);
            //Perform any other actions....
            await pw.close(); // This will close playwrigt popup window

        }

    }

    await page.waitForTimeout(5000);


})