// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    //variables
    private readonly page: Page;
    private readonly loginLink;
    private readonly usernameInput;
    private readonly passwordInput;
    private readonly loginButton;
    private readonly loggedInUsername;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' })
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        // Element in the navbar that shows the username after a successful login
        this.loggedInUsername = page.locator('#nameofuser');
    }

    //Métodos
    async clickLoginLink() {
        await this.loginLink.click();
    }

    async enterUserName(username: string) {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

    async performLogin(username: string, password: string) {
        await this.clickLoginLink();
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.enterUserName(username);
        await this.enterPassword(password);

        // Race: backdrop gone = success | dialog appears = login error from demoblaze
        const backdropGone = this.page.waitForSelector('.modal-backdrop', { state: 'detached', timeout: 10000 });
        const loginErrorDialog = new Promise<string>(resolve => {
            this.page.once('dialog', async (dialog) => {
                const msg = dialog.message();
                await dialog.accept();
                resolve(msg);
            });
        });

        await this.clickOnLoginButton();

        const result = await Promise.race([
            backdropGone.then(() => 'success'),
            loginErrorDialog.then(msg => `error: ${msg}`)
        ]);

        if (result !== 'success') {
            throw new Error(`Login failed — ${result}`);
        }
    }
}