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

	let isTerrachecked = false;
	let isSenseSemichecked = false;
	let isGamificationAndAwardschecked = false;
	let isCommunityAndUserGroupschecked = false;
	let isDefaultchecked = false;
	let isCustomchecked = false;
	let isCoursesAndLearningJourneyschecked = false;
	let isAppointmentsAndVisitschecked = false;

	export function handleCheckboxChange(event) {
		if (isTerrachecked) {
			isTerrachecked = event.target.checked;
		}
		else {
			isTerrachecked = false;
		}
		if (isSenseSemichecked) {
    isSenseSemichecked = event.target.checked;
		}
		else {
			isSenseSemichecked = false;
		}
		if (isGamificationAndAwardschecked) {
    isGamificationAndAwardschecked = event.target.checked;
		}
		else {
			isGamificationAndAwardschecked = false;
		}
		if (isCommunityAndUserGroupschecked) {
    isCommunityAndUserGroupschecked = event.target.checked;
		}
		else {
			isCommunityAndUserGroupschecked = false;
		}
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
		if (isCoursesAndLearningJourneyschecked) {
    isCoursesAndLearningJourneyschecked = event.target.checked;
		}
		else {
			isCoursesAndLearningJourneyschecked = false;
		}
		if (isAppointmentsAndVisitschecked) {
    isAppointmentsAndVisitschecked = event.target.checked;
		}
		else {
			isAppointmentsAndVisitschecked = false;
		}   
		let patientAppOptions = {
      Terra: isTerrachecked,
      senseSemi: isSenseSemichecked,
      gamificationAndAwards: isGamificationAndAwardschecked,
			communityAndUserGroups: isCommunityAndUserGroupschecked,
      Default: isDefaultchecked,
			Custom: isCustomchecked,
			coursesAndLearningJourneys: isCoursesAndLearningJourneyschecked,
      appointmentsAndVisits: isAppointmentsAndVisitschecked,
    };
		dispatch('patientAppOptionsChange', patientAppOptions);
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
				<th>Patient App</th>
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
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class="w-[200px]">Device Integration</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
						<input
							type="checkbox"
							name="terra"
							bind:checked={isTerrachecked} 
							on:change={handleCheckboxChange}
							class="ml-12 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="">Terra</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<td>
						<input
							type="checkbox"
							name="senseSemi"
							bind:checked={isSenseSemichecked} 
							on:change={handleCheckboxChange}
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
					</td>
					<td class="">SenseSemi</td>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="gamificationAndAwards"
						bind:checked={isGamificationAndAwardschecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Gamification and Awards</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="communityAndUserGroups"
						bind:checked={isCommunityAndUserGroupschecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Community and User Groups</td>
			</tr>
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class=" w-[150px]">Patient Reports</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
						<input
							type="radio"
							name="default"
							bind:group={isDefaultchecked} 
							on:change={handleCheckboxChange}
							class="ml-24 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
						/>
					</td>
					<td class="">Default</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<td>
						<input
							type="radio"
							name="custom"
							bind:group={isCustomchecked} 
							on:change={handleCheckboxChange}
							class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
						/>
					</td>
					<td class="">Custom</td>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="coursesAndLearningJourneys"
						bind:checked={isCoursesAndLearningJourneyschecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Courses & Learning Journeys</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
					<input
						type="checkbox"
						name="appointmentsAndVisits"
						bind:checked={isAppointmentsAndVisitschecked} 
						on:change={handleCheckboxChange}
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
				</td>
				<td class="ml-4">Appointments and Visits</td>
			</tr>
		</tbody>
	</table>
</form>
