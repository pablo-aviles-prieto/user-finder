import { describe, expect, it } from 'vitest';
import { App } from '@/app';
import { render } from '@/test/utils';

describe('App', () => {
	it('renders user finder app', () => {
		const { getByText } = render(<App />);
		expect(getByText('User Finder App')).toBeInTheDocument();
	});
});
