import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { Providers } from '@/providers';

import './styles/index.css';

// biome-ignore lint/style/noNonNullAssertion: <implemented by vite>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
);
