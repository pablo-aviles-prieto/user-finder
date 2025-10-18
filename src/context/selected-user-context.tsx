import { createContext, type ReactNode, useContext, useState } from 'react';
import type { User } from '@/types/user';

type PartialUserWithId = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;

type SelectedUserContextType = {
	selectedUser: PartialUserWithId | null;
	setSelectedUser: (user: PartialUserWithId | null) => void;
	clearSelectedUser: () => void;
};

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined);

type SelectedUserProviderProps = {
	children: ReactNode;
};

export function SelectedUserProvider({ children }: SelectedUserProviderProps) {
	const [selectedUser, setSelectedUser] = useState<PartialUserWithId | null>(null);

	const clearSelectedUser = () => setSelectedUser(null);

	return (
		<SelectedUserContext.Provider value={{ selectedUser, setSelectedUser, clearSelectedUser }}>
			{children}
		</SelectedUserContext.Provider>
	);
}

export function useSelectedUser() {
	const context = useContext(SelectedUserContext);

	if (context === undefined) {
		throw new Error('useSelectedUser must be used within a SelectedUserProvider');
	}

	return context;
}
