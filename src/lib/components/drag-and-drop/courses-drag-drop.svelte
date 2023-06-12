<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	export let courses;
	$: courses;

	const flipDurationMs = 300;

	const handleDndConsider = (e) => (courses = e.detail.items);
	const handleDndFinalize = (e) => (courses = e.detail.items);
</script>

<div class="flex flex-col gap-2 p-2 border border-secondary-100 rounded min-h-[100px]">
	<div class="text-primary-500 font-semibold">Available Courses</div>
	<section
		class="grow"
		use:dndzone={{ items: courses, flipDurationMs }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each courses as item (item.id)}
			<div class="text-primary-500 px-1 py-0.5" animate:flip={{ duration: flipDurationMs }}>
				{item.Name}
			</div>
		{/each}
	</section>
</div>
