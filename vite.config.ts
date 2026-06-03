import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
	envDir: '../../../',
	define: { __APP_VERSION__: JSON.stringify(pkg.version) },
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		external: ['@polumeyv/lib'],
	},
	server: { port: 3000, strictPort: true, fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
