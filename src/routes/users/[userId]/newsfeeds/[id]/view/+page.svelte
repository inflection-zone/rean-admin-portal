<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	export let data: PageServerData;
	let id = data.newsfeed.id;
	let type = data.newsfeed.type;
	let title = data.newsfeed.title;
	let description = data.newsfeed.description;
	let date = data.newsfeed.date;
	let image = data.newsfeed.image;
	let items = data.newsfeed.items;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/newsfeed/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeed/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeed`;

	const breadCrumbs = [
		{
			name: 'Newsfeed',
			path: newsfeedRoute
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
					<div class="lg:hidden md:hidden block">View Newsfeed</div>
					<div class="lg:block md:block hidden">View Newsfeed</div>
					<a href={newsfeedRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Type</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="type">{type}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Title </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="title">{title}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Description </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="description"> {description} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Date </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="date"> {date} </span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold" for=""> Image </label>
				</div>
				<span class="w-1/2 md:w-2/3 lg:w-2/3"> {image} </span>
			</div>
			<!-- <div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
        <div class="w-1/2 md:w-1/3 lg:w-1/3 ">
        
          <label class="lable-text font-semibold "> Items </label>
        </div>
        <ol class="w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="items">
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
        </ol>
      </div> -->
			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<button type="submit" class="btn btn-outline lg:w-full w-24 mb-10 lg:mr-4 mr-1">
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
