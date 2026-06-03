import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
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
		},
		typescript: {
			config: (c) => {
				c.extends = '../../../../tsconfig.base.json';
				c.compilerOptions.types = ['bun'];
			},
		},
	},
	compilerOptions: {
		experimental: {
			async: true,
		},
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
	},
};

export default config;
