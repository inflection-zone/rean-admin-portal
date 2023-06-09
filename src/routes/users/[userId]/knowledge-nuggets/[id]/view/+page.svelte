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
	let id = data.knowledgeNugget.id;
	let topicName = data.knowledgeNugget.TopicName;
	let briefInformation = data.knowledgeNugget.BriefInformation;
	let detailedInformation = data.knowledgeNugget.DetailedInformation;
	let additionalResources_ = data.knowledgeNugget.AdditionalResources;
	let additionalResources = additionalResources_.join(', ');
	let tags_ = data.knowledgeNugget.Tags;
	let tags = tags_.join(', ');

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/knowledge-nuggets/${id}/edit`;
	const viewRoute = `/users/${userId}/knowledge-nuggets/${id}/view`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute
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
				<th>View Knowledge Nugget</th>
				<th class="text-end">
					<a href={knowledgeNuggetsRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name</td>
				<td>{topicName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Brief Information</td>
				<td>{briefInformation}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Detailed Information</td>
				<td>{detailedInformation}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Additional Resource</td>
				<td>
					{#if additionalResources.length <= 0}
					<span class="span">Additional resource not specified</span>
				{:else}
					<span class="span">{additionalResources} </span>
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
		</tbody>
	</table>
</div>

