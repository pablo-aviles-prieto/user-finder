import { expect, test } from '@playwright/test';

const INPUT_PLACEHOLDER = 'Search users by name or email...';

test.describe('Search feature', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('displays search input', async ({ page }) => {
		await expect(page.getByPlaceholder(INPUT_PLACEHOLDER)).toBeVisible();
	});

	test('can search for users', async ({ page }) => {
		const searchInput = page.getByPlaceholder(INPUT_PLACEHOLDER);
		await searchInput.fill('Leanne');
		await searchInput.click();
		await page.waitForLoadState('networkidle');

		await expect(page.getByText('Leanne Graham')).toBeVisible({ timeout: 5000 });
	});

	test('shows no results message for non-existent user', async ({ page }) => {
		const searchInput = page.getByPlaceholder(INPUT_PLACEHOLDER);
		await searchInput.fill('NonExistentUser12345');
		await searchInput.click();
		await page.waitForLoadState('networkidle');

		await expect(page.getByText('No users found')).toBeVisible({ timeout: 5000 });
	});

	test('displays error message when user list request fails', async ({ page }) => {
		// Intercept the users API request
		await page.route('https://jsonplaceholder.typicode.com/users', (route) => {
			route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ message: 'Internal Server Error' }),
			});
		});

		const searchInput = page.getByPlaceholder('Search users by name or email...');
		await searchInput.fill('Leanne');
		await searchInput.click();
		await page.waitForLoadState('networkidle');

		await expect(page.getByText('Error loading users')).toBeVisible();
	});
});
