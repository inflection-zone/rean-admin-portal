<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';

	/////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.content.id;
	let title = data.content.Title;
	let description = data.content.Description;
	let contentType = data.content.ContentType;
	let resourceLink = data.content.ResourceLink;
	let sequence = data.content.Sequence;
	let imageUrl = data.content.ImageUrl;
	$: avatarSource = imageUrl;
	//Original data
	let _title = title;
	let _description = description;
	let _contentType = contentType;
	let _resourceLink = resourceLink;
	let _sequence = sequence;
	let _imageUrl = imageUrl;

	function handleReset() {
		title = _title;
		description = _description;
		contentType = _contentType;
		resourceLink = _resourceLink;
		sequence = _sequence;
		imageUrl = _imageUrl;
	}

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
  const moduleId = $page.params.moduleId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/view`;
	const contentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;

	const breadCrumbs = [
		{
			name: 'Contents',
			path: contentRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
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
			action="?/updateCourseContentAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit content
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
						<span>Title</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="title"
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full "
					/>
				</div>
			</div>
			<div class="flex items-start mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
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

			<div class="flex items-center mt-2 nb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Content Type</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select w-full"
						bind:value={contentType}
						placeholder="Select content type here..."
						name = 'contentType'
					>
            <option>Text</option>
						<option>Pdf</option>
						<option>Video</option>
						<option>Assessment</option>
					</select>
				</div>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Resource Link</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="resourceLink"
						bind:value={resourceLink}
						placeholder="Enter resource link here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
						<span>Sequence</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
					bind:value={sequence}
						type="number"
						name="sequence"
						placeholder="Enter sequence here..."
						class="input w-full "
					/>
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