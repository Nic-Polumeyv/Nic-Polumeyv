<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { prefersReducedMotion } from 'svelte/motion';

	const COOLDOWN = 0.5;
	const MAX_BLUR = 100;

	type Props = {
		texts: string[];
		/** Seconds before morphing begins. */
		initialDelay?: number;
		/** How long the morph transition takes, in seconds. */
		morphDuration?: number;
		/** Set to false to hold on the first text until flipped to true. */
		start?: boolean;
		/** Called when the morph sequence finishes on the last text. */
		onComplete?: () => void;
	};

	type MorphConfig = {
		texts: string[];
		initialDelay: number;
		morphDuration: number;
		start: boolean;
	};

	let { texts, initialDelay = 0.5, morphDuration = 1.5, start = true, onComplete }: Props = $props();

	const filterId = $props.id();

	const accessibleText = $derived(texts[texts.length - 1] ?? texts[0] ?? '');

	function opacityFor(fraction: number) {
		return Math.pow(fraction, 0.4) * 100;
	}

	function blurFor(fraction: number) {
		return Math.min(8 / fraction - 8, MAX_BLUR);
	}

	function writeSpan(span: HTMLSpanElement, text: string, opacity: number, blur: number) {
		if (span.textContent !== text) span.textContent = text;

		span.style.opacity = `${opacity}%`;
		span.style.filter = blur <= 0 ? 'none' : `blur(${blur}px)`;
	}

	function morphText(getConfig: () => MorphConfig, getOnComplete: () => Props['onComplete']): Attachment<HTMLDivElement> {
		return (root) => {
			const text1 = root.querySelector<HTMLSpanElement>('[data-morph-from]');
			const text2 = root.querySelector<HTMLSpanElement>('[data-morph-to]');

			if (!text1 || !text2) return;

			function setRootMorphing(value: boolean) {
				root.style.filter = value ? `url(#${filterId}) blur(0.4px)` : '';
			}

			function showInitial(list: string[]) {
				const text = list[0] ?? '';

				setRootMorphing(false);
				writeSpan(text1!, text, 0, 0);
				writeSpan(text2!, text, 100, 0);
			}

			function showFinal(list: string[]) {
				const text = list[list.length - 1] ?? list[0] ?? '';

				setRootMorphing(false);
				writeSpan(text1!, text, 0, 0);
				writeSpan(text2!, text, 100, 0);
			}

			$effect(() => {
				const config = getConfig();

				// Snapshot the sequence synchronously so this effect tracks array content
				// and the running RAF sees a stable list for this run.
				const list = [...config.texts];

				const delay = Number.isFinite(config.initialDelay) ? Math.max(0, config.initialDelay) : 0.5;

				const duration = Number.isFinite(config.morphDuration) ? Math.max(0.001, config.morphDuration) : 1.5;

				let disposed = false;
				let done = false;
				let frame: number | null = null;

				let textIndex = 0;
				let morph = 0;
				let cooldown = delay;
				let lastTime = performance.now();

				function cleanup() {
					disposed = true;

					if (frame !== null) {
						cancelAnimationFrame(frame);
						frame = null;
					}

					setRootMorphing(false);
				}

				function finish() {
					if (disposed || done) return;

					done = true;
					frame = null;
					setRootMorphing(false);
					getOnComplete()?.();
				}

				function finishSoon() {
					queueMicrotask(() => {
						if (disposed || done) return;

						done = true;
						getOnComplete()?.();
					});
				}

				function setStyles(fraction: number) {
					const inverted = 1 - fraction;
					const current = list[textIndex] ?? '';
					const next = list[(textIndex + 1) % list.length] ?? '';

					writeSpan(text2!, next, opacityFor(fraction), blurFor(fraction));
					writeSpan(text1!, current, opacityFor(inverted), blurFor(inverted));
				}

				function doMorph() {
					morph -= cooldown;
					cooldown = 0;

					setRootMorphing(true);

					let fraction = morph / duration;

					if (fraction > 1) {
						cooldown = COOLDOWN;
						fraction = 1;
					}

					setStyles(fraction);

					if (fraction !== 1) return;

					setRootMorphing(false);
					textIndex += 1;

					if (textIndex < list.length - 1) return;

					finish();
				}

				function doCooldown() {
					morph = 0;
					setRootMorphing(false);

					text2!.style.filter = 'none';
					text2!.style.opacity = '100%';
					text1!.style.filter = 'none';
					text1!.style.opacity = '0%';
				}

				function animate(now: number) {
					if (disposed || done) return;

					const dt = (now - lastTime) / 1000;
					lastTime = now;
					cooldown -= dt;

					if (cooldown <= 0) {
						doMorph();
					} else {
						doCooldown();
					}

					if (!disposed && !done) {
						frame = requestAnimationFrame(animate);
					}
				}

				showInitial(list);

				if (!config.start) return cleanup;

				// No useful morph to run. Also respect reduced-motion users.
				if (list.length < 2 || prefersReducedMotion.current) {
					showFinal(list);
					finishSoon();
					return cleanup;
				}

				frame = requestAnimationFrame(animate);

				return cleanup;
			});
		};
	}
</script>

<div
	{@attach morphText(
		() => ({ texts, initialDelay, morphDuration, start }),
		() => onComplete,
	)}
	class="relative leading-none font-black transition-[filter] duration-200 text-4xl md:text-6xl lg:text-7xl">
	<span class="sr-only">{accessibleText}</span>

	{#each texts as text}
		<span class="block invisible h-0 whitespace-nowrap" aria-hidden="true">{text}</span>
	{/each}

	<span class="block invisible whitespace-nowrap" aria-hidden="true">{texts[0] ?? ''}</span>

	<span data-morph-from class="absolute inset-x-0 top-0 inline-block whitespace-nowrap" aria-hidden="true"></span>

	<span data-morph-to class="absolute inset-x-0 top-0 inline-block whitespace-nowrap" aria-hidden="true"></span>

	<svg class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
