import { test, expect, Locator } from '@playwright/test';

test("Comparing methods", async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const products: Locator = page.locator('.product-title');   //6

    //1) innerText() Vs textContent()

    //console.log(await products.nth(1).innerText()); //14.1-inch Laptop
    //console.log(await products.nth(1).textContent());
    /*
     const count=await products.count();
 
     for(let i=0;i<count;i++)
     {
         //const productName :string=await products.nth(i).innerText(); // Extracts plain text. Eliminates Whitespace and line breaks
         //console.log(productName);
 
         //const productName: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
         //console.log(productName);
 
         const productName: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
         console.log(productName?.trim());
 
     }
  */


    //2)  allInnerText() Vs allTextContent()

    /*
    console.log("**** Comparing allInnerText() Vs allTextContent() *****")
        
    //const productNames: string[]=await products.allInnerTexts()
    //console.log("Product Names captured by allInnerText(): ", productNames)
    
    const productNames: string[]=await products.allTextContents()
    console.log("Product Names captured by allTextContent(): ", productNames)
    
    const productNamesTrimmed:string[]=productNames.map(text=>text.trim());
    console.log("Product Names after trimmed: ", productNamesTrimmed)
    
    */


    //3) all() - converts Locator----> Locator[]
    //Returns array of locators
    //Returns array of locators (Stores locators of products)/Converts Locator to array of locators (for iteration)

    const productsLocators: Locator[] = await products.all();
    console.log(productsLocators);

    //console.log(await productsLocators[1].innerText());

    //for of loop
    /*for(let productloc of productsLocators)
    {
        console.log(await productloc.innerText());
    
    }
    */

    //for in loop

    for (let i in productsLocators) {
        console.log(await productsLocators[i].innerText());
    }


})