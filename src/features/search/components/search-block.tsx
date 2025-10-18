import { type ComponentProps, useEffect, useId, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { PredictiveSection } from '@/features/search/components/predictive-section/predictive-section';
import { useDebounce } from '@/hooks/use-debounce';

export const SearchBlock = (inputOptions: ComponentProps<'input'>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showPredictiveBlock, setShowPredictiveBlock] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const searchInputId = useId();
	const debouncedTerm = useDebounce(searchTerm.trim());

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setShowPredictiveBlock(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='relative mx-auto max-w-4xl space-y-1.5' ref={containerRef}>
			<Input
				autoComplete='off'
				id={`${searchInputId}-search-input`}
				onChange={(e) => setSearchTerm(e.target.value)}
				onClick={() => setShowPredictiveBlock(true)}
				placeholder='Search users by name or email...'
				{...inputOptions}
			/>
			<PredictiveSection debouncedTerm={debouncedTerm} showPredictiveBlock={showPredictiveBlock} />
		</div>
	);
};
