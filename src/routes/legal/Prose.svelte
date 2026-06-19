<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Item from '@polumeyv/ui/components/item';

	let { title, id, children }: { title: string; id?: string; children: Snippet } = $props();
</script>

<Item.Root {id}>
	<div class="flex basis-full items-center justify-between gap-2">
		<div class="flex w-fit items-center gap-2 text-sm leading-snug font-medium">{title}</div>
		<Item.Description>{@render children()}</Item.Description>
	</div>
</Item.Root>
