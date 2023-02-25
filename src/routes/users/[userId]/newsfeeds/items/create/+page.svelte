<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/newsfeeds/items/create`;
	const itemRoute = `/users/${userId}/newsfeeds/items`;

	const breadCrumbs = [
		{
			name: 'Item',
			path: itemRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-5 mb-5 ">
		<form
			method="post"
			action="?/createItem"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Items In Newsfeed
					<a href={itemRoute}>
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
						<span>Title</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="title"
						placeholder="Enter title here..."
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
						class="textarea w-full"
						placeholder="Enter description here..."
					/>
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Newsfeed</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="newsfeed"
						placeholder="Enter newsfeed here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select class="select w-full" placeholder="Select type here...">
						<option selected>Careplan</option>
						<option>Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
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
						type="text"
						name="link"
						placeholder="Enter link here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Author</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="author"
						placeholder="Enter author here..."
						class="input w-full "
					/>
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

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-primary w-full mb-10 "> Submit </button>
				</div>
			</div>
		</form>
	</div>
</main>
