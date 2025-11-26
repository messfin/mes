import { test, expect } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page);
});

test.describe('Visual Regression', () => {

    test('Profile Page loads correctly', async ({ page }) => {
        // Verify profile page loaded
        await profilePage.checkLoggedIn();
        
        // Take a screenshot for manual visual verification
        await page.screenshot({ path: 'test-results/profile-page-screenshot.png', fullPage: true });
        
        // Verify page title
        await expect(page).toHaveTitle(/ZMTECH/);
        
        // Verify key elements are visible
        await expect(page.locator('h2')).toContainText('Profile');
    });

    test('Profile Page book list is visible', async ({ page }) => {
        // Check that books are displayed
        await profilePage.checkBooksList();
        
        // Take screenshot of book list
        await page.screenshot({ path: 'test-results/profile-books-screenshot.png', fullPage: true });
        
        // Verify we have book elements
        const bookLinks = page.getByRole('link');
        const count = await bookLinks.count();
        expect(count).toBeGreaterThan(0);
    });
});