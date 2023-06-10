<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import date from 'date-and-time';
	import { page } from '$app/stores';
	import { InputChip } from '@skeletonlabs/skeleton';

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.newsfeed.id;
	let title = data.newsfeed.Title;
	let description = data.newsfeed.Description;
	let category = data.newsfeed.Category;
	let link = data.newsfeed.Link;
	let language = data.newsfeed.Language;
	let copyright = data.newsfeed.Copyright;
	let favicon = data.newsfeed.Favicon;
	let updated = new Date(data.newsfeed.Updated);
	let image = data.newsfeed.Image;
	$: avatarSource = image;
	let tags = data.newsfeed.Tags;

	//Original data
	let _title = title;
	let _description = description;
	let _category = category;
	let _link = link;
	let _language = language;
	let _copyright = copyright;
	let _favicon = favicon;
	let _updated = updated;
	let _image = image;
	let _tags = tags;

	function handleReset() {
		title = _title;
		description = _description;
		category = _category;
		link = _link;
		language = _language;
		copyright = _copyright;
		favicon = _favicon;
		image = _image;
		tags = _tags;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'Edit',
			path: editRoute
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
			const image_ = response.Data.FileResources[0].Url;
			console.log('image_', image_);
			if (image_) {
				image = image_;
			}
			console.log(image);
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

<main class="h-screen mb-96">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/updateNewsfeedAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Newsfeed
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
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

			<div class="flex  mb-2 lg:mx-16 md:mx-12 mx-10">
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

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Category</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="category"
						bind:value={category}
						placeholder="Enter category here..."
						class="input w-full {form?.errors?.category
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.category}
						<p class="text-error-500 text-xs">{form?.errors?.category[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Link</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="url"
						name="link"
						bind:value={link}
						placeholder="Enter link here..."
						class="input w-full {form?.errors?.link
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.link}
						<p class="text-error-500 text-xs">{form?.errors?.link[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Language *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="language"
						required
						bind:value={language}
						placeholder="Enter language here..."
						class="input w-full {form?.errors?.language
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.language}
						<p class="text-error-500 text-xs">{form?.errors?.language[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Copyright</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="copyright"
						bind:value={copyright}
						placeholder="Enter copyright here..."
						class="input w-full {form?.errors?.copyright
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.copyright}
						<p class="text-error-500 text-xs">{form?.errors?.copyright[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Favicon</span>
					</label>
				</div>
				<div class="flex flex-row gap-4 w-1/2 md:w-2/3 lg:w-2/3 ">
					{#if image === 'undefined'}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={favicon} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="favicon" value={favicon} />
					{#if form?.errors?.favicon}
						<p class="text-error-500 text-xs">{form?.errors?.favicon[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Updated</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="updated"
					>{date.format(updated, 'DD MMM YYYY')}</span
				>
			</div>

			<div class="flex  my-2 mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image *</span>
					</label>
				</div>
				<div class="flex flex-row gap-4 w-1/2 md:w-2/3 lg:w-2/3 ">
					{#if image === 'undefined'}
						<input
							name="fileInput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" required name="image" value={image} />
					{#if form?.errors?.image}
						<p class="text-error-500 text-xs">{form?.errors?.image[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary text-primary-500 lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn variant-filled-secondary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
