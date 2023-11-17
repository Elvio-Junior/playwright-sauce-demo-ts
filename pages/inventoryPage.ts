import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly elements: {
        hamburgerMenu: Locator,
    }
    
    constructor(page: Page) {
        this.page = page;
        this.elements = {
            hamburgerMenu: page.locator('#react-burger-menu-btn')
        }
    }
}
