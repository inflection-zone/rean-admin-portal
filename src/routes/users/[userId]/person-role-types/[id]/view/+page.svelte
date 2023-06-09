<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.personRoleType.id;
	let roleName = data.personRoleType.RoleName;
	let description = data.personRoleType.Description;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

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
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Person Role</th>
				<th class="text-end">
					<a href={personRoleTypesRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Role Name</td>
				<td>{roleName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Description</td>
				<td>{description}</td>
			</tr>
		</tbody>
	</table>
</div>