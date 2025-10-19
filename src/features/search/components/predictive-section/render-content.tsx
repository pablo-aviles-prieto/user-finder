import { useQuery } from '@tanstack/react-query';
import { Loader2, MailIcon, UserRound } from 'lucide-react';
import { useMemo } from 'react';
import { useSelectedUser } from '@/context/selected-user-context';
import { SingleItem } from '@/features/search/components/predictive-section/single-item';
import userRepository from '@/services/user-repository';

type RenderContentProps = {
	debouncedTerm: string;
};

export const RenderContent = ({ debouncedTerm }: RenderContentProps) => {
	const { data, isLoading, error } = useQuery(userRepository.getUsersQueryOptions(debouncedTerm));
	const userData = useMemo(() => data || [], [data]);
	const { setSelectedUser } = useSelectedUser();

	if (isLoading) {
		return (
			<div className='flex min-h-24 items-center justify-center bg-inherit'>
				<Loader2 className='size-8 animate-spin text-primary' />
			</div>
		);
	}

	if (error) {
		return <SingleItem className='text-destructive' content='Error fetching users' />;
	}

	if (userData.length === 0 && debouncedTerm) {
		return <SingleItem className='text-muted-foreground' content='No results found' />;
	}

	return (
		<ul className='divide-y'>
			{userData.map((user) => (
				<li className='cursor-pointer hover:bg-primary/30' key={user.id}>
					<button
						className='flex w-full cursor-pointer items-center gap-4 p-3 text-left [&_span]:flex [&_span]:items-center [&_span]:gap-1 [&_svg]:size-4'
						onClick={() => setSelectedUser(user)}
						type='button'
					>
						<span className='leading-tight'>
							<UserRound /> {user.name}
						</span>
						<span className='text-muted-foreground text-sm'>
							<MailIcon /> [{user.email}]
						</span>
					</button>
				</li>
			))}
		</ul>
	);
};
