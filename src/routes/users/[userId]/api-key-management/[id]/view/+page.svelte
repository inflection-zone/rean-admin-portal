<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';

	export let data: PageServerData;
	let id = data.apiKeyManagement.id;
	let clientName = data.apiKeyManagement.clientName;
	let password = data.apiKeyManagement.password;
	let phone = data.apiKeyManagement.phone;
	let email = data.apiKeyManagement.email;
	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/api-key-management/${id}/edit`;
	const viewRoute = `/users/${userId}/api-key-management/${id}/view`;
	const apiKeyManagementRoute = `/users/${userId}/api-key-management`;

	const breadCrumbs = [
		{
			name: 'Api-Key-Management',
			path: apiKeyManagementRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-3 mb-5">
		<form
			method="get"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg my-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Api Key Management</div>
					<div class="lg:block md:block hidden">View Api Key Management</div>
					<a href={apiKeyManagementRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Client Name</label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="clientName">{clientName}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Password </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="password">{password}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Phone </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="phone"> {phone} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Email </label>
				</div>
				<span class="w-1/2 md:2/3 lg:2/3" id="email"> {email} </span>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<button type="submit" class="btn btn-outline lg:w-full w-24 mb-10 lg:mr-4 mr-1">
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
