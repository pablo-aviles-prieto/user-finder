import { HeaderSection } from '@/components/header-section';
import { SearchInput } from '@/components/search-input';
import { ThemeToggle } from '@/components/theme-toggle';

export const App = () => (
	<section className='relative min-h-screen space-y-12 p-4 lg:p-12'>
		<div className='absolute top-4 right-4 lg:top-12 lg:right-12'>
			<ThemeToggle />
		</div>

		<HeaderSection subtitle='Search for users by name or email with real-time results' title='User Searcher App' />
		<SearchInput placeholder='Search users by name or email...' />
	</section>
);
