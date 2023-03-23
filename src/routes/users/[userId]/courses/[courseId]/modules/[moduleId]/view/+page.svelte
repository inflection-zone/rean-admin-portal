<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';

	export let data: PageServerData;
	let id = data.module.id;
	let Name = data.module.Name;
	let description = data.module.Description;
	// let sequence = data.module.Sequence;
	let durationInMins = data.module.DurationInMins;
	let imageUrl = data.module.ImageUrl;
	let contents = data.module.Contents;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId =  $page.params.moduleId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const	contentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	const courseRoute = `/users/${userId}/courses/${courseId}/view`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules`;

	const breadCrumbs = [
		{
			name: 'Course',
			path: courseRoute
		},
		{
			name: 'Module',
			path: moduleRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-3 mb-5">
		<form
			method="get"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg mb-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Module</div>
					<div class="lg:block md:block hidden">View Module</div>
					<a href={moduleRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="Name">{Name}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description"> {description} </span>
			</div>

			<!-- <div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="label">
						<span>Sequence</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="sequence">{sequence}</span>
			</div> -->
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Duration In Mins</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="durationInMins"> {durationInMins} </span>
			</div>
		
			<!-- <div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				{#if imageUrl === 'undefined'}
					<span class="span">Not specified</span>
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
				{/if}
			</div> -->

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Contents</span>
					</label>
				</div>
				{#if contents.length <= 0}
					<span class="span">Contents are not available!</span>
				{:else}
				<ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="contents">
					{#each contents as content}
						<li>{content.Title}</li>
			  	{/each}	
				</ol>
				{/if}
			</div>

			<div class="flex  items-center mt-10 lg:mx-10 md:mx-16">
        <div class="lg:w-8/12 min-[280px]:w-1/3 sm:w-1/2 md:w-1/2" />
        <div class="flex lg:w-1/3 gap-3 min-[280px]:w-2/4 ">
          <a href={contentRoute}>
          <button
              type="submit"
              class="btn variant-filled-primary lg:w-full md:w-28 sm:w-28 min-[280px]:w-28 w-20 mb-8 lg:mr-4 mr-1   "
            >
             Add Content
            </button>
          </a>
          <a href={editRoute}>
            <button
              type="submit"
              class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 min-[280px]:w-24 w-20 mb-8 lg:mr-4 mr-1 "
            >
              Edit
              <Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
            </button>
          </a>
        </div>
      </div>
		</form>
	</div>
</main>
