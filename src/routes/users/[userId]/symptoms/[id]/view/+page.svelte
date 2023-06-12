<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let symptom = data.symptom.Symptom;
	let description = data.symptom.Description;
	let tags_ = data.symptom.Tags;
	let tags = tags_.join(', ');
	let language = data.symptom.Language;
	let imageUrl = data.symptom.ImageUrl ?? undefined;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const symptomId = $page.params.id;
	const editRoute = `/users/${userId}/symptoms/${symptomId}/edit`;
	const viewRoute = `/users/${userId}/symptoms/${symptomId}/view`;
	const symptomRoute = `/users/${userId}/symptoms`;

	const breadCrumbs = [
		{
			name: 'Symptoms',
			path: symptomRoute
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
				<th>View Symptom</th>
				<th class="text-end">
					<a href={symptomRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Symptom</td>
				<td>{symptom}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Language</td>
				<td>{language}</td>
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
