import type { Handle } from '@sveltejs/kit';

// SvelteKit preloads JS + CSS by default but not fonts. Geist (the body/`--font-sans` face) is above-the-fold on every
// page, so preload it to shrink the font-swap window / improve LCP. Scoped to the sans face — preloading Geist Mono
// (code only) would just waste bandwidth.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		preload: ({ type, path }) => type === 'js' || type === 'css' || (type === 'font' && path.includes('geist') && !path.includes('mono')),
	});
