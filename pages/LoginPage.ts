import { Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput = this.page.locator('#Email');
  readonly passwordInput = this.page.locator('#Password');
  readonly submitButton = this.page.locator('input[value="Log in"]');

  constructor(private readonly page: Page) {}
  async goto(): Promise<void> { await this.page.goto('/login'); }
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email); await this.passwordInput.fill(password); await this.submitButton.click();
  }
}
