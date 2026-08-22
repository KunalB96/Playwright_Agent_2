import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('Logout and Session Termination', () => {
  test('Log out from an authenticated account', async ({ page }) => {
    const registration = new RegistrationPage(page); const account = new AccountPage(page);
    // 1. Sign in with a valid customer account.
    await registration.goto(); await registration.register({ gender: 'Male', firstName: 'Test', lastName: 'Customer', email: `logout-${Date.now()}@example.com`, password: 'Password123!' });
    await expect(account.logoutLink).toBeVisible();
    // 2. Select Log out.
    await account.logout();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    // 3. Access the public storefront after logout.
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('Reject access to authenticated account pages after logout', async ({ page }) => {
    const registration = new RegistrationPage(page); const account = new AccountPage(page);
    // 1. Sign in, open My account, and log out.
    await registration.goto(); await registration.register({ gender: 'Male', firstName: 'Test', lastName: 'Customer', email: `logout-${Date.now()}@example.com`, password: 'Password123!' }); await account.open(); await account.logout();
    // 2. Navigate to an authenticated account page.
    await page.goto('/customer/orders');
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  });
});
