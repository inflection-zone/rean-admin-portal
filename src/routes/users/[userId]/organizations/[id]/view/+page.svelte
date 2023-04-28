<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import date from 'date-and-time';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.organization.id;
	let type = data.organization.Type;
	let name = data.organization.Name;
	let contactNumber = data.organization.ContactPhone;
	let email = data.organization.ContactEmail;
	let about = data.organization.About ?? null;
	let operationalSince = data.organization.OperationalSince;
	let addressType = data.organization.Addresses[0].Type;
	let addressLine = data.organization.Addresses[0].AddressLine;
	let city = data.organization.Addresses[0].City;
	let district = data.organization.Addresses[0].District;
	let state = data.organization.Addresses[0].State;
	let country = data.organization.Addresses[0].Country;
	let postalCode = data.organization.Addresses[0].PostalCode;
	let imageResourceId = data.organization.ImageUrl ?? undefined;
	let isHealthFacility = data.organization.IsHealthFacility;

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

<main class=" mb-32">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-3 mb-5">
		<form
			method="get"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg mb-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Organization</div>
					<div class="lg:block md:block hidden">View Organization</div>
					<a href={organizationRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center my-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="type"> {type} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="name">{name}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Contact Number</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="contactNumber">{contactNumber}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="email">{email}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>About</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="about">{about}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Operational Since</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="operationalSince">
					{date.format(new Date(operationalSince), 'DD-MMM-YYYY')}
				</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Address Type</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {addressType} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Address Line</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {addressLine} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>City</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {city} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>District</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {district} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>State/Province</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {state} </span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Country</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {country} </span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Zip/postal code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="address"> {postalCode} </span>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image Resource</span>
					</label>
				</div>
				{#if imageResourceId === 'undefined'}
					<span class="span">Image not specified</span>
				{:else}
					<Image cls="flex h-24 w-24 rounded-lg" source={imageResourceId} w="24" h="24" />
				{/if}
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Is Healthy Facility</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="isHealthFacility"> {isHealthFacility} </span>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-ringed-primary lg:w-full w-24 mb-10 lg:mr-4 mr-1"
						>
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
