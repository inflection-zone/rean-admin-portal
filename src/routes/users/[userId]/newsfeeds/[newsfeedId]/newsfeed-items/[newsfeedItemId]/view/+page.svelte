<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import date from 'date-and-time';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.newsfeedItem.id;
	let title = data.newsfeedItem.Title;
	let description = data.newsfeedItem.Description;
	let link = data.newsfeedItem.Link;
	let content = data.newsfeedItem.Content;
	let authorName = data.newsfeedItem.AuthorName;
	let authorEmail = data.newsfeedItem.AuthorEmail;
	let authorLink = data.newsfeedItem.AuthorLink;
	let publishingDate = new Date(data.newsfeedItem.PublishingDate);
	let image = data.newsfeedItem.Image;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const newsfeedId = $page.params.newsfeedId;
	const editRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const newsfeedItemRoute = `/users/${userId}/newsfeeds/newsfeed-items`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'Newsfeed-Items',
			path: newsfeedItemRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container border border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Newsfeed Item</th>
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
				<td>Link</td>
				<td>{link}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Content</td>
				<td>{content}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Author Name</td>
				<td>{authorName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Author Email</td>
				<td>{authorEmail}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Author Link</td>
				<td>{authorLink}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Published Date</td>
				<td>{date.format(publishingDate, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Image</td>
				<td>
					{#if image === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
