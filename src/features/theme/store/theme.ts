import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeOption, ThemeStore } from '@/features/theme/types/theme';

const applyTheme = (theme: ThemeOption) => {
	const root = window.document.documentElement;
	root.classList.remove('light', 'dark');

	if (theme === 'system') {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		root.classList.add(systemTheme);
		return;
	}

	root.classList.add(theme);
};

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: 'system',
			setTheme: (theme) => {
				set({ theme });
				applyTheme(theme);
			},
		}),
		{
			name: 'user-finder-theme',
			onRehydrateStorage: () => (state) => {
				if (state) {
					applyTheme(state.theme);
				}
			},
		}
	)
);
