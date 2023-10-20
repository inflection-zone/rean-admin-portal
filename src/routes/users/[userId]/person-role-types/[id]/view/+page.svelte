<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	//////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.personRoleType.id;
	let roleName = data.personRoleType.RoleName;
	let description = data.personRoleType.Description !== null ? data.personRoleType.Description : 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/person-role-types/${id}/edit`;
	const viewRoute = `/users/${userId}/person-role-types/${id}/view`;
	const personRoleTypesRoute = `/users/${userId}/person-role-types`;

	const breadCrumbs = [
		{
			name: 'Person-Roles',
			path: personRoleTypesRoute
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

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Person Role</th>
				<th class="text-end">
					<a href={personRoleTypesRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Role Name</td>
				<td>{roleName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
		</tbody>
	</table>
</div>
