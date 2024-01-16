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

	export let isVitalsAndLabRecordsChecked;
	export let isRemindersChecked;
	export let isMedicationManagementChecked;
	export let isDocumentManagementChecked;
	export let isScheduledAssessmentsChecked;
	export let isEHRIntegrationsChecked;
	export let isABDMIntegrationChecked;
	export let isNutritionChecked;
	export let isExerciseAndFitnessChecked;
	export let isDefaultCareplanChecked;
	export let isCustomCareplanChecked;
	export let isFHIRResourceStorageChecked;
    export let commonSettingOptions;
    $: {
        commonSettingOptions.isVitalsAndLabRecordsChecked = isVitalsAndLabRecordsChecked;
        commonSettingOptions.isRemindersChecked = isRemindersChecked
        commonSettingOptions.isMedicationManagementChecked = isMedicationManagementChecked
        commonSettingOptions.isDocumentManagementChecked = isDocumentManagementChecked
        commonSettingOptions.isScheduledAssessmentsChecked = isScheduledAssessmentsChecked
        commonSettingOptions.isEHRIntegrationsChecked = isEHRIntegrationsChecked
        commonSettingOptions.isABDMIntegrationChecked = isABDMIntegrationChecked
        commonSettingOptions.isNutritionChecked = isNutritionChecked
        commonSettingOptions.isExerciseAndFitnessChecked = isExerciseAndFitnessChecked
        commonSettingOptions.isDefaultCareplanChecked = isDefaultCareplanChecked
        commonSettingOptions.isCustomCareplanChecked = isCustomCareplanChecked
        commonSettingOptions.isFHIRResourceStorageChecked = isFHIRResourceStorageChecked
    }
	
   function handleCareplanChange(event) {
    console.log('###',event.currentTarget.value)
    console.log('isDefaultCareplanChecked',isDefaultCareplanChecked)
    console.log('isCustomCareplanChecked',isCustomCareplanChecked)
    if (event.currentTarget.value === 'Default') {
        isDefaultCareplanChecked = true;
        isCustomCareplanChecked = false;
    }else if (event.currentTarget.value === 'Custom') {
        isDefaultCareplanChecked = false;
        isCustomCareplanChecked = true;
    }
    else {
        isDefaultCareplanChecked = false;
        isCustomCareplanChecked = false;
    }
   }
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
									name="Careplans"
                                    value="Default"
                                    checked={isDefaultCareplanChecked}
                                    on:change={handleCareplanChange}
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
									name="Careplans"
                                    value="Custom"
                                    checked={isCustomCareplanChecked}
                                    on:change={handleCareplanChange}
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
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="ml-4">FHIR Resource Storage</td>
				</tr>

		</tbody>
	</table>
</form>
