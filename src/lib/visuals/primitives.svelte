<script module lang="ts">
	export { card, person };
</script>

{#snippet card(x: number, y: number, w: number, h: number, rx: number = 8)}
	<rect {x} {y} width={w} height={h} {rx} class="fill-card stroke-border" stroke-width="0.5" />
{/snippet}

{#snippet person(cx: number, cy: number, scale: number = 1, muted: boolean = false)}
	{const cls = muted ? 'fill-muted-foreground' : 'fill-primary'}
	{const o = muted ? 0.3 : 0.7}
	<circle {cx} cy={cy - 2 * scale} r={4 * scale} class={cls} opacity={o} />
	<path d="M{cx - 6 * scale} {cy + 8 * scale} Q{cx - 6 * scale} {cy + 2 * scale} {cx} {cy + 2 * scale} Q{cx + 6 * scale} {cy + 2 * scale} {cx + 6 * scale} {cy + 8 * scale}" class={cls} opacity={o} />
{/snippet}
