<script lang="ts">
import * as Item from '@polumeyv/ui/components/item';
import { Button } from '@polumeyv/ui/components/button';
import { resolve } from '$app/paths';
import User from '@lucide/svelte/icons/user';
import Check from '@lucide/svelte/icons/check';
import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
import Mail from '@lucide/svelte/icons/mail';
import Shield from '@lucide/svelte/icons/shield';
import Lock from '@lucide/svelte/icons/lock';
import Users from '@lucide/svelte/icons/users';
import Bell from '@lucide/svelte/icons/bell';
import CreditCard from '@lucide/svelte/icons/credit-card';
import Clock from '@lucide/svelte/icons/clock';
import Cookie from '@lucide/svelte/icons/cookie';
import Baby from '@lucide/svelte/icons/baby';

const policies = [
	{
		title: 'Privacy Policy',
		description: 'Learn how we collect, use, and protect your personal information.',
		href: resolve('/legal/privacy'),
		iconComponent: User,
		lastUpdated: 'January 15, 2025',
	},
	{
		title: 'Terms of Service',
		description: 'Our legal agreement governing the use of our services and platform.',
		href: resolve('/legal/terms'),
		iconComponent: Check,
		lastUpdated: 'January 15, 2025',
	},
	{
		title: 'Cookie Policy',
		description: 'Understand how we use cookies and similar tracking technologies.',
		href: resolve('/legal/cookies'),
		iconComponent: BarChart3,
		lastUpdated: 'January 15, 2025',
	},
	{
		title: 'Marketing',
		description: 'Manage your marketing communication preferences and subscriptions.',
		href: resolve('/legal/marketing'),
		iconComponent: Mail,
		lastUpdated: 'January 15, 2025',
	},
];

const importantInfo = [
	{
		title: 'Your Rights',
		description: 'Access, correct, delete your data, opt out of marketing, and request data portability.',
		href: resolve('/legal/privacy') + '#your-rights',
		linkText: 'View your privacy rights',
		iconComponent: Shield,
	},
	{
		title: 'Data Protection',
		description: 'Industry-standard security including encryption, access controls, and regular audits.',
		href: resolve('/legal/privacy'),
		linkText: 'Learn more in our Privacy Policy',
		iconComponent: Lock,
	},
	{
		title: 'Third-Party Services',
		description: 'We use trusted partners like Stripe for payments and Telnyx for SMS.',
		href: resolve('/legal/privacy') + '#third-party',
		linkText: 'View third-party details',
		iconComponent: Users,
	},
	{
		title: 'Billing & Refunds',
		description: 'Subscription billing, cancellation policies, and refund information.',
		href: resolve('/legal/terms') + '#subscriptions',
		linkText: 'View payment terms',
		iconComponent: CreditCard,
	},
	{
		title: 'Data Retention',
		description: 'How long we keep your data and what happens when you close your account.',
		href: resolve('/legal/privacy') + '#data-retention',
		linkText: 'View retention periods',
		iconComponent: Clock,
	},
	{
		title: 'Cookie Control',
		description: 'Manage cookies and tracking technologies through your browser settings.',
		href: resolve('/legal/cookies') + '#control-cookies',
		linkText: 'Learn how to control cookies',
		iconComponent: Cookie,
	},
	{
		title: "Children's Privacy",
		description: 'Our services are for users 18 and older. We do not collect data from minors.',
		href: resolve('/legal/privacy') + '#children',
		linkText: 'View age requirements',
		iconComponent: Baby,
	},
	{
		title: 'Policy Updates',
		description: "We'll notify you of material changes via email or platform notifications.",
		href: resolve('/legal/marketing') + '#opt-out',
		linkText: 'Manage notifications',
		iconComponent: Bell,
	},
];
</script>

<svelte:head>
	<title>Legal Policies | Polumeyv</title>
	<meta name="description" content="Polumeyv LLC legal policies directory - Privacy Policy, Terms of Service, Cookie Policy, and Marketing Preferences." />
</svelte:head>

<div class="w-full pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20">
	<div class="flex basis-full items-center justify-between gap-2 mb-8 md:mb-12 lg:mb-16">
		<Item.Title class="text-3xl! md:text-4xl! lg:text-5xl!">Legal & Policies</Item.Title>
		<Item.Description class="text-base! lg:text-lg!">
			Your trust is important to us. We're committed to being transparent about our practices and protecting your rights.
		</Item.Description>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
		{#each policies as policy}
			{const Icon = policy.iconComponent}
			<a href={policy.href}>
				<Item.Root class="h-full">
					<Item.Media variant="icon"><Icon /></Item.Media>
					<Item.Content>
						<Item.Title>{policy.title}</Item.Title>
						<Item.Description>{policy.description}</Item.Description>
						<span class="text-xs text-foreground-subtle">Last updated: {policy.lastUpdated}</span>
					</Item.Content>
				</Item.Root>
			</a>
		{/each}
	</div>

	<div class="flex basis-full items-center justify-between gap-2 mb-6 md:mb-8 lg:mb-10">
		<Item.Title class="text-2xl! md:text-3xl!">Important Information</Item.Title>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
		{#each importantInfo as info}
			{const Icon = info.iconComponent}
			<Item.Root>
				<Item.Media variant="icon"><Icon /></Item.Media>
				<Item.Content>
					<Item.Title>{info.title}</Item.Title>
					<Item.Description>{info.description}</Item.Description>
					<Button variant="link" href={info.href} class="p-0! h-auto!">{info.linkText} →</Button>
				</Item.Content>
			</Item.Root>
		{/each}
	</div>

	<div class="flex flex-col items-center gap-3 py-4">
		<p class="text-foreground-muted">Have questions about our policies?</p>
		<Button href={resolve('/contact')}>Contact Us Directly</Button>
	</div>
</div>
