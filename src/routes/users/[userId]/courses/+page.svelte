<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import  CourseView  from '$lib/components/courses.view/courses.view.svelte';
	import { showMessage } from '$lib/utils/message.utils';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let courses = data.courses;

	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	console.log("courses",courses)

	const dataTableStore = createDataTableStore(courses, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const courseRoute = `/users/${userId}/courses`;
	const editRoute = (id) => `/users/${userId}/courses/${id}/edit`;
	const createRoute = `/users/${userId}/courses/create`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		}
	];

	let name = undefined;
	let durationInDays = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (name: string, durationInDays: string) => {
		await searchCourse({
			name: name,
			durationInDays: durationInDays
		});
	};

	async function searchCourse(model) {
		let url = `/api/server/courses/search?`;
		if (sortOrder) {
			url += `sortOrder=${sortOrder}`;
		} else {
			url += `sortOrder=ascending`;
		}
		if (sortBy) {
			url += `&sortBy=${sortBy}`;
		}
		if (itemsPerPage) {
			url += `&itemsPerPage=${itemsPerPage}`;
		}
		if (pageIndex) {
			url += `&pageIndex=${pageIndex}`;
		}
		if (name) {
			url += `&name=${name}`;
		}
		if (durationInDays) {
			url += `&durationInDays=${durationInDays}`;
		}
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();

		courses = response.map((item, index) => ({ ...item, index: index + 1 }));
		dataTableStore.updateSource(courses);
	}
	dataTableStore.subscribe((model) => dataTableHandler(model));


	const handleCourseDelete = async (id, modules) => {
		const courseId = id;
		console.log("courseId",courseId)
		for (const module of modules){
			await DeleteModule ({
			sessionId: data.sessionId,
			moduleId: module.id,
		})
		}
		await DeleteCourse({
			sessionId: data.sessionId,
			courseId: courseId
		});
		showMessage(`Course deteted successfully!`, 'success');
		window.location.href = courseRoute;
	};

	async function DeleteCourse(model) {
		const response = await fetch(`/api/server/courses`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log("response",response)
	}

	const handleModuleDelete = async (id, contents) => {
		const moduleId = id;
		console.log("moduleId",moduleId)
		for (const content of contents){
			await DeleteContent({
			sessionId: data.sessionId,
			courseContentId: content.id,
		});
		}
		await DeleteModule({
			sessionId: data.sessionId,
			moduleId: moduleId
		});
		window.location.href = courseRoute;
	};

	async function DeleteModule(model) {
		const response = await fetch(`/api/server/modules`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const handleContentDelete = async (id) => {
		const contentId = id;
		console.log("contentId",contentId)
		await DeleteContent({
			sessionId: data.sessionId,
			courseContentId: contentId
		});
		window.location.href = courseRoute;
	};

	async function DeleteContent(model) {
		const response = await fetch(`/api/server/course-contents`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div
	class=" mr-14 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href={createRoute} class="absolute right-4 lg:mr-[-32px] ">
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
<a href={createRoute} class=" right-14 ">
	<button
		class="btn variant-filled-primary hover:bg-primary lg:hidden md:hidden block sm:w-40 w-24 ml-4 rounded-lg bg-primary transition
			ease-in-out
			delay-150  
			hover:scale-110  
			duration-300 ...  "
	>
		Add new
	</button>
</a>
<!-- lineColor="#ECE4FC" -->
<div class="mx-10 mt-10 mb-14">
<!-- <div class="justify-center w-sceen mx-14 bg-tertiary-500 rounded-lg">
	<div class="w-full h-14 rounded-t-lg p-3  bg-secondary-500">
    <div class="ml-3 relative flex flex-row text-white text-xl">Courses</div>
 	 </div> -->
	<CourseView courses={courses} userId={userId} on:searchCourse = {async (e) => {
		await searchParams (e.detail.name, e.detail.durationInDays);
	 }}
	 on:deleteActivity = {async (e) => {
		await handleContentDelete(e.detail.contentId);
	 }}
	 on:onModuleDeleteClick = {async (e) => {
		await handleModuleDelete(e.detail.moduleId, e.detail.contents);
	 }}
	 on:onCourseDeleteClick = {async (e) => {
		await handleCourseDelete(e.detail.courseId, e.detail.modules);
	 }}
	 />
	 
</div>
<!-- </div> -->

<!-- <div
	class=" mr-14 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href={createRoute} class="absolute right-4 lg:mr-[-32px] ">
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
</div> -->
<!-- <div
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
			on:click={() => searchParams(name, durationInDays)}
		>
			<Fa icon={faSearch} class="text-neutral-content" size="lg" />
		</button>
		<a href={createRoute} class=" right-14 ">
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
</div>

<div class="flex justify-center flex-col mt-4 mx-10 mb-10 overflow-y-auto ">
	<table class="table rounded-b-none">
		<thead class="sticky top-0">
			<tr>
				<th style="width: 5%;">Id</th>
				<th style="width: 18%;">Name</th>
				<th style="width: 34%;">Description</th>
				<th style="width: 18%;">Duration</th>
				<th style="width: 35%;">Created Date</th>
				<th style="width: 8%;"></th>
				<th style="width: 8%;"></th>
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td style="width: 5%;">{row.index}</td>
						<td style="width: 18%;">{row.Name}</td>
						<td style="width: 35%;"
							>{row.Description.length > 10
								? row.Description.substring(0, 55) + '...'
								: row.Description}</td
						>
						<td style="width: 19%;">{row.DurationInDays}</td>
						<td style="width: 35%;">{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td>
						<td style="width: 8%;">
							<a href={editRoute(row.id)}
								><Fa icon={faPencil} style="color-text-primary" size="md" /></a
							>
						</td>
						<td style="width: 8%;">
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleCourseDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleCourseDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a course? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
		{#if $dataTableStore.pagination}<Paginator
				class="mt-2 mr-3 ml-3 "
				buttonClasses="btn-icon bg-surface-500 w-5 h-8"
				text="text-white"
				bind:settings={$dataTableStore.pagination}
			/>{/if}
	</div>
</div> -->

<!-- <TreeView {tree} /> -->
<style>
	.container {
		display: flex;
	}

	.tree-view {
		flex-basis: 30%;
	}

	.desc {
		padding: 10px 10px 10px 10px;
		flex-basis: 60%;
		background: #eee;
		height: 50%;
	}
</style>
