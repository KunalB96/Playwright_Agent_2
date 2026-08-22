import { Page } from '@playwright/test';

export class StorePage {
  readonly searchInput = this.page.getByRole('textbox', { name: 'Search store' });
  readonly searchButton = this.page.getByRole('button', { name: 'Search' });
  constructor(private readonly page: Page) {}
  async goto(): Promise<void> { await this.page.goto('/'); }
  async openBooks(): Promise<void> { await this.page.getByRole('link', { name: 'Books' }).first().click(); }
  async search(term: string): Promise<void> {
    await this.page.goto(`/search?q=${encodeURIComponent(term)}`);
  }
  async addProduct(name: string): Promise<void> {
    await this.page.locator('.product-item').filter({ hasText: name }).locator('input[value="Add to cart"]').click();
    await this.page.getByText(/product has been added to your shopping cart/i).waitFor();
  }
}
