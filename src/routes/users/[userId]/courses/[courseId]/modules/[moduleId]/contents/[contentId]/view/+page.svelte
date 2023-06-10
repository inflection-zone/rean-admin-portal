<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let title = data.content.Title;
	let description = data.content.Description;
	let sequence = data.content.Sequence;
	let contentType = data.content.ContentType;
	let resourceLink = data.content.ResourceLink;
	let imageUrl = data.content.ImageUrl;
	let durationInMins = data.content.DurationInMins;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const contentId = $page.params.contentId;
	const courseRoute = `/users/${userId}/courses`;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;
	const contentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/view`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		},
		{
			name: 'Modules',
			path: moduleRoute
		},
		{
			name: 'Content',
			path: contentRoute
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
				<th>View Content</th>
				<th class="text-end">
					<a href={moduleRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
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
				<td>Sequence</td>
				<td>{sequence}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Duration In Minutes</td>
				<td>{durationInMins}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Content Type</td>
				<td>{contentType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Resource Link</td>
				<td>{resourceLink}</td>
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
