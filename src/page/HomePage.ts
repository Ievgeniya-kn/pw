import { Locator, Page } from "@playwright/test";
import { Element } from "./Element";
import { RegistrationModal } from "./RegistrationModal";

export class HomePage extends Element {
  protected _url = '/';
  public signInBtn: Locator = this._page.getByRole('button', { name: 'Sign in' });
  registerModal: RegistrationModal;

  constructor(page: Page) {
    super(page);
    this.registerModal = new RegistrationModal(this._page);
  }

  async open() {
    return this._page.goto(this._url);
  }

  async openRegisterForm() {
    await this.signInBtn.click();
    await this._page.waitForSelector('.modal-content');
    await this._page.getByRole('button', { name: 'Registration' }).click();
  }

  async registerUser(options: { firstName?: string, lastName?: string, email?: string, password?: string, repeatPassword?: string }) {
    this.registerModal.registerFill( options);
  }

}