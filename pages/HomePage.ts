// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly productsList;
    private readonly addToCartButton;
    private readonly cartLink;

    constructor(page: Page) {
        this.page = page;

        // CSS selector targeting all product links under the product cards
        this.productsList = page.locator('div#tbodyid div.card h4.card-title a');

        // 'Add to cart' button (exact match using text)
        this.addToCartButton = page.locator('a:has-text("Add to cart")');

        // Cart link in the top menu
        this.cartLink = page.locator('#cartur');
    }

    // Method to add a specific product to cart
    async addProductToCart(productName: string) {
        // Use Playwright's built-in filter to find the product link reliably
        const productLink = this.productsList.filter({ hasText: productName }).first();
        await productLink.waitFor({ state: 'visible' });
        await productLink.click();

        // Wait for the "Add to cart" button to be visible after navigation
        await this.addToCartButton.waitFor({ state: 'visible' });

        // Handle alert/dialog after clicking "Add to cart"
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });

        await this.addToCartButton.click();
    }

    // Method to navigate to the cart
    async gotoCart() {
        await this.cartLink.click();
    }
}
