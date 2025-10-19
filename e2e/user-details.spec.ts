import { expect, test } from '@playwright/test';

test.describe('User details feature', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('displays user details after selecting from search', async ({ page }) => {
		const searchInput = page.getByPlaceholder('Search users by name or email...');
		await searchInput.fill('Leanne');
		await searchInput.click();
		await page.waitForLoadState('networkidle');

		const userButton = page.getByTestId('user-option-1');
		await userButton.click();
		await page.waitForLoadState('networkidle');

		// Verify user details are displayed
		await expect(page.getByRole('heading', { name: 'Leanne Graham' })).toBeVisible();
		await expect(page.getByText('@Bret')).toBeVisible(); // username
		// Verify detail fields are visible
		const userDetailsCard = page.getByRole('article');
		await expect(userDetailsCard.locator('small', { hasText: 'Email' })).toBeVisible();
		await expect(userDetailsCard.getByText('Sincere@april.biz')).toBeVisible();
		await expect(userDetailsCard.locator('small', { hasText: 'Phone' })).toBeVisible();
		await expect(userDetailsCard.locator('small', { hasText: 'Company' })).toBeVisible();
	});

	test('closes search dropdown after selecting user', async ({ page }) => {
		const searchInput = page.getByPlaceholder('Search users by name or email...');
		await searchInput.fill('Leanne');
		await searchInput.click();
		await page.waitForLoadState('networkidle');

		const userButton = page.getByTestId('user-option-1');
		await userButton.click();
		await page.waitForLoadState('networkidle');

		// Dropdown is still on the DOM but not on the viewport
		await expect(userButton).not.toBeInViewport();
	});

	test('displays error message when user details request fails', async ({ page }) => {
		// Intercept the users API request
		await page.route('https://jsonplaceholder.typicode.com/users/**', (route) => {
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

		const userButton = page.getByTestId('user-option-1');
		await userButton.click();
		await page.waitForLoadState('networkidle');

		await expect(page.getByText('Error loading user details')).toBeVisible();
	});
});
