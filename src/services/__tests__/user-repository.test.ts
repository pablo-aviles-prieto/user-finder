/** biome-ignore-all lint/complexity/useLiteralKeys: <Recommended way to access private methods on testing https://github.com/microsoft/TypeScript/issues/19335> */

import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createMockUsers } from '@/services/__tests__/fixtures/users.fixture';
import userRepository from '@/services/user-repository';
import type { User } from '@/types/user';

describe('UserRepository', () => {
	let mockUsers: User[];

	beforeAll(() => {
		mockUsers = createMockUsers();
	});

	describe('filterUsersByNameOrEmail method', () => {
		it('returns users that match the search term in name or email', () => {
			const searchWord = 'ali';
			const result = userRepository['filterUsersByNameOrEmail'](mockUsers, searchWord);
			console.log('mockUsers', mockUsers);
			const foundUser = mockUsers.find(
				(user) => user.email.toLowerCase().includes(searchWord) || user.name.toLowerCase().includes(searchWord)
			);
			expect(result).toEqual([foundUser]);
		});

		it('returns all users when search term is empty', () => {
			const result = userRepository['filterUsersByNameOrEmail'](mockUsers, '');
			expect(result).toEqual(mockUsers);
		});
	});

	describe('throttleData method', () => {
		const THROTTLE_TIME = 1000;

		it('resolves data after a delay', async () => {
			vi.useFakeTimers();
			const data = { hello: 'world' };
			const promise = userRepository['throttleData'](data, THROTTLE_TIME);

			// Fast-forward time by 1000ms
			vi.advanceTimersByTime(THROTTLE_TIME);

			await expect(promise).resolves.toEqual(data);
			vi.useRealTimers();
		});
	});
});
