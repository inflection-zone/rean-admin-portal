<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import Tags from '$lib/components/tags.svelte';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	// export let data: PageServerData;
	// let initiaData = {};
	// let id = data.linkage.id;
	// let title = data.linkage.title;
	// let description = data.linkage.description;
	// let link = data.linkage.link;
	// let postDate = data.linkage.postDate;
	// let daysActive = data.linkage.daysActive;
	// let tags_ = data.linkage.Tags;
	// let action = data.linkage.action;
	// let image = data.linkage.image;

	let id = '56789';
	let title = 'Able to do more activities';
	let description = 'xxxxxx';
	let link = 'xxxxx';
	let postDate = '01/01/2020';
	let daysActive = 12;
	let tags = 'xx';
	let action = 'xxx';
	let image = '987654';

	//Original data
	let _title = title;
	let _description = description;
	let _link = link;
	let _postDate = postDate;
	let _daysActive = daysActive;
	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';
	let _action = action;
	let _image = image;

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	function handleReset() {
		title = _title;
		description = _description;
		link = _link;
		postDate = _postDate;
		daysActive = _daysActive;
		tags = JSON.parse(_tags);
		action = _action;
		image = _image;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/linkages/${id}/edit`;
	const viewRoute = `/users/${userId}/linkages/${id}/view`;
	const linkageRoute = `/users/${userId}/linkages`;

	const breadCrumbs = [
		{
			name: 'Linkage',
			path: linkageRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class=" mb-32">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-5 mb-5 ">
		<form
			method="post"
			action="?/updateLinkage"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Linkages
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
					<label class="lable-text font-semibold">Title</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="title"
						bind:value={title}
						placeholder="Enter title here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold" for="description"> Description </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						bind:value={description}
						class="textarea textarea-info w-full"
						placeholder="Enter  description here..."
					/>
				</div>
			</div>

			<div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="learningJourney">Link </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="link"
						name="link"
						bind:value={link}
						placeholder="Enter link here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>
			<div class="flex items-center my-6 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="learningJourney">Post Date </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">{postDate}</div>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="course"> Days Active </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="daysActive"
						bind:value={daysActive}
						placeholder="Enter days active here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="contentType"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<!-- svelte-ignore missing-declaration -->
					<Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} bind:tags />
					<input type="hidden" name="tags" value={JSON.stringify(tags)} />
				</div>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="contentType"> Action </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="action"
						bind:value={action}
						placeholder="Enter action here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="fileUpload"> Image </label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						name="image"
						type="file"
						id="fileUpload"
						class="true input input-bordered input-info w-full"
						placeholder="Image"
					/>
					<button
						class="capitalize btn btn-outline lg:w-[19%] md:w-[22%] md:text-[13px] sm:w-[30%] sm:text-[12px] min-[320px]:w-[40%] min-[320px]:text-[10px]"
						>Upload</button
					>
				</div>
			</div>

			<div class="flex items-center my-6 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
