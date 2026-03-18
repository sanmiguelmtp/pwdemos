// pages/CartPage.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly productNamesInCart;

    constructor(page: Page) {
        this.page = page;

        // CSS selector to select all product name cells in the cart table
        this.productNamesInCart = page.locator('#tbodyid tr td:nth-child(2)');
    }

    // Method to check how many times a specific product is present in the cart
    async checkProductInCart(productName: string): Promise<number> {
        const productLocator = this.productNamesInCart.filter({ hasText: productName });
        console.log(`Checking for product "${productName}" in the cart...`);
        try {
            await productLocator.first().waitFor({ state: 'visible', timeout: 10000 });
            const count = await productLocator.count();
            console.log(`Product "${productName}" found ${count} time(s) in the cart.`);
            return count;
        } catch {
            console.log(`Product "${productName}" is not present in the cart.`);
            return 0;
        }
    }
}
