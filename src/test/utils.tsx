import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { SelectedUserProvider } from '@/context/selected-user-context';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false, // Don't retry failed queries in tests
			},
		},
	});

type AllTheProvidersProps = {
	children: React.ReactNode;
};

function AllTheProviders({ children }: AllTheProvidersProps) {
	const testQueryClient = createTestQueryClient();

	return (
		<QueryClientProvider client={testQueryClient}>
			<SelectedUserProvider>{children}</SelectedUserProvider>
		</QueryClientProvider>
	);
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react
// biome-ignore lint/performance/noBarrelFile: <need to export everything from RTL>
export * from '@testing-library/react';

// Override render method
export { customRender as render };
