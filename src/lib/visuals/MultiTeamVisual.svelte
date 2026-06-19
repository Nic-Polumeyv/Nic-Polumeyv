<script lang="ts">
	const nodes = [
		{ x: 45, y: 40, r: 8, primary: true },
		{ x: 115, y: 35, r: 6, primary: false },
		{ x: 210, y: 50, r: 10, primary: true },
		{ x: 277, y: 40, r: 5, primary: false },
		{ x: 55, y: 120, r: 7, primary: false },
		{ x: 155, y: 115, r: 12, primary: true },
		{ x: 265, y: 125, r: 6, primary: false },
		{ x: 115, y: 175, r: 9, primary: true },
		{ x: 210, y: 190, r: 5, primary: false },
	];

	const edges: [number, number][] = [
		[0, 1],
		[1, 2],
		[2, 3],
		[0, 4],
		[4, 5],
		[1, 5],
		[5, 2],
		[5, 6],
		[2, 6],
		[4, 7],
		[5, 7],
		[7, 8],
		[5, 8],
		[6, 8],
		[3, 6],
	];
</script>

<svg viewBox="0 0 320 240" fill="none" class="w-full">
	{#each edges as [a, b] (`${a}-${b}`)}
		<line x1={nodes[a]!.x} y1={nodes[a]!.y} x2={nodes[b]!.x} y2={nodes[b]!.y} class="stroke-primary" stroke-width="1" stroke-dasharray="3 3" opacity="0.2" />
	{/each}

	{#each nodes as node, i (i)}
		<circle cx={node.x} cy={node.y} r={node.r + 6} class="fill-primary" opacity="0.04" />
		<circle cx={node.x} cy={node.y} r={node.r} class={node.primary ? 'fill-primary' : 'fill-muted-foreground'} opacity={node.primary ? 0.6 : 0.2} />
		<circle cx={node.x} cy={node.y} r={node.r * 0.4} class="fill-primary-foreground" opacity={node.primary ? 0.8 : 0.4} />
	{/each}
</svg>
