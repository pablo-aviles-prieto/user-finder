import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSelectedUser } from '@/context/selected-user-context';
import userRepository from '@/services/user-repository';

export const UserDetails = () => {
	const { selectedUser } = useSelectedUser();
	const {
		data: userDetails,
		isLoading,
		error: _error,
	} = useQuery(userRepository.getUserDetailsQueryOptions(selectedUser?.id));

	if (!selectedUser) {
		return null;
	}

	return (
		<article className='rounded-md border p-4'>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader2 className='size-10 animate-spin' />
				</div>
			) : (
				<div>
					<h2>User Details</h2>
					<p>Name: {userDetails?.name}</p>
					<p>Email: {userDetails?.email}</p>
				</div>
			)}
		</article>
	);
};
