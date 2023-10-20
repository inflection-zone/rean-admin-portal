<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	///////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let notification = data.notification;
	let title = notification.Title;
	let Body = notification.Body !== null ? notification.Body : 'Not specified';
	let type = notification.Type;
	let sentOn = new Date(notification.SentOn);
	let broadcastToAll = notification.BroadcastToAll;
	let imageUrl = notification.ImageUrl;

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
	<a href={editRoute} class="btn variant-filled-secondary ml-auto w-22 h-10 px-0">
		<div class="flex items-center">
			<Icon
			cls="stroke-surface-100 stroke-2 fill-none"
			h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
			<span class="pr-4">Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Notification</th>
				<th class="text-end">
					<a href={notificationRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
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
				<td>Body</td>
				<td>{Body}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sent On</td>
				<td>{date.format(sentOn, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Broadcast To All</td>
				<td>{broadcastToAll}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
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
