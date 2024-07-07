import { test, expect } from '@playwright/test';
import { ERRORS, VALID_DATA, INVALID_DATA } from '../src/utils/constants';
import { HomePage } from '../src/page/HomePage';

test.describe('Registration modal validation', () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.openRegisterForm();
  })

  test('Register User - positive', async ({ page }) => {
    await homePage.registerUser({
      firstName: VALID_DATA.FIRST_NAME,
      lastName: VALID_DATA.LAST_NAME,
      email: VALID_DATA.EMAIL,
      password: VALID_DATA.PASSWORD,
      repeatPassword: VALID_DATA.PASSWORD
    });
    await expect(page.getByText('My Profile')).toBeVisible();
  })

  test('First name is required - negative', async ({ page }) => {
    await homePage.registerUser({ firstName: "" })
    await expect(homePage.registerModal.validationError).toHaveText(ERRORS.ERROR_FIRST_NAME_REQUIRED);
  })

  test('First name should be more than 1 symbols - negative', async ({ page }) => {
    await homePage.registerUser({ firstName: INVALID_DATA.SHORT_NAME })
    await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_FIRST_NAME_LENGTH);
  })

    test('First name should be less than 20 symbols - negative', async ({ page }) => {
      await homePage.registerUser({ firstName: INVALID_DATA.LONG_NAME })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_FIRST_NAME_LENGTH);
    })

    test('Last name should be more than 1 symbols - negative', async ({ page }) => {
      await homePage.registerUser({ lastName: INVALID_DATA.SHORT_NAME })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_LAST_NAME_LENGTH);
    })

    test('Last name is required - negative', async ({ page }) => {
      await homePage.registerUser({ lastName: "" })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_LAST_NAME_REQUIRED);
    })

    test('Last name should be less than 20 symbols - negative', async ({ page }) => {
      await homePage.registerUser({ lastName: INVALID_DATA.LONG_NAME })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_LAST_NAME_LENGTH);
    })

    test('Email is required - negative', async ({ page }) => {
      await homePage.registerUser({ email: "" })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_EMAIL_REQUIRED);
    })

    test('Password  is required - negative', async ({ page }) => {
      await homePage.registerUser({ password: "" })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_PASSWORD_REQUIRED);
    })

    test('Password lenght length incorrect - negative', async ({ page }) => {
      await homePage.registerUser({ password: INVALID_DATA.SHORT_NAME })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_INCORRECT_PASSWORD);
    })

    test('Re-enter password is required - negative', async ({ page }) => {
      await homePage.registerUser({ repeatPassword: "" })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_REENTER_PASSWORD_REQUIRED);
    })

    test('re-enter password lenght length incorrect - negative', async ({ page }) => {
      await homePage.registerUser({ repeatPassword: INVALID_DATA.SHORT_NAME })
      await expect(homePage.registerModal.validationError).toContainText(ERRORS.ERROR_INCORRECT_PASSWORD);
    })
  })
