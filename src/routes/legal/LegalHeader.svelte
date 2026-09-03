<script lang="ts">
	import * as Item from 'sheer-ui/components/item';

	let { title, meta, date }: { title: string; meta: string; date: string } = $props();
</script>

<svelte:head>
	<title>{title} | Polumeyv</title>
	<meta name="description" content={meta} />
</svelte:head>

<div class="flex basis-full items-center justify-between gap-2 mb-8">
	<Item.Title class="text-2xl! md:text-3xl! text-primary">{title}</Item.Title>
	<Item.Description>Effective Date: {date}</Item.Description>
</div>
