<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
    import test from 'node:test';

////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/drugs/edit`;
	const viewRoute = `/users/${userId}/drugs/view`;
	const drugRoute = `/users/${userId}/drugs`;
  const versionRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{
			name: 'Prompt',
			path: drugRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];

	let promptName = "LLM Prompt";

  let name = 'Prompt name';
  let description = 'Prompt description';
  let version = '1';
  let useCaseType = 'Generation';
  let group = 'Chat Default';
  let model = 'OpenAi GPT 3.5 Turbo';
  let prompt = 'Prompt data';
  let variable = 'Pro';
	let temperature = '0.95';
	let topP = '0.23';
	let frequency = '1.0';
	let presence = '0.1';
    
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={versionRoute} class="btn variant-outline-secondary ml-auto">Versions</a>
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View {promptName}</th>
				<th class="text-end">
					<a href={drugRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>{version}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Use Case Type</td>
				<td>{useCaseType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Group</td>
				<td>{group}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Model</td>
				<td>{model}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Prompt</td>
				<td>{prompt}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Variable</td>
				<td>{variable}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Temperature</td>
				<td>{temperature}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Top P</td>
				<td>{topP}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Frequency Penalty</td>
				<td>{frequency}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Presence Penalty</td>
				<td>{presence}</td>
			</tr>
		</tbody>
	</table>
</div>
