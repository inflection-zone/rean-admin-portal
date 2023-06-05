<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { InputChip } from '@skeletonlabs/skeleton';

	let tagsPlaceholder = 'Enter a tags here...';

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/knowledge-nuggets/create`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute,
			home: true
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/createKnowledgeNuggetAction"
			class="w-full  bg-tertiary-500 lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Knowledge Nugget
					<a href="/">
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

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
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.topicName
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.topicName ?? ''}
					/>
					{#if form?.errors?.topicName}
						<p class="text-error-500 text-xs">{form?.errors?.topicName[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Brief Information</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="briefInformation"
						placeholder="Enter brief information here..."
						class="textarea w-full {form?.errors?.briefInformation
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.briefInformation}
						<p class="text-error-500 text-xs">{form?.errors?.briefInformation[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Detailed Information</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="detailedInformation"
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
						class="input w-full"
						placeholder="Enter additional resource here..."
					/>
					{#if form?.errors?.additionalResources}
						<p class="text-error-500 text-xs">{form?.errors?.additionalResources[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<InputChip
						chips="variant-filled-error rounded-2xl"
						name="tags"
						placeholder={tagsPlaceholder}
					/>
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-primary w-full mb-10 "> Submit </button>
				</div>
			</div>
		</form>
	</div>
</main>
