<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let initiaData = {};
	let id = data.assessment.id;
	let assetCode = data.assessment.assetCode;
	let title = data.assessment.title;
	let description = data.assessment.description;
	let displayCode = data.assessment.displayCode;
	let type = data.assessment.type;
	let provider = data.assessment.provider;
	let providerAssessmentCode = data.assessment.providerAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessment.serveListNodeChildrenAtOnce;

	//Original data
	let _title = title;
	let _description = description;
	let _displayCode = displayCode;
	let _type = type;
	let _provider = provider;
	let _providerAssessmentCode = providerAssessmentCode;
	let _serveListNodeChildrenAtOnce = serveListNodeChildrenAtOnce;

	function handleReset() {
		title = _title;
		description = _description;
		displayCode = _displayCode;
		type = _type;
		provider = _provider;
		providerAssessmentCode = _providerAssessmentCode;
		serveListNodeChildrenAtOnce = _serveListNodeChildrenAtOnce;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/assessments/${id}/edit`;
	const viewRoute = `/users/${userId}/assessments/${id}/view`;
	const assessmentsRoutes = `/users/${userId}/assessments`;

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

	<div class="h-screen mb-10">
		<form
			method="post"
			action="?/updateAssessmentAction"
			class="w-full max-w-4xl  bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto"
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

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Asset Code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="assetCode">{assetCode}</span>
			</div>

			<div class="flex items-center mb-4 mt-10 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title*</span>
					</label>
				</div>
				<div class="w-2/3">
					<input
						type="text"
						name="name"
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-2/3">
					<textarea
						name="description"
						bind:value={description}
						class="textarea w-full"
						placeholder="Enter description here..."
					/>
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Display code</span>
					</label>
				</div>
				<div class="w-2/3">
					<input
						type="text"
						name="displayCode"
						bind:value={displayCode}
						class="input w-full"
						placeholder="Enter display code here"
					/>
				</div>
			</div>
			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<div class="w-2/3">
					<select class="select w-full" bind:value={type} placeholder="Select type here...">
						<option selected>Careplan</option>
						<option>Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>
			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider</span>
					</label>
				</div>
				<div class="w-2/3">
					<input
						type="text"
						name="provider"
						bind:value={provider}
						class="input w-full"
						placeholder="Enter provider here"
					/>
				</div>
			</div>

			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider Assessment Code</span>
					</label>
				</div>
				<div class="w-2/3">
					<input
						type="text"
						name="providerAssessmentCode"
						bind:value={providerAssessmentCode}
						class="input w-full"
						placeholder="Enter provider assessment code here..."
					/>
				</div>
			</div>
			<div class="flex items-center my-4 mx-16">
				<div class="w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Servelist Node Children At Once</span>
					</label>
				</div>
				<div class="w-2/3">
					<input
						type="text"
						bind:value={serveListNodeChildrenAtOnce}
						name="servelistNodeChildrenAtOnce"
						class="input w-full"
						placeholder="Enter servelist node children at once here..."
					/>
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
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
