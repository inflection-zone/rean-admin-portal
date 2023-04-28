<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import date from 'date-and-time';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
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
	let tags_ = data.newsfeed.Tags;
	let tags = tags_.join(', ');
	let newsfeedItems = data.newsfeed.FeedItems;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const newsfeedId = $page.params.newsfeedId;
	const editRoute = `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const newsfeedItemRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/create`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-56">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="get"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Newsfeed</div>
					<div class="lg:block md:block hidden">View Newsfeed</div>
					<a href={newsfeedRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
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
				<span class="span w-1/2 md:2/3 lg:2/3" id="title">{title}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description"> {description} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Category</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="category"> {category} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Link</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="link"> {link} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Language</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="language"> {language} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Copyright</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="copyright"> {copyright} </span>
			</div>

			<div class="flex items-start mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Favicon</span>
					</label>
				</div>
				{#if favicon === 'undefined'}
					<span class="span">Image not specified</span>
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={favicon} w="24" h="24" />
				{/if}
				<!-- <span class="span w-1/2 md:2/3 lg:2/3" id="favicon"> {favicon} </span> -->
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

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				{#if image === 'undefined'}
					<span class="span">Image not specified</span>
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
				{/if}
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags</span>
					</label>
				</div>
				{#if tags.length <= 0}
					<span class="span">Tags not specified</span>
				{:else}
					<span class="span w-1/2 md:2/3 lg:2/3">{tags} </span>
				{/if}
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Newsfeed Items</span>
					</label>
				</div>
				{#if newsfeedItems.length <= 0}
					<span class="span">Newsfeed Items are not available!</span>
				{:else}
					<ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="newsfeedItems">
						<!-- {newsfeedItemTitle} -->
						{#each newsfeedItems as newsfeedItem}
							<li>{newsfeedItem.Title}</li>
						{/each}
					</ol>
				{/if}
			</div>

			<div class="flex  items-center mt-10 lg:mx-10 md:mx-16">
				<div class="lg:w-8/12 min-[280px]:w-1/3 sm:w-1/2 md:w-1/2" />
				<div class="flex lg:w-1/3 gap-3 min-[280px]:w-2/4 ">
					<a href={newsfeedItemRoute}>
						<button
							type="submit"
							class="btn variant-filled-primary lg:w-full md:w-28 sm:w-28 min-[280px]:w-28 w-20 mb-8 lg:mr-4 mr-1   "
						>
							Add Items
						</button>
					</a>
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 min-[280px]:w-24 w-20 mb-8 lg:mr-4 mr-1 "
						>
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
