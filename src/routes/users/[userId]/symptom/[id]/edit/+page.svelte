<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import Tags from '$lib/components/tags.svelte';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	// export let data: PageServerData;
	// let initiaData = {};
	// let id = data.symptom.id;
	// let symptom = data.symptom.symptom;
	// let description = data.symptom.description;
	// let tags_ = data.symptom.tags;
	// let language = data.symptom.language;
	// let imageResourceId = data.symptom.imageResourceId;

	let id = '56789';
	let symptom = 'abc';
	let description = 'xxx xxx xx xxx';
	let tags = 'xxxx';
	let language = 'Eng';
	let imageResourceId = '2345567';

	//Original data
	let _symptom = symptom;
	let _description = description;
	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';
	let _language = language;
	let _imageResourceId = imageResourceId;

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	function handleReset() {
		description = _description;
		tags = JSON.parse(_tags);
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/symptom/${id}/edit`;
	const viewRoute = `/users/${userId}/symptom/${id}/view`;
	const symptomRoute = `/users/${userId}/symptom`;

	const breadCrumbs = [
		{
			name: 'Symptom',
			path: symptomRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateSymptom"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Symptom
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<!-- <div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
				
					<label class="lable-text font-semibold"> Symptom </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="symptom"
						bind:value={symptom}
						placeholder="Enter symptom here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div> -->
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Symptom</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="symptom">{symptom}</span>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Description </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						class="textarea textarea-info w-full"
						name="description"
						placeholder="Enter description here..."
						bind:value={description}
					/>
				</div>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<!-- svelte-ignore missing-declaration -->
					<Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} bind:tags />
					<input type="hidden" name="tags" value={JSON.stringify(tags)} />
				</div>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold" for=""> Language </label>
				</div>
				<span class="w-1/2 md:w-2/3 lg:w-2/3"> {language} </span>
			</div>
			<!-- <div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					
					<label class="lable-text font-semibold"> Language </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="language"
						bind:value={language}
						placeholder="Enter language here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div> -->

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold" for=""> Image Resource Id </label>
				</div>
				<span class="w-1/2 md:w-2/3 lg:w-2/3"> {imageResourceId} </span>
			</div>

			<div class="flex items-center my-10 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
