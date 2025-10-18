import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import userRepository from '@/services/user-repository';

type PredictiveSectionProps = {
	showPredictiveBlock: boolean;
	debouncedTerm: string;
};

export const PredictiveSection = ({ showPredictiveBlock, debouncedTerm }: PredictiveSectionProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);
	const { data, isLoading, error } = useQuery(userRepository.getUsersQueryOptions(debouncedTerm));
	const userData = data || [];

	useEffect(() => {
		if (!contentRef.current || !showPredictiveBlock) {
			setHeight(0);
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newHeight = entry.target.scrollHeight;
				setHeight(newHeight);
			}
		});
		resizeObserver.observe(contentRef.current);

		// Set initial height
		setHeight(contentRef.current.scrollHeight);

		return () => {
			resizeObserver.disconnect();
		};
	}, [showPredictiveBlock]);

	return (
		<div
			className={cn(
				'absolute inset-x-0 z-20 max-h-52 overflow-auto rounded-md border-accent bg-background transition-[height] duration-300 ease-in-out',
				showPredictiveBlock && height > 0 ? 'border' : 'border-0'
			)}
			style={{ height: showPredictiveBlock ? height : 0 }}
		>
			<div ref={contentRef}>
				{isLoading && <SingleItem content='Loading...' />}
				{error && <SingleItem className='text-destructive' content='Error fetching users' />}
				{!isLoading && !error && userData.length > 0 && (
					<ul className='divide-y'>
						{userData.map((user) => (
							<li className='cursor-pointer p-3 hover:bg-primary/20' key={user.id}>
								<button
									className='w-full cursor-pointer text-left'
									onClick={() => console.info('selected user', user)}
									type='button'
								>
									{user.name} - [{user.email}]
								</button>
							</li>
						))}
					</ul>
				)}
				{!isLoading && !error && userData.length === 0 && debouncedTerm && (
					<SingleItem className='text-muted-foreground' content='No results found' />
				)}
			</div>
		</div>
	);
};

function SingleItem({ content, className }: { content: string; className?: string }) {
	return <p className={cn('p-3', className)}>{content}</p>;
}
