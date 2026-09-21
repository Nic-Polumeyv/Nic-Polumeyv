import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { defaultClientConditions, defaultServerConditions, defineConfig, searchForWorkspaceRoot } from 'vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
	css: { lightningcss: { errorRecovery: true } },
	envDir: '../../../',
	// sheer-ui's exports serve npm its dist/; this condition picks the workspace checkout's sources instead. Tailwind's
	// css resolver ignores custom conditions, so layout.css imports ui.css by path.
	resolve: { conditions: ['@polumeyv/source', ...defaultClientConditions] },
	ssr: { resolve: { conditions: ['@polumeyv/source', ...defaultServerConditions] } },
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
				// No src/env.ts on purpose: explicit env vars make the static fallback eagerly import
				// /_app/env.js — a module only a server runtime serves — so the deployed SPA fallback
				// answered it with index.html (MIME error, site down).
			},
			compilerOptions: {
				experimental: {
					async: true,
				},
			},
			// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
			dynamicCompileOptions: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : { runes: true }),
		}),
	],
	server: { port: 3000, strictPort: true, fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
