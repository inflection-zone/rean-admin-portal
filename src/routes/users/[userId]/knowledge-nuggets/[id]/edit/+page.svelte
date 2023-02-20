<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import Tags from '$lib/components/tags.svelte';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	export let data: PageServerData;
	let initiaData = {};
	let id = data.knowledgeNuggets.id;
	let topicName = data.knowledgeNuggets.TopicName;
	let briefInformation = data.knowledgeNuggets.BriefInformation;
	let detailedInformation = data.knowledgeNuggets.DetailedInformation;
	let additionalResource = data.knowledgeNuggets.AdditionalResource;
	let tags = data.knowledgeNuggets.Tags;

	// let id = '56789';
	// let name = 'abdc';
	// let briefInformation = 'xxx xx xxxxx';
	// let detailedInformation = 'xxxxxx xxxxx';
	// let additionalResource = 'xxxxxx';
	// let tags = 'xxx';

	//Original data
	let _topicName = topicName;
	let _briefInformation = briefInformation;
	let _detailedInformation = detailedInformation;
	let _additionalResource = additionalResource;
	let _tags = JSON.stringify(tags);
	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	console.log('tags===', _tags);

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	function handleReset() {
		topicName = _topicName;
		briefInformation = _briefInformation;
		detailedInformation = _detailedInformation;
		additionalResource = _additionalResource;
		tags = JSON.parse(_tags);
	}

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
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="h-screen mb-10 ">
		<form
			method="post"
			action="?/updateKnowledgeNuggets"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Knowledge Nuggets
					<a href={viewRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Name</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="topicName"
						bind:value={topicName}
						placeholder="Enter  name here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Brief Information </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="briefInformation"
						bind:value={briefInformation}
						class="textarea textarea-info w-full"
						placeholder="Enter  brief information here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Detailed Information </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="detailedInformation"
						bind:value={detailedInformation}
						class="textarea textarea-info w-full"
						placeholder="Enter detailed information here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Additional Resource </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="additionalResource"
						bind:value={additionalResource}
						class="textarea textarea-info w-full"
						placeholder="Enter additional resource here..."
					/>
				</div>
			</div>
			<div class="flex items-center lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} bind:tags />
					<input type="hidden" name="tags" value={JSON.stringify(tags)} />
					<!-- <Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} bind:tags />
					<input type="hidden" name="tags" value={JSON.stringify(retrievedTags)} /> -->
				</div>
			</div>

			<div class="flex items-center my-6 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
