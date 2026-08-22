import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart Management', () => {
  test('Add, update, and remove a product in the cart', async ({ page }) => {
    const store = new StorePage(page); const cart = new CartPage(page);
    // 1. Add an available product.
    await store.goto(); await store.openBooks(); await store.addProduct('Computing and Internet');
    await expect(page.getByText(/product has been added to your shopping cart/i)).toBeVisible();
    // 2. Open the cart.
    await cart.goto();
    await expect(page.getByRole('link', { name: 'Computing and Internet', exact: true })).toBeVisible();
    // 3. Change quantity to 2.
    await cart.setQuantity('Computing and Internet', 2);
    await expect(page.locator('input[name^="itemquantity"]')).toHaveValue('2');
    // 4. Remove the product.
    await cart.removeProduct('Computing and Internet');
    await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
  });

  test('Block checkout until terms are accepted', async ({ page }) => {
    const store = new StorePage(page); const cart = new CartPage(page);
    // 1. Add a product and open the cart.
    await store.goto(); await store.openBooks(); await store.addProduct('Computing and Internet'); await cart.goto();
    // 2. Attempt checkout without accepting terms.
    await cart.proceedToCheckout();
    await expect(page.getByRole('dialog', { name: 'Terms of service' })).toBeVisible();
    // 3. Accept terms and proceed while signed out.
    await page.getByRole('button', { name: 'close' }).click(); await cart.termsCheckbox.check(); await cart.proceedToCheckout();
    await expect(page).toHaveURL(/login\/checkoutasguest/);
  });
});
