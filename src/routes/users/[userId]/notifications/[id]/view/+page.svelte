<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import date from 'date-and-time';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';

	export let data: PageServerData;
	let title = data.notification.Title;
	let Body = data.notification.Body;
	let type = data.notification.Type;
	let sentOn = new Date(data.notification.SentOn);
	let broadcastToAll = data.notification.BroadcastToAll;
	let imageUrl = data.notification.ImageUrl;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const notificationId = $page.params.id;
	const editRoute = `/users/${userId}/notifications/${notificationId}/edit`;
	const viewRoute = `/users/${userId}/notifications/${notificationId}/view`;
	const notificationRoute = `/users/${userId}/notifications`;

	const breadCrumbs = [
		{
			name: 'Notifications',
			path: notificationRoute,
			home: true
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
				<th>View Notification</th>
				<th class="text-end">
					<a href={notificationRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
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
				<td>Body</td>
				<td>{Body}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Sent On</td>
				<td>{date.format(sentOn, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Broadcast To All</td>
				<td>{broadcastToAll}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Image</td>
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
