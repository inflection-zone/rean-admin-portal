<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	/////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;

	const eventActionTypes = data.eventActionTypes;

  let selectedEventActionType = '';

	const onSelectEventActionType = (val) => {
		selectedEventActionType = val.target.value;
	};
	const userId = $page.params.userId;
	const schemaId = $page.params.schemaId;
  const createRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/create`;
  const editRoute = `/users/${userId}/gamification/schemas/${schemaId}/edit`;
	const viewRoute = `/users/${userId}/gamification/schemas/${schemaId}/view`;
	const schemaRoute = `/users/${userId}/gamification/schemas`;
	const nodeRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/create`

	const breadCrumbs = [
		{
			name: 'Gamification',
			path: schemaRoute
		},
		{
			name: 'Schemas',
			path: schemaRoute
		},
		{
			name: 'Nodes',
			path: schemaRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createNodeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Node</th>
				<th class="text-end">
					<a href={schemaRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type *</td>
				<td>
					<select
						name="nodeType"
						placeholder="Select node type here..."
						class="select w-full"
					>
            <option >Execution-Node</option>
            <option>Rule-Node</option>
            <option>Message-Node</option>
					</select>
				</td>
			</tr>
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Parent Node *</td>
				<td>
					<select
						name="parentNodeId"
						required
						class="select w-full"
						placeholder="Select node type here..."
					>
					</select>
				</td>
			</tr> -->
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name*</td>
				<td>
					<input
						type="text"
						name="name"
						required
						placeholder="Enter name here..."
						class="input w-full
						{form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." class="input" />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Type*</td>
				<td>
					<select
						name="nodeType"
						placeholder="Select node type here..."
						class="select w-full"
            on:change={(val) => onSelectEventActionType(val)}
					>
            {#each eventActionTypes as type}
            <option value={type}>{type}</option>
            {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Name*</td>
				<td>
					<input
						type="text"
						name="actionName"
						required
						placeholder="Enter name here..."
						class="input w-full"
					/>
				</td>
			</tr>
      {#if selectedEventActionType === 'Extract-Data'}

      {/if}
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
