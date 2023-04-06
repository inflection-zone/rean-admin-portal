<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	export let data: PageServerData;
	let id = data.course.id;
	let name = data.course.Name;
	let description = data.course.Description;
	let imageUrl = data.course.ImageUrl;
	console.log("imageUrl",imageUrl)
	let modules = data.course.Modules;
	let durationInDays = data.course.DurationInDays;
	console.log(data.course)

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const courseId = $page.params.courseId ;
	const editRoute = `/users/${userId}/courses/${courseId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/view`;
	const courseRoute = `/users/${userId}/courses`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules/create`

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
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
					<div class="lg:hidden md:hidden block">View Course</div>
					<div class="lg:block md:block hidden">View Course</div>
					<a href={courseRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-start mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="name">{name}</span>
			</div>

			<!-- <div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="label">
						<span>Learning Journey</span>
					</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="learningJourney">{learningJourney}</span>
			</div> -->

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description">{description}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Duration In Days</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="durationInDays">{durationInDays}</span>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				{#if imageUrl === 'undefined'}
					<span class="span">Not specified</span>
					<!-- <img class="flex h-24 w-24 rounded-full" src={avatarSource} alt="d" /> -->
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
				{/if}
			</div>
			
			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Modules</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" >
				{#if modules.length <= 0}
					<span class="span">Modules are not available!</span>
				{:else}
				<!-- <ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="modules">
					{#each modules as module}
						<li>{module.Name}</li>
			  	{/each}	
				</ol> -->
				<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
						{#each modules as module}
								<TreeBranch rootContent={module.Name}>
									<!-- {#if module.CourseContents.length > 1} -->
									{#each module.Contents as content}
										<TreeLeaf>{content.Title}</TreeLeaf>
									{/each}
									<!-- {/if} -->
								</TreeBranch>
						{/each}
				</TreeView>
				{/if}
			</span>
			</div>
			<div class="flex  items-center mt-10 lg:mx-10 md:mx-16">
        <div class="lg:w-8/12 min-[280px]:w-1/3 sm:w-1/2 md:w-1/2" />
        <div class="flex lg:w-1/3 gap-3 min-[280px]:w-2/4 ">
          <a href={moduleRoute}>
          <button
              type="submit"
              class="btn variant-filled-primary lg:w-full md:w-28 sm:w-28 min-[280px]:w-28 w-20 mb-8 lg:mr-4 mr-1   "
            >
             Add Module
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
