import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
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
				<Loader2 className='size-8 animate-spin' />
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
				<li className='cursor-pointer p-3 hover:bg-primary/20' key={user.id}>
					<button className='w-full cursor-pointer text-left' onClick={() => setSelectedUser(user)} type='button'>
						{user.name} <span className='text-muted-foreground text-sm'>[{user.email}]</span>
					</button>
				</li>
			))}
		</ul>
	);
};
