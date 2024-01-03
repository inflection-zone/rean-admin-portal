<script lang="ts">
	import Fa from 'svelte-fa';
	import date from 'date-and-time';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { oragnizationTypesStore } from '$lib/store/general.store';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	oragnizationTypesStore.set(data.types);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.types));
	let oraganizationTypes = data.types;
	let id = data.organization.id;
	let type = data.organization.Type;
	let name = data.organization.Name;
	let contactNumber = data.organization.ContactPhone;
	let email = data.organization.ContactEmail;
	let about = data.organization.About;
	let addressType = data.organization.Addresses[0].Type;
	let addressLine = data.organization.Addresses[0].AddressLine;
	let city = data.organization.Addresses[0].City;
	let district = data.organization.Addresses[0].District;
	let state = data.organization.Addresses[0].State;
	let country = data.organization.Addresses[0].Country;
	let postalCode = data.organization.Addresses[0].PostalCode;
	let imageUrl = data.organization.ImageUrl ?? undefined;
	let imageResourceId = data.organization.ImageResourceId;
	let addresses = data.organization.Addresses;
	let isHealthFacility = data.organization.IsHealthFacility;
	let fileinput;
	let operationalSince = date.format(new Date(data.organization.OperationalSince), 'DD-MMM-YYYY');

	//Original data
	let _type = type;
	let _name = name;
	let _contactNumber = contactNumber;
	let _email = email;
	let _about = about;
	let _operationalSince = operationalSince;
	let _addressLine = addressLine;
	let _addressType = addressType;
	let _city = city;
	let _district = district;
	let _state = state;
	let _country = country;
	let _postalCode = postalCode;
	let _imageResourceId = imageResourceId;
	let _isHealthFacility = isHealthFacility;

	function handleReset() {
		type = _type;
		name = _name;
		contactNumber = _contactNumber;
		email = _email;
		about = _about;
		operationalSince = _operationalSince;
		addressLine = _addressLine;
		addressType = _addressType;
		city = _city;
		district = _district;
		state = _state;
		country = _country;
		postalCode = _postalCode;
		imageResourceId = _imageResourceId;
		isHealthFacility = _isHealthFacility;
	}

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
			name: 'Edit',
			path: editRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/file-resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				filename: filename
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId_ = response.Data.FileResources[0].id;
			console.log('imageResourceId_', imageUrl);
			if (imageResourceId_) {
				imageResourceId = imageResourceId_;
			}
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const onFileSelected = async (e) => {
		let f = e.target.files[0];
		const filename = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await upload(e.target.result, filename);
		};
	};
</script>

<main class=" mb-32">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateOrganizationAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Organization
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
				</div>
			</div>
			<div class="hidden">{id}</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select w-full"
						bind:value={type}
						name="type"
						placeholder="select type here..."
					>
						{#each oraganizationTypes as types}
							<option>{types}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={name}
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.name
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Contact Number</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="contactPhone"
						bind:value={contactNumber}
						placeholder="Enter contact number here..."
						class="input w-full max-w-md {form?.errors?.contactPhone
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.contactPhone}
						<p class="text-error-500 text-xs">{form?.errors?.contactPhone[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="contactEmail"
						bind:value={email}
						placeholder="Enter email here..."
						class="input w-full {form?.errors?.contactEmail
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.contactEmail}
						<p class="text-error-500 text-xs">{form?.errors?.contactEmail[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>About</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="about"
						bind:value={about}
						placeholder="Enter about here..."
						class="textarea w-full	{form?.errors?.about
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.about}
						<p class="text-error-500 text-xs">{form?.errors?.about[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Operational Since</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="operationalSince"
						bind:value={operationalSince}
						placeholder="Enter operational since here..."
						class="input w-full {form?.errors?.operationalSince
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.operationalSince}
						<p class="text-error-500 text-xs">{form?.errors?.operationalSince[0]}</p>
					{/if}
				</div>
			</div>

			{#each addresses as address}
				<input hidden type="text" name="addressId" value={address.id} />
			{/each}

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Address Type</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						name="addressType"
						class="select w-full"
						placeholder="Select address type here..."
						bind:value={addressType}
					>
						<option>Home</option>
						<option>Office</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Address Line</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="addressLine"
						placeholder="Enter address here..."
						bind:value={addressLine}
						class="input w-full {form?.errors?.addressLine
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.addressLine}
						<p class="text-error-500 text-xs">{form?.errors?.addressLine[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>City</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="city"
						placeholder="Enter city here..."
						bind:value={city}
						class="input w-1/3 {form?.errors?.contactEmail
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.city}
						<p class="text-error-500 text-xs">{form?.errors?.city[0]}</p>
					{/if}
				</div>
			</div>
			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>District</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="district"
						placeholder="Enter district here..."
						bind:value={district}
						class="input w-1/3 {form?.errors?.district
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.district}
						<p class="text-error-500 text-xs">{form?.errors?.district[0]}</p>
					{/if}
				</div>
			</div>
			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>State/Province</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						name="state"
						class="select w-1/2"
						placeholder="Select state here..."
						bind:value={state}
					>
						<option>Maharashtra</option>
					</select>
				</div>
			</div>
			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Country</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="country"
						placeholder="Enter country here..."
						class="input w-1/3 "
						bind:value={country}
					/>
				</div>
			</div>
			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Zip/postal code</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="postalCode"
						placeholder="Enter postal code or zip code here..."
						bind:value={postalCode}
						class="input w-1/3 {form?.errors?.postalCode
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.postalCode}
						<p class="text-error-500 text-xs">{form?.errors?.postalCode[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image Resource</span>
					</label>
				</div>
				<div class="flex flex-row gap-4 w-1/2 md:w-2/3 lg:w-2/3 ">
					{#if imageUrl === 'undefined'}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="imageResourceId" bind:value={imageResourceId} />
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Is Healthy Facility</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="isHealthFacility"
							bind:value={isHealthFacility}
							bind:checked={isHealthFacility}
							class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
						/>
					</label>
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary text-primary-500 lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn variant-filled-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
