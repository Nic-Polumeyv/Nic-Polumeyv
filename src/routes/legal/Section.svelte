<script lang="ts">
	import * as Item from 'sheer-ui/components/item';
	import { Separator } from 'sheer-ui/components/separator';
	import { Button } from 'sheer-ui/components/button';
	import type { Component } from 'svelte';

	/** One icon row within a section — a labelled paragraph with an optional trailing link. */
	type SectionRow = {
		title: string;
		description: string;
		icon: Component<{ class?: string }>;
		link?: { href: string; text: string };
	};

	let {
		item,
		id,
	}: {
		item: {
			title: string;
			items: SectionRow[];
		};
		id?: string;
	} = $props();
</script>

<Item.Root {id}>
	<div class="flex basis-full items-center justify-between gap-2">
		<Item.Title>{item.title}</Item.Title>
	</div>
	<Separator class="my-0" />
	<Item.Group>
		{#each item.items as row, i (row.title)}
			{const Icon = row.icon}
			<div class="flex gap-4 py-4">
				<Item.Media variant="icon"><Icon /></Item.Media>
				<Item.Content>
					<Item.Title>{row.title}</Item.Title>
					<Item.Description>
						{row.description}
						{#if row.link}
							<Button variant="link" href={row.link.href}>{row.link.text}</Button>
						{/if}
					</Item.Description>
				</Item.Content>
			</div>
			{#if i < item.items.length - 1}
				<Separator class="my-0" />
			{/if}
		{/each}
	</Item.Group>
</Item.Root>
