import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../../utils/messages';

class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly messagePanel: Locator;
  readonly password: Locator;
  readonly userName: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
    this.messagePanel = page.locator('#output');
    this.password = page.getByPlaceholder('Enter password');
    this.userName = page.getByPlaceholder('Enter username');
    this.termsCheckbox = page.locator('#terms');
  }

  async fillEmail(email: string) {
    await this.userName.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.termsCheckbox.check({ force: true });
    await this.loginButton.click();
  }

  async checkLoggedIn() {
    await expect(this.page).toHaveURL(/.*profile/);
    await expect(this.page).toHaveTitle(/ZMTECH/);
  }

  async checkInvalidCredentials() {
    // The local page uses alert() for invalid credentials
    // We need to wait for the dialog to appear and verify its message
    const dialogPromise = this.page.waitForEvent('dialog');
    
    // The dialog should appear after login attempt
    const dialog = await dialogPromise;
    
    // Verify the dialog message contains error text
    const message = dialog.message();
    expect(message).toContain('Invalid');
    
    // Accept the dialog to dismiss it
    await dialog.accept();
    
    // Verify we're still on the login page
    await expect(this.page).toHaveURL(/.*login/);
  }
}

export default LoginPage;
