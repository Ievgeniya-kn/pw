import { test as setup, expect } from '@playwright/test'
import { VALID_DATA, INVALID_DATA } from '../../src/utils/constants';
import { HomePage } from '../../src/page/HomePage';


setup.beforeEach('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.openLogIn();

  await homePage.signInFill(VALID_DATA.EMAIL_SIGN_IN, VALID_DATA.PASSWORD);

  await expect(page.getByText('My Profile')).toBeVisible();

  await page.context().storageState({ path: 'session-storage.json' });
});

setup('test', async ({ page }) => {
  await expect(page.getByText('My Profile')).toBeVisible();
})