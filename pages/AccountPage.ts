import { Page } from '@playwright/test';

export class AccountPage {
  readonly logoutLink = this.page.getByRole('link', { name: 'Log out' });
  readonly accountLink = this.page.getByRole('link', { name: 'My account' });

  constructor(private readonly page: Page) {}
  async open(): Promise<void> { await this.accountLink.click(); }
  async logout(): Promise<void> { await this.logoutLink.click(); }
  async openOrders(): Promise<void> { await this.page.getByRole('link', { name: 'Orders' }).click(); }
  async openAddresses(): Promise<void> { await this.page.getByRole('link', { name: 'Addresses' }).click(); }
}
