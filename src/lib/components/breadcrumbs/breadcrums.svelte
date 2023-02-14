<script>
	export let crumbs;
</script>

<div
	class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-secondary lg:ml-14 md:ml-10 sm:ml-6 lg:mt-2 sm:mt-4 mt-5 ml-4"
>
	<ul>
		{#each crumbs as crumb}
			<li><a href={crumb.path} class="text-secondary">{crumb.name}</a></li>
		{/each}
	</ul>
</div>
