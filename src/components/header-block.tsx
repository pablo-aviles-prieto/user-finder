import { cn } from '@/lib/utils';

type HeroTitleProps = {
	title: string;
	subtitle?: string;
	className?: string;
};

export const HeaderBlock = ({ title, subtitle, className }: HeroTitleProps) => (
	<header className={cn('space-y-0.5 text-center lg:space-y-1.5', className)}>
		<h1 className='text-primary'>{title}</h1>
		<p className='text-muted-foreground'>{subtitle}</p>
	</header>
);
