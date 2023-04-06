<script lang="ts">
	import CollapsibleSection from '$lib/components/courses.view/collapsible.section.svelte';
	import { createEventDispatcher } from 'svelte';
  import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import date from 'date-and-time';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { faPencil, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Confirm from '$lib/components/modal/confirmModal.svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////

	export let userId = undefined;
	export let courses = [];
	let name = undefined;
	let durationInDays = undefined;
	
	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	 let addCourseRoute = () => `/users/${userId}/courses/create`;
	 let addModuleRoute = (courseId) => `/users/${userId}/courses/${courseId}/modules/create`;
	 let editCourseRoute = (courseId) => `/users/${userId}/courses/${courseId}/edit`;
	 let editModuleRoute = (courseId, moduleId) => `/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	 let editContentRoute = (courseId, moduleId, contentId) => `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
  const dataTableStore = createDataTableStore(courses, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
  dataTableStore.subscribe((model) => dataTableHandler(model));
	const dispatch = createEventDispatcher();

	const onSearchClick = async (name, durationIndays) => {
		dispatch('searchCourse', {
			name: name,
			durationIndays: durationIndays
		});
	};

	const handleContentDelete = async (id) => {
		dispatch('deleteActivity', {
			contentId: id
		});
	};

</script>
<!-- <div
	class=" mr-14 nb-4 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href='' class="absolute right-4 lg:mr-[-32px] ">
				<button
					class="btn variant-filled-primary w-28 rounded-lg hover:bg-primary bg-primary transition
          ease-in-out
          delay-150  
          hover:scale-110  
          duration-300 ... "
				>
					Add new
				</button>
			</a>
		</div>
	</div>
</div> 
 <div
	class="flex flex-row mx-10 lg:mt-10 md:mt-10 sm:mt-4 mt-4 lg:gap-7 md:gap-8 sm:gap-4 gap-4 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center">
			<input
				type="text"
				placeholder="Search by name"
				bind:value={name}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				placeholder="Search by duration"
				bind:value={durationInDays}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => onSearchClick(name, durationInDays)}
		>
			<Fa icon={faSearch} class="text-neutral-content" size="lg" />
		</button>
		<a href='' class=" right-14 ">
			<button
				class="btn variant-filled-primary hover:bg-primary lg:hidden md:hidden block sm:w-40 w-24 ml-4 rounded-lg bg-primary transition
          ease-in-out
          delay-150  
          hover:scale-110  
          duration-300 ...  "
			>
				ADD NEW
			</button>
		</a>
	</div>
</div> -->
<div class="justify-center w-sceen mx-14 bg-tertiary-500 rounded-lg">
	<div class="w-full h-14 rounded-t-lg p-3  bg-secondary-500">
    <div class="ml-3 relative flex flex-row text-white text-xl">Courses</div>
 	 </div>
<section class="text-base-100 ">
	<div class="my-3">
		{ #each $dataTableStore.filtered  as course}
			<CollapsibleSection
				color="#7165E3"
				paddingBottom="12px"
				paddingTop="12px"
				paddingLeft="20px"
				marginBottom = '12px'
				headerText="{course.index}-{course.Name}"
				itemsCount = "Moules - {course.Modules.length}"
				addRoute = {addCourseRoute()}
				editRoute = {editCourseRoute(course.id)}
			>
				<div class="content">
					{#each course.Modules as module, i}
						<CollapsibleSection
							color="#5832A1"
							paddingBottom="10px"
							paddingTop="12px"
							paddingLeft="20px"
							paddingRight="20px"
							marginBottom = '10px'
							headerText="{`${i + 1}`}-{module.Name}"
							itemsCount = "Contents-{module.CourseContents.length}"
							addRoute = {addModuleRoute(course.id)}
							editRoute = {editModuleRoute(course.id, module.id)}
						>
							<div class="content justify-center place-items-center grid">
								<table class="table-auto overflow-x-auto text-left ">
                  <thead class="font-semibold text-primary-500">
                    <tr class="font-semibold">
											<th style="width: 15%;">Id</th>
                      <th style="width: 15%;">Title</th>
											<th style="width: 15%;">Content Type</th>
                      <th style="width: 15%;" >Duration In Mins</th>
                      <!-- <th style="width: 60%;"></th> -->
                      <th style="width: 5%;"></th>
                      <th style="width: 5%;"></th>
                    </tr>
                  </thead>
                  <tbody class="text-primary-500">
       
									{#each module.CourseContents as content, i}
                    <tr>
											<td style="width: 5%;">{i+1}</td>
                      <td style="width: 10%;">{content.Title}</td>
											<td style="width: 20%;">{content.ContentType}</td>
                      <td style="width: 20%;">{content.DurationInMins}</td>
                      <!-- <td style="width: 60%;"></td> -->
                      <td style="width: 5%;">
                        <a href={editContentRoute(course.id, module.id, content.id)}
                          ><Fa icon={faPencil} style="color-text-primary" size="md" /></a
                        >
                      </td>
                      <td style="width: 5%;">
                        <Confirm
                          confirmTitle="Delete"
                          cancelTitle="Cancel"
                          let:confirm={confirmThis}
                          on:delete={() => {
                            handleContentDelete(content.id);
                          }}
                        >
                          <button
                            on:click|preventDefault={() => confirmThis(handleContentDelete, content.id)}
                            class=""><Fa icon={faTrash}/></button
                          >
                          <span slot="title"> Delete </span>
                          <span slot="description"> Are you sure you want to delete a content? </span>
                        </Confirm>
                      </td>
                    </tr>
										{/each}
                  </tbody>
                </table>							
							</div>
              </CollapsibleSection
						>
					{/each}
				</div>
			</CollapsibleSection>
		{/each}
	</div>
</section>
<div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
	{#if $dataTableStore.pagination}<Paginator
			class="mt-2 mr-3 ml-3 "
			buttonClasses="btn-icon bg-surface-500 w-5 h-8"
			text="text-white"
			bind:settings={$dataTableStore.pagination}
		/>{/if}
</div>
</div>
<style>
	section {
		width: 100%;
	}
	.content {
		/* position:justify-center; */
		margin-top: 2px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 93%;
		display: flex-col;

		/* justify-items: center; */
	}
</style>
