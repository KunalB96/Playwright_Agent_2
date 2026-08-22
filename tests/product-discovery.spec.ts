import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage';

test.describe('Product Discovery', () => {
  test('Browse a category and inspect product discovery controls', async ({ page }) => {
    const store = new StorePage(page);
    // 1. Open the Books category.
    await store.goto(); await store.openBooks();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    // 2. Change the view mode.
    await page.locator('select[name="products-viewmode"]').selectOption('List');
    await expect(page).toHaveURL(/viewmode=list/);
    // 3. Sort by price and change page size.
    await page.locator('select[name="products-orderby"]').selectOption({ label: 'Price: Low to High' });
    await page.locator('select[name="products-pagesize"]').selectOption('4');
    await expect(page).toHaveURL(/orderby=10/);
    await expect(page).toHaveURL(/pagesize=4/);
    // 4. Select a price range.
    await page.getByRole('link', { name: 'Under 25.00' }).click();
    await expect(page).toHaveURL(/price=-25/);
  });

  test('Search for an existing and nonexistent product', async ({ page }) => {
    const store = new StorePage(page);
    // 1. Search for an existing product.
    await store.goto(); await store.search('computer');
    await expect(page).toHaveURL(/search\?q=computer/);
    await expect(page.locator('.product-item').first()).toBeVisible();
    // 2. Search for a nonexistent product.
    await store.goto(); await store.search('no-such-product-98765');
    await expect(page.getByText(/no products were found/i)).toBeVisible();
  });
});
