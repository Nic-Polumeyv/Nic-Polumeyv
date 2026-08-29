<script lang="ts">
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';

	const CONFIG = {
		walker: {
			scale: 0.7,
			strokeWidth: 2,
		},
		body: {
			headRadius: 12,
			torsoLength: 16,
			upperLeg: 14,
			lowerLeg: 14,
			upperArm: 12,
			lowerArm: 10,
		},
		walk: {
			cycleTime: 0.5,
			bounce: 1,
			lean: -5,
			stride: 25,
			kneeBend: 45,
			armSwing: 45,
			armSync: 10,
			elbowBend: 19,
			forearmFollow: 100,
		},
		footprints: {
			enabled: true,
			interval: 10,
			minDistance: 16,
			size: 10,
			opacity: 0.2,
			fadeTime: 1500,
		},
		initDelay: 100,
	};

	let {
		duration = 12,
		showFootprints = CONFIG.footprints.enabled,
		children,
	}: {
		duration?: number;
		showFootprints?: boolean;
		children?: Snippet;
	} = $props();

	// DOM refs
	let containerRef!: HTMLElement;
	let contentRef!: HTMLElement;
	let walkerRef!: HTMLElement;
	let footMarkerRef!: HTMLElement;
	let figureGroupRef!: SVGGElement;
	let headRef!: SVGCircleElement;
	let torsoRef!: SVGLineElement;
	// Limbs: each is upper segment + lower segment, [back, front] z-order
	let backLegUpperRef!: SVGLineElement;
	let backLegLowerRef!: SVGLineElement;
	let frontLegUpperRef!: SVGLineElement;
	let frontLegLowerRef!: SVGLineElement;
	let backArmUpperRef!: SVGLineElement;
	let backArmLowerRef!: SVGLineElement;
	let frontArmUpperRef!: SVGLineElement;
	let frontArmLowerRef!: SVGLineElement;

	// State that actually triggers reactivity (not animation values)
	let offsetPath = $state('');
	let walkerReady = $derived(offsetPath !== '');

	// Scaled dimensions (constants)
	const S = CONFIG.walker.scale;
	const headR = CONFIG.body.headRadius * S;
	const torsoLen = CONFIG.body.torsoLength * S;
	const upperLeg = CONFIG.body.upperLeg * S;
	const lowerLeg = CONFIG.body.lowerLeg * S;
	const upperArm = CONFIG.body.upperArm * S;
	const lowerArm = CONFIG.body.lowerArm * S;

	const figureWidth = 80 * S;
	const figureHeight = (CONFIG.body.headRadius * 2 + CONFIG.body.torsoLength + CONFIG.body.upperLeg + CONFIG.body.lowerLeg) * S + 8;
	const cx = figureWidth / 2;
	const groundY = figureHeight - 2;

	const DEG2RAD = Math.PI / 180;

	// Compute leg in one pass: returns positions and how far ankle is below hip
	function computeLeg(hipY: number, hipAngle: number, kneeAngle: number) {
		const hipRad = hipAngle * DEG2RAD;
		const sinHip = Math.sin(hipRad);
		const cosHip = Math.cos(hipRad);
		const kneeX = cx + sinHip * upperLeg;
		const kneeY = hipY + cosHip * upperLeg;
		const shinRad = (hipAngle - kneeAngle) * DEG2RAD;
		const ankleX = kneeX + Math.sin(shinRad) * lowerLeg;
		const ankleY = kneeY + Math.cos(shinRad) * lowerLeg;
		return { kneeX, kneeY, ankleX, ankleY, dropFromHip: ankleY - hipY };
	}

	function computeArm(shoulderY: number, angle: number) {
		const r = angle * DEG2RAD;
		const elbowX = cx + Math.sin(r) * upperArm;
		const elbowY = shoulderY + Math.cos(r) * upperArm;
		const forearmAngle = (CONFIG.walk.elbowBend + Math.max(0, angle * (CONFIG.walk.forearmFollow / 100))) * DEG2RAD;
		const handX = elbowX + Math.sin(forearmAngle) * lowerArm;
		const handY = elbowY + Math.cos(forearmAngle) * lowerArm;
		return { elbowX, elbowY, handX, handY };
	}

	// Inline DOM-write helper for line endpoints
	function setLine(el: SVGLineElement, x1: number, y1: number, x2: number, y2: number) {
		el.setAttribute('x1', String(x1));
		el.setAttribute('y1', String(y1));
		el.setAttribute('x2', String(x2));
		el.setAttribute('y2', String(y2));
	}

	// Animation state (plain locals, NOT $state — direct DOM writes per frame)
	let animationTime = 0;
	let lastTimestamp = 0;
	let animationFrameId: number;
	let lastFootprintTime = 0;
	let lastFootprintX = 0;
	let lastFootprintY = 0;

	function animate(timestamp: number) {
		if (!lastTimestamp) lastTimestamp = timestamp;
		const delta = (timestamp - lastTimestamp) / 1000;
		lastTimestamp = timestamp;
		animationTime += delta;

		// Rect reads happen before this frame's SVG attribute writes — reading after
		// them forces a synchronous layout against our own dirty state every frame.
		let footX = 0;
		let footY = 0;
		let footDue = false;
		if (showFootprints && timestamp - lastFootprintTime > CONFIG.footprints.interval && containerRef && walkerReady) {
			lastFootprintTime = timestamp;
			const fr = footMarkerRef.getBoundingClientRect();
			const cr = containerRef.getBoundingClientRect();
			footX = fr.left - cr.left;
			footY = fr.top - cr.top;
			footDue = true;
		}

		const p = CONFIG.walk;
		const t = ((animationTime / p.cycleTime) % 1) * Math.PI * 2;

		const leftHip = Math.sin(t) * p.stride;
		const rightHip = Math.sin(t + Math.PI) * p.stride;
		const leftKnee = Math.max(0, Math.cos(t + Math.PI / 4)) * p.kneeBend;
		const rightKnee = Math.max(0, Math.cos(t + Math.PI + Math.PI / 4)) * p.kneeBend;

		// Compute both legs at hipY=0, then shift figure up by lowest ankle drop
		const probeLeft = computeLeg(0, leftHip, leftKnee);
		const probeRight = computeLeg(0, rightHip, rightKnee);
		const maxDrop = Math.max(probeLeft.dropFromHip, probeRight.dropFromHip);
		const bouncePhase = Math.abs(Math.cos(t)) * p.bounce * 0.3 * S;
		const hipY = groundY - maxDrop - bouncePhase;

		const shoulderY = hipY - torsoLen;
		const headY = shoulderY - headR - 3 * S;

		// Recompute legs at the actual hipY (probe was at 0)
		const leftLeg = { ...probeLeft, kneeY: probeLeft.kneeY + hipY, ankleY: probeLeft.ankleY + hipY };
		const rightLeg = { ...probeRight, kneeY: probeRight.kneeY + hipY, ankleY: probeRight.ankleY + hipY };

		const syncOffset = ((p.armSync / 100) * Math.PI) / 2;
		const leftArmAngle = Math.sin(t + Math.PI + syncOffset) * p.armSwing;
		const rightArmAngle = Math.sin(t + syncOffset) * p.armSwing;
		const leftArm = computeArm(shoulderY, leftArmAngle);
		const rightArm = computeArm(shoulderY, rightArmAngle);

		// Z-order: lower hip-angle is "back" (behind body)
		const [backLeg, frontLeg] = leftHip > rightHip ? [rightLeg, leftLeg] : [leftLeg, rightLeg];
		const [backArm, frontArm] = leftArmAngle > rightArmAngle ? [rightArm, leftArm] : [leftArm, rightArm];

		// Direct DOM writes — bypass Svelte reactivity entirely
		figureGroupRef.setAttribute('transform', `rotate(${p.lean}, ${cx}, ${hipY})`);
		headRef.setAttribute('cx', String(cx));
		headRef.setAttribute('cy', String(headY));
		torsoRef.setAttribute('x1', String(cx));
		torsoRef.setAttribute('y1', String(shoulderY));
		torsoRef.setAttribute('x2', String(cx));
		torsoRef.setAttribute('y2', String(hipY));

		setLine(backLegUpperRef, cx, hipY, backLeg.kneeX, backLeg.kneeY);
		setLine(backLegLowerRef, backLeg.kneeX, backLeg.kneeY, backLeg.ankleX, backLeg.ankleY);
		setLine(frontLegUpperRef, cx, hipY, frontLeg.kneeX, frontLeg.kneeY);
		setLine(frontLegLowerRef, frontLeg.kneeX, frontLeg.kneeY, frontLeg.ankleX, frontLeg.ankleY);

		setLine(backArmUpperRef, cx, shoulderY, backArm.elbowX, backArm.elbowY);
		setLine(backArmLowerRef, backArm.elbowX, backArm.elbowY, backArm.handX, backArm.handY);
		setLine(frontArmUpperRef, cx, shoulderY, frontArm.elbowX, frontArm.elbowY);
		setLine(frontArmLowerRef, frontArm.elbowX, frontArm.elbowY, frontArm.handX, frontArm.handY);

		// Footprint placement: coordinates were read at the top of the frame
		if (footDue && Math.hypot(footX - lastFootprintX, footY - lastFootprintY) > CONFIG.footprints.minDistance) {
			placeFootprint(footX, footY);
			lastFootprintX = footX;
			lastFootprintY = footY;
		}

		animationFrameId = requestAnimationFrame(animate);
	}

	function placeFootprint(x: number, y: number) {
		const fp = document.createElement('div');
		fp.className = 'walking-border-footprint';
		fp.style.left = `${x}px`;
		fp.style.top = `${y}px`;
		containerRef.appendChild(fp);
		setTimeout(() => fp.remove(), CONFIG.footprints.fadeTime);
	}

	function generatePath(w: number, h: number, r: number): string {
		const radius = Math.min(r, Math.min(w, h) / 2);
		return [
			`M ${radius} 0`,
			`L ${w - radius} 0`,
			`A ${radius} ${radius} 0 0 1 ${w} ${radius}`,
			`L ${w} ${h - radius}`,
			`A ${radius} ${radius} 0 0 1 ${w - radius} ${h}`,
			`L ${radius} ${h}`,
			`A ${radius} ${radius} 0 0 1 0 ${h - radius}`,
			`L 0 ${radius}`,
			`A ${radius} ${radius} 0 0 1 ${radius} 0`,
			'Z',
		].join(' ');
	}

	function updatePath() {
		if (!contentRef) return;
		const card = contentRef.firstElementChild as HTMLElement | null;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) return;
		const borderRadius = parseFloat(getComputedStyle(card).borderRadius) || 12;
		offsetPath = generatePath(rect.width, rect.height, borderRadius);
	}

	// Attachment reads no reactive state synchronously, so it runs once per mount
	function setup() {
		tick().then(() => setTimeout(updatePath, CONFIG.initDelay));

		// Debounced resize observer — avoid restarting offset-path mid-frame on continuous drag
		let resizeTimer: ReturnType<typeof setTimeout>;
		const resizeObserver = new ResizeObserver(() => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(updatePath, 100);
		});
		if (contentRef) resizeObserver.observe(contentRef);

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(animationFrameId);
			clearTimeout(resizeTimer);
		};
	}
