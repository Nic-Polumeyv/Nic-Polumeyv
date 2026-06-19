<script lang="ts">
	import TrendingUp from '@lucide/svelte/icons/trending-up';
</script>

<div class="rounded-2xl bg-card p-4 sm:p-6 shadow-sm w-full space-y-4 sm:space-y-5">
	<!-- Metrics -->
	<div class="grid grid-cols-3 gap-3">
		{#each [{ label: 'Revenue', value: '$12,400', delta: '+18%', up: true }, { label: 'Bookings', value: '142', delta: '+7%', up: true }, { label: 'Retention', value: '89%', delta: '+2%', up: false }] as metric (metric.label)}
			<div class="rounded-xl bg-muted/30 p-3 sm:p-4">
				<p class="text-xs text-muted-foreground mb-1 truncate">{metric.label}</p>
				<p class="text-base sm:text-xl font-bold">{metric.value}</p>
				<div class="mt-2 flex items-center gap-1">
					<span class="text-xs font-medium {metric.up ? 'text-emerald-600' : 'text-muted-foreground'}">{metric.delta}</span>
					{#if metric.up}
						<TrendingUp class="size-3 text-emerald-600" />
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Chart -->
	<div class="rounded-xl bg-muted/30 p-4">
		<div class="flex items-center justify-between mb-4">
			<p class="text-sm font-medium">Weekly Revenue</p>
			<div class="flex gap-1">
				{#each ['1W', '1M', '3M'] as tab, i (tab)}
					<span class="rounded-md px-2.5 py-1 text-xs {i === 0 ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground/50'}">{tab}</span>
				{/each}
			</div>
		</div>
		<div class="flex items-end gap-2 h-40">
			{#each [{ h: 40, day: 'Mon' }, { h: 58, day: 'Tue' }, { h: 82, day: 'Wed' }, { h: 54, day: 'Thu' }, { h: 94, day: 'Fri' }, { h: 68, day: 'Sat' }, { h: 45, day: 'Sun' }] as bar (bar.day)}
				<div class="flex flex-1 flex-col items-center justify-end gap-2 h-full">
					<div class="w-full rounded-md bg-primary" style:height="{bar.h}%" style:opacity={bar.h > 80 ? 1 : 0.4 + bar.h / 180}></div>
					<span class="text-xs text-muted-foreground/60 shrink-0">{bar.day}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
