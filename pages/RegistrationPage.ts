import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly submitButton = this.page.locator('input[value="Register"]');
  readonly registrationCompleted = this.page.getByText(/your registration completed/i);

  constructor(private readonly page: Page) {}
  async goto(): Promise<void> { await this.page.goto('/register'); }
  async fillRequiredFields(data: { firstName: string; lastName: string; email: string; password: string; confirmPassword?: string }): Promise<void> {
    await this.page.getByRole('radio', { name: 'Male', exact: true }).check();
    await this.page.locator('#FirstName').fill(data.firstName); await this.page.locator('#LastName').fill(data.lastName);
    await this.page.locator('#Email').fill(data.email); await this.page.locator('#Password').fill(data.password);
    await this.page.locator('#ConfirmPassword').fill(data.confirmPassword ?? data.password);
  }
  async register(data: { gender: 'Male' | 'Female'; firstName: string; lastName: string; email: string; password: string }): Promise<void> {
    await this.page.getByRole('radio', { name: data.gender, exact: true }).check(); await this.fillRequiredFields(data); await this.submitButton.click();
  }
}
