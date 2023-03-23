<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { showMessage } from '$lib/utils/message.utils';
	import Image from '$lib/components/image.svelte';

	export let data: PageServerData;
	let id = data.module.id;
	let name = data.module.Name;
	let description = data.module.Description;
	let sequence = data.module.Sequence;
	let durationInMins = data.module.DurationInMins;
	let imageUrl = data.module.ImageUrl;
	$: avatarSource = imageUrl;

	//Original data
	let _name = name;
	let _description = description;
	let _sequence = sequence;
	let _durationInMins = durationInMins;
	let _imageUrl = imageUrl;

	function handleReset() {
		name = _name;
		description = _description;
		sequence = _sequence;
		durationInMins = _durationInMins;
		imageUrl = _imageUrl;
	}

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules`;
	const courseRoute = `/users/${userId}/courses`;

	const breadCrumbs = [
		{
			name: 'Course',
			path: courseRoute
		},
		{
			name: 'Module',
			path: moduleRoute
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

	<div class="px-5 mb-5 ">
		<form
			method="post"
			action="?/updateModuleAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Module
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
						<span>Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={name}
						placeholder="Enter name here..."
						class="input w-full "
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						bind:value={description}
						class="textarea w-full"
						placeholder="Enter description here..."
					/>
				</div>
			</div>
			<!-- <div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="label">
						<span>Sequence</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="number"
						name="sequence"
						placeholder="Enter sequence here..."
						class="input w-full "
						bind:value={sequence}
					/>
				</div>
			</div> -->

			<div class="flex items-center mb-4 mt-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Duration In Mins</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="number"
						name="durationInMins"
						placeholder="Enter sequence here..."
						class="input w-full "
						bind:value={durationInMins}
					/>
				</div>
			</div>
			<!-- <div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
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
			 -->
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
