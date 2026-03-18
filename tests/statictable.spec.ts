import { test, expect, Locator } from '@playwright/test';

test("static web table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1) count number of rows in a table

    const rows: Locator = table.locator("tr"); //returns all the rows including header
    await expect(rows).toHaveCount(7);  //7  //approach 1

    const rowCount: number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);
    expect(rowCount).toBe(7); // appraoch 2




    //2) count number of headers/columns

    //const  columns:Locator= page.locator("table[name='BookTable'] tbody tr th");

    const columns: Locator = rows.locator("th");
    await expect(columns).toHaveCount(4); //4  appraoch 1

    const columnCount: number = await columns.count();
    console.log("number of columns/headers: ", columnCount);
    expect(columnCount).toBe(4); // appraoch 2




    // 3) Read all data from 2nd row (index 2 means 3rd row including header)
    const secondRowCells: Locator = rows.nth(2).locator('td');

    const secondRowTexts: string[] = await secondRowCells.allInnerTexts();
    console.log("2nd Row data: ", secondRowTexts); //[ 'Learn Java', 'Mukesh', 'Java', '500' ]

    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']); //assetion

    console.log("printing 2nd row data......")
    for (let text of secondRowTexts) {
        console.log(text);
    }



    // 4) Read all data from the table (excluding header)

    console.log('Printing all Table Data.......');

    const allRowData = await rows.all();  // get all row locators   //all() returns array of locators

    console.log("BookName   Author  subject   price");

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {
        const cols = await row.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }




    // 5) Print book names where author is Mukesh
    console.log("Books written by Mukesh.......")

    const mukeshBooks: string[] = [];

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {

        //const cells=await row.locator('td').allInnerTexts();
        //const authorName=cells[1];
        //const bookName=cells[0];

        // You can use below 2 statements instead of using above 3 statements to get authorName & Book Name
        const authorName = await row.locator('td').nth(1).innerText(); // Capture Author name 
        const bookName = await row.locator('td').nth(0).innerText(); // Capture Book name 

        if (authorName === 'Mukesh') {
            console.log(`${authorName} \t ${bookName}`)
            mukeshBooks.push(bookName);
        }

    }
    expect(mukeshBooks).toHaveLength(2); //Assertion

    // 6) Calculate total price of all books

    let totalPrice: number = 0;

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {
        //const cells:string[]=await row.locator('td').allInnerTexts();// captured all the td's from row
        //const price=cells[3]; // capture price from 3th index

        const price = await row.locator('td').nth(3).innerText(); // You can use single statement instead of using above 2 statements to get price
        totalPrice = totalPrice + parseInt(price);

    }
    console.log("Total price: ", totalPrice)

    expect(totalPrice).toBe(7100); //Assertion

})