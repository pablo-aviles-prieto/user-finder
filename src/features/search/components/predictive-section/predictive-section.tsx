import { useEffect, useRef, useState } from 'react';
import { RenderContent } from '@/features/search/components/predictive-section/render-content';
import { cn } from '@/lib/utils';

type PredictiveSectionProps = {
	showPredictiveBlock: boolean;
	debouncedTerm: string;
};

export const PredictiveSection = ({ showPredictiveBlock, debouncedTerm }: PredictiveSectionProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

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
				'absolute inset-x-0 z-20 max-h-52 overflow-auto rounded-md border bg-background transition-[height,border-color] duration-300 ease-in-out',
				height === 0 ? 'border-transparent' : 'border-accent'
			)}
			style={{ height }}
		>
			<div ref={contentRef}>
				<RenderContent debouncedTerm={debouncedTerm} />
			</div>
		</div>
	);
};
