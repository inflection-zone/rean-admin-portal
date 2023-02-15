<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';

	//export let data: PageServerData;
	// let initiaData = {};
	// let id = data.apiKeyManagement.id;
	// let clientName = data.apiKeyManagement.clientName;
	// let password = data.apiKeyManagement.password;
	// let phone = data.apiKeyManagement.phone;
	// let email = data.apiKeyManagement.email;

	let id = '56789';
	let clientName = 'abc def';
	let password = 'apiclient';
	let phone = 1234567890;
	let email = 'api@gmail.com';

	//Original data
	let _clientName = clientName;
	let _password = password;
	let _phone = phone;
	let _email = email;

	function handleReset() {
		clientName = _clientName;
		password = _password;
		phone = _phone;
		email = _email;
	}

	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	const userId = $page.params.userId;
	const editRoute = (id) => `/users/${userId}/api-key-management/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/api-key-management/${id}/view`;
	const apiKeyManagementRoute = `/users/${userId}/api-key-management`;

	const breadCrumbs = [
		{
			name: 'Api-Key-Management',
			path: apiKeyManagementRoute
		},
		{
			name: 'Edit',
			path: editRoute(id)
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateApiKeyManagement"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Api Key Management
					<a href={viewRoute(id)}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Client Name </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="clientName"
						bind:value={clientName}
						placeholder="Enter client name here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Password </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="password"
						name="password"
						bind:value={password}
						placeholder="Enter password here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Phone </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="phone"
						bind:value={phone}
						placeholder="Enter phone here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Email </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="email"
						bind:value={email}
						placeholder="Enter email here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-10 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
