<script lang="ts">
import { Button } from '@polumeyv/ui/components/button';
import ArrowLeft from '@lucide/svelte/icons/arrow-left';
import { page } from '$app/state';
import { resolve } from '$app/paths';
let { children } = $props();
</script>

{#if !(page.url.pathname === '/legal' || page.url.pathname === '/legal/')}
	<div class="w-full pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20">
		<Button variant="ghost" href={resolve('/legal')} class="mb-6 lg:mb-8 inline-flex items-center gap-1!">
			<ArrowLeft />
			Back to Legal
		</Button>
		<article class="p-4 md:p-8 lg:p-10 xl:p-12">
			{@render children()}
		</article>
	</div>
{:else}
	{@render children()}
{/if}
