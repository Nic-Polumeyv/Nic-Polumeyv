<script lang="ts">
	import { getTheme } from '@polumeyv/ui/components/theme-toggle';

	import * as Card from '@polumeyv/ui/components/card';
	import * as Item from '@polumeyv/ui/components/item';
	import { Separator } from '@polumeyv/ui/components/separator';
	import * as Toggle from '@polumeyv/ui/components/toggle';
	import { Badge } from '@polumeyv/ui/components/badge';
	import { Button } from '@polumeyv/ui/components/button';
	import { scrollReveal } from '@polumeyv/ui/hooks';
	import MorphingText from '#lib/components/morphing-text.svelte';
	import MailIcon from '@lucide/svelte/icons/mail';
	import PhoneIcon from '@lucide/svelte/icons/phone';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import Particles from '#lib/components/Particles.svelte';
	import Aurora from '#lib/components/Aurora.svelte';
	import WalkingBorder from '#lib/components/WalkingBorder.svelte';
	import ProjectPanel from '#lib/components/ProjectPanel.svelte';

	const theme = getTheme();
	let isDarkMode = $derived(theme.current !== 'light');

	// Aurora fades to half immediately on mode switch, then fully out after colors morph
	let auroraOpacity = $state(1);
	$effect(() => {
		if (isDarkMode) {
			auroraOpacity = 0.3;
			const t = setTimeout(() => {
				auroraOpacity = 0;
			}, 800);
			return () => clearTimeout(t);
		} else {
			auroraOpacity = 1;
		}
	});

	const projects = [
		{
			title: 'Polumeyv',
			tagline: 'Professional booking platform',
			description:
				'A full-featured booking and management platform for service businesses. Customers can browse services, book appointments, and manage their profiles while professionals get powerful scheduling and client management tools.',
			url: 'https://polumeyv.com',
			imgLight: '/projects/polumeyv-light.png',
			imgDark: '/projects/polumeyv-dark.png',
			tech: ['SvelteKit', 'TypeScript', 'Tailwind', 'AWS', 'PostgreSQL', 'Stripe'],
		},
		{
			title: 'Cresends',
			tagline: 'Digital messaging service',
			description:
				'A modern messaging platform designed for seamless digital communication. Features real-time messaging, media sharing, and an intuitive interface for connecting people effortlessly.',
			url: 'https://cresends.com',
			imgLight: '/projects/cresends-light.png',
			imgDark: '/projects/cresends-dark.png',
			tech: ['SvelteKit', 'TypeScript', 'Tailwind', 'WebSockets', 'Node.js', 'S3'],
		},
		{
			title: 'MA-21',
			tagline: 'Creative agency website',
			description:
				'A sleek portfolio and agency website showcasing creative work. Built with attention to design detail, smooth animations, and a focus on presenting visual content beautifully.',
			url: 'https://ma-21.com',
			imgLight: '/projects/ma21-light.png',
			imgDark: '/projects/ma21-dark.png',
			tech: ['Svelte', 'GSAP', 'Tailwind', 'Figma'],
		},
	];
	let selectedProject: (typeof projects)[number] | null = $state(null);
	let panelOpen = $state(false);

	function openProject(project: (typeof projects)[number]) {
		selectedProject = project;
		panelOpen = true;
	}

	// Intro sequence steps
	type Step = 'entering' | 'greeting' | 'morphing' | 'revealing';
	let step = $state<Step>('entering');
	let wordsRevealed = $state(0);

	// Step 0: Words slide up one by one, then transition to greeting
	$effect(() => {
		if (step === 'entering') {
			const t1 = setTimeout(() => {
				wordsRevealed = 1;
			}, 200);
			const t2 = setTimeout(() => {
				wordsRevealed = 2;
			}, 500);
			const t3 = setTimeout(() => {
				step = 'greeting';
			}, 1000);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
				clearTimeout(t3);
			};
		}
	});

	// Step 1: "Hey there" fully visible, after a beat → morph
	$effect(() => {
		if (step === 'greeting') {
			const t = setTimeout(() => {
				step = 'morphing';
			}, 300);
			return () => clearTimeout(t);
		}
	});

	// Step 2: Morph "Hey there" → "I'm Nic," then reveal
	let rolesVisible = $state(0);

	function onMorphComplete() {
		step = 'revealing';
		// Stagger the roles appearing one by one
		setTimeout(() => {
			rolesVisible = 1;
		}, 300);
		setTimeout(() => {
			rolesVisible = 2;
		}, 600);
		setTimeout(() => {
			rolesVisible = 3;
		}, 900);
	}

	const isRevealed = $derived(step === 'revealing');
