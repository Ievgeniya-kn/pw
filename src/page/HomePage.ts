import { Locator, Page } from "@playwright/test";
import { Element } from "./Element";
import { RegistrationModal } from "./RegistrationModal";
import { LogInModal } from "./LogIn";

export class HomePage extends Element {
  protected _url = '/';
  public signInBtn: Locator = this._page.getByRole('button', { name: 'Sign in' });
  registerModal: RegistrationModal;
  logInModal: LogInModal;

  constructor(page: Page) {
    super(page);
    this.registerModal = new RegistrationModal(this._page);
    this.logInModal = new LogInModal(this._page);
  }

  async open() {
    return this._page.goto(this._url);
  }

  async navigate(url: string) {
    return this._page.goto(url);
  }

  async openLogIn() {
    await this.signInBtn.click();
  }

  async signInFill(email: string, password: string) {
    this.logInModal.logInFill(email, password)
  }

  async openRegisterForm() {
    await this.signInBtn.click();
    await this._page.waitForSelector('.modal-content');
    await this._page.getByRole('button', { name: 'Registration' }).click();
  }

  async registerUser(options: { firstName?: string, lastName?: string, email?: string, password?: string, repeatPassword?: string }) {
    this.registerModal.registerFill(options);
  }

}