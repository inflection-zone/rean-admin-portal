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
	let title = data.notice.Title;
	let description = data.notice.Description;
	let link = data.notice.Link;
	let postDate = new Date(data.notice.PostDate);
	let daysActive = data.notice.DaysActive;
	let tags_ = data.notice.Tags;
	let tags = tags_.join(', ');
	let action = data.notice.Action;
	let imageUrl = data.notice.ImageUrl;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const noticeId = $page.params.id;
	const editRoute = `/users/${userId}/notices/${noticeId}/edit`;
	const viewRoute = `/users/${userId}/notices/${noticeId}/view`;
	const noticeRoute = `/users/${userId}/notices`;

	const breadCrumbs = [
		{
			name: 'Notices',
			path: noticeRoute
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
				<th>View Notice</th>
				<th class="text-end">
					<a href={noticeRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
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
				<td>Post Date</td>
				<td>{date.format(postDate, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Days Active</td>
				<td>{daysActive}</td>
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
				<td>Action</td>
				<td>{action}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
