<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////

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

	console.log("newsfeed",data.newsfeed)
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
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Newsfeed</th>
				<th class="text-end">
					<a href={newsfeedRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Category</td>
				<td>{category}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Link</td>
				<td>{link}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language</td>
				<td>{language}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Copyright</td>
				<td>{copyright}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Favicon</td>
				<td>
					{#if favicon === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={favicon} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Updated</td>
				<td>{date.format(updated, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if image === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
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
