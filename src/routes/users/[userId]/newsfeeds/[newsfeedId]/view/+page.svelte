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
	const viewItemRoute = (id) => `/users/${userId}/newsfeeds/${id}/newsfeed-items/${id}/view`;
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

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={newsfeedItemRoute} class="btn variant-filled-secondary ml-auto">Add Items</a>
	<a href={editRoute} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container border border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Newsfeed</th>
				<th class="text-end">
					<a href={newsfeedRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Category</td>
				<td>{category}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Link</td>
				<td>{link}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Language</td>
				<td>{language}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Copyright</td>
				<td>{copyright}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Favicon</td>
				<td>
					{#if favicon === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={favicon} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Updated</td>
				<td>{date.format(updated, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Image</td>
				<td>
					{#if image === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Newsfeed Items</td>
				<td>
					{#if newsfeedItems.length <= 0}
						<span class="span">Newsfeed Items are not available!</span>
					{:else}
						<ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="newsfeedItems">
							{#each newsfeedItems as newsfeedItem}
								<a href={viewItemRoute(newsfeedItem.id)}>
									<li>{newsfeedItem.Title}</li>
								</a>
							{/each}
						</ol>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
