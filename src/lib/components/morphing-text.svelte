<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cn } from '@polumeyv/ui/utils';

	let {
		texts,
		class: className,
		initialDelay = 0.5,
		morphDuration = 1.5,
		start = true,
		onComplete,
	}: {
		texts: string[];
		class?: string;
		/** Seconds before morphing begins (only used if start is true on mount) */
		initialDelay?: number;
		/** How long the morph transition takes (seconds) */
		morphDuration?: number;
		/** Set to false to hold on the first text until flipped to true */
		start?: boolean;
		/** Called when the morph sequence finishes on the last text */
		onComplete?: () => void;
	} = $props();

	const cooldownTime = 0.5;

	// Per-frame animation values are plain locals — only `morphing` drives the template,
	// everything else is written via direct DOM access in the rAF loop.
	let textIndex = 0;
	let morph = 0;
	let cooldown = 0;
	let lastTime = 0;
	let done = false;
	let morphing = $state(false);
	let running = false;

	let text1Ref: HTMLSpanElement | null = $state(null);
	let text2Ref: HTMLSpanElement | null = $state(null);

	let animationFrameId: number | null = null;

	const setStyles = (fraction: number) => {
		if (!text1Ref || !text2Ref) return;

		text2Ref.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		text2Ref.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

		const invertedFraction = 1 - fraction;
		text1Ref.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
		text1Ref.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

		const t1 = texts[textIndex % texts.length]!;
		const t2 = texts[(textIndex + 1) % texts.length]!;
		if (text1Ref.textContent !== t1) text1Ref.textContent = t1;
		if (text2Ref.textContent !== t2) text2Ref.textContent = t2;
	};

	const doMorph = () => {
		morph -= cooldown;
		cooldown = 0;
		morphing = true;

		let fraction = morph / morphDuration;

		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}

		setStyles(fraction);

		if (fraction === 1) {
			morphing = false;
			textIndex++;
			if (textIndex >= texts.length - 1) {
				done = true;
				if (animationFrameId !== null) {
					cancelAnimationFrame(animationFrameId);
					animationFrameId = null;
				}
				onComplete?.();
			}
		}
	};

	const doCooldown = () => {
		morph = 0;
		if (text1Ref && text2Ref) {
			text2Ref.style.filter = 'none';
			text2Ref.style.opacity = '100%';
			text1Ref.style.filter = 'none';
			text1Ref.style.opacity = '0%';
		}
	};

	function showInitial() {
		if (!text1Ref || !text2Ref) return;
		text1Ref.textContent = texts[0]!;
		text1Ref.style.opacity = '0%';
		text1Ref.style.filter = 'none';
		text2Ref.textContent = texts[0]!;
		text2Ref.style.opacity = '100%';
		text2Ref.style.filter = 'none';
	}

	const animate = (now: number) => {
		if (done) return;
		animationFrameId = requestAnimationFrame(animate);

		const dt = (now - lastTime) / 1000;
		lastTime = now;

		cooldown -= dt;

		if (cooldown <= 0) {
			doMorph();
		} else {
			doCooldown();
		}
	};

	function beginMorph() {
		if (running || done) return;
		running = true;
		cooldown = initialDelay;
		lastTime = performance.now();
		animate(lastTime);
	}

	$effect(() => {
		if (text1Ref && text2Ref) {
			showInitial();
			if (start) beginMorph();
		}
	});

	$effect(() => {
		if (start && !running && text1Ref && text2Ref) {
			beginMorph();
		}
	});

	onDestroy(() => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<div
	class={cn(
		'relative leading-none font-bold transition-[filter] duration-200',
		morphing ? 'filter-[url(#threshold)_blur(0.4px)]' : '',
		'text-4xl md:text-6xl lg:text-7xl',
		className,
	)}>
	<!-- Invisible sizer: takes up space for the widest text -->
	{#each texts as t (t)}
		<span class="block invisible h-0 whitespace-nowrap" aria-hidden="true">{t}</span>
	{/each}
	<!-- This one sets the actual height -->
	<span class="block invisible whitespace-nowrap" aria-hidden="true">{texts[0]}</span>
	<span bind:this={text1Ref} class="absolute inset-x-0 top-0 inline-block whitespace-nowrap"></span>
	<span bind:this={text2Ref} class="absolute inset-x-0 top-0 inline-block whitespace-nowrap"></span>

	<svg id="filters" class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
		<defs>
			<filter id="threshold">
				<feColorMatrix
					in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 80 -35" />
			</filter>
		</defs>
	</svg>
</div>
