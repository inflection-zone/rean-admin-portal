<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/button/outline.button.svelte';

	export let data: PageServerData;
	let id = data.knowledgeNugget.id;
	let topicName = data.knowledgeNugget.TopicName;
	let briefInformation = data.knowledgeNugget.BriefInformation;
	let detailedInformation = data.knowledgeNugget.DetailedInformation;
	let additionalResource = data.knowledgeNugget.AdditionalResource;
	let tags = data.knowledgeNugget.Tags;
	// let tags_ = data.knowledgeNugget.Tags;
	// let tags = tags_.join(', ');

	console.log('tags===', tags);
	console.log('topicName=', topicName);
	console.log('info====', briefInformation);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/knowledge-nuggets/${id}/edit`;
	const viewRoute = `/users/${userId}/knowledge-nuggets/${id}/view`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute
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
					<div class="lg:hidden md:hidden block">View Knowledge Nuggets</div>
					<div class="lg:block md:block hidden">View Knowledge Nuggets</div>
					<a href={knowledgeNuggetsRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<!-- <div class="hidden">{id}</div> -->
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Name</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="topicName">{topicName}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Brief Information </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="briefInformation"> {briefInformation} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Detailed Information </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="detailedInformation">{detailedInformation}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Additional Resource</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="additionalResource"> {additionalResource} </span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Tags </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3"> {tags} </span>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<Button title='Edit' type="submit">
							
							<!-- <Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" /> -->
						</Button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
