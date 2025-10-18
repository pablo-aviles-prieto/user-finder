import { CheckIcon, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Theme, useThemeStore } from '@/store/theme';

type ThemeOption = {
	key: Theme;
	label: string;
};

const themeOptions: ThemeOption[] = [
	{ key: 'light', label: 'Light' },
	{ key: 'dark', label: 'Dark' },
	{ key: 'system', label: 'System' },
];

export function ThemeToggle() {
	const { theme, setTheme } = useThemeStore();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='size-[1.8rem] lg:size-[2.2rem]' size='icon' variant='outline'>
					<Sun className='dark:-rotate-90 size-[0.9rem] rotate-0 scale-100 transition-all lg:size-[1.1rem] dark:scale-0' />
					<Moon className='absolute size-[0.9rem] rotate-90 scale-0 transition-all lg:size-[1.1rem] dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{themeOptions.map((option) => (
					<DropdownMenuItem key={option.key} onClick={() => setTheme(option.key)}>
						<CheckIcon className={option.key === theme ? 'visible' : 'invisible'} />
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
