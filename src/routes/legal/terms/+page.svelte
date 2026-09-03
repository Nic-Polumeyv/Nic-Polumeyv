<script lang="ts">
	import { Button } from 'sheer-ui/components/button';
	import Key from '@lucide/svelte/icons/key';
	import UserCheck from '@lucide/svelte/icons/user-check';
	import ShieldX from '@lucide/svelte/icons/shield-x';
	import Settings from '@lucide/svelte/icons/settings';
	import FileText from '@lucide/svelte/icons/file-text';
	import FileCheck from '@lucide/svelte/icons/file-check';
	import CheckCircle from '@lucide/svelte/icons/check-circle';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import Gift from '@lucide/svelte/icons/gift';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import Shield from '@lucide/svelte/icons/shield';
	import Award from '@lucide/svelte/icons/award';
	import Copyright from '@lucide/svelte/icons/copyright';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
	import XCircle from '@lucide/svelte/icons/x-circle';
	import Scale from '@lucide/svelte/icons/scale';
	import CircleDollarSign from '@lucide/svelte/icons/circle-dollar-sign';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Handshake from '@lucide/svelte/icons/handshake';
	import Users from '@lucide/svelte/icons/users';
	import Scissors from '@lucide/svelte/icons/scissors';
	import Hand from '@lucide/svelte/icons/hand';
	import ArrowRightLeft from '@lucide/svelte/icons/arrow-right-left';
	import CloudLightning from '@lucide/svelte/icons/cloud-lightning';
	import Clock from '@lucide/svelte/icons/clock';
	import Code from '@lucide/svelte/icons/code';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import Database from '@lucide/svelte/icons/database';
	import LegalHeader from '../LegalHeader.svelte';
	import Prose from '../Prose.svelte';
	import Section from '../Section.svelte';

	let { data } = $props();
</script>

<LegalHeader
	title="Terms of Service"
	meta="Polumeyv LLC Terms of Service - Legal agreement governing the use of our services and platform."
	date={data.policyDate} />

