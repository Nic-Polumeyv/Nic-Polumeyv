<script lang="ts">
	import { Calendar } from '@polumeyv/ui/blocks';
	import { CalendarDate } from '@internationalized/date';

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
</script>

<div class="mx-auto grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 gap-4">
	<!-- Calendar — the real component, made inert so it reads as a non-interactive mockup -->
	<div class="flex items-center justify-center rounded-2xl bg-card p-4 sm:p-5 shadow-sm min-h-85" inert>
		<Calendar type="single" readonly captionLayout="label" value={new CalendarDate(2026, 1, 15)} class="w-full" />
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
