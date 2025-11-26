import { test, type Page, type BrowserContext } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import apiPaths from '../../utils/apiPaths';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile, { waitUntil: 'networkidle', timeout: 60000 });
    profilePage = new ProfilePage(page);
});

test.describe('Profile - API Interception', () => {
    test('Sort books', async ({ context }) => { 
        // Mock the API response for static pages
        await profilePage.mockBooksListResponse(context);
        
        // Check books are visible
        await profilePage.checkBooksList();
        
        // Sort the books
        await profilePage.sortBooksList();
        
        // Verify sorting worked
        await profilePage.checkSort();
    });
});

async function watchAPICallAndMockResponse(page: Page, context: BrowserContext) {
    await profilePage.mockBooksListResponse(context);
    // Skip waiting for API response on static pages
    await page.reload();
}
