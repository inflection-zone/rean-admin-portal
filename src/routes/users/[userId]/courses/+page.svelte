<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import CourseView from '$lib/components/courses.view/courses.view.svelte';
	import { showMessage } from '$lib/utils/message.utils';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let courses = data.courses;

	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	console.log('courses', courses);

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
		console.log('courseId', courseId);
		for (const module of modules) {
			await DeleteModule({
				sessionId: data.sessionId,
				moduleId: module.id
			});
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
		console.log('response', response);
	}

	const handleModuleDelete = async (id, contents) => {
		const moduleId = id;
		console.log('moduleId', moduleId);
		for (const content of contents) {
			await DeleteContent({
				sessionId: data.sessionId,
				courseContentId: content.id
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
		console.log('contentId', contentId);
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
	class="mr-14 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
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
<div
	class="flex flex-row mx-10 lg:mt-10 md:mt-10 sm:mt-4 mt-4 lg:gap-7 md:gap-8 sm:gap-4 gap-4 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
>
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
</div>
<div
	class="flex justify-center rounded-lg w-full lg:ml-2 flex-col mx-10 mb-10 lg:gap-6 md:gap-4 gap-4 md:ml-4 md:flex-col sm:flex-col min-[280px]:flex-col"
>
	<CourseView
		{courses}
		{userId}
		on:searchCourse={async (e) => {
			await searchParams(e.detail.name, e.detail.durationInDays);
		}}
		on:onContentDeleteClick={async (e) => {
			await handleContentDelete(e.detail.contentId);
		}}
		on:onModuleDeleteClick={async (e) => {
			await handleModuleDelete(e.detail.moduleId, e.detail.contents);
		}}
		on:onCourseDeleteClick={async (e) => {
			await handleCourseDelete(e.detail.courseId, e.detail.modules);
		}}
	/>
</div>
