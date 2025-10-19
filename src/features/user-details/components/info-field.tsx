import type { UserInfoDetail } from '@/features/user-details/types/user-info-detail';
import { cn } from '@/lib/utils';

export const InfoField = ({ label, value, fullWidth, icon: Icon }: UserInfoDetail) => (
	<div
		className={cn(
			'group overflow-hidden rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md',
			fullWidth && 'sm:col-span-2'
		)}
	>
		<div className='flex items-start gap-3'>
			<div className='rounded-md bg-primary/10 p-2 transition-colors group-hover:bg-primary/20'>
				<Icon className='size-5.5 text-primary lg:size-6.5' />
			</div>
			<div className='min-w-0 flex-1 space-y-0.5'>
				<small className='block text-muted-foreground uppercase'>{label}</small>
				<p className='truncate text-foreground'>{value}</p>
			</div>
		</div>
	</div>
);
