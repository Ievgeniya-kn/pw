import { expect, test } from '@playwright/test'
import { HomePage } from '../src/page/HomePage'
import { VALID_DATA } from '../src/utils/constants';

export const userGaragePage = test.extend({
    userGaragePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await use(page);
    }
})