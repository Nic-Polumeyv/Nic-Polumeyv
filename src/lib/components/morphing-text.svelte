<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';

	const COOLDOWN = 0.5;
	const MAX_BLUR = 100;

	let {
		texts,
		children,
		initialDelay = 0.5,
		morphDuration = 1.5,
		start = true,
		onComplete,
		class: className = '',
	}: {
		texts: string[];
		children?: Snippet;
		class?: string;
		/** Seconds before morphing begins. */
		initialDelay?: number;
		/** How long the morph transition takes, in seconds. */
		morphDuration?: number;
		/** Set to false to hold on the first text until flipped to true. */
		start?: boolean;
		/** Called when the morph sequence finishes on the last text. */
		onComplete?: () => void;
	} = $props();

	const filterId = $props.id();

	let textIndex = 0;
	let morph = 0;
	let cooldown = 0;
	let lastTime = 0;
	let done = false;
	let running = false;
	let morphing = $state(false);

	let text1Ref: HTMLSpanElement | null = $state(null);
	let text2Ref: HTMLSpanElement | null = $state(null);

	let animationFrameId: number | null = null;

	const morphFilter = $derived(morphing ? `url(#${filterId}) blur(0.4px)` : undefined);

	function setStyles(fraction: number) {
		if (!text1Ref || !text2Ref) return;

		const inverted = 1 - fraction;

		text2Ref.style.filter = `blur(${Math.min(8 / fraction - 8, MAX_BLUR)}px)`;
		text2Ref.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

		text1Ref.style.filter = `blur(${Math.min(8 / inverted - 8, MAX_BLUR)}px)`;
		text1Ref.style.opacity = `${Math.pow(inverted, 0.4) * 100}%`;

		const current = texts[textIndex % texts.length]!;
		const next = texts[(textIndex + 1) % texts.length]!;

		if (text1Ref.textContent !== current) text1Ref.textContent = current;
		if (text2Ref.textContent !== next) text2Ref.textContent = next;
	}

	function doMorph() {
		morph -= cooldown;
		cooldown = 0;
		morphing = true;

		let fraction = morph / morphDuration;

		if (fraction > 1) {
			cooldown = COOLDOWN;
			fraction = 1;
		}

		setStyles(fraction);

		if (fraction !== 1) return;

		morphing = false;
		textIndex += 1;

		if (textIndex < texts.length - 1) return;

		done = true;

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		onComplete?.();
	}

	function doCooldown() {
		morph = 0;

		if (!text1Ref || !text2Ref) return;

		text2Ref.style.filter = 'none';
		text2Ref.style.opacity = '100%';
		text1Ref.style.filter = 'none';
		text1Ref.style.opacity = '0%';
	}

	function showInitial() {
		if (!text1Ref || !text2Ref) return;

		const text = texts[0]!;

		text1Ref.textContent = text;
		text1Ref.style.opacity = '0%';
		text1Ref.style.filter = 'none';

		text2Ref.textContent = text;
		text2Ref.style.opacity = '100%';
		text2Ref.style.filter = 'none';
	}

	function animate(now: number) {
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
	}

	function beginMorph() {
		if (running || done) return;

		running = true;
		cooldown = initialDelay;
		lastTime = performance.now();
		animationFrameId = requestAnimationFrame(animate);
	}

	$effect(() => {
		if (!text1Ref || !text2Ref) return;

		showInitial();

		if (start) beginMorph();
	});

	onDestroy(() => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<div class="relative leading-none font-black transition-[filter] duration-200 text-4xl md:text-6xl lg:text-7xl {className}" style:filter={morphFilter}>
	{#each texts as text}
		<span class="block invisible h-0 whitespace-nowrap" aria-hidden="true">{text}</span>
	{/each}

	<span class="block invisible whitespace-nowrap" aria-hidden="true">{texts[0]}</span>

	<span bind:this={text1Ref} class="absolute inset-x-0 top-0 inline-block whitespace-nowrap"></span>
	<span bind:this={text2Ref} class="absolute inset-x-0 top-0 inline-block whitespace-nowrap"></span>

	<svg class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
		<defs>
			<filter id={filterId}>
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
