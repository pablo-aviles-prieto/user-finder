import type { UserInfoDetail } from '@/features/user-details/components/user-details';
import { cn } from '@/lib/utils';

export const InfoField = ({ label, value, useFullCols, icon: Icon }: UserInfoDetail) => (
	<div
		className={cn(
			'group rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md',
			useFullCols && 'sm:col-span-2'
		)}
	>
		<div className='flex items-start gap-3'>
			<div className='rounded-md bg-primary/10 p-2 transition-colors group-hover:bg-primary/20'>
				<Icon className='size-5 text-primary lg:size-6' />
			</div>
			<div className='min-w-0 flex-1 space-y-0.5'>
				<p className='font-medium text-muted-foreground text-xs uppercase tracking-wide'>{label}</p>
				<p className='truncate font-medium text-foreground'>{value}</p>
			</div>
		</div>
	</div>
);
