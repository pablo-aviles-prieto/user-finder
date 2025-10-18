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

		await expect(page.getByText('Leanne Graham')).toBeVisible({ timeout: 5000 });
	});
});
