<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	//////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.knowledgeNugget.id;
	let topicName = data.knowledgeNugget.TopicName;
	let briefInformation = data.knowledgeNugget.BriefInformation !== null ? data.knowledgeNugget.BriefInformation : 'Not specified'; 
	let detailedInformation = data.knowledgeNugget.DetailedInformation !== null ? data.knowledgeNugget.DetailedInformation : 'Not specified';
	let additionalResources_ = data.knowledgeNugget.AdditionalResources;
	let additionalResources = additionalResources_.join(', ');
	let tags_ = data.knowledgeNugget.Tags;
	let tags = tags_.join(', ');

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/knowledge-nuggets/${id}/edit`;
	const viewRoute = `/users/${userId}/knowledge-nuggets/${id}/view`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{ name: 'Knowledge-Nuggets', path: knowledgeNuggetsRoute },
		{ name: 'View', path: viewRoute }
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
				<th class="whitespace-nowrap">View Knowledge Nugget</th>
				<th class="text-end">
					<a href={knowledgeNuggetsRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{topicName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Brief Information</td>
				<td class="!whitespace-normal">{briefInformation}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Detailed Information</td>
				<td class="!whitespace-normal">{detailedInformation}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Additional Resource</td>
				<td>
					{#if additionalResources.length <= 0}
						Additional resource not specified
					{:else}
						<ul>
							{#each additionalResources.split(',') as a}
								<li>{a}</li>
							{/each}
						</ul>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						Tags not specified
					{:else}
						{tags}
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
