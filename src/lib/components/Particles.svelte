<script lang="ts">
	import { onMount } from 'svelte';

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

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let circles: Circle[] = [];
	let mouse = { x: 0, y: 0 };
	let w = 0,
		h = 0;
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

	const rgb = color
		.replace('#', '')
		.match(/.{2}/g)
		?.map((x) => parseInt(x, 16)) ?? [255, 255, 255];

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

		for (let i = circles.length - 1; i >= 0; i--) {
			const c = circles[i]!;
			const edge = Math.min(c.x + c.translateX - c.size, w - c.x - c.translateX - c.size, c.y + c.translateY - c.size, h - c.y - c.translateY - c.size);
			const edgeFade = Math.max(0, Math.min(1, edge / 20));

			c.alpha = edgeFade > 1 ? Math.min(c.alpha + 0.02, c.targetAlpha) : c.targetAlpha * edgeFade;

			c.x += c.dx + vx;
			c.y += c.dy + vy;
			c.translateX += (mouse.x / (staticity / c.magnetism) - c.translateX) / ease;
			c.translateY += (mouse.y / (staticity / c.magnetism) - c.translateY) / ease;

			ctx.beginPath();
			ctx.arc(c.x + c.translateX, c.y + c.translateY, c.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${rgb.join(',')},${c.alpha})`;
			ctx.fill();

			if (c.x < -c.size || c.x > w + c.size || c.y < -c.size || c.y > h + c.size) {
				circles[i] = createCircle();
			}
		}
		requestAnimationFrame(animate);
	}

	function onMouseMove(e: MouseEvent) {
		const rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left - w / 2;
		mouse.y = e.clientY - rect.top - h / 2;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		resize();
		animate();
		window.addEventListener('resize', resize);
		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', onMouseMove);
		};
	});
</script>

<div class={className} bind:this={container} aria-hidden="true">
	<canvas bind:this={canvas} class="size-full"></canvas>
</div>
