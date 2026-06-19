<script lang="ts">
	import * as Item from '@polumeyv/ui/components/item';
	import { Button } from '@polumeyv/ui/components/button';
	import { resolve } from '$app/paths';
	import User from '@lucide/svelte/icons/user';
	import Database from '@lucide/svelte/icons/database';
	import Activity from '@lucide/svelte/icons/activity';
	import Cookie from '@lucide/svelte/icons/cookie';
	import Building from '@lucide/svelte/icons/building';
	import ArrowRightLeft from '@lucide/svelte/icons/arrow-right-left';
	import Scale from '@lucide/svelte/icons/scale';
	import HandHeart from '@lucide/svelte/icons/hand-heart';
	import Layers from '@lucide/svelte/icons/layers';
	import Download from '@lucide/svelte/icons/download';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import MailX from '@lucide/svelte/icons/mail-x';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Globe from '@lucide/svelte/icons/globe';
	import LegalHeader from '../LegalHeader.svelte';
	import Prose from '../Prose.svelte';
	import Section from '../Section.svelte';

	let { data } = $props();
</script>

<LegalHeader title="Privacy Policy" meta="Polumeyv LLC Privacy Policy - Learn how we collect, use, and protect your personal information." date={data.policyDate} />

<div class="space-y-6">
	<Prose title="Introduction & Scope"
		>Polumeyv LLC (we, our, or us) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
		when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your personal data.</Prose>

	<Section
		item={{
			title: 'Information We Collect',
			items: [
				{
					title: 'Account Information',
					description:
						'When you create an account, we collect your name, email address, phone number, and other information necessary to set up and maintain your account.',
					icon: User,
				},
				{
					title: 'Product Data',
					description:
						'Information you provide or generate while using our products, including any content, configurations, transactions, and records associated with your use of the services.',
					icon: Database,
				},
				{
					title: 'Usage Data',
					description:
						'Automatically collected information when you visit our website, including IP address, browser type, operating system, device information, and pages visited.',
					icon: Activity,
				},
				{
					title: 'Cookies & Tracking',
					description: 'We use cookies and similar technologies to collect and store information about your interactions with our website.',
					icon: Cookie,
					link: { href: resolve('/legal/cookies'), text: 'See our Cookie Policy' },
				},
			],
		}} />

	<Item.Root>
		<div class="flex basis-full items-center justify-between gap-2">
			<div class="flex w-fit items-center gap-2 text-sm leading-snug font-medium">How We Use Your Information</div>
		</div>
		<Item.Content>
			<ul class="list-disc list-inside space-y-1 text-sm">
				<li>To provide and maintain our services</li>
				<li>Process transactions and send related information</li>
				<li>Send administrative information (updates, security alerts)</li>
				<li>Respond to client service requests</li>
				<li>Send marketing communications (with consent)</li>
				<li>Monitor and analyze usage and trends</li>
				<li>Personalize user experience</li>
				<li>Protect against fraudulent or illegal activity</li>
			</ul>
		</Item.Content>
	</Item.Root>

	<Section
		item={{
			title: 'Information Sharing and Disclosure',
			items: [
				{
					title: 'Service Providers',
					description:
						'We share information with trusted third-party providers who assist in operating our platform, including Stripe for payments and Telnyx for SMS. These providers are contractually obligated to protect your information.',
					icon: Building,
				},
				{
					title: 'Business Transfers',
					description:
						'In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change in ownership.',
					icon: ArrowRightLeft,
				},
				{
					title: 'Legal Requirements',
					description:
						'We may disclose information if required by law or in response to valid requests by public authorities, including for national security or law enforcement.',
					icon: Scale,
				},
				{
					title: 'With Your Consent',
					description: 'We may share your information for any other purpose disclosed to you and with your consent.',
					icon: HandHeart,
				},
				{
					title: 'Aggregated Information',
					description: 'We may share aggregated or de-identified information that cannot reasonably be used to identify you.',
					icon: Layers,
				},
			],
		}} />

	<Item.Root>
		<div class="flex basis-full items-center justify-between gap-2">
			<div class="flex w-fit items-center gap-2 text-sm leading-snug font-medium">Data Security</div>
			<Item.Description>We implement appropriate technical and organizational measures to protect your personal information, including:</Item.Description>
		</div>
		<Item.Content>
			<ul class="list-disc list-inside space-y-1 text-sm mb-4">
				<li>Encryption of sensitive data in transit and at rest</li>
				<li>Regular security assessments and audits</li>
				<li>Access controls and authentication mechanisms</li>
				<li>Incident response procedures</li>
			</ul>
			<p class="text-sm">
				However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
				protect your personal information, we cannot guarantee its absolute security.
			</p>
		</Item.Content>
	</Item.Root>

	<Section
		item={{
			title: 'Your Rights and Choices',
			items: [
				{
					title: 'Access and Portability',
					description: 'Request access to your personal information and receive a copy in a structured, commonly used format.',
					icon: Download,
				},
				{
					title: 'Correction and Updating',
					description: 'Update or correct your personal information through your account settings or by contacting us.',
					icon: Pencil,
				},
				{
					title: 'Deletion',
					description: 'Request deletion of your personal information, subject to certain exceptions such as legal compliance.',
					icon: Trash2,
				},
				{
					title: 'Marketing Opt-Out',
					description: 'Opt out of marketing communications by following unsubscribe instructions or contacting us.',
					icon: MailX,
				},
				{
					title: 'Do Not Track',
					description: 'Our website does not currently respond to Do Not Track signals. You can control cookies through your browser settings.',
					icon: EyeOff,
				},
				{
					title: 'California Privacy Rights',
					description:
						'California residents have additional rights under the CCPA, including the right to know what personal information is collected, used, shared, or sold.',
					icon: ShieldCheck,
				},
				{
					title: 'EU Data Subject Rights',
					description: 'EU residents have additional rights under GDPR, including the right to object to processing and lodge a complaint with a supervisory authority.',
					icon: Globe,
				},
			],
		}}
		id="your-rights" />

	<Item.Root id="data-retention">
		<div class="flex basis-full items-center justify-between gap-2">
			<div class="flex w-fit items-center gap-2 text-sm leading-snug font-medium">Data Retention</div>
			<Item.Description>We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including:</Item.Description>
		</div>
		<Item.Content>
			<ul class="list-disc list-inside space-y-1 text-sm">
				<li>Active accounts: Retained while your account remains active</li>
				<li>After account termination: Up to 90 days for recovery purposes</li>
				<li>Transactional records: 7 years for tax and legal compliance</li>
				<li>Marketing data: Until you opt out or request deletion</li>
				<li>Aggregated data: May be retained indefinitely</li>
			</ul>
		</Item.Content>
	</Item.Root>

	<Prose title="Third-Party Services" id="third-party"
		>Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third
		parties. We encourage you to review their privacy policies before providing any personal information. Our platform integrates with various business tools and
		services. When you connect these services, you may be sharing information according to their privacy policies as well as ours.</Prose>

	<Prose title="International Data Transfers"
		>Your information may be transferred to and processed in the United States or other countries where we or our service providers operate. These countries may have data
		protection laws that are different from the laws of your country. By using our services, you consent to the transfer of your information to these countries. We take
		appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy.</Prose>

	<Prose title="Children's Privacy" id="children"
		>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we
		have collected personal information from a child under 18, we will take steps to delete such information. If you believe we have collected information from a child
		under 18, please contact us immediately.</Prose>

	<Prose title="Product-Specific Policies"
		>Individual Polumeyv products may have additional privacy terms that apply to specific features (for example, SMS communications on appointment-booking products).
		Refer to the legal pages of each product for those details.</Prose>

	<Prose title="Updates to Privacy Policy"
		>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any
		material changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any changes.</Prose>

	<Item.Root>
		<div class="flex basis-full items-center justify-between gap-2">
			<div class="flex w-fit items-center gap-2 text-sm leading-snug font-medium">Contact Us</div>
			<Item.Description>If you have any questions or concerns about our Privacy Policy or our data practices, please contact us at:</Item.Description>
		</div>
		<Item.Content>
			<div class="text-sm space-y-1">
				<Button variant="link" href="mailto:help@polumeyv.com" class="p-0! h-auto!">help@polumeyv.com</Button>
				<p>Polumeyv LLC</p>
				<p>Athens-Clarke County, Georgia</p>
			</div>
		</Item.Content>
	</Item.Root>
</div>
