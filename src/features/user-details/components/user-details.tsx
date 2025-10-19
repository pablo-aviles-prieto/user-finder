import { useQuery } from '@tanstack/react-query';
import { Building, Globe, Mail, MapPin, Phone, UserIcon } from 'lucide-react';
import { Loader } from '@/components/loader';
import { useSelectedUser } from '@/context/selected-user-context';
import { InfoField } from '@/features/user-details/components/info-field';
import type { UserInfoDetail } from '@/features/user-details/types/user-info-detail';
import userRepository from '@/services/user-repository';

export const UserDetails = () => {
	const { selectedUser } = useSelectedUser();
	const {
		data: userDetails,
		isLoading,
		error: _error,
	} = useQuery(userRepository.getUserDetailsQueryOptions(selectedUser?.id));

	if (isLoading) {
		return <Loader />;
	}

	if (!selectedUser || !userDetails) {
		return null;
	}

	const userDetailsInfo: UserInfoDetail[] = [
		{
			icon: Mail,
			label: 'Email',
			value: userDetails.email,
		},
		{
			icon: Phone,
			label: 'Phone',
			value: userDetails.phone,
		},
		{
			icon: Globe,
			label: 'Website',
			value: userDetails.website,
		},
		{
			icon: Building,
			label: 'Company',
			value: userDetails.company.name,
		},
		{
			icon: MapPin,
			label: 'Address',
			value: `${userDetails.address.suite} ${userDetails.address.street}, ${userDetails.address.city} ${userDetails.address.zipcode}`,
			fullWidth: true,
		},
	];

	return (
		<article className='fade-in-50 slide-in-from-bottom-4 animate-in overflow-hidden rounded-md border-2 border-accent/50 p-4 shadow-sm duration-300 lg:p-6'>
			<div className='mb-8 flex items-center gap-5'>
				<div className='relative'>
					<div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 blur-[2px]' />
					<div
						className='relative flex size-[var(--user-icon-size-mobile)] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/20 text-primary-foreground shadow-lg lg:size-[var(--user-icon-size-desktop)]'
						style={{ '--user-icon-size-mobile': '3.5rem', '--user-icon-size-desktop': '5rem' } as React.CSSProperties}
					>
						<UserIcon className='size-[calc(var(--user-icon-size-mobile)/2)] lg:size-[calc(var(--user-icon-size-desktop)/2)]' />
					</div>
				</div>
				<div>
					<h2 className='text-foreground'>{userDetails.name}</h2>
					<p className='text-muted-foreground'>@{userDetails.username}</p>
				</div>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				{userDetailsInfo.map((detail) => (
					<InfoField key={detail.label} {...detail} />
				))}
			</div>
		</article>
	);
};
