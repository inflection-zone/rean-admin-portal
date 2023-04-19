<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/assessment-templates/create`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;

	const breadCrumbs = [
		{
			name: 'Assessment-Templates',
			path: assessmentsRoutes
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div>
	<form
		method="post"
		action="?/createAssessmentAction"
		class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
	>
		<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
			<div class="ml-3 relative flex flex-row text-white text-xl">
				Create Assessment Template
				<a href={assessmentsRoutes}>
					<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
				</a>
			</div>
		</div>

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
					required
					placeholder="Enter title here..."
					class="input w-full "
				/>
			</div>
		</div>

		<div class="flex items-start mt-4 mb-2 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label mt-2">
					<span>Description</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<textarea
					name="description"
					class="textarea w-full"
					placeholder="Enter description here..."
				/>
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
				<select class="select w-full" name="type" placeholder="Select type here...">
					<option selected>Careplan</option>
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
				<input type="text" name="provider" class="input w-full" placeholder="Enter provider here" />
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
					class="input w-full"
					placeholder="Enter provider assessment code here..."
				/>
			</div>
		</div>
		<div class="flex items-center my-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Servelist Node Children At Once</span>
				</label>
			</div>
			<div class="w-1/2 md:w-1/2 md:w-2/3 lg:w-2/3 lg:w-1/2 md:w-2/3 lg:w-2/3">
				<label class="label cursor-pointer">
					<input
						type="checkbox"
						name="serveListNodeChildrenAtOnce"
						value="true"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
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
			<div class="w-1/2 md:w-1/2 md:w-2/3 lg:w-2/3 lg:w-1/2 md:w-2/3 lg:w-2/3">
				<label class="label cursor-pointer">
					<input
						type="checkbox"
						name="scoringApplicable"
						value="true"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</label>
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
