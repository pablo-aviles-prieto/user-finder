import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SECOND_IN_MS = 1000;
const DEFAULT_RETRY_NUMBERS = 3;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: SECOND_IN_MS * 60 * 60 * 24, // 24 hours
			staleTime: SECOND_IN_MS * 60 * 60, // 1 hour
			retry: import.meta.env.MODE === 'test' ? 0 : DEFAULT_RETRY_NUMBERS,
		},
	},
});

export const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
