import { SelectedUserProvider } from '@/context/selected-user-context';
import { QueryClientProviderWrapper } from '@/providers/query-client';

export const Providers = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProviderWrapper>
		<SelectedUserProvider>{children}</SelectedUserProvider>
	</QueryClientProviderWrapper>
);
