<script lang="ts">
	import CollapsibleSection from '$lib/components/courses.view/collapsible.section.svelte';
	import { createEventDispatcher } from 'svelte';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Confirm from '$lib/components/modal/confirmModal.svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////

	export let userId = undefined;
	export let courses = [];

	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	let addModuleRoute = (courseId) => `/users/${userId}/courses/${courseId}/modules/create`;
	let addContentRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	let editCourseRoute = (courseId) => `/users/${userId}/courses/${courseId}/edit`;
	let editModuleRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	let editContentRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
	let viewCourseRoute = (courseId) => `/users/${userId}/courses/${courseId}/view`;
	let viewModuleRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	let viewContentRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;

	const dataTableStore = createDataTableStore(courses, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));
	const dispatch = createEventDispatcher();

	const handleContentDelete = async (id) => dispatch('onContentDeleteClick', { contentId: id });

	const handlelCourseDelete = async (courseId, modules) =>
		dispatch('onCourseDeleteClick', { courseId: courseId, modules: modules });

	const handlelModuleDelete = async (moduleId, contents) =>
		dispatch('onModuleDeleteClick', { moduleId: moduleId, contents: contents });
</script>

<div class="flex flex-col my-2 rounded-lg border border-secondary-100 overflow-hidden">
	<div class="p-4 font-bold variant-soft-secondary">Courses</div>
	<section class="bg-white overflow-auto">
		{#each $dataTableStore.filtered as course}
			<CollapsibleSection
				headerText="{course.index}. {course.Name}"
				itemsCount="Modules ({course.Modules.length})"
				addRoute={addModuleRoute(course.id)}
				editRoute={editCourseRoute(course.id)}
				viewRoute={viewCourseRoute(course.id)}
				src="/course.png"
				on:onDeleteClick|once={async () => await handlelCourseDelete(course.id, course.Modules)}
			>
				{#if course.Modules.length > 0}
					{#each course.Modules as module, i}
						<CollapsibleSection
							headerText="{i + 1}. {module.Name}"
							itemsCount="Contents ({module.CourseContents.length})"
							addRoute={addContentRoute(course.id, module.id)}
							editRoute={editModuleRoute(course.id, module.id)}
							viewRoute={viewModuleRoute(course.id, module.id)}
							src="/module.png"
							on:onDeleteClick|once={async () =>
								await handlelModuleDelete(module.id, module.CourseContents)}
						>
							{#if module.CourseContents.length <= 0}
								<span class="items-center text-primary-500 m-4">Contents are not available</span>
							{:else}
								<div class="table-container border !border-secondary-100">
									<table class="table table-compact">
										<thead class="!variant-soft-secondary">
											<tr class="">
												<th>Id</th>
												<th>Title</th>
												<th>Content Type</th>
												<th>Duration In Mins</th>
												<th />
												<th />
											</tr>
										</thead>
										<tbody class="!bg-white">
											{#each module.CourseContents as content, i}
												<tr class="!border-b !border-b-secondary-100">
													<td role="gridcell" aria-colindex={1} tabindex="0">
														{i + 1}
													</td>
													<td>
														<a href={viewContentRoute(course.id, module.id, content.id)}>
															{content.Title}
														</a>
													</td>
													<td>{content.ContentType}</td>
													<td>{content.DurationInMins}</td>
													<td>
														<a
															href={editContentRoute(course.id, module.id, content.id)}
															class="btn btn-icon-sm -my-1 hover:variant-soft-primary"
														>
															<Fa icon={faPencil} style="color-text-primary" size="md" />
														</a>
													</td>
													<td>
														<Confirm
															confirmTitle="Delete"
															cancelTitle="Cancel"
															let:confirm={confirmThis}
															on:delete={() => handleContentDelete(content.id)}
														>
															<button
																on:click|preventDefault={() =>
																	confirmThis(handleContentDelete, content.id)}
																class="btn btn-icon-sm -my-1 hover:variant-soft-error"
															>
																<Fa icon={faTrash} />
															</button>
															<span slot="title"> Delete </span>
															<span slot="description">
																Are you sure you want to delete a content?
															</span>
														</Confirm>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						</CollapsibleSection>
					{/each}
				{:else}
					<span class="text-sm">Modules are not available</span>
				{/if}
			</CollapsibleSection>
		{/each}
	</section>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator bind:settings={$dataTableStore.pagination} buttonClasses="btn-icon bg-surface-500" />
	{/if}
</div>
