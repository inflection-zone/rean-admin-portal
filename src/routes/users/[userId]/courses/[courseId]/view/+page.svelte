<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.course.id;
	let name = data.course.Name;
	let description = data.course.Description;
	let durationInDays = data.course.DurationInDays;
	let imageUrl = data.course.ImageUrl;
	let modules = data.course.Modules;

	modules = modules.sort((a, b) => a.Sequence - b.Sequence);
	console.log(modules);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const viewRoute = `/users/${userId}/courses/${courseId}/view`;
	const courseRoute = `/users/${userId}/courses`;

	const moduleViewRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{ name: 'Courses', path: courseRoute },
		{ name: 'View', path: viewRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a
		href={`/users/${userId}/courses/${courseId}/modules/create`}
		class="btn variant-filled-secondary ml-auto">Add Module</a
	>
	<a href={`/users/${userId}/courses/${courseId}/edit`} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container !border !border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Course</th>
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
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Duration in Days</td>
				<td>{durationInDays}</td>
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
				<td class="align-top">Modules</td>
				<td>
					{#if modules.length <= 0}
						Modules are not available!
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each modules as module, i}
								<TreeBranch defaultClosed>
									<div slot="root" class="flex">
										<a href={moduleViewRoute(courseId, module.id)}>
											<div class="flex">
												<img class="w-6" alt="logo" src="/module.png" />
												{module.Sequence}-{module.Name}
											</div>
										</a>
									</div>
									{#each module.Contents.sort((a, b) => a.Sequence - b.Sequence) as content, i}
										<TreeLeaf>
											<div class="flex">
												<a href={contentViewRoute(courseId, module.id, content.id)}>
													<div class="flex">
														<img class="w-6" alt="logo" src="/content.png" />
														{content.Sequence}-{content.Title}
													</div>
												</a>
											</div>
										</TreeLeaf>
									{/each}
								</TreeBranch>
							{/each}
						</TreeView>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
