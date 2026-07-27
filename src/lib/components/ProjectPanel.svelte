<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut, cubicIn, backOut } from 'svelte/easing';
	import { Badge } from '@polumeyv/ui/components/badge';
	import { Button } from '@polumeyv/ui/components/button';
	import XIcon from '@lucide/svelte/icons/x';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { isMobile } from '@polumeyv/ui/hooks';
	import { getTheme } from '@polumeyv/ui/components/theme-toggle';

	type Project = {
		title: string;
		tagline: string;
		description: string;
		url: string;
		imgLight: string;
		imgDark: string;
		tech: string[];
	};

	const theme = getTheme();
	let isDarkMode = $derived(theme.current !== 'light');

	let {
		project,
		open = $bindable(false),
		onclose,
	}: {
		project: Project | null;
		open: boolean;
		onclose?: () => void;
	} = $props();

	// Custom transition: panel slides in with optional rotateY on desktop
	function panelSlide(
		node: HTMLElement,
		{ duration = 500, easing = cubicOut, mobile = false }: { duration?: number; easing?: (t: number) => number; mobile?: boolean },
	) {
		return {
			duration,
			easing,
			css: (t: number) =>
				mobile ? `transform: translateY(${(1 - t) * 100}%)` : `transform: translateX(${(1 - t) * 100}%) rotateY(${(1 - t) * 12}deg)`,
		};
	}

	// Custom transition: image reveal via clip-path
	function clipReveal(
		node: HTMLElement,
		{ duration = 600, delay = 0, easing = cubicOut }: { duration?: number; delay?: number; easing?: (t: number) => number },
	) {
		return {
			duration,
			delay,
			easing,
			css: (t: number) => `clip-path: inset(0 ${(1 - t) * 100}% 0 0); transform: scale(${1 + (1 - t) * 0.1})`,
		};
	}

	// Custom transition: spin + scale for close button
	function spinScale(
		node: HTMLElement,
		{ duration = 600, delay = 0, easing = backOut }: { duration?: number; delay?: number; easing?: (t: number) => number },
	) {
		return {
			duration,
			delay,
			easing,
			css: (t: number) => `opacity: ${t}; transform: rotate(${(1 - t) * -180}deg) scale(${t})`,
		};
	}

	function close() {
		open = false;
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && project}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50"
		role="dialog"
		aria-modal="true"
		aria-label={project.title}
		onoutroend={() => {
			document.body.style.overflow = '';
		}}>
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			transition:fade={{ duration: 350 }}
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={close}
			onkeydown={(e) => e.key === 'Enter' && close()}>
		</div>

		<!-- Panel -->
		<div
			in:panelSlide={{ duration: isMobile.current ? 500 : 600, mobile: isMobile.current, easing: cubicOut }}
			out:panelSlide={{ duration: isMobile.current ? 350 : 400, mobile: isMobile.current, easing: cubicIn }}
			class="absolute bg-background/95 backdrop-blur-xl border-border overflow-y-auto
				max-md:bottom-0 max-md:inset-x-0 max-md:h-[95vh] max-md:rounded-t-3xl max-md:border-t
				md:top-0 md:right-0 md:bottom-0 md:w-[62vw] md:max-w-4xl md:border-l md:origin-[right_center] md:perspective-midrange">
			<!-- Close button -->
			<button
				in:spinScale={{ duration: 600, delay: 200, easing: backOut }}
				out:fade={{ duration: 150 }}
				onclick={close}
				class="absolute top-4 right-4 z-10 size-10 rounded-full bg-muted/80 backdrop-blur grid place-items-center hover:bg-muted transition-colors"
				aria-label="Close panel">
				<XIcon class="size-5" />
			</button>

			<!-- Content -->
			<div class="p-6 md:p-10 pt-16 md:pt-10">
				<!-- Image -->
				<div
					in:clipReveal={{ duration: 600, delay: 100, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="w-full aspect-video rounded-xl overflow-hidden bg-muted mb-8">
					<img
						src={isDarkMode ? project.imgDark : project.imgLight}
						alt={project.title}
						class="w-full h-full object-cover object-top"
						onerror={(e) => {
							const target = e.currentTarget as HTMLImageElement;
							target.style.display = 'none';
						}} />
				</div>

				<!-- Number -->
				<p
					in:fly={{ y: 30, duration: 300, delay: 150, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="text-muted-foreground text-sm font-mono mb-2">
					{project.title === 'Polumeyv' ? '01' : project.title === 'Cresends' ? '02' : '03'}
				</p>

				<!-- Title -->
				<h2
					in:fly={{ y: 30, duration: 300, delay: 200, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="text-3xl md:text-5xl font-black mb-2">
					{project.title}
				</h2>

				<!-- Tagline -->
				<p
					in:fly={{ y: 30, duration: 300, delay: 250, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="text-muted-foreground text-lg md:text-xl mb-6">
					{project.tagline}
				</p>

				<!-- Description -->
				<p
					in:fly={{ y: 30, duration: 300, delay: 300, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="text-foreground/80 leading-relaxed mb-8 max-w-prose">
					{project.description}
				</p>

				<!-- Tech badges -->
				<div in:fly={{ y: 20, duration: 400, delay: 350, easing: backOut }} out:fade={{ duration: 150 }} class="flex flex-wrap gap-2 mb-8">
					{#each project.tech as t (t)}
						<Badge variant="outline">{t}</Badge>
					{/each}
				</div>

				<!-- CTA -->
				<div in:fly={{ y: 20, duration: 300, delay: 400, easing: cubicOut }} out:fade={{ duration: 150 }}>
					<Button href={project.url} target="_blank" rel="noopener" class="gap-2!">
						Visit Site <ExternalLinkIcon class="size-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
