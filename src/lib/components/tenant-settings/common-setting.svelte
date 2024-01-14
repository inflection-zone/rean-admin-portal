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

	let isVitalsAndLabRecordsChecked = false;
	let isRemindersChecked = false;
	let isMedicationManagementChecked = false;
	let isDocumentManagementChecked = false;
	let isScheduledAssessmentsChecked = false;
	let isEHRIntegrationsChecked = false;
	let isABDMIntegrationChecked = false;
	let isNutritionChecked = false;
	let isExerciseAndFitnessChecked = false;
	let isDefaultChecked = false;
	let isCustomChecked = false;
	let isFHIRResourceStorageChecked = false;

	export function handleCheckboxChange(event) {
		if (isVitalsAndLabRecordsChecked) {
			isVitalsAndLabRecordsChecked = event.target.checked;
		}
		else {
			isVitalsAndLabRecordsChecked = false;
		}
		if (isRemindersChecked) {
    isRemindersChecked = event.target.checked;
		}
		else {
			isRemindersChecked = false;
		}
		if (isMedicationManagementChecked) {
    isMedicationManagementChecked = event.target.checked;
		}
		else {
			isMedicationManagementChecked = false;
		}
		if (isDocumentManagementChecked) {
    isDocumentManagementChecked = event.target.checked;
		}
		else {
			isDocumentManagementChecked = false;
		}
		if (isScheduledAssessmentsChecked) {
    isScheduledAssessmentsChecked = event.target.checked;
		}
		else {
			isScheduledAssessmentsChecked = false;
		}    
		if (isEHRIntegrationsChecked) {
			isEHRIntegrationsChecked = event.target.checked;
		}
		else {
			isEHRIntegrationsChecked = false;
		}
		if (isABDMIntegrationChecked) {
    isABDMIntegrationChecked = event.target.checked;
		}
		else {
			isABDMIntegrationChecked = false;
		}
		if (isNutritionChecked) {
    isNutritionChecked = event.target.checked;
		}
		else {
			isNutritionChecked = false;
		}
		if (isExerciseAndFitnessChecked) {
    isExerciseAndFitnessChecked = event.target.checked;
		}
		else {
			isExerciseAndFitnessChecked = false;
		}
		if (isDefaultChecked) {
    isDefaultChecked = event.target.checked;
		}
		else {
			isDefaultChecked = false;
		}   
		if (isCustomChecked) {
    isCustomChecked = event.target.checked;
		}
		else {
			isCustomChecked = false;
		}    
		if (isFHIRResourceStorageChecked) {
    isFHIRResourceStorageChecked = event.target.checked;
		}
		else {
			isFHIRResourceStorageChecked = false;
		}    
		let commonSettingOptions = {
      vitalsAndLabRecords: isVitalsAndLabRecordsChecked,
      reminders: isRemindersChecked,
      medicationManagement: isMedicationManagementChecked,
			documentManagement: isDocumentManagementChecked,
      scheduledAssessments: isScheduledAssessmentsChecked,
			EHRIntegrations: isEHRIntegrationsChecked,
			ABDMIntegration: isABDMIntegrationChecked,
      Nutrition: isNutritionChecked,
      exerciseAndFitness: isExerciseAndFitnessChecked,
			Default: isDefaultChecked,
      Custom: isCustomChecked,
			FHIRResourceStorag: isFHIRResourceStorageChecked,
    };
		dispatch('commonSettingsChange', commonSettingOptions);
  }

	const breadCrumbs = [
		{ name: 'Tenants', path: tenantRoute },
		{ name: 'Settings', path: createRoute }
	];

</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<form
	method="post"
	class="bg-white table-container my-2 border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Common Setting</th>
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
		<!-- <tbody class="!bg-white dark:!bg-inherit">
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Vitals and Lab Records</label>
					</div>
				</td>

				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Reminders</label>
					</div>
				</td></tr
			>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Medication Management</label>
					</div>
				</td>

				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Document Management</label>
					</div>
				</td></tr
			>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Scheduled Assessments</label>
					</div>
				</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">EHR Integrations</label>
					</div>
				</td>

				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">ABDM Integration</label>
					</div>
				</td></tr
			>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Nutrition</label>
					</div>
				</td>

				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
						<label class="ml-4">Exercise and Fitness</label>
					</div>
				</td></tr
			>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<label class="ml-10">Careplans</label>
					</div>
				</td>

				<td>
					<div class=" flex flex-row">
						<input
							type="radio"
							name="name"
							class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
						/>

						<label class="ml-4">Default</label>
					</div>
				</td>
				<td>
					<div class=" flex flex-row">
						<input
							type="radio"
							name="name"
							class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
						/>

						<label class="ml-4">Custom</label>
					</div>
				</td>
				</tr
			>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<div class=" flex flex-row">
						<input
							type="checkbox"
							name="name"
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>

						<label class="ml-4">FHIR Resource Storage</label>
					</div>
				</td>
			</tr> -->



			<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1182px]">
				<div class="flex flex-row">
					<tr class="pr-10 !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
							<input
								type="checkbox"
								name="vitalsAndLabRecords"
								bind:checked={isVitalsAndLabRecordsChecked}
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4 w-[300px]">Vitals and Lab Records</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-16">
							<td>
								<input
									type="checkbox"
									name="reminders"
									bind:checked={isRemindersChecked}
									on:change={handleCheckboxChange}
									class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
								/>
							</td>
							<td class="ml-4">Reminders</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
							<input
								type="checkbox"
								name="medicationManagement"
								bind:checked={isMedicationManagementChecked}
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4 w-[300px]">Medication Management</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-24">
							<td>
								<input
									type="checkbox"
									name="documentManagement"
									bind:checked={isDocumentManagementChecked}
									on:change={handleCheckboxChange}
									class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
								/>
							</td>
							<td class="ml-4">Document Management</td>
						</div></tr
					>
				</div>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
						<input
							type="checkbox"
							name="scheduledAssessments"
							bind:checked={isScheduledAssessmentsChecked}
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">Scheduled Assessments</td>
				</tr>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
							<input
								type="checkbox"
								name="EHRIntegrations"
								bind:checked={isEHRIntegrationsChecked}
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4 w-[198px]">EHR Integrations</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-40">
							<td>
								<input
									type="checkbox"
									name="ABDMIntegration"
									bind:checked={isABDMIntegrationChecked}
									on:change={handleCheckboxChange}
									class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
								/>
							</td>
							<td class="ml-4">ABDM Integration</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
							<input
								type="checkbox"
								name="Nutrition"
								bind:checked={isNutritionChecked}
								on:change={handleCheckboxChange}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
						</td>
						<td class="ml-4">Nutrition</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-56">
							<td>
								<input
									type="checkbox"
									name="exerciseAndFitness"
									bind:checked={isExerciseAndFitnessChecked}
									on:change={handleCheckboxChange}
									class="ml-8 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
								/>
							</td>
							<td class="ml-4">Exercise and Fitness</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<div class="flex flex-col ml-10">
							<td>Careplans</td>
						</div>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<div class="ml-10">
							<td>
								<input
									type="radio"
									name="Default"
									bind:group={isDefaultChecked}
									on:change={handleCheckboxChange}
									class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
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
									name="Custom"
									bind:group={isCustomChecked}
									on:change={handleCheckboxChange}
									class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
								/>
							</td>
							<td>Custom</td>
						</div>
					</tr>
				</div>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
						<input
							type="checkbox"
							name="FHIRResourceStorage"
							bind:checked={isFHIRResourceStorageChecked}
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">FHIR Resource Storage</td>
				</tr>

		</tbody>
	</table>
</form>
