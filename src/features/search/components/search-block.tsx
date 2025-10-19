import { SearchIcon } from 'lucide-react';
import { type ComponentProps, useCallback, useEffect, useId, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { PredictiveSection } from '@/features/search/components/predictive-section/predictive-section';
import { useDebounce } from '@/hooks/use-debounce';

export const SearchBlock = (inputOptions: ComponentProps<'input'>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showPredictiveBlock, setShowPredictiveBlock] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const searchInputId = useId();
	const debouncedTerm = useDebounce(searchTerm.trim());

	const closePredictiveBlock = useCallback(() => setShowPredictiveBlock(false), []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				closePredictiveBlock();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [closePredictiveBlock]);

	return (
		<div className='relative mx-auto max-w-4xl' ref={containerRef}>
			<SearchIcon className='-translate-y-1/2 absolute top-1/2 left-2.5 size-4' />
			<Input
				autoComplete='off'
				className='pl-7.5'
				id={`${searchInputId}-search-input`}
				onChange={(e) => setSearchTerm(e.target.value)}
				onClick={() => setShowPredictiveBlock(true)}
				placeholder='Search users by name or email...'
				{...inputOptions}
			/>
			<PredictiveSection
				debouncedTerm={debouncedTerm}
				onClose={closePredictiveBlock}
				showPredictiveBlock={showPredictiveBlock}
			/>
		</div>
	);
};
