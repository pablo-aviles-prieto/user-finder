import { useQuery } from '@tanstack/react-query';
import { AlertCircle, UserIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Loader } from '@/components/loader';
import { useSelectedUser } from '@/context/selected-user-context';
import { cn } from '@/lib/utils';
import userRepository from '@/services/user-repository';
import type { User } from '@/types/user';

type RenderContentProps = {
	debouncedTerm: string;
	onClose: () => void;
};

export const RenderContent = ({ debouncedTerm, onClose }: RenderContentProps) => {
	const { data, isLoading, error } = useQuery(userRepository.getUsersQueryOptions(debouncedTerm));
	const userData = useMemo(() => data || [], [data]);
	const { setSelectedUser } = useSelectedUser();

	const handleUserSelect = (user: User) => {
		setSelectedUser(user);
		onClose();
	};

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className='flex items-center gap-3 p-4 text-destructive'>
				<AlertCircle className='size-6 shrink-0' />
				<div>
					<p className='font-medium'>Error loading users</p>
					<p className='text-muted-foreground text-sm'>{error.message}</p>
				</div>
			</div>
		);
	}

	if (userData.length === 0 && debouncedTerm) {
		return (
			<div className='p-8 text-center'>
				<UserIcon className='mx-auto mb-3 size-12 text-muted-foreground/50' />
				<p className='font-medium text-muted-foreground'>No users found</p>
				<p className='text-muted-foreground text-sm'>Try searching with a different name or email</p>
			</div>
		);
	}

	return (
		<ul className='divide-y'>
			{userData.map((user) => (
				<li key={user.id}>
					<button
						className={cn(
							'w-full px-3 py-2 text-left transition-colors hover:bg-accent lg:px-4 lg:py-3',
							'focus:bg-accent focus:outline-none'
						)}
						onClick={() => handleUserSelect(user)}
						type='button'
					>
						<div className='flex items-start gap-3'>
							<div className='flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary lg:size-12'>
								<UserIcon className='size-5 w-5' />
							</div>
							<div className='min-w-0 flex-1'>
								<p className='font-medium text-foreground'>{user.name}</p>
								<p className='truncate text-muted-foreground text-xs lg:text-sm'>{user.email}</p>
							</div>
						</div>
					</button>
				</li>
			))}
		</ul>
	);
};
