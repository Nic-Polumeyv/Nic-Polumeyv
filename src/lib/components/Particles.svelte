<script lang="ts">
	import { untrack } from 'svelte';

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

	const TAU = Math.PI * 2;

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
	let container: HTMLDivElement | undefined;
	let ctx: CanvasRenderingContext2D | null = null;
	let circles: Circle[] = [];
	let mouse = { x: 0, y: 0 };
	let w = 0;
	let h = 0;
	let canvasRect: DOMRect | null = null;
	let rafId = 0;

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

		const dpr = window.devicePixelRatio || 1;

		w = container.offsetWidth;
		h = container.offsetHeight;
		canvasRect = null;

		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		circles = [];
		for (let i = 0; i < quantity; i += 1) {
			circles.push(createCircle());
		}
	}

	function animate() {
		if (!ctx) return;

		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'rgb(255,255,255)';

		const mouseX = mouse.x / staticity;
		const mouseY = mouse.y / staticity;

		for (let i = circles.length - 1; i >= 0; i -= 1) {
			const c = circles[i]!;

			const x = c.x + c.translateX;
			const y = c.y + c.translateY;

			const edge = Math.min(x - c.size, w - x - c.size, y - c.size, h - y - c.size);
			const edgeFade = Math.max(0, Math.min(1, edge / 20));

			c.alpha = c.targetAlpha * edgeFade;
			c.x += c.dx + vx;
			c.y += c.dy + vy;
			c.translateX += (mouseX * c.magnetism - c.translateX) / ease;
			c.translateY += (mouseY * c.magnetism - c.translateY) / ease;

			ctx.globalAlpha = c.alpha;
			ctx.beginPath();
			ctx.arc(x, y, c.size, 0, TAU);
			ctx.fill();

			if (c.x < -c.size || c.x > w + c.size || c.y < -c.size || c.y > h + c.size) {
				circles[i] = createCircle();
			}
		}

		ctx.globalAlpha = 1;
		rafId = requestAnimationFrame(animate);
	}
</script>

<svelte:window
	onresize={resize}
	onscrollcapture={() => (canvasRect = null)}
	onmousemove={(e) => {
		if (!canvas) return;

		canvasRect ??= canvas.getBoundingClientRect();
		mouse.x = e.clientX - canvasRect.left - w / 2;
		mouse.y = e.clientY - canvasRect.top - h / 2;
	}} />

<div class={className} bind:this={container} aria-hidden="true">
	<canvas
		{@attach (n) => {
			canvas = n;
			ctx = n.getContext('2d');

			untrack(resize);

			rafId = requestAnimationFrame(animate);

			return () => {
				cancelAnimationFrame(rafId);
				ctx = null;
				canvas = undefined;
			};
		}}
		class="size-full"></canvas>
</div>
