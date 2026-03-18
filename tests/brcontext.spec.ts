import { test, expect, Page, chromium, firefox, webkit } from "@playwright/test";

// Browser ---> Context ----> pages

//Browser ---> chromium, firefox, webkit

//Contexts ---> we can have multiple contexts for multiple users/apps for the same browser 
// provide a way to operate multiple independent browser sessions.
//page ---> New Tab, Window, Popup


test("Browser context demo", async () => {


    const browser = await chromium.launch();  // Create browser
    const context = await browser.newContext();  // create context

    // creating 2 pages
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    console.log("No of pages created:", context.pages().length); //2

    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")

    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle("Selenium");

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);


})