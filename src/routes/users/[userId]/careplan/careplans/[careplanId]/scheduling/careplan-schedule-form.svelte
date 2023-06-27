<script lang="ts">
	import CareplanScheduleweek from './careplan-scheduleweek.svelte';
	import CareplanScheduleday from './careplan-scheduleday.svelte';
	export let userId = undefined;
	export let careplanId = undefined;
	export let classifiedByDay = [];
	export let classifiedByWeek = [];
	let showWeeks = true;
</script>

<div
	class="flex flex-col my-2 rounded-lg border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<div class="p-4 font-bold variant-soft-secondary">Careplan Schedule</div>
	<div class="flex items-center  mt-6 justify-center ">
		<div class="grid grid-cols-2 divide-x mb-3 h-12 w-1/4 text-center">
			<button
				disabled={showWeeks}
				class="disabled:text-primary-800 rounded-l-md text-primary-300 font-semibold "
				on:click|preventDefault={() => (showWeeks = true)}>Week View</button
			>
			<button
				disabled={!showWeeks}
				class=" disabled:text-primary-800  rounded-r-md text-primary-300 font-semibold "
				on:click|preventDefault={() => (showWeeks = false)}>Day View</button
			>
		</div>
	</div>

	{#if showWeeks}
		<CareplanScheduleweek on:deleteActivity {classifiedByWeek} {userId} {careplanId} />
	{:else}
		<CareplanScheduleday on:deleteActivity {classifiedByDay} {userId} {careplanId} />
	{/if}
</div>
