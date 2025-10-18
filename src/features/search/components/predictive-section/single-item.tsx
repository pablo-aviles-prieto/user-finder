import { cn } from '@/lib/utils';

type SingleItemProps = {
	content: string;
	className?: string;
};

export const SingleItem = ({ content, className }: SingleItemProps) => (
	<p className={cn('p-3', className)}>{content}</p>
);
