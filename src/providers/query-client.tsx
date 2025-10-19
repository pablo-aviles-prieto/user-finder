import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SECOND_IN_MS = 1000;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: SECOND_IN_MS * 60 * 60 * 24, // 24 hours
			staleTime: SECOND_IN_MS * 60 * 60, // 1 hour
		},
	},
});

export const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
