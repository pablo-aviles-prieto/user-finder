import { HeaderBlock } from '@/components/header-block';
import { SearchBlock } from '@/features/search/components/search-block';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export const App = () => (
	<section className='relative min-h-screen space-y-12 p-4 lg:p-12'>
		<div className='absolute top-4 right-4 lg:top-12 lg:right-12'>
			<ThemeToggle />
		</div>

		<HeaderBlock subtitle='Search for users by name or email with real-time results' title='User Finder App' />
		<SearchBlock placeholder='Search users by name or email...' />
	</section>
);
