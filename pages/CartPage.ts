import { Page } from '@playwright/test';

export class CartPage {
  readonly termsCheckbox = this.page.locator('input[name="termsofservice"]');
  readonly checkoutButton = this.page.locator('button.checkout-button');
  readonly updateButton = this.page.locator('input[value="Update shopping cart"]');
  constructor(private readonly page: Page) {}
  async goto(): Promise<void> { await this.page.goto('/cart'); }
  async setQuantity(productName: string, quantity: number): Promise<void> {
    const row = this.page.locator('.cart-item-row').filter({ hasText: productName });
    await row.locator('input[name^="itemquantity"]').fill(String(quantity)); await this.updateButton.click();
  }
  async removeProduct(productName: string): Promise<void> {
    const row = this.page.locator('.cart-item-row').filter({ hasText: productName });
    await row.locator('input[name="removefromcart"]').check(); await this.updateButton.click();
  }
  async proceedToCheckout(): Promise<void> { await this.checkoutButton.click(); }
}
