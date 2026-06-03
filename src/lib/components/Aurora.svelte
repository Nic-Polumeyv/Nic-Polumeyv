<script lang="ts">
	import { cn } from '@polumeyv/ui/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		showRadialGradient?: boolean;
		children?: Snippet;
	}

	let { class: className = '', showRadialGradient = true, children, ...restProps }: Props = $props();
</script>

<div class={cn('relative flex flex-col h-[90vh] z-50 items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg', className)} {...restProps}>
	<div class="absolute inset-0 overflow-hidden z-10">
		<div
			class={cn(
				`
    [--white-gradient:repeating-linear-gradient(100deg,var(--color-white)_0%,var(--color-white)_7%,transparent_10%,transparent_12%,var(--color-white)_16%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--color-black)_0%,var(--color-black)_7%,transparent_10%,transparent_12%,var(--color-black)_16%)]
    [--aurora-light:repeating-linear-gradient(100deg,var(--color-orange-400)_10%,var(--color-amber-300)_15%,var(--color-yellow-300)_20%,var(--color-orange-300)_25%,var(--color-amber-400)_30%)]
    [--aurora-dark:repeating-linear-gradient(100deg,var(--color-blue-500)_10%,var(--color-indigo-300)_15%,var(--color-blue-300)_20%,var(--color-violet-200)_25%,var(--color-blue-400)_30%)]
    [background-image:var(--white-gradient),var(--aurora-light)]
    dark:[background-image:var(--dark-gradient),var(--aurora-dark)]
    bg-size-[300%,200%]
    bg-position-[50%_50%,50%_50%]
    filter blur-[10px] invert dark:invert-0
    after:content-[""] after:absolute after:inset-0
    after:[background-image:var(--white-gradient),var(--aurora-light)]
    after:dark:[background-image:var(--dark-gradient),var(--aurora-dark)]
    after:bg-size-[200%,100%]
    after:animate-aurora after:bg-fixed after:mix-blend-difference
    pointer-events-none
    absolute -inset-2.5 opacity-70 will-change-transform`,
				showRadialGradient && `mask-[radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
			)}>
		</div>
	</div>
	<div class="z-50 text-center">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
