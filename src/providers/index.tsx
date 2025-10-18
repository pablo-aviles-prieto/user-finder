import { QueryClientProviderWrapper } from '@/providers/query-client';

export const Providers = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
);
