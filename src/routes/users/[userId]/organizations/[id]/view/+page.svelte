<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { show } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.organization.id;
	let type = data.organization.Type;
	let name = data.organization.Name;
	let contactNumber = data.organization.ContactPhone;
	let email = data.organization.ContactEmail;
	let about = data.organization.About ?? null;
	let operationalSince = data.organization.OperationalSince;
	// let addressType = data.organization.Addresses[0].Type ?? null;
	// let addressLine = data.organization.Addresses[0].AddressLine ?? null;
	// let city = data.organization.Addresses[0].City ?? null;
	// let district = data.organization.Addresses[0].District ?? null;
	// let state = data.organization.Addresses[0].State ?? null;
	// let country = data.organization.Addresses[0].Country ?? null;
	// let postalCode = data.organization.Addresses[0].PostalCode ?? null;
	let addressType = null;
	let addressLine = null;
	let city = null;
	let district = null;
	let state = null;
	let country = null;
	let postalCode = null;
	let imageUrl = data.organization.ImageUrl ?? undefined;
	let isHealthFacility = data.organization.IsHealthFacility;

	if (data.organization.Addresses.length > 0) {
	}

	if (data.organization.Addresses.length > 0) {
		addressType = data.organization.Addresses[0].Type ?? null;
		addressLine = data.organization.Addresses[0].AddressLine ?? null;
		city = data.organization.Addresses[0].City ?? null;
		district = data.organization.Addresses[0].District ?? null;
		state = data.organization.Addresses[0].State ?? null;
		country = data.organization.Addresses[0].Country ?? null;
		postalCode = data.organization.Addresses[0].PostalCode ?? null;
	}

	console.log('organization', data.organization);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/organizations/${id}/edit`;
	const viewRoute = `/users/${userId}/organizations/${id}/view`;
	const organizationRoute = `/users/${userId}/organizations`;

	const breadCrumbs = [
		{
			name: 'Organizations',
			path: organizationRoute
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
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container border border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Organization</th>
				<th class="text-end">
					<a href={organizationRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Contact Number</td>
				<td>{contactNumber}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Email</td>
				<td>{email}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>About</td>
				<td>{about}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Operational Since</td>
				<td>{(new Date(operationalSince), 'DD-MMM-YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Address Type</td>
				<td>{addressType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Address Line</td>
				<td>{addressLine}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>City</td>
				<td>{city}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>District</td>
				<td>{district}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>State/Province</td>
				<td>{state}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Country</td>
				<td>{country}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Zip/Postal Code</td>
				<td>{postalCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Is Health Facility Available</td>
				<td>{isHealthFacility}</td>
			</tr>
		</tbody>
	</table>
</div>
