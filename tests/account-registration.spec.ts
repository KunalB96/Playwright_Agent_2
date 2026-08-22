import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';

const uniqueEmail = () => `user-${Date.now()}@example.com`;

test.describe('Account Registration and Login', () => {
  test('Register a new customer account', async ({ page }) => {
    const registrationPage = new RegistrationPage(page); const email = uniqueEmail();
    // 1. Open the storefront and select Register.
    await registrationPage.goto();
    // 2. Select a gender and enter valid registration data.
    await registrationPage.register({ gender: 'Male', firstName: 'Test', lastName: 'Customer', email, password: 'Password123!' });
    // 3. Submit the registration form.
    await expect(registrationPage.registrationCompleted).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });

  test('Reject invalid registration and invalid login credentials', async ({ page }) => {
    const registrationPage = new RegistrationPage(page); const loginPage = new LoginPage(page);
    // 1. Open Register and submit the form with required fields empty.
    await registrationPage.goto(); await registrationPage.submitButton.click();
    await expect(page.locator('.field-validation-error').first()).toBeVisible();
    // 2. Enter mismatched passwords and submit.
    await registrationPage.fillRequiredFields({ firstName: 'Test', lastName: 'Customer', email: uniqueEmail(), password: 'Password123!', confirmPassword: 'Different123!' });
    await registrationPage.submitButton.click();
    await expect(page.getByText(/password and confirmation password do not match/i)).toBeVisible();
    // 3. Submit unknown login credentials.
    await loginPage.goto(); await loginPage.login('unknown@example.com', 'WrongPassword123!');
    await expect(page.getByText(/login was unsuccessful/i)).toBeVisible();
  });
});
