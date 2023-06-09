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

	const handleContentDelete = async (id) => {
		dispatch('onContentDeleteClick', { contentId: id });
	};

	const handlelCourseDelete = async (courseId, modules) => {
		dispatch('onCourseDeleteClick', { courseId: courseId, modules: modules });
	};

	const handlelModuleDelete = async (moduleId, contents) => {
		dispatch('onModuleDeleteClick', { moduleId: moduleId, contents: contents });
	};
</script>

<div class="flex justify-center flex-col mx-10 mb-10 overflow-y-auto  bg-tertiary-500 rounded-lg">
	<div
		class="flex justify-center flex-col w-full h-14 p-3 bg-secondary-500 min-[280px]:overflow-auto overflow-auto"
	>
		<div class="ml-3 relative flex flex-row text-white text-xl">Courses</div>
	</div>
	<section class="text-base-100 overflow-y-auto h-[700px] bg-tertiary-500">
		<div class="my-3">
			{#each $dataTableStore.filtered as course}
				<CollapsibleSection
					color="#7165E3"
					paddingBottom="12px"
					paddingTop="12px"
					paddingLeft="20px"
					marginBottom="12px"
					headerText="{course.index}. {course.Name}"
					itemsCount="Modules ({course.Modules.length})"
					addRoute={addModuleRoute(course.id)}
					editRoute={editCourseRoute(course.id)}
					viewRoute={viewCourseRoute(course.id)}
					src="/courses.png"
					on:onDeleteClick|once={async () => {
						await handlelCourseDelete(course.id, course.Modules);
					}}
				>
					<div class="content mx-3">
						{#if course.Modules.length > 0}
							{#each course.Modules as module, i}
								<CollapsibleSection
									color="#5832A1"
									paddingBottom="10px"
									paddingTop="12px"
									paddingLeft="20px"
									paddingRight="20px"
									marginBottom="10px"
									headerText="{i + 1}. {module.Name}"
									itemsCount="Contents ({module.CourseContents.length})"
									addRoute={addContentRoute(course.id, module.id)}
									editRoute={editModuleRoute(course.id, module.id)}
									viewRoute={viewModuleRoute(course.id, module.id)}
									src="/modules.png"
									on:onDeleteClick|once={async () => {
										await handlelModuleDelete(module.id, module.CourseContents);
									}}
								>
									{#if module.CourseContents.length <= 0}
										<span class="items-center text-primary-500 ml-10 mb-4"
											>Contents are not available</span
										>
									{:else}
										<div class="content justify-center place-items-center grid">
											<table class="table-auto overflow-x-auto text-left ">
												<thead class="font-semibold text-primary-500">
													<tr class="font-semibold">
														<th>Id</th>
														<th>Title</th>
														<th>Content Type</th>
														<th>Duration In Mins</th>
														<th />
														<th />
													</tr>
												</thead>
												<tbody class="text-primary-500">
													{#each module.CourseContents as content, i}
														<tr>
															<td role="gridcell" aria-colindex={1} tabindex="0">
																{content.Sequence}
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
							<span class="items-center text-primary-500 mb-4">Modules are not available</span>
						{/if}
					</div>
				</CollapsibleSection>
			{/each}
		</div>
	</section>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator bind:settings={$dataTableStore.pagination} buttonClasses="btn-icon bg-surface-500" />
	{/if}
</div>

<style>
	section {
		width: 100%;
	}
	.content {
		margin-top: 2px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 93%;
		display: flex-col;
	}
</style>
