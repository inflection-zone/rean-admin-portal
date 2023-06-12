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

	//////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let name = data.module.Name;
	let description = data.module.Description;
	let durationInMins = data.module.DurationInMins;
	let imageUrl = data.module.ImageUrl;
	let contents = data.module.Contents;
	let sequence = data.module.Sequence;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentCreateRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	const courseRoute = `/users/${userId}/courses/${courseId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		},
		{
			name: 'Modules',
			path: viewRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={contentCreateRoute} class="btn variant-filled-secondary ml-auto">Add Content</a>
	<a href={editRoute} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container border border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Module</th>
				<th class="text-end">
					<a href={courseRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Description</td>
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
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Contents</td>
				<td>
					{#if contents.length <= 0}
						<span class="span">Contents are not available!</span>
					{:else}
						<ol class="span list-decimal" id="contents">
							{#each contents as content}
								<a href={contentViewRoute(courseId, moduleId, content.id)}>
									<li>{content.Title}</li>
								</a>
							{/each}
						</ol>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
