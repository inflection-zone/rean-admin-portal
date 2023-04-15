<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCopy, faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show, showMessage } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Modalform from '$lib/components/modal/Modal.svelte';
	import { showModal } from '$lib/store/general.store';

	export let data: PageServerData;
	let id = data.apiClient.id;
	let clientName = data.apiClient.ClientName;
	let clientCode = data.apiClient.ClientCode;
	let phone = data.apiClient.Phone;
	let email = data.apiClient.Email;
	let apiKey = undefined ;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/api-clients/${id}/edit`;
	const viewRoute = `/users/${userId}/api-clients/${id}/view`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{
			name: 'Api-Clients',
			path: apiClientRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];

	const onFormSubmit = async (userName , password) => {
		console.log("userName",userName)
		console.log("password",password)
		await getApiKey({
		  clientCode,
			userName:userName,
			password:password
		});
	}

	async function getApiKey(model) {
	const response = await fetch(`/api/server/api-client/get-api-key`, {
		method: 'POST',
		body: JSON.stringify(model),
		headers: {
			'content-type': 'application/json'
		}
		});
		const resp = await response.text();
		const apiKeyDetails = JSON.parse(resp);
	  apiKey = apiKeyDetails.ApiKey ;
		console.log(response)
		if(response.status === 200 ){
			(showModal.set(false))
		}

		console.log("apiKey",apiKey)
		console.log(resp)
  }
</script>

<Modalform on:submit = {(e) => {
	onFormSubmit(e.detail.userName, e.detail.password)
}}>
</Modalform>
<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />
	
	<div class="px-3 mb-5">
		<div
	
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
						<span>Client Code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="password">{clientCode}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Phone</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="phone">{phone}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Email</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="email">{email}</span>
			</div>

			{#if apiKey === undefined }
			<div></div>
			{:else}
			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Api Key</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="email">{apiKey}</span>
			</div>
			{/if}
	
			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/3 w-1/3 mr-2 ">
					<button class="btn variant-ringed-primary lg:w-full w-24 mb-10 mr-2 lg:mr-4 mr-1" on:click={() => (showModal.set(true))}>
						Get api key
					</button>
				</div>
				<div class="lg:w-1/3 w-1/3 ">
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
		</div>
	</div>
</main>
