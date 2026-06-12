import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
	envDir: '../../../',
	define: { __APP_VERSION__: JSON.stringify(pkg.version) },
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({
				fallback: 'index.html',
				precompress: false,
				strict: true,
			}),
			env: {
				dir: '../../..',
			},
			experimental: {
				remoteFunctions: true,
				explicitEnvironmentVariables: true,
			},
			typescript: {
				config: (c) => {
					c.extends = '../../../../tsconfig.json';
					c.compilerOptions.types = ['bun'];
				},
			},
			compilerOptions: {
				experimental: {
					async: true,
				},
			},
			// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
			vitePlugin: {
				dynamicCompileOptions: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : { runes: true }),
			},
		}),
	],
	ssr: {
		external: ['@polumeyv/lib'],
	},
	server: { port: 3000, strictPort: true, fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
