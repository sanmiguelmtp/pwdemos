import { test, expect, Locator, Page } from "@playwright/test"

async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {

    while (true) {
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.locator('.ui-datepicker-next').click(); //Future 
        }
        else {
            await page.locator('.ui-datepicker-prev').click(); //Past 
        }
        //await page.waitForTimeout(2000);
    }


    const allDates = await page.locator(".ui-datepicker-calendar td").all();

    for (let dt of allDates) {
        const dateText = await dt.innerText();
        if (dateText === targetDate) {
            await dt.click()
            break;
        }

    }
}



test("JQuery datepicker", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput: Locator = page.locator('#datepicker');
    expect(dateInput).toBeVisible();

    //Appraoch 1: using fill() method
    //dateInput.fill("06/20/2025");   //mm/dd/yyyy

    //Appraoch 2: using date picker

    await dateInput.click(); //opens the date picker

    //future target date
    /*const year='2026';
    const month='June';
    const date='15';
    */
    //past target date

    const year = '2024';
    const month = 'June';
    const date = '15';


    selectDate(year, month, date, page, false); // futuredate-true  pastdate-false

    const expectedDate = '06/15/2024';  //mm//dd//yyyy
    await expect(dateInput).toHaveValue(expectedDate);


    await page.waitForTimeout(5000);

})