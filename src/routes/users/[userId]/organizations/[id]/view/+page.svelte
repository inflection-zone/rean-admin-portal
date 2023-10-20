<script lang="ts">
	import { page } from '$app/stores';
	import date from 'date-and-time';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let organization = data.organization;
	let id = organization.id;
	let type = organization.Type;
	let name = organization.Name;
	let contactNumber = organization.ContactPhone;
	let email = organization.ContactEmail;
	let about = (organization.About !== null && organization.About !== "") ? organization.About : 'Not specified';
	let operationalSince = new Date(data.organization.OperationalSince);

	let addressType = null;
	let addressLine = null;
	let city = null;
	let district = null;
	let state = null;
	let country = null;
	let postalCode = null;
	let imageUrl = organization.ImageUrl
	let isHealthFacility = organization.IsHealthFacility;

	if (organization.Addresses.length > 0) {
		addressType = organization.Addresses[0].Type ?? null;
		addressLine = organization.Addresses[0].AddressLine ?? null;
		city = (organization.Addresses[0].City !== null && organization.Addresses[0].City !== "") ? organization.Addresses[0].City : 'Not specified';
		district = (organization.Addresses[0].District !== null && organization.Addresses[0].District !== "") ? organization.Addresses[0].District : 'Not specified';
		state = (organization.Addresses[0].State !== null && organization.Addresses[0].State !== "") ? organization.Addresses[0].State : 'Not specified';
		country = (organization.Addresses[0].Country !== null && organization.Addresses[0].Country !== "") ? organization.Addresses[0].Country : 'Not specified';
		postalCode = (organization.Addresses[0].PostalCode !== null && organization.Addresses[0].PostalCode !== "") ? organization.Addresses[0].PostalCode : 'Not specified';
	}

	console.log('organization', organization);

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
				<th>View Organization</th>
				<th class="text-end">
					<a href={organizationRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number</td>
				<td>{contactNumber}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email</td>
				<td>{email}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>About</td>
				<td>{about}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Operational Since</td>
				<td>{date.format(operationalSince, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Address Type</td>
				<td>{addressType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Address Line</td>
				<td>{addressLine}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>City</td>
				<td>{city}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>District</td>
				<td>{district}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>State/Province</td>
				<td>{state}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Country</td>
				<td>{country}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Zip/Postal Code</td>
				<td>{postalCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === null }
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Is Health Facility Available</td>
				<td>{isHealthFacility}</td>
			</tr>
		</tbody>
	</table>
</div>
