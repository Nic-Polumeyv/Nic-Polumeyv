<script lang="ts">
	import { card, person } from './primitives.svelte';
</script>

<svg viewBox="0 0 320 260" fill="none" class="w-full">
	<!-- Vertical flow line -->
	<line x1="50" y1="30" x2="50" y2="230" class="stroke-muted-foreground" stroke-width="0.5" opacity="0.15" />

	<!-- ===== Step 1: Complete ===== -->
	<circle cx="50" cy="35" r="10" class="fill-emerald-500" opacity="0.1" />
	<circle cx="50" cy="35" r="6" class="fill-emerald-500" opacity="0.25" />
	<path d="M46 35 L49 38 L54 32" class="stroke-emerald-500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	<text x="70" y="33" class="fill-foreground" font-size="9" font-weight="600">New client signs up</text>
	<text x="70" y="43" class="fill-muted-foreground" font-size="6.5" opacity="0.6">Trigger</text>

	<line x1="50" y1="45" x2="50" y2="75" class="stroke-emerald-500" stroke-width="1.5" opacity="0.25" />

	<!-- ===== Step 2: Complete ===== -->
	<circle cx="50" cy="85" r="10" class="fill-emerald-500" opacity="0.1" />
	<circle cx="50" cy="85" r="6" class="fill-emerald-500" opacity="0.25" />
	<path d="M46 85 L49 88 L54 82" class="stroke-emerald-500" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	<text x="70" y="83" class="fill-foreground" font-size="9" font-weight="600">Send welcome email</text>
	<text x="70" y="93" class="fill-muted-foreground" font-size="6.5" opacity="0.6">Instant · Auto</text>

	<!-- Email card -->
	{@render card(168, 68, 130, 38, 6)}
	<g transform="translate(168, 68)">
		<!-- Envelope icon -->
		<rect x="8" y="8" width="18" height="13" rx="2" class="stroke-primary" stroke-width="0.75" fill="none" opacity="0.4" />
		<path d="M8 10 L17 17 L26 10" class="stroke-primary" stroke-width="0.75" fill="none" opacity="0.4" />
		<!-- Email lines -->
		<rect x="34" y="10" width="44" height="4" rx="1.5" class="fill-foreground" opacity="0.45" />
		<rect x="34" y="18" width="72" height="3" rx="1.5" class="fill-muted-foreground" opacity="0.18" />
		<rect x="34" y="25" width="56" height="3" rx="1.5" class="fill-muted-foreground" opacity="0.1" />
	</g>
	<line x1="60" y1="86" x2="168" y2="86" class="stroke-muted-foreground" stroke-width="0.5" opacity="0.12" />

	<line x1="50" y1="95" x2="50" y2="125" class="stroke-emerald-500" stroke-width="1.5" opacity="0.2" />

	<!-- ===== Step 3: Active ===== -->
	<circle cx="50" cy="135" r="10" class="fill-primary" opacity="0.1" />
	<circle cx="50" cy="135" r="6" class="stroke-primary" stroke-width="1.5" fill="none" />
	<circle cx="50" cy="135" r="2.5" class="fill-primary" />
	<text x="70" y="133" class="fill-foreground" font-size="9" font-weight="600">Assign to team</text>
	<text x="70" y="143" class="fill-muted-foreground" font-size="6.5" opacity="0.6">Round robin</text>

	<!-- Team card with people -->

	<!-- ===== Step 4: Pending ===== -->
	<circle cx="50" cy="185" r="10" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="50" cy="185" r="6" class="stroke-muted-foreground" stroke-width="0.75" fill="none" opacity="0.25" />
	<circle cx="50" cy="185" r="2" class="fill-muted-foreground" opacity="0.2" />
	<text x="70" y="183" class="fill-muted-foreground" font-size="9" font-weight="500" opacity="0.5">Schedule session</text>
	<text x="70" y="193" class="fill-muted-foreground" font-size="6.5" opacity="0.3">Waiting on client</text>

	<line x1="50" y1="195" x2="50" y2="215" class="stroke-muted-foreground" stroke-width="1" opacity="0.08" />

	<!-- ===== Step 5: Pending ===== -->
	<circle cx="50" cy="225" r="10" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="50" cy="225" r="6" class="stroke-muted-foreground" stroke-width="0.75" fill="none" opacity="0.25" />
	<circle cx="50" cy="225" r="2" class="fill-muted-foreground" opacity="0.2" />
	<text x="70" y="223" class="fill-muted-foreground" font-size="9" font-weight="500" opacity="0.5">Follow-up</text>
	<text x="70" y="233" class="fill-muted-foreground" font-size="6.5" opacity="0.3">48h delay</text>

	<!-- Feedback loop: clean right-angle path with rounded corners -->
	<path
		d="M40 225 L20 225 Q15 225 15 220 L15 140 Q15 135 20 135 L40 135"
		class="stroke-muted-foreground"
		stroke-width="0.75"
		stroke-dasharray="3 2"
		opacity="0.2"
		fill="none" />
	<!-- Arrow tip -->
	<path
		d="M37 131 L41 135 L37 139"
		class="stroke-muted-foreground"
		stroke-width="0.75"
		opacity="0.2"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round" />
</svg>
