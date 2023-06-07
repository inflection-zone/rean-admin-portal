<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { showMessage } from '$lib/utils/message.utils';
	import type { PageServerData } from './$types';
	import {
		createDataTableStore,
		dataTableHandler,
	} from '@skeletonlabs/skeleton';
	import { selectedItems } from '$lib/store/general.store';
	import CoursesDragDrop from '$lib/components/drag-and-drop/courses-drag-drop.svelte';
	import SelectedCoursesDragDrop from '$lib/components/drag-and-drop/selected-courses-drag-drop.svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let courses = data.courses;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/learning-journeys/create`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;

	let imageUrl = undefined;
	let fileinput;

	const breadCrumbs = [
		{
			name: 'Learning-Journeys',
			path: learningJourneyRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/file-resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				filename: filename
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			console.log('imageResourceId', imageResourceId);
			const imageUrl_ = response.Data.FileResources[0].Url;
			console.log('imageUrl_', imageUrl_);
			if (imageUrl_) {
				imageUrl = imageUrl_;
			}
			console.log(imageUrl);
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const onFileSelected = async (e) => {
		let f = e.target.files[0];
		const filename = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await upload(e.target.result, filename);
		};
	};

	let selectedCourses = [];
	$:selectedCourses

	let courseIds = $selectedItems;
	$:courseIds;

	console.log("courseIds", courseIds);

	const dataTableStore = createDataTableStore(
		courses,
		{
			search: '',
		}
	);
	dataTableStore.subscribe((model) => dataTableHandler(model));

</script>

<main class="h-screen mb-32">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="h-screen mb-10 ">
		<form
			method="post"
			action="?/createLearningJourneyAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Learning Journey
					<a href={learningJourneyRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

			<div class="flex items-start mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						required
						placeholder="Enter  name here..."
						class="input w-full {form?.errors?.name
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.name ?? ''}
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</div>
			</div>
			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Prefrence Weight</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="preferenceWeight"
						placeholder="Enter prefrence weight here..."
						class="input w-full {form?.errors?.preferenceWeight
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.preferenceWeight ?? ''}
					/>
					{#if form?.errors?.preferenceWeight}
						<p class="text-error-500 text-xs">{form?.errors?.preferenceWeight[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						placeholder="Enter description here..."
						class="textarea w-full {form?.errors?.description
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 mt-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Duration In Days</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="number"
						name="durationInDays"
						placeholder="Enter duration here..."
						class="input w-full {form?.errors?.durationInDays
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.durationInDays ?? ''}
					/>
					{#if form?.errors?.durationInDays}
						<p class="text-error-500 text-xs">{form?.errors?.durationInDays[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-4 mt-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Courses</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
					class="input mb-3"
					bind:value={$dataTableStore.search}
					type="search"
					placeholder="Search course here..."
					/>
				 <div class="mb-4 mt-1">
						<CoursesDragDrop courses={$dataTableStore.filtered}/>
				 </div>
				<div>
					<SelectedCoursesDragDrop selectedCourses={selectedCourses}/>
				</div>
				<input
				name="courseIds"
				bind:value={$selectedItems}
				placeholder="Search course here..."
				hidden
				/>
					{#if form?.errors?.courseIds}
						<p class="text-error-500 text-xs">{form?.errors?.courseIds[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						name="fileInput"
						type="file"
						id="fileUpload"
						class="input w-full"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" name="imageUrl" value={imageUrl} />
					{#if form?.errors?.imageUrl}
						<p class="text-error-500 text-xs">{form?.errors?.imageUrl[0]}</p>
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


<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 1;
	}
</style>
