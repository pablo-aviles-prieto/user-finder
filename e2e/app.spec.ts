import { expect, test } from '@playwright/test';

test.describe('User Finder App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has correct title', async ({ page }) => {
		await expect(page).toHaveTitle('User Finder');
	});

	test('renders main heading', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'User Finder App' })).toBeVisible();
	});
});
