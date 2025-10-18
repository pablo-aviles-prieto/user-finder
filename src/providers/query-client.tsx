import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SECOND_IN_MS = 1000;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: SECOND_IN_MS * 60 * 60 * 24, // 24 hours
		},
	},
});

export const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