</script>

<svelte:head>
	<title>Nic Polumeyv</title>
</svelte:head>

<main class="text-foreground">
	<section class="relative min-h-screen flex items-center overflow-x-hidden px-4 sm:px-6 md:px-16 lg:px-24 py-16 md:py-0 -mt-16">
		<div class="absolute inset-x-0 -top-16 bottom-0 z-0 transition-opacity duration-800" class:opacity-0={!isDarkMode}>
			<Particles class="absolute inset-0" quantity={80} size={0.5} staticity={30} ease={80} />
		</div>

		<div
			class="absolute inset-x-0 -top-16 bottom-0 z-0 transition-opacity duration-1000"
			style="opacity: {step === 'entering' || step === 'greeting' ? 0 : auroraOpacity}">
			<Aurora />
		</div>

		<div class="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-8">
			<div class="hero-text w-full md:w-1/2 shrink-0 transition-transform duration-700 ease-in-out" class:revealed={isRevealed}>
				<div class="flex items-center justify-center md:justify-start gap-1 mb-4">
					{#if step === 'entering'}
						<div class="text-4xl md:text-6xl lg:text-7xl font-black leading-none">
							<span
								class="inline-block transition-all duration-500 ease-out {wordsRevealed >= 1
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-4'}">Hey</span>
							<span
								class="inline-block transition-all duration-500 ease-out {wordsRevealed >= 2
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-4'}">
								there!</span>
						</div>
					{:else}
						<MorphingText
							texts={['Hey there!', "I'm Nic,"]}
							initialDelay={0.3}
							morphDuration={1.2}
							start={step === 'morphing' || step === 'revealing'}
							onComplete={onMorphComplete} />
					{/if}
				</div>

				<div class="text-muted-foreground text-base sm:text-lg mb-4">
					<span
						class="inline-block transition-all duration-400 ease-out {rolesVisible >= 1
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-2'}">Software Engineer</span>
					<span
						class="inline-block transition-all duration-400 ease-out {rolesVisible >= 2
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-2'}">
						&bull; Web Developer</span>
					<span
						class="inline-block transition-all duration-400 ease-out {rolesVisible >= 3
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-2'}">
						&bull; Designer</span>
				</div>

				<div class="transition-opacity duration-500 delay-200" class:opacity-0={!isRevealed}>
					<div class="w-full md:w-100 overflow-hidden mb-6 mx-auto md:mx-0">
						<div class="flex animate-marquee">
							{#each [1, 2, 3] as _ (_)}
								<div class="flex gap-3 px-2 shrink-0">
									{#each ['TypeScript', 'Svelte', 'React', 'Node.js', 'Rust', 'Go', 'Python', 'Bun', 'Java', 'AWS'] as s (s)}
										<Badge variant="outline" class="whitespace-nowrap">{s}</Badge>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div
				class="hero-img w-full md:w-1/2 flex justify-center transition-all duration-700 ease-in-out delay-100"
				class:revealed={isRevealed}>
				<img
					src="/about-nic.webp"
					alt="Nic Polumeyv"
					class="max-h-[35vh] sm:max-h-[40vh] md:max-h-[55vh] w-auto rounded-xl object-contain" />
			</div>
		</div>
	</section>

	<section
		class="education relative bg-background overflow-clip min-h-screen flex items-center py-20 sm:py-28 md:py-40 lg:py-52 px-4 sm:px-6 md:px-16 lg:px-24">
		<div class="max-w-5xl mx-auto w-full" {@attach scrollReveal({ y: 40 })}>
			<div class="flex flex-col items-center md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
				<div class="text-center md:text-left">
					<p class="text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-2">Education</p>
					<h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 text-[#BA0C2F]">University of Georgia</h2>
					<p class="text-white/60 text-base sm:text-lg">Athens, GA</p>
				</div>
				<img src="/uga-logo.png" alt="University of Georgia" class="h-20 sm:h-24 md:h-32 object-contain brightness-0 invert" />
			</div>

			<Item.Group class="grid! grid-cols-1 gap-6">
				<Item.Root variant="outline" class="items-start!">
					<Item.Content>
						<div class="flex w-fit items-center gap-2leading-snug font-medium text-xl md:text-2xl!">Real Estate</div>
						<Badge variant="outline">Major</Badge>
						<Item.Description>Property markets, valuation, investment analysis, and mortgage lending.</Item.Description>
					</Item.Content>
					<Separator class="my-0" />
					<div class="flex basis-full justify-between gap-2 flex-col items-starttext-sm text-muted-foreground">
						<p>
							<span class="font-medium text-foreground">Mortgage & Lending</span> — Deep expertise in mortgage structures, underwriting, loan
							products, interest rate mechanics, and the secondary mortgage market.
						</p>
						<p>
							<span class="font-medium text-foreground">Valuation & Investment</span> — Commercial appraisal, property analysis, investment underwriting,
							and real estate financial modeling.
						</p>
						<p>
							<span class="font-medium text-foreground">Markets & Development</span> — Land use, market dynamics, zoning, and the lifecycle of
							real estate transactions.
						</p>
					</div>
				</Item.Root>
				<Item.Root variant="outline" class="items-start!">
					<Item.Content>
						<div class="flex w-fit items-center gap-2 leading-snug font-medium text-xl md:text-2xl!">Finance</div>
						<Badge variant="outline">Major</Badge>
						<Item.Description>Financial systems, institutional theory, and the complex dynamics of modern markets.</Item.Description>
					</Item.Content>
					<Separator class="my-0" />
					<div class="flex basis-full justify-between flex-col items-start gap-2 text-sm text-muted-foreground">
						<p>
							<span class="font-medium text-foreground">Consumer & Behavioral Finance</span> — Consumer science, decision-making theory, and how
							individual behavior shapes financial markets.
						</p>
						<p>
							<span class="font-medium text-foreground">Institutions & Systems</span> — The structure and mechanics of financial institutions,
							banking systems, and regulatory frameworks that govern capital flow.
						</p>
						<p>
							<span class="font-medium text-foreground">Markets & Complexity</span> — Portfolio theory, risk modeling, derivatives, and navigating
							the interconnected nature of global financial markets.
						</p>
					</div>
				</Item.Root>
				<Item.Root variant="outline" class="items-start!">
					<Item.Content>
						<div class="flex w-fit items-center gap-2 leading-snug font-medium text-xl md:text-2xl!">Computer Science</div>
						<Badge variant="outline">Minor</Badge>
						<Item.Description>Low-level programming, systems architecture, and foundational computer science theory.</Item.Description>
					</Item.Content>
					<Separator class="my-0" />
					<div class="flex basis-full justify-between flex-col items-start! gap-2 text-sm text-muted-foreground">
						<p>
							<span class="font-medium text-foreground">Systems Architecture</span> — Low-level systems design, operating system concepts, hardware-software
							interaction, and computational theory.
						</p>
						<p>
							<span class="font-medium text-foreground">Theory & Analysis</span> — Data structures, algorithms, discrete mathematics, and computational
							complexity.
						</p>
					</div>
				</Item.Root>
				<Item.Root variant="outline" class="items-start!">
					<Item.Content>
						<div class="flex w-fit items-center gap-2 leading-snug font-medium text-xl md:text-2xl!">Entrepreneurship</div>
						<Badge variant="outline">Certificate</Badge>
						<Item.Description
							>Venture creation, funding strategy, and business operations across the full startup lifecycle.</Item.Description>
					</Item.Content>
					<Separator class="my-0" />
					<div class="flex basis-full justify-between flex-col items-start! gap-2 text-sm text-muted-foreground">
						<p>
							<span class="font-medium text-foreground">Venture Creation</span> — Opportunity identification, market validation, business model
							design, and launching new ventures from concept to product.
						</p>
						<p>
							<span class="font-medium text-foreground">Funding & Capital</span> — Venture capital structuring, deal flow, term sheets, and fundraising
							strategy. Familiarity with angel investing and early-stage financing.
						</p>
						<p>
							<span class="font-medium text-foreground">Venture Management</span> — Scaling operations, team building, financial planning, and
							sustaining growth through the early stages of a business.
						</p>
					</div>
				</Item.Root>
			</Item.Group>
		</div>
	</section>

	<section class="projects relative bg-background py-20 sm:py-24 md:py-40 px-4 sm:px-6 md:px-16 lg:px-24">
		<div class="max-w-5xl mx-auto relative" {@attach scrollReveal({ y: 40 })}>
			<div class="mb-10 sm:mb-12 md:mb-16 text-center md:text-left">
				<p class="text-muted-foreground text-xs sm:text-sm uppercase tracking-widest mb-2">Work</p>
				<h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Projects</h2>
			</div>

			<div class="space-y-8">
				{#each projects as p, i (p.title)}
					<Card.Root
						class="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
						onclick={() => openProject(p)}>
						<div class="grid grid-cols-1 md:grid-cols-2">
							<div class="aspect-video md:aspect-auto">
								<img src={isDarkMode ? p.imgDark : p.imgLight} alt={p.title} class="w-full h-full object-cover object-top" />
							</div>
							<div class="flex flex-col">
								<Card.Header>
									<span class="text-muted-foreground font-mono text-sm">0{i + 1}</span>
									<Card.Title class="text-2xl! md:text-3xl!">{p.title}</Card.Title>
									<Card.Description class="text-base!">{p.tagline}</Card.Description>
								</Card.Header>
								<Card.Content class="flex-1">
									<p class="text-muted-foreground leading-relaxed mb-4">{p.description}</p>
									<div class="flex flex-wrap gap-2">
										{#each p.tech as t (t)}
											<Badge variant="outline">{t}</Badge>
										{/each}
									</div>
								</Card.Content>
								<Card.Footer>
									<Button
										href={p.url}
										target="_blank"
										rel="noopener"
										variant="outline"
										class="gap-2!"
										onclick={(e: MouseEvent) => e.stopPropagation()}>
										Visit Site <ArrowRightIcon class="size-4" />
									</Button>
								</Card.Footer>
							</div>
						</div>
					</Card.Root>
				{/each}
			</div>
		</div>
	</section>

	<section class="min-h-screen grid place-items-center py-20 px-4 sm:px-6">
		<WalkingBorder duration={10}>
			<Card.Root class="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
				<Card.Header>
					<Card.Title class="text-2xl! md:text-3xl! lg:text-4xl!">Let's Connect</Card.Title>
					<Card.Description class="text-sm md:text-base">Follow my work, collaborate, or let's build something together</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-wrap justify-center gap-3 sm:gap-4">
					<Button href="mailto:nic@polumeyv.com" variant="outline" size="icon" class="size-10! md:size-12!"
						><MailIcon class="size-5 md:size-6" /></Button>
					<Button href="tel:7625249497" variant="outline" size="icon" class="size-10! md:size-12!"
						><PhoneIcon class="size-5 md:size-6" /></Button>
					<Button href="sms:7625249497" variant="outline" size="icon" class="size-10! md:size-12!"
						><MessageCircleIcon class="size-5 md:size-6" /></Button>
					<Button href="https://github.com/Nic-Polumeyv" variant="outline" size="icon" class="size-10! md:size-12!">
						<svg class="size-5 md:size-6" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
					</Button>
					<Button href="https://www.linkedin.com/in/nic-/" variant="outline" size="icon" class="size-10! md:size-12!">
						<svg class="size-5 md:size-6" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
					</Button>
				</Card.Content>
			</Card.Root>
		</WalkingBorder>
	</section>

	<ProjectPanel project={selectedProject} bind:open={panelOpen} />
</main>

<style>
	:global(nav.sticky) {
		background: color-mix(in oklab, var(--background) 30%, transparent) !important;
	}

	/* Mobile-first: text slides down from top, image slides up from bottom. */
	.hero-text {
		transform: translateY(-30%);
	}
	.hero-text.revealed {
		transform: translateY(0);
	}
	.hero-img {
		opacity: 0;
		transform: translateY(30%);
	}
	.hero-img.revealed {
		opacity: 1;
		transform: translateY(0);
	}

	/* md+: revert to side-by-side horizontal slide */
	@media (min-width: 48rem) {
		.hero-text {
			transform: translateX(50%);
		}
		.hero-text.revealed {
			transform: translateX(0);
		}
		.hero-img {
			transform: translateX(60%);
		}
		.hero-img.revealed {
			transform: translateX(0);
		}
	}
</style>
