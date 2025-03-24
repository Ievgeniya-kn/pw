import { expect } from '@playwright/test';
import { HomePage } from '../../src/page/HomePage';
import { INVALID_DATA, RESPONSE_PROFILE, VALID_DATA } from '../../src/utils/constants';
import { userGaragePage as test } from '../../fixture/userGaragePage'

test.describe('Test API', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        page.route('**/api/users/profile', async route => route.fulfill({
            status: 200,
            json: RESPONSE_PROFILE,
        }))
        await homePage.open();
    })

    test('Verify Profile', async ({ userGaragePage, page }) => {
        await page.goto('/panel/profile');
        await expect(page.getByText(`${INVALID_DATA.SHORT_NAME} ${INVALID_DATA.LONG_NAME}`)).toBeVisible();
    })
})
