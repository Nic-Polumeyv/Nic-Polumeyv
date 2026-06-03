<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Item from '@polumeyv/ui/item';

	let { title, id, children }: { title: string; id?: string; children: Snippet } = $props();
</script>

<Item.Root {id}>
	<Item.Header>
		<Item.Title>{title}</Item.Title>
		<Item.Description>{@render children()}</Item.Description>
	</Item.Header>
</Item.Root>
