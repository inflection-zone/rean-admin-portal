<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let allCources = data.courses;
	let id = data.learningJourney.id;
	let name = data.learningJourney.Name;
	let preferenceWeight = data.learningJourney.PreferenceWeight;
	let description = data.learningJourney.Description;
	let courses = data.learningJourney.Courses;
	let imageUrl = data.learningJourney.ImageUrl;
	$: avatarSource = imageUrl;
	const courseNames = courses.map(item => item.Name);
	console.log(courseNames);
	//Original data
	let _name = name;
	let _preferenceWeight = preferenceWeight;
	let _description = description;
	let _imageUrl = imageUrl;

	function handleReset() {
		name = _name;
		preferenceWeight = _preferenceWeight;
		description = _description;
		imageUrl = _imageUrl;
	}

	const userId = $page.params.userId;
	const learningPathId = $page.params.learningPathId;
	const editRoute = `/users/${userId}/learning-journeys/${learningPathId}/edit`;
	const viewRoute = `/users/${userId}/learning-journeys/${learningPathId}/view`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;

	const breadCrumbs = [
		{
			name: 'Learning-Journey',
			path: learningJourneyRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		//console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		//console.log(JSON.stringify(data));
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
			// const imageResourceId = response.Data.FileResources[0].id;
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
			avatarSource = e.target.result;
			await upload(e.target.result, filename);
		};
	};
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateLearningJourneyAction"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Learning Journey
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
				</div>
			</div>

			<div class="hidden">{id}</div>
			<div class="flex items-start mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						required
						bind:value={name}
						placeholder="xxxxxxxxxxxxxx"
						class="input w-full "
					/>
				</div>
			</div>
			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Preference Weight</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="preferenceWeight"
						bind:value={preferenceWeight}
						placeholder="Enter prefrence weight here..."
						class="input w-full "
					/>
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
						class="textarea w-full"
						bind:value={description}
						name="description"
						placeholder="Enter description here..."
					/>
				</div>
			</div>

			<div class="flex items-start mt-2 mb-4  lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Courses</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
					 	name="courseIds"
						class="select"
						multiple
						placeholder="Select course here..."
						value={courseNames}
					>
					{#each allCources  as course}
						<option value={course.id}>{course.Name}</option>
					{/each}
					</select>
				</div>
			</div>

			<div class="flex items-start my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<div class="flex flex-row gap-2 w-1/2 md:w-2/3 lg:w-2/3 ">
						{#if imageUrl === 'undefined'}
							<input
								name="fileinput"
								type="file"
								class="true input w-full"
								placeholder="Image"
								on:change={async (e) => await onFileSelected(e)}
							/>
						{:else}
							<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
							<input
								name="fileinput"
								type="file"
								class="true input w-full"
								placeholder="Image"
								on:change={async (e) => await onFileSelected(e)}
							/>
						{/if}
						<input type="hidden" name="imageUrl" value={imageUrl} />
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
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
