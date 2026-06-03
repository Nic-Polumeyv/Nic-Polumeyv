<script lang="ts">
	import * as Item from '@polumeyv/ui/item';
	import { Button } from '@polumeyv/ui/button';
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
	<Item.Header>
		<Item.Title>{item.title}</Item.Title>
	</Item.Header>
	<Item.Separator />
	<Item.Group>
		{#each item.items as row, i (row.title)}
			{@const Icon = row.icon}
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
				<Item.Separator />
			{/if}
		{/each}
	</Item.Group>
</Item.Root>
