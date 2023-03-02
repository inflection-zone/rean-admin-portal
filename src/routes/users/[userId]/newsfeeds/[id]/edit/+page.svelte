<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { InputChip } from '@skeletonlabs/skeleton';

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';
	// function handleTags(event) {
	// 	retrievedTags = event.detail.tags;
	// }

	export let data: PageServerData;
	let initiaData = {};
	let id = data.newsfeed.id;
	let title = data.newsfeed.Title;
	let description = data.newsfeed.Description;
	let link = data.newsfeed.Link;
	let language = data.newsfeed.Language;
	let copyright = data.newsfeed.Copyright;
	let favicon = data.newsfeed.Favicon;
	let image = data.newsfeed.Image;
	let tags = data.newsfeed.Tags;
	// let providerName = data.newsfeed.ProviderName;
	// let providerEmail = data.newsfeed.ProviderEmail;
	// let providerLink = data.newsfeed.ProviderLink;

	//Original data
	let _title = title;
	let _description = description;
	let _link = link;
	let _language = language;
	let _copyright = copyright;
	let _favicon = favicon;
	let _image = image;
	let _tags = tags;
	// let _providerName = providerName;
	// let _providerEmail = providerEmail;
	// let _providerLink = providerLink;

	function handleReset() {
		title = _title;
		description = _description;
		link = _link;
		language = _language;
		copyright = _copyright;
		favicon = _favicon;
		image = _image;
		tags = _tags;
		// providerName = _providerName;
		// providerEmail = _providerEmail;
		// providerLink = _providerLink;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;

	const breadCrumbs = [
		{
			name: 'Newsfeed',
			path: newsfeedRoute
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
			action="?/updateNewsfeedAction"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Newsfeed
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
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
					<input type="text" name="title" bind:value={title} placeholder="Enter title here..." class="input w-full " />
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

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Link</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="link" bind:value={link} placeholder="Enter link here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Language</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="language" bind:value={language} placeholder="Enter language here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Copyright</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="copyright" bind:value={copyright} placeholder="Enter copyright here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Favicon</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="favicon" bind:value={favicon} placeholder="Enter favicon here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						name="image"
						type="file"
						bind:value={image}
						id="fileUpload"
						class="input w-full"
						placeholder="Image"
					/>
					<button
						class="capitalize btn variant-filled-primary lg:w-[19%] md:w-[22%] md:text-[13px] sm:w-[30%] sm:text-[12px] min-[320px]:w-[40%] min-[320px]:text-[10px]"
						>Upload</button
					>
				</div>
			</div>

			<div class="flex items-center mb-1 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tag</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<InputChip
						chips="variant-filled-error rounded-2xl"
						name="tags"
						placeholder={tagsPlaceholder}
					/>
					<input type="hidden" name="tags" class="input" value={JSON.stringify(retrievedTags)} />
				</div>
			</div>

			<!-- <div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					
					<label class="label">
						<span>Provider Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" bind:value={providerName} name="providerName" placeholder="Enter provider name here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					
					<label class="label">
						<span>Provider Email</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="providerEmail" bind:value={providerEmail} placeholder="Enter provider email here..." class="input w-full " />
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					
					<label class="label">
						<span>Provider Link</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input type="text" name="providerLink" bind:value={providerLink} placeholder="Enter provider link here..." class="input w-full " />
				</div>
			</div> -->

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
