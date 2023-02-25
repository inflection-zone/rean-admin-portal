<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';

	export let data: PageServerData;
	let id = data.apiClient.id;
	let clientName = data.apiClient.clientName;
	let password = data.apiClient.password;
	let phone = data.apiClient.phone;
	let email = data.apiClient.email;
	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/api-clients/${id}/edit`;
	const viewRoute = `/users/${userId}/api-clients/${id}/view`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{
			name: 'Api-Client',
			path: apiClientRoute
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
					<div class="lg:hidden md:hidden block">View Api Client</div>
					<div class="lg:block md:block hidden">View Api Client</div>
					<a href={apiClientRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Client Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="clientName">{clientName}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Password</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="password">{password}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Phone</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="phone"> {phone} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="email"> {email} </span>
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
