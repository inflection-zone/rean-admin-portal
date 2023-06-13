<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import {
		faMultiply,
		faPen,
		faList,
		faMessage,
		faQuestionCircle
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let courses = data.learningJourney.Courses;
	let learningPathId = $page.params.learningPathId;
	let id = data.learningJourney.id;
	let name = data.learningJourney.Name;
	let preferenceWeight = data.learningJourney.PreferenceWeight;
	let description = data.learningJourney.Description;
	let durationInDays = data.learningJourney.DurationInDays;
	let imageUrl = data.learningJourney.ImageUrl;

	courses = courses.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/learning-journeys/${learningPathId}/edit`;
	const viewRoute = `/users/${userId}/learning-journeys/${learningPathId}/view`;
	const courseRoute = `/users/${userId}/courses`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;
	const courseViewRoute = (courseId) => `/users/${userId}/courses/${courseId}/view`;
	const moduleViewRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{ name: 'Learning-Journeys', path: learningJourneyRoute },
		{ name: 'View', path: viewRoute }
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
				<th>View Learning Journey</th>
				<th class="text-end">
					<a href={learningJourneyRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
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
				<td>Prefrence Weight</td>
				<td>{preferenceWeight}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Duration In Days</td>
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
				<td class="align-top">Courses</td>
				<td>
					{#if courses.length <= 0}
						<div>Courses are not available</div>
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each courses as course, i}
								<TreeBranch defaultClosed>
									<div slot="root" class="flex">
										<a href={courseViewRoute(course.id)}>
											<div class="flex">
												<img class="w-6 mr-2 " alt="logo" src="/course.png" />
												{i + 1}-{course.Name}
											</div>
										</a>
									</div>
									{#if course.Modules.length <= 0}
										<div />
									{:else}
										{#each course.Modules.sort((a, b) => a.Sequence - b.Sequence) as module, i}
											<TreeBranch defaultClosed>
												<div slot="root" class="flex flex-col">
													<a href={moduleViewRoute(course.id, module.id)}>
														<div class="flex">
															<img class="w-6 mr-2 mb-4" alt="logo" src="/module.png" />
															{module.Sequence}-{module.Name}
														</div>
													</a>
												</div>
												<!-- svelte-ignore empty-block -->
												{#if module.Contents.length <= 0}{:else}
													{#each module.Contents.sort((a, b) => a.Sequence - b.Sequence) as content, i}
														<TreeLeaf>
															<div class="flex">
																<a href={contentViewRoute(course.id, module.id, content.id)}>
																	<div class="flex">
																		<img class="w-6 mr-2 mb-4" alt="logo" src="/content.png" />
																		{content.Sequence}-{content.Title}
																	</div>
																</a>
															</div>
														</TreeLeaf>
													{/each}
												{/if}
											</TreeBranch>
										{/each}
									{/if}
								</TreeBranch>
							{/each}
						</TreeView>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
