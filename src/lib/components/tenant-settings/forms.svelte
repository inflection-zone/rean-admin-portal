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
	
  let iskoboToolboxchecked = false;
	let isodkchecked = false;
	let isgoogleFormschecked = false;
	let isofflineSupportchecked = false;
	let isfieldAppchecked = false;


	export function handleCheckboxChange(event) {
		if (iskoboToolboxchecked) {
    iskoboToolboxchecked = event.target.checked;
		}
		else {
			iskoboToolboxchecked = false;
		}
		if (isodkchecked) {
    isodkchecked = event.target.checked;
		}
		else {
			isodkchecked = false;
		}
		if (isgoogleFormschecked) {
    isgoogleFormschecked = event.target.checked;
		}
		else {
			isgoogleFormschecked = false;
		}
		if (isofflineSupportchecked) {
    isofflineSupportchecked = event.target.checked;
		}
		else {
			isofflineSupportchecked = false;
		}
		if (isfieldAppchecked) {
    isfieldAppchecked = event.target.checked;
		}
		else {
			isfieldAppchecked = false;
		}    
		let formOptions = {
      koboToolbox: iskoboToolboxchecked,
      odk: isodkchecked,
      googleForm: isgoogleFormschecked,
			offlineSupport: isofflineSupportchecked,
      fieldApp: isfieldAppchecked,
    };
		dispatch('formOptionsChange', formOptions);
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
				<th>Forms</th>
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
		<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1182px]">
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<div class="flex flex-col ml-10">
					<td>Integrations</td>
				</div>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-100">
				<div class="ml-8">
					<td>
						<input
							type="checkbox"
							name="koboToolbox"
							value="koboToolbox"
							bind:checked={iskoboToolboxchecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">Kobo-Toolbox</td>
				</div>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-100">
				<div class="ml-8">
					<td>
						<input
							type="checkbox"
							name="odk"
							bind:checked={isodkchecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">ODK</td>
				</div>
			</tr>
			<tr
				class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-100 w-full"
			>
				<div class="ml-8">
					<td>
						<input
							type="checkbox"
							name="googleForms"
							bind:checked={isgoogleFormschecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">Google Forms</td>
				</div>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-100">
				<td>
					<input
						type="checkbox"
						name="offlineSupport"
						bind:checked={isofflineSupportchecked} 
							on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Offline Support</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-100">
				<td>
					<input
						type="checkbox"
						name="fieldApp"
						bind:checked={isfieldAppchecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Field App</td>
			</tr>
		</tbody>
	</table>
</form>
