<script lang="ts">
	import User from '@lucide/svelte/icons/user';
</script>

<div class="rounded-2xl bg-card p-4 sm:p-6 shadow-sm w-full">
	<div class="flex items-center justify-between mb-5">
		<p class="text-sm font-semibold">Client Overview</p>
		<p class="text-xs text-muted-foreground">17 total</p>
	</div>

	<div class="space-y-3">
		{#each [
			{ status: 'Active', count: 7, color: 'bg-emerald-500', names: ['Sarah M.', 'James K.', 'Lisa R.', 'Tom H.'] },
			{ status: 'Scheduled', count: 5, color: 'bg-primary', names: ['Anna B.', 'Mike D.', 'Rachel S.'] },
			{ status: 'Follow-up', count: 3, color: 'bg-amber-500', names: ['Chris L.', 'Dana W.'] },
			{ status: 'Inactive', count: 2, color: 'bg-muted-foreground/30', names: ['Pat G.'] },
		] as group (group.status)}
			<div class="rounded-xl bg-muted/30 p-3">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center gap-2">
						<div class="size-2 rounded-full {group.color}"></div>
						<span class="text-xs font-medium">{group.status}</span>
					</div>
					<span class="text-xs text-muted-foreground">{group.count}</span>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each group.names as name (name)}
						<div class="flex items-center gap-1.5 rounded-lg bg-background px-2.5 py-1.5">
							<User class="size-3 text-muted-foreground" />
							<span class="text-xs text-foreground">{name}</span>
						</div>
					{/each}
					{#if group.count > group.names.length}
						<div class="flex items-center rounded-lg bg-background px-2.5 py-1.5">
							<span class="text-xs text-muted-foreground">+{group.count - group.names.length}</span>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
