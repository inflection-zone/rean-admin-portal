<script>
	import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	export let crumbs;
</script>

  <div
	class="overflow-x-auto lg:text-xl sm:text-lg text-md text-secondary lg:ml-14 md:ml-10 sm:ml-6 lg:mt-2 sm:mt-4 mt-5 ml-4"
>
	<ul class="inline-flex items-center space-x-1 md:space-x-3">
		{#each crumbs as crumb}
			<li><a href={crumb.path} class="text-primary-primary-500">{crumb.name}</a></li>
			<svg aria-hidden="true" class="w-6 h-6 text-primary last:hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
		{/each}
	</ul>
</div>

<!-- <ol class="breadcrumb text-primary-500 text-lg mt-4 ml-10">
	{#each crumbs as crumb, i}
		<a class="crumb breadCrumbs-link " href={crumb.link}>
		  {crumb.label}
		</a>
		{#if i<crumbs.length-1}
		   <Fa icon={faAngleRight} size = 'md' class='text-primary-500 font-bold'/>
		{/if}
	{/each}
 </ol> -->