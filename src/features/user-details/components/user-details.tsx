import { useQuery } from '@tanstack/react-query';
import { Building, Globe, type LucideIcon, Mail, MapPin, Phone, UserIcon } from 'lucide-react';
import { Loader } from '@/components/loader';
import { useSelectedUser } from '@/context/selected-user-context';
import { InfoField } from '@/features/user-details/components/info-field';
import userRepository from '@/services/user-repository';

export type UserInfoDetail = {
	icon: LucideIcon;
	label: string;
	value: string;
	useFullCols?: boolean;
};

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
			useFullCols: true,
		},
	];

	return (
		<article className='fade-in-50 slide-in-from-bottom-4 animate-in overflow-hidden rounded-md border-2 border-accent/50 p-6 shadow-lg duration-300'>
			<div className='mb-8 flex items-center gap-5'>
				<div className='relative'>
					<div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 blur-[2px]' />
					<div className='relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/20 text-primary-foreground shadow-lg'>
						<UserIcon className='size-10' />
					</div>
				</div>
				<div>
					<h3 className='font-bold text-2xl text-foreground'>{userDetails.name}</h3>
					<p className='text-base text-muted-foreground'>@{userDetails.username}</p>
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
