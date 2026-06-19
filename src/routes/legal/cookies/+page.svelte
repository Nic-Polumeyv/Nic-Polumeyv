<script lang="ts">
	import { Button } from '@polumeyv/ui/components/button';
	import Shield from '@lucide/svelte/icons/shield';
	import BarChart2 from '@lucide/svelte/icons/bar-chart-2';
	import Settings from '@lucide/svelte/icons/settings';
	import Target from '@lucide/svelte/icons/target';
	import LegalHeader from '../LegalHeader.svelte';
	import Prose from '../Prose.svelte';
	import Section from '../Section.svelte';

	let { data } = $props();

</script>

<LegalHeader title="Cookie Policy" meta="Polumeyv LLC Cookie Policy - Learn how we use cookies and similar technologies on our website." date={data.policyDate} />

<div class="space-y-6">
	<Prose title="What Are Cookies?">
		Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to
		provide information to the website owners.
	</Prose>

	<Section
		item={{
			title: 'Types of Cookies We Use',
			items: [
				{
					title: 'Essential Cookies',
					description:
						'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.',
					icon: Shield,
				},
				{
					title: 'Performance & Analytics',
					description:
						'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.',
					icon: BarChart2,
				},
				{
					title: 'Functional Cookies',
					description:
						'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.',
					icon: Settings,
				},
				{
					title: 'Advertising & Targeting',
					description:
						'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.',
					icon: Target,
				},
			],
		}} />

	<Prose title="How to Control Cookies" id="control-cookies">
		Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and
		how to manage and delete them, visit <Button variant="link" href="https://www.allaboutcookies.org">www.allaboutcookies.org</Button>.
	</Prose>

	<Prose title="Contact Us">
		If you have any questions about our Cookie Policy, please contact us at <Button variant="link" href="mailto:help@polumeyv.com">help@polumeyv.com</Button>.
	</Prose>
</div>
