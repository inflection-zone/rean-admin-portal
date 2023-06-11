<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Image from '$lib/components/image.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let id = data.course.id;
	let name = data.course.Name;
	let description = data.course.Description;
	let durationInDays = data.course.DurationInDays;
	let imageUrl = data.course.ImageUrl;
	$: avatarSource = imageUrl;

	//Original data
	let _name = name;
	let _description = description;
	let _imageUrl = imageUrl;
	let _durationInDays = durationInDays;

	function handleReset() {
		name = _name;
		description = _description;
		imageUrl = _imageUrl;
		durationInDays = _durationInDays;
	}

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const editRoute = `/users/${userId}/courses/${courseId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/view`;
	const courseRoute = `/users/${userId}/courses`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
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
			const imageResourceId = response.Data.FileResources[0].id;
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

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateCourseAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Course</th>
				<th class="text-end">
					<a href={viewRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name *</td>
				<td>
					<input
					type="text"
					name="name"
					bind:value={name}
					placeholder="Enter name here..."
					class="input w-full {form?.errors?.name
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
				/>
				{#if form?.errors?.name}
					<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
				{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Description</td>
				<td>
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="textarea w-full  {form?.errors?.description
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Duration In Days</td>
				<td>
					<input
						type="number"
						name="durationInDays"
						placeholder="Enter duration here..."
						bind:value={durationInDays}
						class="input w-full {form?.errors?.durationInDays
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.durationInDays}
						<p class="text-error-500 text-xs">{form?.errors?.durationInDays[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						<input
							name="fileinput"
							type="file"
							required
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
					{#if form?.errors?.imageUrl}
						<p class="text-error-500 text-xs">{form?.errors?.imageUrl[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
