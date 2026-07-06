import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://qinwenbao.art',
	base: '/',
	vite: {
		plugins: [tailwindcss()],
	},
});
