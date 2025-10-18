import { HeaderSection } from '@/components/header-section';
import { SearchInput } from '@/components/search-input';

export const App = () => (
	<section className='min-h-screen space-y-12 p-4 lg:p-12'>
		<HeaderSection subtitle='Search for users by name or email with real-time results' title='User Searcher App' />
		<SearchInput placeholder='Search users by name or email...' />
	</section>
);
