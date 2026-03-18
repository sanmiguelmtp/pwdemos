//alert(), confirm(), prompt() dialogs/JSalerts
//Reference:  https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs

//1) By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. 
// 2) However, you can register a dialog handler before the action that triggers the dialog to either 
// dialog.accept() or dialog.dismiss() it.

import { test, expect } from "@playwright/test";


test("Simple Dialog", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('alert');
        console.log("Dialog Text:", dialog.message()); // returns message from dialog
        expect(dialog.message()).toContain("I am an alert box!");
        dialog.accept();
    });
    await page.locator("#alertBtn").click(); // Opens dialog
    await page.waitForTimeout(5000);
})



test("Confirmation Dialog", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('confirm');
        console.log("Dialog Text:", dialog.message()); // returns message from dialog
        expect(dialog.message()).toContain("Press a button!");
        dialog.accept(); // close dialog by accepting
        //dialog.dismiss(); // close dialog by dimissing
    });

    await page.locator("#confirmBtn").click(); // Opens conformation dialog

    const text: string = await page.locator("#demo").innerText();
    console.log("Output text:", text);
    //await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
    await page.waitForTimeout(5000);
})


test.only("Prompt Dialog", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('prompt');
        console.log("Dialog Text:", dialog.message()); // returns message from dialog
        expect(dialog.message()).toContain("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter"); // checks default value of the dialog

        dialog.accept('John'); // close dialog by accepting

    });

    await page.locator("#promptBtn").click(); // Opens Prompt dialog

    const text: string = await page.locator("#demo").innerText();
    console.log("Output text:", text);
    await expect(page.locator("#demo")).toHaveText("Hello John! How are you today?");
    await page.waitForTimeout(5000);
})