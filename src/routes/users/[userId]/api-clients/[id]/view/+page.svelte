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
			name: 'Clients',
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
			headers: { 'content-type': 'application/json' }
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
			headers: { 'content-type': 'application/json' }
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

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
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
	<a href={editRoute} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Client</th>
				<th class="text-end">
					<a href={apiClientRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Client Name</td>
				<td>{clientName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Client Code</td>
				<td>{clientCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Contact Number</td>
				<td>{phone}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Email</td>
				<td>{email}</td>
			</tr>
			{#if apiKey === undefined}
				<tr></tr>
			{:else}
			<tr class="!border-b !border-b-secondary-100">
				<td>Api Key</td>
				<td>
					<span class="span" id="email">{apiKey}</span>
						<button
							class="btn variant-ringed-primary text-primary-500 "
							use:clipboard={apiKey}
							on:click={onClickHandler}
							disabled={copied}
						>
							<Fa icon={faCopy} size="lg" class="" />
						</button>
				</td>
			</tr>
			{/if}
		</tbody>
	</table>
</div>

