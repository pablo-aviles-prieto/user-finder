import { type ComponentProps, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export const SearchInput = (inputOptions: ComponentProps<'input'>) => {
	const [searchTerm, setSearchTerm] = useState('');
	const _debouncedTerm = useDebounce(searchTerm);

	return <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' {...inputOptions} />;
};
