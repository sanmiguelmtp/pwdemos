import { test, expect, Locator } from "@playwright/test";


//Text Input/ Text Box/ Input Box
// Radio Buttons
//Check boxes

test('Text Input Actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const textBox: Locator = page.locator('#name');

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxLength: string | null = await textBox.getAttribute("maxlength"); // Returns value of maxlength attribute of the element
    expect(maxLength).toBe('15');


    await textBox.fill("John Canedy");

    //console.log("text content of FirstName :", await textBox.textContent()); // returns empty

    const enteredValue: string = await textBox.inputValue();
    console.log("Input Value of the FirstName :", enteredValue); // returns th einput value of text box
    expect(enteredValue).toBe("John Canedy");

    await page.waitForTimeout(3000);

});


//Radio Buttons

test('Radio Button Actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio: Locator = page.locator('#male');  // Male radio button

    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);

    await maleRadio.check(); // select radio button
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked(); // Preferable

    await page.waitForTimeout(3000);

});



test.only('CheckBox Actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1. Select specific checkbox (Sunday) using getByLabel and assert
    const sundayCheckbox: Locator = page.getByLabel('Sunday');
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();


    // 2. Select all checkboxes and assert each is checked
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    // 3. Select all checkboxes and assert each is checked

    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    await page.waitForTimeout(2000);

    // 4. Uncheck last 3 checkboxes and assert


    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    await page.waitForTimeout(3000);


    //5.    Toggle checkboxes: If checked, uncheck; if unchecked, check. Assert state flipped.

    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) // true
        {
            // onlyne if checked
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();

        }
        else {
            // onlyne if not checked
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(3000);


    // 6. Randomely select check boxes - Select checkboxes by index (1, 3, 6) and assert

    const indexes: number[] = [1, 3, 6];

    for (const i of indexes) {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();

    }
    await page.waitForTimeout(5000);


    //7. Select the check box based on the Label
    const weekname: string = "Friday";

    for (const label of days) {
        if (label.toLowerCase() === weekname.toLowerCase()) {
            const checkbox = page.getByLabel(label);
            checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(5000);

});



