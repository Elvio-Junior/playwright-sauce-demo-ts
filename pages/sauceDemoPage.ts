import { type Locator, type Page, expect } from '@playwright/test';

export class SauceDemoPage {
    readonly page: Page;
    readonly elements: {
        userName: Locator,
        userPassword: Locator,
        loginButton: Locator,
        messageError: Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            userName: page.locator('[data-test="username"]'),
            userPassword: page.locator('[data-test="password"]'),
            loginButton: page.locator('[data-test="login-button"]'),
            messageError: page.locator('[data-test="error"]')
        };
    }

    async goTo() {
        await this.page.goto(String(process.env.BASE_URL));
    };

    async inputCredentials(userName: any, userPassword: any) {
        
        if (userName) {
            await this.elements.userName.clear();
            await this.elements.userName.fill(userName);
        } 

        if (userPassword) {
            await this.elements.userPassword.clear();
            await this.elements.userPassword.fill(userPassword);
        } 
    };

    async submitCredentials() {
        await this.elements.loginButton.click();
    };

    async assertErrorMessage(messageError: string){
        await expect(this.elements.messageError).toBeVisible();
        await expect(this.elements.messageError).toHaveText(messageError);
    };
}