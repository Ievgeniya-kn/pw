import { test, expect } from '@playwright/test';

const SHORT_NAME = 'A';
const LONG_NAME = 'Very long long long name';
const ERROR_FIRST_NAME_IS_INVALID = 'Name is invalid';
const ERROR_FIRST_NAME_LENGTH = 'Name has to be from 2 to 20 characters long';
const ERROR_FIRST_NAME_REQUIRED = 'Name required';
const ERROR_LAST_NAME_REQUIRED = 'Last name required';
const ERROR_LAST_NAME_IS_INVALID = 'Last name is invalid';
const ERROR_LAST_NAME_LENGTH = 'Last name has to be from 2 to 20 characters long';
const ERROR_EMAIL_REQUIRED = 'Email required';
const ERROR_PASSWORD_REQUIRED = 'Password required';
const ERROR_REENTER_PASSWORD_REQUIRED = 'Re-enter password required';
const ERROR_INCORRECT_PASSWORD = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
const FIRST_NAME = 'Jane';
const LAST_NAME = 'Peeker';
const EMAIL = 'aqa_2jane@gmail.com';
const PASSWORD = 'Jane_123!'


test.describe('Registration modal validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForSelector('.modal-content');
    await page.getByRole('button', { name: 'Registration' }).click();
  })

  test('Register User - positive', async ({ page }) => {
    const modal = page.locator('.modal-content')
    await modal.locator('#signupName').fill(FIRST_NAME);
    await modal.locator('#signupLastName').fill(LAST_NAME);
    await modal.locator('#signupEmail').fill(EMAIL);
    await modal.locator('#signupRepeatPassword').fill(PASSWORD);
    await modal.locator('#signupPassword').fill(PASSWORD);
    await modal.getByText('Register').click();
    await expect(page.getByText('My Profile')).toBe;
  })

test('First name is required - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const firstNameInput = modal.locator('#signupName')
  await firstNameInput.click();
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_FIRST_NAME_REQUIRED);
  await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})
test('First name should be more than 1 symbols - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const firstNameInput = modal.locator('#signupName');
  await firstNameInput.fill(SHORT_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_FIRST_NAME_LENGTH);
  await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('First name should be less than 20 symbols - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const firstNameInput = modal.locator('#signupName');
  await firstNameInput.fill(LONG_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_FIRST_NAME_LENGTH);
  await expect(validationError).toContainText(ERROR_FIRST_NAME_IS_INVALID);
  await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Last name should be more than 1 symbols - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const lastNameInput = modal.locator('#signupLastName');
  await lastNameInput.fill(SHORT_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_LAST_NAME_LENGTH);
  await expect.soft(lastNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Last name is required - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const lastNameInput = modal.locator('#signupLastName');
  await lastNameInput.click();
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_LAST_NAME_REQUIRED);
  await expect.soft(lastNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Last name should be less than 20 symbols - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const lastNameInput = modal.locator('#signupLastName')
  await lastNameInput.fill(LONG_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_LAST_NAME_LENGTH);
  await expect(validationError).toContainText(ERROR_LAST_NAME_IS_INVALID);
  await expect.soft(lastNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Email is required - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const emailInput = modal.locator('#signupEmail');
  await emailInput.click();
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_EMAIL_REQUIRED);
  await expect.soft(emailInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Password  is required - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const passwordInput = modal.locator('#signupPassword');
  await passwordInput.click();
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_PASSWORD_REQUIRED);
  await expect.soft(passwordInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Password lenght length incorrect - negative', async ({ page }) => {
  const modal = page.locator('.modal-content');
  const passwordInput = modal.locator('#signupPassword');
  await passwordInput.fill(SHORT_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_INCORRECT_PASSWORD);
  await expect.soft(passwordInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('Re-enter password is required - negative', async ({ page }) => {
  const modal = page.locator('.modal-content')
  const reenterPasswordInput = modal.locator('#signupRepeatPassword')
  await reenterPasswordInput.click();
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_REENTER_PASSWORD_REQUIRED);
  await expect.soft(reenterPasswordInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})

test('re-enter password lenght length incorrect - negative', async ({ page }) => {
  const modal = page.locator('.modal-content');
  const reenterPasswordInput = modal.locator('#signupRepeatPassword');
  await reenterPasswordInput.fill(SHORT_NAME);
  await modal.getByText('Register').click({ force: true });
  const validationError = modal.locator('.invalid-feedback');
  await expect(validationError).toContainText(ERROR_INCORRECT_PASSWORD);
  await expect.soft(reenterPasswordInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)');
})
})
