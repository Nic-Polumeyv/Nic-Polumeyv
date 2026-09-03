<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Item from 'sheer-ui/components/item';

	let { title, id, children }: { title: string; id?: string; children: Snippet } = $props();
</script>

<Item.Root {id}>
	<div class="flex basis-full items-center justify-between gap-2">
		<Item.Title>{title}</Item.Title>
		<Item.Description>{@render children()}</Item.Description>
	</div>
</Item.Root>