<div class="space-y-6">
	<Prose title="Acceptance of Terms"
		>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and
		regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</Prose>

	<Prose title="Eligibility & Account Registration"
		>To use certain features, you may need to register for an account. You must be at least 18 years old, provide accurate information, keep
		your account up-to-date, and maintain the confidentiality of your credentials. You are responsible for all activities under your
		account.</Prose>

	<Section
		item={{
			title: 'Use of Services',
			items: [
				{
					title: 'License Grant',
					description:
						'Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use our services for your internal business purposes.',
					icon: Key,
				},
				{
					title: 'Account Responsibilities',
					description:
						'You are responsible for all activity that occurs under your account, maintaining the security of your account, and promptly notifying us of any unauthorized use.',
					icon: UserCheck,
				},
				{
					title: 'Prohibited Activities',
					description:
						'You agree not to use the services for illegal purposes, violate laws or third-party rights, transmit harmful code, attempt unauthorized access, harass others, send spam, misrepresent your identity, or interfere with the services.',
					icon: ShieldX,
				},
				{
					title: 'Service Modifications',
					description:
						'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice.',
					icon: Settings,
				},
			],
		}} />

	<Section
		item={{
			title: 'User Content and Licensing',
			items: [
				{
					title: 'Content Ownership',
					description:
						'You retain all rights to the content you upload, submit, or display through our services. You are solely responsible for your content and the consequences of posting it.',
					icon: FileText,
				},
				{
					title: 'License to Polumeyv',
					description:
						'By uploading content, you grant Polumeyv LLC a worldwide, non-exclusive, royalty-free license to use, reproduce, process, adapt, and display your content solely for providing and improving our services.',
					icon: FileCheck,
				},
				{
					title: 'Content Standards',
					description:
						'You represent that your content does not infringe any third-party rights and complies with all applicable laws. We reserve the right to remove any content that violates these Terms.',
					icon: CheckCircle,
				},
			],
		}} />

	<Section
		item={{
			title: 'Subscriptions & Payments',
			items: [
				{
					title: 'Billing Terms',
					description:
						'By providing a payment method, you authorize us to charge you for selected services, including any applicable setup fees and recurring subscription fees. All fees exclude applicable taxes. Specific pricing is disclosed at the point of purchase.',
					icon: CreditCard,
				},
				{
					title: 'Free Trial',
					description:
						'We may offer free trials. At the end of the trial period, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends.',
					icon: Gift,
				},
				{
					title: 'Auto-Renewal',
					description:
						'Subscriptions automatically renew at the end of each billing period unless you cancel. We will notify you of any price changes at least 30 days before they take effect.',
					icon: RefreshCw,
				},
				{
					title: 'Cancellation & Refunds',
					description:
						'Cancel anytime through account settings. Setup fees are non-refundable after 7 days. Monthly subscriptions have no partial-month refunds. Annual subscriptions offer pro-rated refunds within 30 days.',
					icon: ReceiptText,
				},
			],
		}}
		id="subscriptions" />

	<Section
		item={{
			title: 'Intellectual Property',
			items: [
				{
					title: 'Polumeyv Property',
					description:
						'The Polumeyv platform and all associated products, including software, designs, text, images, and other content, are owned by Polumeyv LLC and protected by intellectual property laws. You may not copy, modify, or reverse engineer any part of our services.',
					icon: Shield,
				},
				{
					title: 'Trademarks',
					description:
						'Polumeyv and our product names and logos are trademarks of Polumeyv LLC. You may not use our trademarks without our prior written permission.',
					icon: Award,
				},
				{
					title: 'DMCA Compliance',
					description:
						'We respect intellectual property rights and will respond to valid DMCA takedown notices. If you believe your copyright has been infringed, please contact us.',
					icon: Copyright,
				},
				{
					title: 'Feedback',
					description:
						'Any feedback, suggestions, or ideas you provide about our services become the property of Polumeyv LLC, and we may use them without compensation or attribution.',
					icon: MessageSquare,
				},
			],
		}} />

	<Prose title="Third-Party Services"
		>Our services integrate with third-party services such as Stripe for payments and Telnyx for SMS. Your use of these services is subject
		to their respective terms. We are not responsible for third-party availability, accuracy, or content.</Prose>

	<Section
		item={{
			title: 'Disclaimers and Limitations',
			items: [
				{
					title: 'AS IS Services',
					description:
						'THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.',
					icon: AlertTriangle,
				},
				{
					title: 'No Warranties',
					description:
						'We do not warrant that the services will be uninterrupted, error-free, or completely secure. You use the services at your own risk.',
					icon: XCircle,
				},
				{
					title: 'Limitation of Liability',
					description:
						'TO THE MAXIMUM EXTENT PERMITTED BY LAW, POLUMEYV LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.',
					icon: Scale,
				},
				{
					title: 'Liability Cap',
					description:
						'IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE GREATER OF $100 OR THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.',
					icon: CircleDollarSign,
				},
			],
		}}
		id="disclaimers" />

	<Prose title="Indemnification"
		>You agree to defend, indemnify, and hold harmless Polumeyv LLC and its affiliates from any claims, liabilities, damages, losses, and
		expenses arising from your use of the services, violation of these Terms, or infringement of any third-party rights.</Prose>

	<Prose title="Termination" id="termination"
		>Either party may terminate these Terms at any time. We may suspend or terminate your access immediately for any reason, including
		breach of these Terms. Upon termination, your right to use the services will cease. Provisions that should survive termination will
		remain in effect.</Prose>

	<Section
		item={{
			title: 'Governing Law and Disputes',
			items: [
				{
					title: 'Governing Law',
					description:
						'These Terms shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.',
					icon: BookOpen,
				},
				{
					title: 'Venue',
					description:
						'Any legal action or proceeding shall be brought exclusively in the federal or state courts located in Athens-Clarke County, Georgia.',
					icon: MapPin,
				},
				{
					title: 'Arbitration',
					description:
						'Any dispute shall be finally resolved by binding arbitration in accordance with the JAMS Streamlined Arbitration Rules and Procedures.',
					icon: Handshake,
				},
				{
					title: 'Class Action Waiver',
					description:
						'You agree that any disputes shall be brought in your individual capacity only and not as a plaintiff or class member in any purported class or representative proceeding.',
					icon: Users,
				},
			],
		}} />

	<Section
		item={{
			title: 'General Provisions',
			items: [
				{
					title: 'Entire Agreement',
					description:
						'These Terms constitute the entire agreement between you and Polumeyv LLC regarding the use of our services and supersede all prior agreements.',
					icon: FileText,
				},
				{
					title: 'Severability',
					description:
						'If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.',
					icon: Scissors,
				},
				{
					title: 'No Waiver',
					description: 'Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights.',
					icon: Hand,
				},
				{
					title: 'Assignment',
					description:
						'You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.',
					icon: ArrowRightLeft,
				},
				{
					title: 'Force Majeure',
					description:
						'Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including acts of God, natural disasters, war, terrorism, or pandemic.',
					icon: CloudLightning,
				},
			],
		}} />

	<Section
		item={{
			title: 'Service-Specific Terms',
			items: [
				{
					title: 'Free Trial Terms',
					description:
						'Free trials are limited to one per client and may be revoked at any time. Features may be limited during the trial period.',
					icon: Clock,
				},
				{
					title: 'API Usage',
					description:
						'If we provide API access, you agree to use it in accordance with our documentation and rate limits. Excessive use may result in throttling or suspension.',
					icon: Code,
				},
				{
					title: 'Support Terms',
					description:
						'Support levels vary by subscription tier. Premium support is available for higher-tier plans. Response times are estimates and not guaranteed.',
					icon: LifeBuoy,
				},
				{
					title: 'Data Processing',
					description:
						'By using our services to process client data, you represent that you have obtained all necessary consents and comply with applicable privacy laws.',
					icon: Database,
				},
			],
		}} />

	<Prose title="Contact"
		>If you have any questions about these Terms of Service, please contact us at <Button variant="link" href="mailto:help@polumeyv.com"
			>help@polumeyv.com</Button
		>.</Prose>
</div>
