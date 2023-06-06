<script>
import { flip } from 'svelte/animate';
import { dndzone } from 'svelte-dnd-action';
import { selectedItems } from '$lib/store/general.store';

	export let selectedCourses;
  $:selectedCourses;

  const flipDurationMs = 300;

	function handleDndConsider(e) {
		selectedCourses = e.detail.items;
		
	}

	function handleDndFinalize(e) {
		selectedCourses = e.detail.items;
		let courseIds = selectedCourses.map((item) => item.id);
		console.log("courseIds", courseIds);
		selectedItems.set(courseIds);
	}

</script>
<div class="h-40 w-full bg-surface-500 border border-primary-300 rounded-md p-2 overflow-auto">
	<div class="text-primary-500 mb-2 font-semibold">Add courses to learning journey</div>
<section class="h-full w-full" use:dndzone={{items: selectedCourses, flipDurationMs}}  on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each selectedCourses as item(item.id)}
		<div class="text-primary-500 px-1 py-0.5" animate:flip="{{duration: flipDurationMs}}">
      {item.Name}
		</div>
	{/each}
</section>
</div>


