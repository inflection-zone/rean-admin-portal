<script lang="ts">
	import type { PageServerData } from './$types';
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { InputChip } from '@skeletonlabs/skeleton';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.KnowledgeNugget.id;
	let topicName = data.KnowledgeNugget.TopicName;
	let briefInformation = data.KnowledgeNugget.BriefInformation;
	let detailedInformation = data.KnowledgeNugget.DetailedInformation;
	let additionalResources_ = data.KnowledgeNugget.AdditionalResources;
	let additionalResources = additionalResources_.join(', ');
	let tags = data.KnowledgeNugget.Tags;

	//Original data
	let _topicName = topicName;
	let _briefInformation = briefInformation;
	let _detailedInformation = detailedInformation;
	let _additionalResources = additionalResources;
	let _tags = tags;
	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	function handleReset() {
		topicName = _topicName;
		briefInformation = _briefInformation;
		detailedInformation = _detailedInformation;
		additionalResources = _additionalResources;
		tags = _tags;
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

	<div class="">
		<form
			method="post"
			action="?/updateKnowledgeNuggetAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3] mb-10">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Knowledge Nugget
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
					<label class="label">
						<span>Name *</span>
					</label>
				</div>

				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="topicName"
						required
						bind:value={topicName}
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.topicName
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.topicName}
						<p class="text-error-500 text-xs">{form?.errors?.topicName[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Brief Information</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="briefInformation"
						bind:value={briefInformation}
						placeholder="Enter  brief information here..."
						class="textarea w-full {form?.errors?.briefInformation
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.briefInformation}
						<p class="text-error-500 text-xs">{form?.errors?.briefInformation[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Detailed Information</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="detailedInformation"
						bind:value={detailedInformation}
						placeholder="Enter detailed information here..."
						class="textarea w-full {form?.errors?.detailedInformation
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.detailedInformation}
						<p class="text-error-500 text-xs">{form?.errors?.detailedInformation[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Additional Resource</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="additionalResources"
						bind:value={additionalResources}
						class="input w-full"
						placeholder="Enter additional resource here..."
					/>
					{#if form?.errors?.additionalResources}
						<p class="text-error-500 text-xs">{form?.errors?.additionalResources[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary text-primary-500 btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn variant-filled-secondary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
