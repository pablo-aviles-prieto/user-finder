import { QueryClient, queryOptions } from '@tanstack/react-query';
import type { User } from '@/types/user';

const THROTTLE_DELAY = 1000;

class UserRepository {
	endpoint: string;
	queryClient: QueryClient;
	throttle: number;

	constructor() {
		this.endpoint = import.meta.env.VITE_USER_API_ENDPOINT;
		this.queryClient = new QueryClient();
		this.throttle = THROTTLE_DELAY;

		if (!this.endpoint) {
			throw new Error('Missing VITE_USER_API_ENDPOINT in environment variables');
		}
	}

	private throttleData<T>(data: T, ms = this.throttle): Promise<T> {
		return new Promise((resolve) => setTimeout(() => resolve(data), ms));
	}

	private filterUsersByNameOrEmail(users: User[], searchWord: string): User[] {
		const lowercasedTerm = searchWord.toLowerCase();
		if (!lowercasedTerm) {
			return users;
		}
		return users.filter(
			(user) => user.name.toLowerCase().includes(lowercasedTerm) || user.email.toLowerCase().includes(lowercasedTerm)
		);
	}

	private async fetchUsers(): Promise<User[]> {
		const res = await fetch(`${this.endpoint}/users`);
		if (!res.ok) {
			throw new Error('Failed to fetch users');
		}
		return res.json();
	}

	private async fetchUserDetails(userId: User['id'] | undefined): Promise<User> {
		if (!userId) {
			throw new Error('Invalid user ID');
		}
		const res = await fetch(`${this.endpoint}/users/${userId}`);
		if (!res.ok) {
			throw new Error('Failed to fetch user details');
		}
		return res.json();
	}

	getUsersQueryOptions(searchWord: string) {
		return queryOptions({
			queryKey: ['users', searchWord],
			queryFn: async () => {
				const users = await this.fetchUsers();
				const throttledData = await this.throttleData(users);
				return this.filterUsersByNameOrEmail(throttledData, searchWord);
			},
			staleTime: Number.POSITIVE_INFINITY,
			enabled: !!searchWord.trim(),
		});
	}

	getUserDetailsQueryOptions(userId: number | undefined) {
		return queryOptions({
			queryKey: ['user', userId],
			queryFn: async () => {
				const userDetails = await this.fetchUserDetails(userId);
				return this.throttleData(userDetails);
			},
			staleTime: Number.POSITIVE_INFINITY,
			enabled: typeof userId === 'number' && !Number.isNaN(userId),
		});
	}
}

export default new UserRepository();
