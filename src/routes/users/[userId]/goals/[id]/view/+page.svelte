<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let type = data.goal.Type;
	let tags_ = data.goal.Tags;
	let tags = tags_.join(', ');

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const goalId = $page.params.id;
	const editRoute = `/users/${userId}/goals/${goalId}/edit`;
	const viewRoute = `/users/${userId}/goals/${goalId}/view`;
	const goalRoute = `/users/${userId}/goals`;

	const breadCrumbs = [
		{
			name: 'Goals',
			path: goalRoute
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

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Goal</th>
				<th class="text-end">
					<a href={goalRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Type</td>
				<td>{type}</td>
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
		</tbody>
	</table>
</div>