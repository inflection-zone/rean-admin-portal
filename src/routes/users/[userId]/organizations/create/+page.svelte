<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { oragnizationTypesStore } from '$lib/store/general.store';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { showMessage } from '$lib/utils/message.utils';
	import { Country, State, City } from 'country-state-city';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let country = Country.getAllCountries();
	const userId = $page.params.userId;
	let imageResourceId = '';
	let imageUrl = undefined;
	let fileinput;

	const createRoute = `/users/${userId}/organizations/create`;
	const organizationRoute = `/users/${userId}/organizations`;
	oragnizationTypesStore.set(data.types);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.types));
	const oraganizationTypes = data.types;

	const breadCrumbs = [
		{
			name: 'Organizations',
			path: organizationRoute
		},
		{
			name: 'Create',
			path: createRoute
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
			const imageUrl_ = response.Data.FileResources[0].Url;
			console.log('imageUrl', imageUrl);
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

<main class="h-screen mb-64">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-5 mb-5 ">
		<form
			method="post"
			action="?/createOrganizationAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex  text-white text-xl">
					Create Organization
					<a href={organizationRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select class="select w-full" name="type" placeholder="Select type here...">
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
						<span>Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						required
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.name
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.name ?? ''}
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
						<span>Contact Number *</span>
					</label>
				</div>
				<div class="flex gap-2 w-1/2 md:w-2/3 lg:w-2/3">
					<div>
						<select
							name="countryCode"
							class="select select-primary w-20 lg:w-20 md:w-20 sm:w-18 min-[320px]:w-12"
						>
							<option>+91</option>
							<option>+94</option>
							<option>+93</option>
						</select>
					</div>
					<div class="w-10/12">
						<input
							type="text"
							name="contactPhone"
							placeholder="Enter contact number here..."
							required
							class="input w-full max-w-md {form?.errors?.contactPhone
								? 'border-error-300 text-error-500'
								: 'border-primary-200 text-primary-500'}"
							value={form?.data?.contactPhone ?? ''}
						/>
						{#if form?.errors?.contactPhone}
							<p class="text-error-500 text-xs">{form?.errors?.contactPhone[0]}</p>
						{/if}
					</div>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="email"
						name="contactEmail"
						placeholder="Enter email here..."
						required
						class="input w-full {form?.errors?.contactEmail
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.contactEmail ?? ''}
					/>
					{#if form?.errors?.contactEmail}
						<p class="text-error-500 text-xs">{form?.errors?.contactEmail[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>About</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="about"
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
						type="date"
						name="operationalSince"
						placeholder="select operational since here..."
						class="input w-full {form?.errors?.operationalSince
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.operationalSince ?? ''}
					/>
					{#if form?.errors?.operationalSince}
						<p class="text-error-500 text-xs">{form?.errors?.operationalSince[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Address Type *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						name="addressType"
						class="select w-full"
						placeholder="Select address type here..."
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
						<span>Address Line *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="addressLine"
						placeholder="Enter address here..."
						required
						class="input w-full {form?.errors?.addressLine
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.addressLine ?? ''}
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
						class="input w-1/3 {form?.errors?.contactEmail
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.city ?? ''}
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
						class="input w-1/3 {form?.errors?.district
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.district ?? ''}
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
					<select name="state" class="select w-1/2" placeholder="Select state here...">
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
					<select name="country" class="select w-full" placeholder="Select country here...">
						<option>India</option>
					</select>
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
						type="number"
						name="postalCode"
						placeholder="Enter postal code or zip code here..."
						class="input w-1/3 {form?.errors?.postalCode
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.postalCode ?? ''}
					/>
					{#if form?.errors?.postalCode}
						<p class="text-error-500 text-xs">{form?.errors?.postalCode[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image Resource *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						accept="image/png, image/jpeg"
						type="file"
						id="fileUpload"
						class="input"
						name="fileinput"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>

					<input type="hidden" name="imageResourceId" value={imageResourceId} />
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Is Health Facility Available</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="isHealthFacility"
							class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
						/>
					</label>
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-secondary w-full mb-10 ">Submit</button>
				</div>
			</div>
		</form>
	</div>
</main>
