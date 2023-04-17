<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCopy, faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show, showMessage } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Modalform from '$lib/components/modal/form.modal.svelte';
	import { showGetApiKeyModal, showRenewApiKeyModal } from '$lib/store/general.store';
	import RenewApiKeyModal from '$lib/components/modal/renew.api.key.modal.svelte';
	import { clipboard } from '@skeletonlabs/skeleton';

	export let data: PageServerData;
	let id = data.apiClient.id;
	let clientName = data.apiClient.ClientName;
	let clientCode = data.apiClient.ClientCode;
	let phone = data.apiClient.Phone;
	let email = data.apiClient.Email;
	let apiKey = undefined;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	let copied = false;
	function onClickHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

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

	const onUpdateApiKey = async (userName: string, password: string, validFrom, validTill) => {
		console.log('userName', userName);
		console.log('password', password);
		console.log('ValidFrom', validFrom), console.log('ValidTo', validTill);
		await updateApiKey({
			clientCode,
			userName: userName,
			password: password,
			validFrom: validFrom,
			validTill: validTill
		});
	};

	async function updateApiKey(model) {
		const response = await fetch(`/api/server/api-client/renew-api-key`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		const apiKeyDetails = JSON.parse(resp);
		apiKey = apiKeyDetails.ApiKey;
		console.log(response);
		if (response.status !== 200) {
			showMessage(`Provide valid credentials !`, 'error', true, 3500);
		}
		showMessage(`Client api keys renewed successfully!`, 'success', true, 3500);
	}

	const onFormSubmit = async (userName, password) => {
		console.log('userName', userName);
		console.log('password', password);
		await getApiKey({
			clientCode,
			userName: userName,
			password: password
		});
	};

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
		apiKey = apiKeyDetails.ApiKey;
		console.log(response);
		if (response.status !== 200) {
			showMessage(`Provide valid credentials !`, 'error', true, 3500);
		}
		showMessage(`Client api keys retrieved successfully!`, 'success', true, 3500);
	}
</script>

<Modalform
	on:submit={async (e) => {
		await onFormSubmit(e.detail.userName, e.detail.password);
	}}
/>

<RenewApiKeyModal
	on:updateApiKey={async (e) => {
		await onUpdateApiKey(
			e.detail.userName,
			e.detail.password,
			e.detail.validFrom,
			e.detail.validTill
		);
	}}
/>

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

			{#if apiKey === undefined}
				<div />
			{:else}
				<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
					<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span>Api Key</span>
						</label>
					</div>
					<span class="span w-1/2 md:2/3 lg:2/3" id="email">{apiKey}</span>
					<button
						class="btn variant-filled-primary"
						use:clipboard={apiKey}
						on:click={onClickHandler}
						disabled={copied}>{copied ? 'Copied 👍' : 'Copy api key'}</button
					>
				</div>
			{/if}

			<div class="flex max-[450px]:flex-col items-center mt-7 lg:mx-16 md:mx-12 max-[450px]:mx-5">
				<div class="flex max-[450px]:flex-col max-[450px]:mb-2 max-[450px]:last:mb-10 mb-10 w-full gap-4 max-[450px]:gap-2 mx-1 max-[450px]:mx-5">
					<button
					class="btn variant-ringed-primary text-primary-500 w-full"
					on:click|capture={() => showRenewApiKeyModal.set(true)}
				>
					Update api key
				</button>
				<button
						class="btn variant-ringed-primary text-primary-500 w-full"
						on:click|capture={() => showGetApiKeyModal.set(true)}
					>
						Get api key
					</button>
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-ringed-primary w-full"
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
