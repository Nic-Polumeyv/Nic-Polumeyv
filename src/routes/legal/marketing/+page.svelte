<script lang="ts">
	import * as Item from '@polumeyv/ui/components/item';
	import { Separator } from '@polumeyv/ui/components/separator';
	import { Button } from '@polumeyv/ui/components/button';
	import { resolve } from '$app/paths';
	import Mail from '@lucide/svelte/icons/mail';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Bell from '@lucide/svelte/icons/bell';
	import X from '@lucide/svelte/icons/x';
	import LegalHeader from '../LegalHeader.svelte';
	import Prose from '../Prose.svelte';
	import Section from '../Section.svelte';

	let { data } = $props();

</script>

<LegalHeader title="Marketing Preferences" meta="Manage your marketing communication preferences and subscriptions with Polumeyv LLC." date={data.policyDate} />

<div class="space-y-6">
	<Prose title="Your Communication Choices">
		We believe in giving you control over how we communicate with you. You can opt in or out of different types of marketing communications at any time.
	</Prose>

	<Section
		item={{
			title: 'Types of Communications',
			items: [
				{
					title: 'Email Marketing',
					description: 'Promotional emails about new features, special offers, tips, and industry news. We typically send 1-2 emails per month.',
					icon: Mail,
				},
				{
					title: 'SMS Notifications',
					description:
						'Text message updates for appointment reminders, confirmations, and time-sensitive alerts on products that support SMS. Standard message rates may apply.',
					icon: MessageSquare,
				},
				{
					title: 'Product Updates',
					description: 'Announcements about new features, improvements, and changes to our platform that may affect your workflow.',
					icon: Bell,
				},
			],
		}} />

	<Item.Root id="opt-out">
		<div class="flex basis-full items-center justify-between gap-2">
			<Item.Title>How to Opt Out</Item.Title>
		</div>
		<Separator class="my-0" />
		<Item.Group>
			<div class="flex gap-4 py-4">
				<Item.Media variant="icon"><Mail /></Item.Media>
				<Item.Content>
					<Item.Title>Email</Item.Title>
					<Item.Description>Click the "Unsubscribe" link at the bottom of any marketing email, or update your preferences in your account settings.</Item.Description>
				</Item.Content>
			</div>
			<Separator class="my-0" />
			<div class="flex gap-4 py-4">
				<Item.Media variant="icon"><MessageSquare /></Item.Media>
				<Item.Content>
					<Item.Title>SMS</Item.Title>
					<Item.Description
						>Reply <strong>STOP</strong> to any marketing text message to stop receiving further marketing texts. Specific opt-out instructions for each product are listed
						in that product's SMS terms.</Item.Description>
				</Item.Content>
			</div>
			<Separator class="my-0" />
			<div class="flex gap-4 py-4">
				<Item.Media variant="icon"><X /></Item.Media>
				<Item.Content>
					<Item.Title>All Marketing</Item.Title>
					<Item.Description
						>Contact us at <Button variant="link" href="mailto:help@polumeyv.com">help@polumeyv.com</Button> to opt out of all marketing communications at once.</Item.Description>
				</Item.Content>
			</div>
		</Item.Group>
	</Item.Root>

	<Prose title="What You'll Still Receive">
		Even if you opt out of marketing communications, we'll still send you essential transactional messages such as account verification codes, appointment confirmations,
		billing notifications, and important service updates. These are necessary for the operation of your account.
	</Prose>

	<Prose title="Data Usage">
		Your contact information will never be sold or shared with third parties for their marketing purposes. For full details on how we handle your data, see our <Button
			variant="link"
			href={resolve('/legal/privacy')}>Privacy Policy</Button
		>.
	</Prose>

	<Prose title="Questions?">
		If you have questions about your marketing preferences or need help managing your communications, contact us at <Button variant="link" href="mailto:help@polumeyv.com"
			>help@polumeyv.com</Button
		>.
	</Prose>
</div>
