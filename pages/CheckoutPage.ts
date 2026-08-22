import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly continueButtons = this.page.locator('input[value="Continue"]:visible:not([disabled])');
  readonly confirmOrderButton = this.page.locator('input[value="Confirm"]');
  constructor(private readonly page: Page) {}
  async fillAddress(data: { firstName: string; lastName: string; email: string; country: string; city: string; address: string; zip: string; phone: string }): Promise<void> {
    await this.page.locator('#BillingNewAddress_FirstName').fill(data.firstName); await this.page.locator('#BillingNewAddress_LastName').fill(data.lastName);
    await this.page.locator('#BillingNewAddress_Email').fill(data.email); await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: data.country });
    await this.page.locator('#BillingNewAddress_City').fill(data.city); await this.page.locator('#BillingNewAddress_Address1').fill(data.address);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(data.zip); await this.page.locator('#BillingNewAddress_PhoneNumber').fill(data.phone);
  }
  async continue(): Promise<void> { await this.continueButtons.first().click(); }
}
