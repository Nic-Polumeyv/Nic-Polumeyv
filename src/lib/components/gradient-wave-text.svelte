<script lang="ts">
	import { cn } from '@polumeyv/ui/utils';
	import type { Snippet } from 'svelte';

	type Align = 'left' | 'center' | 'right';

	const defaultColors = ['#8d6869', '#5a8ea6', '#c9a96e', '#c7c571', '#cb706f', '#7e5e5f'];

	let {
		children,
		align = 'center',
		class: className,
		speed = 1,
		paused = false,
		delay = 0,
		repeat = false,
		triggerOnView = false,
		once = true,
		radial = true,
		bottomOffset = 20,
		bandGap = 4,
		bandCount = 8,
		customColors,
		ariaLabel,
		style,
		role,
		...props
	}: {
		children?: Snippet;
		align?: Align;
		class?: string;
		speed?: number;
		paused?: boolean;
		delay?: number;
		repeat?: boolean;
		triggerOnView?: boolean;
		once?: boolean;
		radial?: boolean;
		bottomOffset?: number;
		bandGap?: number;
		bandCount?: number;
		customColors?: string[];
		ariaLabel?: string;
		style?: string;
		role?: string;
	} = $props();

	let inView = $state(false);

	// Native IntersectionObserver (replaces motion-sv's useInView): enter sets true and, with
	// `once`, stops observing; leave resets only when `once` is false.
	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry!.isIntersecting) {
					inView = true;
					if (once) observer.disconnect();
				} else if (!once) {
					inView = false;
				}
			},
			{ threshold: 0.1 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}

	const cycles = $derived(repeat ? 0 : 1);
	const resolvedColors = $derived(customColors?.length ? customColors : defaultColors);
	const isInView = $derived(triggerOnView ? inView : true);
	const justifyContent = $derived(align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center');

	const stops = $derived.by(() => {
		const parts: string[] = [];
		const baseColor = 'var(--gradient-wave-base, rgb(209,290,200))';

		parts.push(`${baseColor} calc((var(--gi) + 0) * 1%)`);

		for (let index = 0; index < bandCount && index < resolvedColors.length * 2; index += 1) {
			const color = resolvedColors[index % resolvedColors.length];
			const offset = (index + 2) * bandGap;
			parts.push(`${color} calc((var(--gi) + ${offset}) * 1%)`);
		}

		const endOffset = (bandCount + 2) * bandGap;
		parts.push(`${baseColor} calc((var(--gi) + ${endOffset}) * 1%)`);

		return parts.join(', ');
	});

	const gradient = $derived(radial ? `radial-gradient(circle at 50% bottom, ${stops})` : `linear-gradient(20deg, ${stops})`);

	const rootStyle = $derived([`justify-content: ${justifyContent}`, '--gi: -25', style].filter(Boolean).join('; '));

	const textStyle = $derived(
		[
			`text-align: ${align}`,
			`background-image: ${gradient}`,
			'-webkit-background-clip: text',
			'background-clip: text',
			'-webkit-text-fill-color: transparent',
			'color: transparent',
			'white-space: pre-wrap',
			'word-break: break-word',
			'display: inline-block',
			'-webkit-font-smoothing: antialiased',
			'-moz-osx-font-smoothing: grayscale',
			'-webkit-backface-visibility: hidden',
			'backface-visibility: hidden',
			'transform: translateZ(0)',
			`padding-bottom: ${bottomOffset}%`,
			`margin-bottom: -${bottomOffset}%`,
			'padding-inline: 2px',
		].join('; '),
	);

	// Attachment owns the whole wave lifecycle: re-attached when `isInView` flips
	// (via the conditional in the template) or `delay` changes; cleanup cancels the loop.
	function wave() {
		return (node: HTMLElement) => {
			const range = 200;
			let gi = -25;
			let cyclesDone = 0;
			let started = false;
			let rafId = 0;
			const startAt = performance.now() + Math.max(0, delay * 1000);
			let last = performance.now();

			const setGi = (value: number) => {
				gi = value;
				node.style.setProperty('--gi', String(value));
			};

			setGi(-25);

			const tick = (now: number) => {
				if (!started) {
					if (now >= startAt) {
						started = true;
						last = now;
					} else {
						rafId = requestAnimationFrame(tick);
						return;
					}
				}

				const delta = Math.min(64, now - last);
				last = now;

				if (!paused) {
					const increment = (delta * speed) / 16.6667;
					let next = gi + increment;

					if (cycles === 0) {
						if (next >= range) {
							next %= range;
						}

						setGi(next);
					} else {
						while (next >= range && cyclesDone < cycles) {
							next -= range;
							cyclesDone += 1;
						}

						if (cyclesDone >= cycles) {
							setGi(range);
							return;
						}

						setGi(next);
					}
				}

				rafId = requestAnimationFrame(tick);
			};

			rafId = requestAnimationFrame(tick);

			return () => cancelAnimationFrame(rafId);
		};
	}
</script>

<div
	class={cn('flex h-full w-full items-center [--gradient-wave-base:rgb(29,29,31)] dark:[--gradient-wave-base:rgb(255,255,255)]', className)}
	style={rootStyle}
	aria-label={ariaLabel}
	role={role ?? (ariaLabel ? 'img' : undefined)}
	{...props}
	{@attach triggerOnView && observe}
	{@attach isInView && wave()}>
	<span style={textStyle}>
		{@render children?.()}
	</span>
</div>
