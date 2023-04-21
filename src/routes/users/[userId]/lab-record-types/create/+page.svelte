<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/lab-record-types/create`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Record-Types',
			path: labRecordTypesRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<main class="h-screen mb-44">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/createLabRecordTypeAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Lab Record Type
					<a href={labRecordTypesRoute}>
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
						<span>Type Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="typeName"
						required
						placeholder="Enter type name here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Display Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="displayName"
						required
						class="input w-full"
						placeholder="Enter display name here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>SNOMED CODE</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="snowmedCode"
						class="input w-full"
						placeholder="Enter snomed code here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>LOINC CODE</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="loincCode"
						class="input w-full"
						placeholder="Enter loinc code here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Minimum Normal Range</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="normalRangeMin"
						class="input w-full"
						placeholder="Enter minimum normal range here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Maximum Normal Range</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="normalRangeMax"
						class="input w-full"
						placeholder="Enter maximum normal range here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Unit</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="unit" class="input w-full" placeholder="Enter unit here..." />
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
