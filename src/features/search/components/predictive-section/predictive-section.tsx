import { useEffect, useRef, useState } from 'react';
import { RenderContent } from '@/features/search/components/predictive-section/render-content';
import { cn } from '@/lib/utils';

type PredictiveSectionProps = {
	showPredictiveBlock: boolean;
	debouncedTerm: string;
	onClose: () => void;
};

const BORDER_WIDTH = 1; // in pxs

export const PredictiveSection = ({ showPredictiveBlock, debouncedTerm, onClose }: PredictiveSectionProps) => {
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
				setHeight(newHeight > 0 ? newHeight + BORDER_WIDTH * 2 : 0);
			}
		});
		resizeObserver.observe(contentRef.current);

		setHeight(contentRef.current.scrollHeight);

		return () => {
			resizeObserver.disconnect();
		};
	}, [showPredictiveBlock]);

	return (
		<div
			className={cn(
				'absolute inset-x-0 z-20 mt-2 max-h-48 overflow-auto rounded-md border-accent bg-card transition-[height,border] duration-300 ease-in-out lg:max-h-60',
				height === 0 ? 'border-0' : 'border'
			)}
			style={{ height }}
		>
			<div ref={contentRef}>
				<RenderContent debouncedTerm={debouncedTerm} onClose={onClose} />
			</div>
		</div>
	);
};
