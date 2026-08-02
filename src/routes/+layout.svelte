<script lang="ts">
	import { asset } from '$app/paths';
	import './layout.css';
	import { initTheme } from '@polumeyv/ui/components/theme-toggle';
	import { Footer, Header } from '@polumeyv/ui/blocks';
	import { page } from '$app/state';

	const navLinks = [
		{ label: 'Nic', href: '/nic' },
		{ label: 'Contact', href: '/contact' },
	];

	const legalLinks = [
		{ label: 'Privacy', href: '/legal/privacy' },
		{ label: 'Terms', href: '/legal/terms' },
		{ label: 'Cookies', href: '/legal/cookies' },
		{ label: 'Marketing', href: '/legal/marketing' },
	];

	let { children } = $props();

	initTheme();
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
