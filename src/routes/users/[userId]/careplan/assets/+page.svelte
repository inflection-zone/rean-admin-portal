<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import {
		Paginator,
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import { Helper } from '$lib/utils/helper';
	import { browser } from '$app/environment';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const response = data.response;
	const userId = $page.params.userId;
	const assetType = data.assetTypes;
	const val = response.Data.Items;
	let types = assetType.Data.AssetTypes;
	let item = val;
	let asset = data.assets;
	let selectedAssetType = 'Action plan';

	asset = asset.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(asset, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	let assetName = undefined;
	let assetCode = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

  const assetRouteMap = {
    'Action plan'  : 'action-plans',
    'Animation'    : 'animations',
    'Appointment'  : 'appointments',
    'Article'      : 'articles',
    'Assessment'   : 'assessments',
    'Audio'        : 'audio',
    'Biometrics'   : 'biometrics',
    'Challenge'    : 'challenges',
    'Checkup'      : 'checkups',
    'Consultation' : 'consultations',
    'Exercise'     : 'exercises',
    'Goal'         : 'goals',
    'Infographics' : 'infographics',
    'Medication'   : 'medications',
    'Meditation'   : 'meditations',
    'Message'      : 'messages',
    'Nutrition'    : 'nutritions',
    'Physiotherapy': 'physiotherapy',
    'Priority'     : 'priorities',
    'Reflection'   : 'reflections',
    'Reminder'     : 'reminders',
    'Video'        : 'video',
    'Web link'     : 'web-links',
    'Web newsfeed' : 'web-newsfeeds',
    'Word power'   : 'word-power'
  };
	async function searchAssets(model) {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		let url = `/api/server/assets/search?assetType=${selectedAssetRoute}`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (assetCode) url += `&assetCode=${assetCode}`;
		if (assetName) url += `&assetName=${assetName}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		asset = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(asset);
	}
	$: if (browser) searchAssets({ assetName: assetName, assetCode: assetCode });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const onSelectAssetType = async (e) => {
		selectedAssetType = e.currentTarget.value;
		await searchAssets({
			sessionId: data.sessionId,
			selectedAssetType
		});
	};

	const assetRoute = () => `/users/${userId}/careplan/assets`;
	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute()
		}
	];

	const handleAssetsDelete = async (e, id) => {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		const assetId = id;
		await Delete({
			sessionId: data.sessionId,
			selectAsset: selectedAssetRoute,
			assetId: assetId
		});
	};

	async function Delete(model) {
		console.log('Model', model);
		const response = await fetch(`/api/server/assets`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<select id="height" class="select" on:change={onSelectAssetType}>
		{#each types as val}
			<option value={val}>
				{val}
			</option>
		{/each}
	</select>
	<input
		type="text"
		placeholder="Search by code"
		bind:value={assetCode}
		class="input w-auto grow"
	/>
	<input
		type="text"
		placeholder="Search by name"
		bind:value={assetName}
		class="input w-auto grow"
	/>
	<a href="/users/{userId}/careplan/assets/{assetRouteMap[selectedAssetType]}/create/" class="btn variant-filled-secondary"
		>Add New</a
	>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="ClientName">Name</th>
				<th data-sort="AssetCode">Code</th>
				<th>Type</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href="{assetRoute()}/{assetRouteMap[selectedAssetType]}/{row.id}/view"
							>{Helper.truncateText(row.Name, 20)}</a
						>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.AssetCode}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.AssetCategory}</td>
					<td role="gridcell" aria-colindex={5} tabindex="0">{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td>
					<td>
						<a
							class="btn p-2 hover:variant-soft-secondary"
							href="{assetRoute()}/{assetRouteMap[selectedAssetType]}/{row.id}/edit"
						>
							<Icon icon="material-symbols:edit-outline" class="text-lg" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => {
								handleAssetsDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleAssetsDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title">Delete</span>
							<span slot="description"> Are you sure you want to delete a asset? </span>
						</Confirm>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator
			bind:settings={$dataTableStore.pagination}
			buttonClasses="btn-icon bg-surface-50 dark:bg-surface-900"
		/>
	{/if}
</div>
