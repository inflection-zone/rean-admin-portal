<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { selectedItems } from '$lib/store/general.store';

	export let selectedCourses;
	$: selectedCourses;

	const flipDurationMs = 300;

	const handleDndConsider = (e) => (selectedCourses = e.detail.items);

	const handleDndFinalize = (e) => {
		selectedCourses = e.detail.items;
		let courseIds = selectedCourses.map((item) => item.id);
		console.log('courseIds', courseIds);
		selectedItems.set(courseIds);
	};
</script>

<div
	class="flex flex-col gap-2 p-2 border border-secondary-100 dark:border-surface-700 rounded min-h-[100px]"
>
	<div class="font-semibold">Add courses to learning journey</div>
	<section
		class="grow"
		use:dndzone={{ items: selectedCourses, flipDurationMs }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each selectedCourses as item (item.id)}
			<div class="px-1 py-0.5" animate:flip={{ duration: flipDurationMs }}>
				{item.Name}
			</div>
		{/each}
	</section>
</div>
