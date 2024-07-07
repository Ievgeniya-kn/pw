import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { Element } from "./Element";

export class RegistrationModal extends Element {
  modal: Locator = this._page.locator('.modal-content');
  firstName: Locator = this.modal.locator('#signupName');
  lastName: Locator = this.modal.locator('#signupLastName');
  password: Locator = this.modal.locator('#signupPassword');
  email: Locator = this.modal.locator('#signupEmail');
  repeatPassword: Locator = this.modal.locator('#signupRepeatPassword');
  registerBtn: Locator = this.modal.getByText('Register');
  validationError: Locator = this.modal.locator('.invalid-feedback');

  constructor(page: Page) {
    super(page);
  }

  async registerFill(options: { firstName?: string, lastName?: string, email?: string, password?: string, repeatPassword?: string }) {
    if (options.firstName || options.firstName === "") {
      await this.firstName.click();
      await this.firstName.fill(options.firstName);
    }
    if (options.lastName || options.lastName === "") {
      await this.lastName.click();
      await this.lastName.fill(options.lastName);
    }
    if (options.email || options.email === "") {
      await this.email.click();
      await this.email.fill(options.email);
    }
    if (options.password || options.password === "") {
      await this.password.click();
      await this.password.fill(options.password);
    }
    if (options.repeatPassword || options.repeatPassword === "") {
      await this.repeatPassword.click();
      await this.repeatPassword.fill(options.repeatPassword);
    }
    await this.registerBtn.click({ force: true });
  }

}