<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let id = data.assessmentTemplate.id;
	let title = data.assessmentTemplate.Title;
	let description = data.assessmentTemplate.Description;
	let displayCode = data.assessmentTemplate.DisplayCode;
	let assessmentType = data.assessmentTemplate.Type;
	let provider = data.assessmentTemplate.Provider;
	let providerAssessmentCode = data.assessmentTemplate.ProviderAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessmentTemplate.ServeListNodeChildrenAtOnce;
	let scoringApplicable = data.assessmentTemplate.ScoringApplicable;

	//Original data
	let _title = title;
	let _description = description;
	let _displayCode = displayCode;
	let _assessmentType = assessmentType;
	let _provider = provider;
	let _providerAssessmentCode = providerAssessmentCode;
	let _serveListNodeChildrenAtOnce = serveListNodeChildrenAtOnce;

	function handleReset() {
		title = _title;
		description = _description;
		displayCode = _displayCode;
		assessmentType = _assessmentType;
		provider = _provider;
		providerAssessmentCode = _providerAssessmentCode;
		serveListNodeChildrenAtOnce = _serveListNodeChildrenAtOnce;
	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/view`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;

	const breadCrumbs = [
		{
			name: 'Assessments',
			path: assessmentsRoutes
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div>
		<form
			method="post"
			action="?/updateAssessmentAction"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Assessment Template
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

			<div class="flex items-center mb-4 mt-10 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="title"
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full {form?.errors?.title
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mt-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="textarea w-full{form?.errors?.description
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-2 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select w-full"
						name="type"
						bind:value={assessmentType}
						placeholder="Select type here..."
					>
						<option selected>{assessmentType}</option>
						<option>Daily Update</option>
						<option>Symptom</option>
						<option>Survey</option>
						<option>Protocol</option>
						<option>Custom</option>
					</select>
				</div>
			</div>
			<div class="flex items-center my-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="provider"
						bind:value={provider}
						placeholder="Enter provider here"
						class="input w-full {form?.errors?.provider
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.provider}
						<p class="text-error-500 text-xs">{form?.errors?.provider[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider Assessment Code</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="providerAssessmentCode"
						bind:value={providerAssessmentCode}
						placeholder="Enter provider assessment code here..."
						class="input w-full {form?.errors?.providerAssessmentCode
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.providerAssessmentCode}
						<p class="text-error-500 text-xs">{form?.errors?.providerAssessmentCode[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Serve List Node Children At Once</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="serveListNodeChildrenAtOnce"
							bind:value={serveListNodeChildrenAtOnce}
							bind:checked={serveListNodeChildrenAtOnce}
							class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
						/>
						{#if form?.errors?.serveListNodeChildrenAtOnce}
							<p class="text-error-500 text-xs">{form?.errors?.serveListNodeChildrenAtOnce[0]}</p>
						{/if}
					</label>
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Scoring Applicable</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="scoringApplicable"
							class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
							bind:value={scoringApplicable}
							bind:checked={scoringApplicable}
						/>
						{#if form?.errors?.scoringApplicable}
							<p class="text-error-500 text-xs">{form?.errors?.scoringApplicable[0]}</p>
						{/if}
					</label>
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/2" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/2  ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary text-primary-500 btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/2">
					<button
						type="submit"
						class="btn variant-filled-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
