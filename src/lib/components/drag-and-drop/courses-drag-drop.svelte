<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

  export let courses;
  $:courses;

  const flipDurationMs = 300;

	function handleDndConsider(e) {
		courses = e.detail.items;
	}

	function handleDndFinalize(e) {
		courses = e.detail.items;
	}
</script>

<div class="h-40 w-full bg-surface-500 border border-primary-300 rounded-md px-2 py-2 overflow-auto">
<div class="text-primary-500 mb-2 font-semibold">Available Courses</div>
<section class="h-full w-full" use:dndzone={{items: courses, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	
	{#each courses as item(item.id)}
		<div class="text-primary-500 px-1 py-0.5" animate:flip="{{duration: flipDurationMs}}">
      {item.Name}
		</div>
	{/each}
</section>
</div>


