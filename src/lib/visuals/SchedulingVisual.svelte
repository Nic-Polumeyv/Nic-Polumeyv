<script lang="ts">
	type TimeSlot = {
		time: string;
		available: boolean;
		selected?: boolean;
	};

	type CalendarDay = {
		label: string;
		currentMonth: boolean;
		selected?: boolean;
	};

	const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const calendarDays: CalendarDay[] = [
		{ label: '28', currentMonth: false },
		{ label: '29', currentMonth: false },
		{ label: '30', currentMonth: false },
		{ label: '31', currentMonth: false },
		{ label: '1', currentMonth: true },
		{ label: '2', currentMonth: true },
		{ label: '3', currentMonth: true },
		{ label: '4', currentMonth: true },
		{ label: '5', currentMonth: true },
		{ label: '6', currentMonth: true },
		{ label: '7', currentMonth: true },
		{ label: '8', currentMonth: true },
		{ label: '9', currentMonth: true },
		{ label: '10', currentMonth: true },
		{ label: '11', currentMonth: true },
		{ label: '12', currentMonth: true },
		{ label: '13', currentMonth: true },
		{ label: '14', currentMonth: true },
		{ label: '15', currentMonth: true, selected: true },
		{ label: '16', currentMonth: true },
		{ label: '17', currentMonth: true },
		{ label: '18', currentMonth: true },
		{ label: '19', currentMonth: true },
		{ label: '20', currentMonth: true },
		{ label: '21', currentMonth: true },
		{ label: '22', currentMonth: true },
		{ label: '23', currentMonth: true },
		{ label: '24', currentMonth: true },
		{ label: '25', currentMonth: true },
		{ label: '26', currentMonth: true },
		{ label: '27', currentMonth: true },
		{ label: '28', currentMonth: true },
		{ label: '29', currentMonth: true },
		{ label: '30', currentMonth: true },
		{ label: '31', currentMonth: true }
	];

	const timeSlots: TimeSlot[] = [
		{ time: '9:00 - 9:40 AM', available: true },
		{ time: '9:30 - 10:10 AM', available: true },
		{ time: '10:00 - 10:40 AM', available: false },
		{ time: '10:30 - 11:10 AM', available: true },
		{ time: '11:00 - 11:40 AM', available: true },
		{ time: '11:30 - 12:10 PM', available: false },
		{ time: '12:00 - 12:40 PM', available: true },
	];
</script>

<div class="mx-auto grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 gap-4">
	<div class="flex items-center justify-center rounded-2xl bg-card p-4 sm:p-5 shadow-sm min-h-85" inert>
		<div class="w-full max-w-80 rounded-xl border bg-background p-4">
			<div class="flex items-center justify-between">
				<button type="button" class="size-8 rounded-md border text-muted-foreground" tabindex="-1" aria-label="Previous month">
					-
				</button>
				<p class="text-sm font-semibold">January 2026</p>
				<button type="button" class="size-8 rounded-md border text-muted-foreground" tabindex="-1" aria-label="Next month">
					+
				</button>
			</div>

			<div class="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
				{#each weekdays as day}
					<div>{day}</div>
				{/each}
			</div>

			<div class="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
				{#each calendarDays as day}
					<div
						class="flex aspect-square items-center justify-center rounded-md
							{day.selected
								? 'bg-primary text-primary-foreground'
								: day.currentMonth
									? 'text-foreground'
									: 'text-muted-foreground/40'}">
						{day.label}
					</div>
				{/each}
			</div>
		</div>
	</div>

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
