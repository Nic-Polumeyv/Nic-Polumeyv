<script lang="ts">
</script>

<svg viewBox="0 0 320 240" fill="none" class="w-full">
	<!-- Raw data: scattered dots with halos -->
	<circle cx="40" cy="50" r="10" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="40" cy="50" r="4" class="fill-muted-foreground" opacity="0.35" />
	<circle cx="25" cy="90" r="14" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="25" cy="90" r="6" class="fill-muted-foreground" opacity="0.3" />
	<circle cx="55" cy="130" r="8" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="55" cy="130" r="3" class="fill-muted-foreground" opacity="0.4" />
	<circle cx="35" cy="170" r="12" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="35" cy="170" r="5" class="fill-muted-foreground" opacity="0.25" />
	<circle cx="60" cy="75" r="8" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="60" cy="75" r="3.5" class="fill-muted-foreground" opacity="0.35" />
	<circle cx="50" cy="195" r="10" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="50" cy="195" r="4" class="fill-muted-foreground" opacity="0.3" />
	<circle cx="70" cy="160" r="6" class="fill-muted-foreground" opacity="0.05" />
	<circle cx="70" cy="160" r="2.5" class="fill-muted-foreground" opacity="0.35" />

	<!-- Convergence curves: raw → center -->
	<path d="M40 50 Q100 80 150 115" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M25 90 Q90 100 150 118" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M55 130 Q110 125 150 120" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M35 170 Q100 150 150 122" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M60 75 Q110 90 150 116" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M50 195 Q110 170 150 124" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />
	<path d="M70 160 Q115 140 150 121" class="stroke-muted-foreground" stroke-width="0.75" opacity="0.15" />

	<!-- Center focal point -->
	<circle cx="160" cy="120" r="22" class="fill-primary" opacity="0.05" />
	<circle cx="160" cy="120" r="12" class="fill-primary" opacity="0.25" />
	<circle cx="160" cy="120" r="5" class="fill-primary" opacity="0.9" />

	<!-- Output curves -->
	<path d="M170 112 Q200 80 248 60" class="stroke-primary output-flow" stroke-width="1.5" opacity="0.4" fill="none" />
	<path d="M172 120 Q200 120 248 120" class="stroke-primary output-flow" stroke-width="1.5" opacity="0.4" fill="none" />
	<path d="M170 128 Q200 160 248 180" class="stroke-primary output-flow" stroke-width="1.5" opacity="0.4" fill="none" />

	<!-- Output nodes (emerald = resolved/organized) -->
	<circle cx="248" cy="60" r="8" class="fill-emerald-500" opacity="0.08" />
	<circle cx="248" cy="60" r="6" class="fill-emerald-500" opacity="0.6" />
	<circle cx="248" cy="60" r="2.5" class="fill-primary-foreground" opacity="0.9" />

	<circle cx="248" cy="120" r="8" class="fill-emerald-500" opacity="0.08" />
	<circle cx="248" cy="120" r="6" class="fill-emerald-500" opacity="0.6" />
	<circle cx="248" cy="120" r="2.5" class="fill-primary-foreground" opacity="0.9" />

	<circle cx="248" cy="180" r="8" class="fill-emerald-500" opacity="0.08" />
	<circle cx="248" cy="180" r="6" class="fill-emerald-500" opacity="0.6" />
	<circle cx="248" cy="180" r="2.5" class="fill-primary-foreground" opacity="0.9" />

	<!-- Output labels -->
	<rect x="264" y="54" width="36" height="4" rx="2" class="fill-emerald-500" opacity="0.35" />
	<rect x="264" y="61" width="24" height="3" rx="1.5" class="fill-muted-foreground" opacity="0.2" />

	<rect x="264" y="114" width="32" height="4" rx="2" class="fill-emerald-500" opacity="0.35" />
	<rect x="264" y="121" width="28" height="3" rx="1.5" class="fill-muted-foreground" opacity="0.2" />

	<rect x="264" y="174" width="40" height="4" rx="2" class="fill-emerald-500" opacity="0.35" />
	<rect x="264" y="181" width="20" height="3" rx="1.5" class="fill-muted-foreground" opacity="0.2" />
</svg>

<style>
	.output-flow {
		stroke-dasharray: 12 8;
		stroke-dashoffset: 20;
		animation: flow 3s ease-in-out infinite;
	}
	@keyframes flow {
		0% {
			stroke-dashoffset: 20;
		}
		100% {
			stroke-dashoffset: -20;
		}
	}
</style>
