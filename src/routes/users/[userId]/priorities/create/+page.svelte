<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '$lib/components/icon.svelte';

	////////////////////////////////////////////////////////////////////
	
	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/priorities/create`;
	const priorityRoute = `/users/${userId}/priorities`;

	const breadCrumbs = [
		{
			name: 'Priorities',
			path: priorityRoute
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
	action="?/createPriorityAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Health Priority</th>
				<th class="text-end">
					<a href={priorityRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<input
						type="text"
						name="type"
						required
						placeholder="Enter type here..."
						class="input w-full {form?.errors?.type ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.type}
						<p class="text-error-500 text-xs">{form?.errors?.type[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
