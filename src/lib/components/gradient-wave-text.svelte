<script lang="ts">
	import type { Snippet } from 'svelte';

	type Align = 'left' | 'center' | 'right';

	const START_GI = -25;
	const RANGE = 200;
	const FRAME_MS = 16.6667;

	const defaultColors = ['#8d6869', '#5a8ea6', '#c9a96e', '#c7c571', '#cb706f', '#7e5e5f'];

	const justifyByAlign = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	} satisfies Record<Align, string>;

	let {
		children,
		align = 'center',
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

	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) return;

				if (entry.isIntersecting) {
					inView = true;
					if (once) observer.disconnect();
					return;
				}

				if (!once) inView = false;
			},
			{ threshold: 0.1 },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}

	const colors = $derived(customColors?.length ? customColors : defaultColors);
	const isInView = $derived(triggerOnView ? inView : true);
	const justifyContent = $derived(justifyByAlign[align]);

	const stops = $derived.by(() => {
		const parts: string[] = [];
		const base = 'var(--gradient-wave-base, rgb(209, 209, 200))';
		const maxBands = Math.min(bandCount, colors.length * 2);

		parts.push(`${base} calc((var(--gi) + 0) * 1%)`);

		for (let i = 0; i < maxBands; i += 1) {
			const color = colors[i % colors.length];
			const offset = (i + 2) * bandGap;

			parts.push(`${color} calc((var(--gi) + ${offset}) * 1%)`);
		}

		parts.push(`${base} calc((var(--gi) + ${(bandCount + 2) * bandGap}) * 1%)`);

		return parts.join(', ');
	});

	const gradient = $derived(radial ? `radial-gradient(circle at 50% bottom, ${stops})` : `linear-gradient(20deg, ${stops})`);

	const rootStyle = $derived([`justify-content: ${justifyContent}`, `--gi: ${START_GI}`, style].filter(Boolean).join('; '));

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

	function wave(delaySeconds: number) {
		return (node: HTMLElement) => {
			let gi = START_GI;
			let cyclesDone = 0;
			let started = false;
			let rafId = 0;

			const now = performance.now();
			const startAt = now + Math.max(0, delaySeconds * 1000);
			let last = now;

			const setGi = (value: number) => {
				gi = value;
				node.style.setProperty('--gi', String(value));
			};

			const tick = (now: number) => {
				if (!started) {
					if (now < startAt) {
						rafId = requestAnimationFrame(tick);
						return;
					}

					started = true;
					last = now;
				}

				const delta = Math.min(64, now - last);
				last = now;

				if (!paused) {
					const cycles = repeat ? 0 : 1;
					let next = gi + (delta * speed) / FRAME_MS;

					if (cycles === 0) {
						setGi(next >= RANGE ? next % RANGE : next);
					} else {
						while (next >= RANGE && cyclesDone < cycles) {
							next -= RANGE;
							cyclesDone += 1;
						}

						if (cyclesDone >= cycles) {
							setGi(RANGE);
							return;
						}

						setGi(next);
					}
				}

				rafId = requestAnimationFrame(tick);
			};

			setGi(START_GI);
			rafId = requestAnimationFrame(tick);

			return () => cancelAnimationFrame(rafId);
		};
	}
</script>

<div
	class="flex h-full w-full items-center [--gradient-wave-base:rgb(29,29,31)] dark:[--gradient-wave-base:rgb(255,255,255)]"
	style={rootStyle}
	aria-label={ariaLabel}
	role={role ?? (ariaLabel ? 'img' : undefined)}
	{...props}
	{@attach triggerOnView && observe}
	{@attach isInView && wave(delay)}>
	<span style={textStyle}>
		{@render children?.()}
	</span>
</div>
