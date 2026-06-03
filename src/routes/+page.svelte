<script lang="ts">
	import * as Item from '@polumeyv/ui/item';
	import { Button } from '@polumeyv/ui/button';
	import Scale from '@lucide/svelte/icons/scale';
	import Scissors from '@lucide/svelte/icons/scissors';
	import UtensilsCrossed from '@lucide/svelte/icons/utensils-crossed';
	import Car from '@lucide/svelte/icons/car';
	import Heart from '@lucide/svelte/icons/heart';
	import Camera from '@lucide/svelte/icons/camera';
	import Wind from '@lucide/svelte/icons/wind';
	import Coffee from '@lucide/svelte/icons/coffee';
	import Award from '@lucide/svelte/icons/award';
	import Home from '@lucide/svelte/icons/home';
	import { Browser } from '@polumeyv/ui/mockups';
	import Check from '@lucide/svelte/icons/check';
	import GradientWaveText from '$lib/components/gradient-wave-text.svelte';
	import SchedulingVisual from '$lib/visuals/SchedulingVisual.svelte';
	import ClientManagementVisual from '$lib/visuals/ClientManagementVisual.svelte';
	import DashboardVisual from '$lib/visuals/DashboardVisual.svelte';
	import WorkflowVisual from '$lib/visuals/WorkflowVisual.svelte';
	import AIVisual from '$lib/visuals/AIVisual.svelte';
	import MultiTeamVisual from '$lib/visuals/MultiTeamVisual.svelte';

	const business = [
		{
			name: 'Hair Salons',
			icon: Scissors,
			description: 'Appointment booking, stylist schedules, and client preferences',
		},
		{ name: 'Law Firms', icon: Scale, description: 'Case management, client intake, and billing automation' },
		{
			name: 'Restaurants',
			icon: UtensilsCrossed,
			description: 'Reservations, waitlist management, and table coordination',
		},
		{ name: 'Auto Services', icon: Car, description: 'Service appointments, vehicle history, and repair tracking' },
		{ name: 'Healthcare', icon: Heart, description: 'Patient scheduling, intake forms, and appointment reminders' },
		{ name: 'Photography', icon: Camera, description: 'Session booking, client galleries, and contract management' },
		{ name: 'Barbershops', icon: Wind, description: 'Walk-ins, appointments, and barber availability' },
		{ name: 'Cafes', icon: Coffee, description: 'Order ahead, catering requests, and loyalty programs' },
		{ name: 'Consulting', icon: Award, description: 'Client meetings, project tracking, and invoicing' },
		{ name: 'Real Estate', icon: Home, description: 'Property showings, client management, and document signing' },
	];

	const desc = 'Scheduling, client management, and workflow automation for businesses.';

	const features = [
		{
			title: 'Custom Scheduling Systems',
			tagline: "You run your business. We'll run your calendar.",
			details: ['Tailored to your exact workflow', 'Smart booking rules', 'Automated reminders'],
			visual: SchedulingVisual,
		},
		{
			title: 'Automated Client Management',
			tagline: 'Less chasing. More serving.',
			details: ['Smart reminders & follow-ups', 'Client preference tracking', 'Communication history'],
			visual: ClientManagementVisual,
		},
		{
			title: 'Custom Dashboards & Reporting',
			tagline: "The numbers you care about\u2014nothing you don't.",
			details: ['Live performance metrics', 'Integrated payroll', 'Revenue analytics'],
			visual: DashboardVisual,
		},
		{
			title: 'Internal Workflow Automation',
			tagline: "Manual tasks are expensive. Let's kill them.",
			details: ['Automated task assignments', 'Smart inventory tracking', 'Team coordination'],
			visual: WorkflowVisual,
		},
		{
			title: 'AI-Enhanced Recommendations',
			tagline: "You don't need more data\u2014you need better decisions.",
			details: ['Peak time predictions', 'Smart scheduling suggestions', 'Resource optimization'],
			visual: AIVisual,
		},
		{
			title: 'Multi-Team + Multi-Location',
			tagline: 'Coordinate chaos across staff, roles, and locations.',
			details: ['Multi-role management', 'Group class coordination', 'Cross-location sync'],
			visual: MultiTeamVisual,
		},
	] as const;
</script>

<svelte:head>
	<title>Polumeyv - Business Automation Software</title>
	<meta name="description" content={desc} />
</svelte:head>

<!-- Hero Section -->
<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 sm:px-6 pt-12 sm:pt-0">
	<div class="mx-auto grid w-full max-w-6xl items-center gap-5 text-center md:text-left">
		<h1 class="mb-4 sm:mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-[fade-up_0.8s_ease-out_0.1s_both]">
			Automate Your <span class="inline-flex"><GradientWaveText once={false} delay={3} triggerOnView>Business.</GradientWaveText></span>
		</h1>
		<div class="flex flex-wrap justify-center md:justify-start gap-3 animate-[fade-up_1.0s_ease-out_1.8s_both]">
			<Button href="/contact" size="lg">Get Started</Button>
			<Button href="/nic" variant="outline" size="lg">Learn More</Button>
		</div>
	</div>
</section>

<!-- Features Sections -->
{#each features as feature, index (feature.title)}
	{@const isReversed = index % 2 !== 0}
	<section class="px-4 sm:px-6 md:px-16 lg:px-24 py-16 sm:py-20 md:py-28 lg:py-36">
		<div class="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-20">
			<!-- Text -->
			<div class="text-center lg:text-left {isReversed ? 'lg:order-2' : ''}">
				<h3 class="mb-3 sm:mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
					{feature.title}
				</h3>
				<p class="mb-5 sm:mb-6 text-base text-muted-foreground sm:text-lg md:text-xl">
					{feature.tagline}
				</p>
				<ul class="space-y-2 sm:space-y-3">
					{#each feature.details as detail (detail)}
						<li class="text-sm sm:text-base text-muted-foreground">{detail}</li>
					{/each}
				</ul>
			</div>

			<!-- Visual -->
			<div class="min-w-0 {isReversed ? 'lg:order-1' : ''}">
				<feature.visual />
			</div>
		</div>
	</section>
{/each}

<!-- Business Types Section -->
<section class="px-4 sm:px-6 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 lg:py-48">
	<div class="mb-10 sm:mb-14 md:mb-20 text-center">
		<h2 class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">Built for Every Business</h2>
		<div class="w-16 sm:w-20 md:w-24 h-px bg-primary mx-auto mt-4 sm:mt-6 md:mt-8"></div>
		<p class="mt-4 sm:mt-6 md:mt-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground">
			From salons to law firms, we build custom solutions for service businesses of all types.
		</p>
	</div>

	<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
		{#each business as b (b.name)}
			{@const Icon = b.icon}
			<Item.Root class="p-2 sm:p-3 shadow-none">
				<Item.Media>
					<Icon class="size-4 sm:size-5 text-primary" />
				</Item.Media>
				<Item.Content>
					<Item.Title class="text-xs sm:text-sm">{b.name}</Item.Title>
				</Item.Content>
			</Item.Root>
		{/each}
	</div>
</section>
