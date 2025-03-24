import { expect } from '@playwright/test';
import { userGaragePage as test } from '../../fixture/userGaragePage';

test.describe('Registration modal validation', () => {
  test('User is registered', async ({ userGaragePage }) => {
    await expect(userGaragePage.getByText('You don’t have any cars in your garage')).toBeVisible();
  })
})
