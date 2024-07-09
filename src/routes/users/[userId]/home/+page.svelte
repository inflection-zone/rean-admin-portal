<script lang="ts">
    import type { PageServerData } from './$types';
    import SuperAdminDashboard from '$lib/components/dashboard/super.admin.dashboard.svelte';

    import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    export let data: PageServerData;
	$:assessmentTemplates = data.assessmentTemplate.Items;
	let retrivedAssessmentTemplates;
	const userId = $page.params.userId;
	const assessmentRoute = `/users/${userId}/assessment-templates`;
	const editRoute = (id) => `/users/${userId}/assessment-templates/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/assessment-templates/${id}/view`;
	const createRoute = `/users/${userId}/assessment-templates/create`;
	const importRoute = `/users/${userId}/assessment-templates/import`;
	
	const breadCrumbs = [{ name: 'Assessments', path: assessmentRoute }];

	let title = undefined;
	let type = undefined;
	let sortBy = 'Title';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offest = 0;
	let totalAssessmentTemplatesCount = data.assessmentTemplate.TotalCount;
	let isSortingTitle = false;
	let isSortingType = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalAssessmentTemplatesCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchAssessmentTemplate(model) {
		let url = `/api/server/assessment-templates/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offest) url += `&pageIndex=${offest}`;
		if (title) url += `&title=${title}`;
		if (type) url += `&type=${type}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		assessmentTemplates = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$:{
		assessmentTemplates = assessmentTemplates.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = data.assessmentTemplate.TotalCount;
		retrivedAssessmentTemplates = assessmentTemplates.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);}
	

	$:console.log(retrivedAssessmentTemplates)
	$: if (browser)
		searchAssessmentTemplate({
			title,
			type,
			itemsPerPage: itemsPerPage,
			pageIndex: page,
			sortOrder: sortOrder,
			sortBy: sortBy
		});

	function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
		itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingTitle = false;
		isSortingType = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Title') {
			isSortingTitle = true;
		} else if (columnName === 'Type') {
			isSortingType = true;
		}
		sortBy = columnName;
	}

	const handleAssessmentTemplateDelete = async (id) => {
		const assessmentTemplateId = id;
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: assessmentTemplateId
		});
		invalidate('app:assessmentTemplate');
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-templates`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

    
</script>

<SuperAdminDashboard {data} />

