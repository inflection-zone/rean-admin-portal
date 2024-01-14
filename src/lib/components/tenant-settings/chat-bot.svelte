<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	// import Icon from '$lib/components/icon.svelte';
	import { createEventDispatcher } from 'svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/tenants/settings`;
	const tenantRoute = `/users/${userId}/tenants`;

	const dispatch = createEventDispatcher();

	let isDefaultchecked = false;
	let isCustomchecked = false;
	let isClickUpchecked = false;
	let isQuicksightDashboardchecked = false;
	let isLocalizationSupportchecked = false;
	let isWhatsAppchecked = false;
	let isTelegramchecked = false;
	let isSlackchecked = false;
	let isChatPersonlizationchecked = false;
	let isCustomUserDBQuerieschecked = false;
	let isLocalizationContextualQuerieschecked = false;

	export function handleCheckboxChange(event) {
		if (isDefaultchecked) {
			isDefaultchecked = event.target.checked;
		}
		else {
			isDefaultchecked = false;
		}
		if (isCustomchecked) {
    isCustomchecked = event.target.checked;
		}
		else {
			isCustomchecked = false;
		}
		if (isClickUpchecked) {
    isClickUpchecked = event.target.checked;
		}
		else {
			isClickUpchecked = false;
		}
		if (isQuicksightDashboardchecked) {
    isQuicksightDashboardchecked = event.target.checked;
		}
		else {
			isQuicksightDashboardchecked = false;
		}
		if (isLocalizationSupportchecked) {
    isLocalizationSupportchecked = event.target.checked;
		}
		else {
			isLocalizationSupportchecked = false;
		}    
		if (isWhatsAppchecked) {
			isWhatsAppchecked = event.target.checked;
		}
		else {
			isWhatsAppchecked = false;
		}
		if (isTelegramchecked) {
    isTelegramchecked = event.target.checked;
		}
		else {
			isTelegramchecked = false;
		}
		if (isSlackchecked) {
    isSlackchecked = event.target.checked;
		}
		else {
			isSlackchecked = false;
		}
		if (isChatPersonlizationchecked) {
    isChatPersonlizationchecked = event.target.checked;
		}
		else {
			isChatPersonlizationchecked = false;
		}
		if (isCustomUserDBQuerieschecked) {
    isCustomUserDBQuerieschecked = event.target.checked;
		}
		else {
			isCustomUserDBQuerieschecked = false;
		}   
		if (isLocalizationContextualQuerieschecked) {
    isLocalizationContextualQuerieschecked = event.target.checked;
		}
		else {
			isLocalizationContextualQuerieschecked = false;
		}    
		let chatBotOptions = {
      Default: isDefaultchecked,
      Custom: isCustomchecked,
      clickUp: isClickUpchecked,
			quicksightDashboard: isQuicksightDashboardchecked,
      localizationSupport: isLocalizationSupportchecked,
			whatsApp: isWhatsAppchecked,
			Telegram: isTelegramchecked,
      Slack: isSlackchecked,
      chatPersonlization: isChatPersonlizationchecked,
			customUserDBQueries: isCustomUserDBQuerieschecked,
      localizationContextualQueries: isLocalizationContextualQuerieschecked,
    };
		dispatch('chatBotOptionsChange', chatBotOptions);
  }

	const breadCrumbs = [
		{ name: 'Tenants', path: tenantRoute },
		{ name: 'Settings', path: createRoute }
	];
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<form
	method="post"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Chat Bot</th>
				<th class="text-end">
					<a href={tenantRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<!-- <Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%"
							w="100%"
							iconPath="/images/others/arrow-up.svg#icon"
						/> -->
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
			
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td>Integrations</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-24">
						<td>
							<input
								type="checkbox"
								name="clickUp"
								bind:checked={isClickUpchecked} 
								on:change={handleCheckboxChange}
								class="ml-9 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4">ClickUp</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<div class="ml-8">
						<td>
							<input
								type="checkbox"
								name="slack"
								bind:checked={isSlackchecked} 
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4">Slack</td>
					</div>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="localizationSupport"
						bind:checked={isLocalizationSupportchecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Localization Support</td>
			</tr>
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class=" w-[150px]">Connect</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-11">
						<td>
						<input
							type="checkbox"
							name="whatsApp"
							bind:checked={isWhatsAppchecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">WhatsApp</td>
				</tr>
			
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
					<div class="ml-4">
						<td>
							<input
								type="checkbox"
								name="telegram"
								bind:checked={isTelegramchecked} 
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4">Telegram</td>
					</div></tr
				>
			</div>
			<div class="flex flex-row">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td>FAQ</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-36">
						<td>
							<input
								type="radio"
								name="default"
								bind:group={isDefaultchecked} 
								on:change={handleCheckboxChange}
								class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
							/>
						</td>
						<td>Default</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<div class="ml-8">
						<td>
							<input
								type="radio"
								name="custom"
								bind:group={isCustomchecked} 
								on:change={handleCheckboxChange}
								class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
							/>
						</td>
						<td class="ml-4">Custom</td>
					</div>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="quicksightDashboard"
						bind:checked={isQuicksightDashboardchecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Quicksight Dashboard</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="chatPersonlization"
						bind:checked={isChatPersonlizationchecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Chat Personlization</td>
			</tr>
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
						<input
							type="checkbox"
							name="customUserDBQueries"
							bind:checked={isCustomUserDBQuerieschecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4 w-[400px]">Custom User DB Queries</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
					<div class="">
						<td>
							<input
								type="checkbox"
								name="localizationContextualQueries"
								bind:checked={isLocalizationContextualQuerieschecked} 
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4">Location Contextual Queries</td>
					</div></tr
				>
			</div>
		</tbody>
	</table>
</form>
