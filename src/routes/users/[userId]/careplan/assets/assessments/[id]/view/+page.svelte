<script lang="ts">
  import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '$lib/components/icon.svelte';

  ///////////////////////////////////////////////////////////////////////

  const userId = $page.params.userId;
  const assessmentId = $page.params.userId;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const editRoute = `/users/${userId}/careplan/assets/assessments/${assessmentId}/edit`;
  const viewRoute = `/users/${userId}/careplan/assets/assessments/${assessmentId}/view`;
  const assessmentRoute = `/users/${userId}/careplan/assets/assessments/create`;

  export let data: PageServerData
  let assetCode = data.assessment.AssetCode;
  let name = data.assessment.Name;
  let description = data.assessment.Description !== null ? data.assessment.Description : 'Not specified';
  let template = data.assessment.Template;
  let tags = data.assessment.Tags;
  let version = data.assessment.Version;

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Assessment',
      path: assessmentRoute
    },
    {
      name: 'View',
      path: viewRoute
    }
  ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={editRoute} class="btn variant-filled-secondary ml-auto w-22 h-10 px-0">
		<div class="flex items-center">
			<Icon
			cls="stroke-surface-100 stroke-2 fill-none"
			h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
			<span class="pr-4">Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Assessment</th>
				<th class="text-end">
					<a href={assetRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Asset Code</td>
				<td>{assetCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>{description}</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Template</td>
				<td>{template}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>{version}</td>
			</tr>
		</tbody>
	</table>
</div>
