<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { beforeNavigate } from '$app/navigation';
	import './layout.css';
	import { initTheme } from 'sheer-ui/components/theme-toggle';
	import { Footer, Header } from 'sheer-ui/blocks';
	import { page, updated } from '$app/state';

	const navLinks = [
		{ label: 'Nic', href: resolve('nic') },
		{ label: 'Contact', href: resolve('contact') },
	];

	const legalLinks = [
		{ label: 'Privacy', href: resolve('legal/privacy') },
		{ label: 'Terms', href: resolve('legal/terms') },
		{ label: 'Cookies', href: resolve('legal/cookies') },
		{ label: 'Marketing', href: resolve('legal/marketing') },
	];

	let { children } = $props();

	initTheme();

	beforeNavigate(({ willUnload, to }) => {
		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<svelte:head>
	<title>Polumeyv</title>
	<link rel="icon" type="image/svg+xml" href={asset('favicon.svg')} />
	<link rel="icon" href={asset('favicon.ico')} sizes="48x48" />
	<link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
</svelte:head>

<Header
	brand="Polumeyv"
	brandHref="/"
	{navLinks}
	showBorder={page.url.pathname !== '/'}
	mobileId="polumeyv-mobile-nav" />

<div class="bg-background flex flex-col">
	{@render children()}
	<Footer {navLinks} {legalLinks} />
</div>