</script>

<div
	bind:this={containerRef}
	{@attach setup}
	class="relative"
	style="
		--walk-duration: {duration}s;
		--fp-size: {CONFIG.footprints.size}px;
		--fp-opacity: {CONFIG.footprints.opacity};
		--fp-fade: {CONFIG.footprints.fadeTime}ms;
	">
	<div bind:this={walkerRef} class="walker" class:walker-ready={walkerReady} style={offsetPath ? `offset-path: path('${offsetPath}');` : ''}>
		<div bind:this={footMarkerRef} class="pointer-events-none absolute bottom-0 left-1/2 size-px"></div>
		<svg class="stick-figure" viewBox="0 0 {figureWidth} {figureHeight}" width={figureWidth} height={figureHeight}>
			<g bind:this={figureGroupRef}>
				<line bind:this={backLegUpperRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={backLegLowerRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={backArmUpperRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={backArmLowerRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={torsoRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={frontLegUpperRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={frontLegLowerRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={frontArmUpperRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<line bind:this={frontArmLowerRef} stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} stroke-linecap="round" />
				<circle bind:this={headRef} r={headR} fill="none" stroke="currentColor" stroke-width={CONFIG.walker.strokeWidth} />
			</g>
		</svg>
	</div>

	<div bind:this={contentRef} class="relative z-10">
		{@render children?.()}
	</div>
</div>

<style>
	.walker {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 20;
		color: currentColor;
		opacity: 0;
		animation: walk-path var(--walk-duration) linear infinite;
		offset-rotate: auto;
		offset-anchor: center 100%;
	}

	.walker.walker-ready {
		opacity: 1;
	}

	@keyframes walk-path {
		from {
			offset-distance: 0%;
		}
		to {
			offset-distance: 100%;
		}
	}

	:global(.walking-border-footprint) {
		position: absolute;
		width: var(--fp-size);
		height: var(--fp-size);
		border-radius: 50%;
		pointer-events: none;
		background: currentColor;
		opacity: var(--fp-opacity);
		animation: footprint-fade var(--fp-fade) ease-out forwards;
		transform: translate(-50%, -50%);
	}

	@keyframes footprint-fade {
		0% {
			opacity: var(--fp-opacity);
			transform: translate(-50%, -50%) scale(1);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.walker {
			animation: none;
		}
	}
</style>
