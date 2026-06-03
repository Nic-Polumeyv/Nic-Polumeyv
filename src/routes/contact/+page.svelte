<script lang="ts">
	import * as Card from '@polumeyv/ui/card';
	import { Button } from '@polumeyv/ui/button';
	import Mail from '@lucide/svelte/icons/mail';
	import Phone from '@lucide/svelte/icons/phone';
</script>

<svelte:head>
	<title>Contact - Polumeyv</title>
	<meta name="description" content="Get in touch with Polumeyv. We build custom scheduling, client management, and workflow automation for service businesses." />
</svelte:head>

<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 sm:px-6 pt-12 sm:pt-0">
	<div class="mx-auto w-full max-w-6xl text-center">
		<h1 class="mb-4 sm:mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
			Let's Build Something Together
		</h1>
		<p class="mx-auto mb-12 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
			Whether you need a custom scheduling system, client management platform, or full workflow automation — we'd love to hear from you.
		</p>

		<div class="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
			<Card.Root>
				<Card.Header class="items-center text-center">
					<div class="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
						<Mail class="size-6 text-primary" />
					</div>
					<Card.Title>Email</Card.Title>
					<Card.Description>Drop us a line anytime</Card.Description>
				</Card.Header>
				<Card.Footer class="justify-center">
					<Button href="mailto:nic@polumeyv.com" variant="outline">nic@polumeyv.com</Button>
				</Card.Footer>
			</Card.Root>

			<Card.Root>
				<Card.Header class="items-center text-center">
					<div class="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
						<Phone class="size-6 text-primary" />
					</div>
					<Card.Title>Phone</Card.Title>
					<Card.Description>Mon - Fri, 9am - 6pm EST</Card.Description>
				</Card.Header>
				<Card.Footer class="justify-center">
					<Button href="tel:7625249497" variant="outline">(762) 524-9497</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
</section>
