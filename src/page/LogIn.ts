import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { Element } from "./Element";

export class LogInModal extends Element {
    modal: Locator = this._page.locator('.modal-content');
    password: Locator = this.modal.locator('#signinPassword');
    email: Locator = this.modal.locator('#signinEmail');
    logInBtn: Locator = this.modal.getByText('Login');


    constructor(page: Page) {
        super(page);
    }

    async logInFill(email: string, password: string) {
        await this.email.click();
        await this.email.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.logInBtn.click({ force: true });
    }
}