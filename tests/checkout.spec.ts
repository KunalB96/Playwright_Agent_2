import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { StorePage } from '../pages/StorePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout and Order Placement', () => {
  test('Complete checkout and place an order as a registered customer', async ({ page }) => {
    const registration = new RegistrationPage(page); const store = new StorePage(page); const cart = new CartPage(page); const checkout = new CheckoutPage(page);
    const email = `checkout-${Date.now()}@example.com`;
    // 1. Sign in, add a product, accept terms, and select Checkout.
    await registration.goto();
    await registration.register({ gender: 'Male', firstName: 'Test', lastName: 'Customer', email, password: 'Password123!' });
    await store.goto(); await store.openBooks(); await store.addProduct('Computing and Internet'); await cart.goto();
    await cart.termsCheckbox.check(); await cart.proceedToCheckout();
    // 2. Enter a valid billing address and continue.
    await checkout.fillAddress({ firstName: 'Test', lastName: 'Customer', email, country: 'United States', city: 'New York', address: '1 Main Street', zip: '10001', phone: '5555555555' });
    await checkout.continue();
    // 3. Select shipping and continue.
    await checkout.continue();
    await page.getByRole('radio').first().check(); await checkout.continue();
    // 4. Select payment and continue.
    await page.getByRole('radio').first().check(); await checkout.continue();
    await checkout.continue();
    // 5. Review and confirm.
    await expect(page.getByText(/confirm order|order total/i).first()).toBeVisible();
    await checkout.confirmOrderButton.click();
    await expect(page.getByText(/thank you|order number/i).first()).toBeVisible();
    await cart.goto();
    await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
  });

  test('Prevent checkout progression when required checkout data is missing', async ({ page }) => {
    const store = new StorePage(page); const cart = new CartPage(page);
    // 1. Start checkout and leave required data empty.
    await store.goto(); await store.openBooks(); await store.addProduct('Computing and Internet'); await cart.goto(); await cart.termsCheckbox.check(); await cart.proceedToCheckout();
    await expect(page).toHaveURL(/login\/checkoutasguest/);
    // The signed-out checkout entry point must require authentication or guest details before progression.
    await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  });
});
