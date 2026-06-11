<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	// January 2026 starts on Thursday when using Sunday-first columns
	const startDay = 4;
	const daysInMonth = 31;
	const selected = 15;
	const today = 10;

	type TimeSlot = {
		time: string;
		available: boolean;
		selected?: boolean;
	};

	const timeSlots: TimeSlot[] = [
		{ time: '9:00 - 9:40 AM', available: true },
		{ time: '9:30 - 10:10 AM', available: true },
		{ time: '10:00 - 10:40 AM', available: false },
		{ time: '10:30 - 11:10 AM', available: true },
		{ time: '11:00 - 11:40 AM', available: true },
		{ time: '11:30 - 12:10 PM', available: false },
		{ time: '12:00 - 12:40 PM', available: true },
	];

	const days: (number | null)[] = [];
	for (let i = 0; i < startDay; i++) days.push(null);
	for (let i = 1; i <= daysInMonth; i++) days.push(i);
</script>

<div class="mx-auto grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 gap-4">
	<!-- Calendar -->
	<div class="rounded-2xl bg-card p-4 sm:p-5 shadow-sm min-h-85">
		<div class="relative flex items-center justify-center">
			<button class="absolute left-0 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground">
				<ChevronLeft class="size-4" />
			</button>

			<span class="text-sm font-semibold">January 2026</span>

			<button class="absolute right-0 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground">
				<ChevronRight class="size-4" />
			</button>
		</div>

		<div class="mt-5 grid grid-cols-7 gap-y-2">
			{#each weekdays as day (day)}
				<div class="flex items-center justify-center text-[0.7rem] font-medium text-muted-foreground/40">
					{day}
				</div>
			{/each}

			{#each days as num, i (i)}
				{const isSelected = num === selected}
				{const isToday = num === today && !isSelected}

				<div class="flex items-center justify-center">
					{#if num}
						<div
							class="flex size-9 items-center justify-center rounded-lg text-[13px] select-none
							{isSelected ? 'bg-primary font-semibold text-primary-foreground shadow-sm' : isToday ? 'ring-1 ring-primary/30 font-medium' : 'text-foreground/70'}">
							{num}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Time slots -->
	<div class="rounded-2xl bg-card p-4 sm:p-5 shadow-sm min-h-85">
		<div class="flex items-start justify-between gap-3">
			<div>
				<p class="text-sm font-semibold">Available time slots</p>
				<p class="mt-1 text-xs text-muted-foreground">Thursday, January 15</p>
			</div>
		</div>

		<div class="mt-5 grid grid-cols-2 gap-2">
			{#each timeSlots as slot (slot.time)}
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition
			{slot.available ? 'border-border bg-background hover:border-primary/20 hover:bg-accent/40' : 'border-border/60 bg-muted/30 opacity-50'}"
					disabled={!slot.available}>
					<div class="flex items-center justify-center mx-auto text-sm gap-3">
						{slot.time}
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
