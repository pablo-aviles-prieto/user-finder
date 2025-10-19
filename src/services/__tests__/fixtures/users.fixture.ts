import type { User } from '@/types/user';

export const mockUsersFactory = (overrides?: Partial<User>): User => ({
	id: 1,
	name: 'Alice Johnson',
	email: 'alice@example.com',
	username: 'alicej',
	phone: '123-456-7890',
	website: 'alice.dev',
	address: {
		street: 'Main St',
		suite: 'Apt 1',
		city: 'NYC',
		zipcode: '10001',
		geo: { lat: '40.7128', lng: '-74.0060' },
	},
	company: {
		name: 'Alice Corp',
		catchPhrase: 'Innovate',
		bs: 'tech',
	},
	...overrides,
});

export const createMockUsers = (): User[] => [
	mockUsersFactory({ id: 1, name: 'Alice Johnson' }),
	mockUsersFactory({ id: 2, name: 'Bob Smith', email: 'bob@example.com' }),
	mockUsersFactory({ id: 3, name: 'Charlie Doe', email: 'charlie@workmail.com' }),
];
