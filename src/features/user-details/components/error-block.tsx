import { AlertCircle } from 'lucide-react';

type ErrorBlockProps = {
	error: Error;
};

export const ErrorBlock = ({ error }: ErrorBlockProps) => (
	<article className='fade-in-50 slide-in-from-bottom-4 animate-in overflow-hidden rounded-md border-2 border-destructive/20 bg-card p-4 shadow-sm duration-300 lg:p-6'>
		<div className='flex items-start gap-4'>
			<div className='rounded-md bg-destructive/10 p-2'>
				<AlertCircle className='size-6 text-destructive' />
			</div>
			<div className='flex-1 space-y-1'>
				<h3 className='font-semibold text-destructive'>Error loading user details</h3>
				<p className='text-muted-foreground text-sm'>{error.message}</p>
			</div>
		</div>
	</article>
);
