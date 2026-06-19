<script lang="ts">
	import { untrack } from 'svelte';

	let {
		class: className = '',
		quantity = 100,
		staticity = 50,
		ease = 50,
		size = 0.4,
		color = '#ffffff',
		vx = 0,
		vy = 0,
	}: {
		class?: string;
		quantity?: number;
		staticity?: number;
		ease?: number;
		size?: number;
		color?: string;
		vx?: number;
		vy?: number;
	} = $props();

	let canvas: HTMLCanvasElement | undefined;
	let container: HTMLDivElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let circles: Circle[] = [];
	let mouse = { x: 0, y: 0 };
	let w = 0,
		h = 0;
	let canvasRect: DOMRect | null = null;
	let rafId = 0;
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
	};

	const rgb = $derived(
		color
			.replace('#', '')
			.match(/.{2}/g)
			?.map((x) => parseInt(x, 16)) ?? [255, 255, 255],
	);

	function createCircle(): Circle {
		return {
			x: Math.random() * w,
			y: Math.random() * h,
			translateX: 0,
			translateY: 0,
			size: Math.random() * 2 + size,
			alpha: 0,
			targetAlpha: Math.random() * 0.6 + 0.1,
			dx: (Math.random() - 0.5) * 0.1,
			dy: (Math.random() - 0.5) * 0.1,
			magnetism: 0.1 + Math.random() * 4,
		};
	}

	function resize() {
		if (!container || !canvas || !ctx) return;
		circles = [];
		canvasRect = null;
		w = container.offsetWidth;
		h = container.offsetHeight;
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		ctx.scale(dpr, dpr);
		for (let i = 0; i < quantity; i++) circles.push(createCircle());
	}

	function animate() {
		if (!ctx) return;
		ctx.clearRect(0, 0, w, h);
		// per-circle alpha goes through globalAlpha so no rgba() string is built per circle per frame
		ctx.fillStyle = `rgb(${rgb.join(',')})`;

		for (let i = circles.length - 1; i >= 0; i--) {
			const c = circles[i]!;
			const edge = Math.min(
				c.x + c.translateX - c.size,
				w - c.x - c.translateX - c.size,
				c.y + c.translateY - c.size,
				h - c.y - c.translateY - c.size,
			);
			const edgeFade = Math.max(0, Math.min(1, edge / 20));

			c.alpha = edgeFade > 1 ? Math.min(c.alpha + 0.02, c.targetAlpha) : c.targetAlpha * edgeFade;

			c.x += c.dx + vx;
			c.y += c.dy + vy;
			c.translateX += (mouse.x / (staticity / c.magnetism) - c.translateX) / ease;
			c.translateY += (mouse.y / (staticity / c.magnetism) - c.translateY) / ease;

			ctx.globalAlpha = c.alpha;
			ctx.beginPath();
			ctx.arc(c.x + c.translateX, c.y + c.translateY, c.size, 0, Math.PI * 2);
			ctx.fill();

			if (c.x < -c.size || c.x > w + c.size || c.y < -c.size || c.y > h + c.size) {
				circles[i] = createCircle();
			}
		}
		ctx.globalAlpha = 1;
		rafId = requestAnimationFrame(animate);
	}

	function onMouseMove(e: MouseEvent) {
		if (!canvas) return;
		// cached rect, invalidated on scroll/resize — avoids forcing layout on every mousemove
		canvasRect ??= canvas.getBoundingClientRect();
		mouse.x = e.clientX - canvasRect.left - w / 2;
		mouse.y = e.clientY - canvasRect.top - h / 2;
	}

	function setup(node: HTMLCanvasElement) {
		canvas = node;
		ctx = node.getContext('2d');
		// untrack: resize() reads `quantity`/`size`, but prop changes must not re-run
		// the attachment (mount-once, matching the previous onMount behavior)
		untrack(resize);
		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}
</script>

<svelte:window onresize={resize} onscrollcapture={() => (canvasRect = null)} onmousemove={onMouseMove} />

<div class={className} bind:this={container} aria-hidden="true">
	<canvas {@attach setup} class="size-full"></canvas>
</div>
