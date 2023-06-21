<script lang="ts">
  import CareplanScheduleweek from './careplan-scheduleweek.svelte';
  import CareplanScheduleday from './careplan-scheduleday.svelte';
  export let userId = undefined;
  export let careplanId = undefined;
  export let classifiedByDay = [];
  export let classifiedByWeek = [];
  let showWeeks = true;
</script>

<form class="justify-center mx-14 bg-tertiary rounded-lg">
  <div class="w-full h-14 rounded-t-lg p-3  bg-secondary">
    <div class="ml-3 relative flex flex-row text-base-100 text-xl">Careplan Schedule</div>
  </div>

  <div class="flex items-center  mt-6 justify-center ">
    <div class="grid grid-cols-2 divide-x mb-3 h-12 w-1/4 text-center">
      <button
      disabled={showWeeks}
        class=" disabled:bg-primary rounded-l-md text-base-100 font-semibold  bg-secondary"
        on:click|preventDefault={() => (showWeeks = true)}>Week View</button
      >
      <button
      disabled={!showWeeks}
        class=" disabled:bg-primary  rounded-r-md text-base-100 font-semibold  bg-secondary"
        on:click|preventDefault={() => (showWeeks = false)}>Day View</button
      >
    </div>
  </div>

  {#if showWeeks}
    <CareplanScheduleweek  on:deleteActivity {classifiedByWeek} {userId} {careplanId}/>
  {:else}
    <CareplanScheduleday on:deleteActivity {classifiedByDay} {userId} {careplanId}/>
  {/if}
</form>
