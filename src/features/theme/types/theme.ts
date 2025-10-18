export type ThemeOption = 'dark' | 'light' | 'system';

export type ThemeToggleOption = {
	key: ThemeOption;
	label: string;
};

export type ThemeStore = {
	theme: ThemeOption;
	setTheme: (theme: ThemeOption) => void;
};
