<script lang="ts">
	import Careplanscheduleform from './careplan-schedule-form.svelte';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Select from 'svelte-select';
	import type { PageServerData } from './$types';
	import Icon from '@iconify/svelte';

  //////////////////////////////////////////////////////////////////////////
  
	export let data: PageServerData;
	const assetType = data.assetTypes;
	let careplanActivities = data.careplanActivities;
	let items = [];
	let ids = [];
	let types = assetType.Data.AssetTypes;
	const timeSlot = data.timeslot;
	const carePlan = data.careplan;
	const carePlanData = carePlan.Data;
	const carePlanCode = carePlanData.Code;
	const carePlanName = carePlanData.Name;
	const categoryId = data.careplan.CategoryId;
	const carePlanType = carePlan.Data.Type;

	let careplanCategories = data.careplanCategories;
	const categoryType = careplanCategories.Type;

	let value = null;
	let show = false;
	let assetName = items;
	let hide = true;
	let careplanActivityId = undefined;
	let showDialog = false;
	function hideForm() {
		show = false;
	}
	const userId = $page.params.userId;
	const careplanId = $page.params.careplanId;
	const createRoute = `/users/${userId}/scheduling/create`;
	const careplansRoute = `/users/${userId}/careplans`;
	const editRoute = `/users/${userId}/careplans/${careplanId}/edit`;
	const viewRoute = `/users/${userId}/careplans/${careplanId}/view`;
	const schedulingRoute = `/users/${userId}/careplans/${careplanId}/scheduling`;
	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
		},
		{
			name: 'Scheduling',
			path: schedulingRoute
		}
	];

	const sanitizeActivities = (activities) => {
		var sanitized = [];
		for (var a of activities) {
			if (a.Day == null) {
				a.Day = 1;
			}
			sanitized.push(a);
		}
		return sanitized;
	};

	const classifyActivitiesByDay = (careplanActivities) => {
		try {
			var daysAvailable = careplanActivities.map((x) => x.Day);
			var daysSet = new Set(daysAvailable);
			var sortedDayKeys = [...daysSet];
			var classifiedActivities = [];
			for (var d of sortedDayKeys) {
				var activitiesForDay = careplanActivities.filter((x) => x.Day === d);
				classifiedActivities.push({
					Day: d,
					Activities: activitiesForDay
				});
			}
			return classifiedActivities;
		} catch (err) {
			console.log(err.message);
		}
	};

	//Classify activities by week
	const classifyByWeek = (classifiedByDay) => {
		try {
			var classified = [];
			for (var c of classifiedByDay) {
				var week = Math.ceil(c.Day / 7);
				const existingWeek = classified.find((x) => x.Week == week);
				if (existingWeek != undefined) {
					existingWeek.Days.push(c);
				} else {
					var newWeek = {
						Week: week,
						Days: [c]
					};
					classified.push(newWeek);
				}
			}
			return classified;
		} catch (err) {
			console.log(err.message);
		}
	};

	var sanitized = sanitizeActivities(careplanActivities);
	var classifiedByDay = classifyActivitiesByDay(sanitized);

	var classifiedByWeek = classifyByWeek(classifiedByDay);

	const assetRouteMap = {
		'Action plan': 'action-plans',
		Animation: 'animations',
		Appointment: 'appointments',
		Article: 'articles',
		Assessment: 'assessments',
		Audio: 'audio',
		Biometrics: 'biometrics',
		Challenge: 'challenges',
		Checkup: 'checkups',
		Consultation: 'consultations',
		Exercise: 'exercises',
		Goal: 'goals',
		Infographics: 'infographics',
		Medication: 'medications',
		Meditation: 'meditations',
		Message: 'messages',
		Nutrition: 'nutritions',
		Physiotherapy: 'physiotherapy',
		Priority: 'priorities',
		Reflection: 'reflections',
		Reminder: 'reminders',
		Video: 'video',
		'Web link': 'web-links',
		'Web newsfeed': 'web-newsfeeds',
		'Word power': 'word-power'
	};
	let selectedAssetType = 'Action plan';
	const onSelectAssetType = async (e) => {
		selectedAssetType = e.currentTarget.value;
		await searchAssets({
			sessionId: data.sessionId,
			selectedAssetType
		});
	};

	async function searchAssets(model) {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		let url = `/api/server/assets/search?assetType=${selectedAssetRoute}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		items = response.map((obj) => {
			return { value: obj.id, label: obj.Name };
		});
		console.log('response: ', response);
		console.log('items: ', items);

		return items;
	}

	const handleSchedulingDelete = async (e) => {
		let careplanActivityId = e;
		await Delete({
			sessionId: data.sessionId,
			careplanActivityId
		});
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/careplan-activity`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<div class="pt-2 mb-14">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="flex flex-row mt-4 w-full">
		<div class="basis-1/2 justify-center items-center ml-14">
			<div class="relative flex-col items-center  ">
				<div class="flex flex-row text-xl mb-2 text-primary tracking-wide">
					<h3 class="font-semibold  w-1/4 lg:w-1/4 md:w-2/5 sm:w-1/4">Careplan</h3>
					<h3 class="font-medium  w-3/4 lg:w-3/4 md:w-3/3 sm:w-3/4 ml-4">{carePlanName}</h3>
				</div>
				<div class="flex flex-row text-xl mb-2 text-primary tracking-wide">
					<h3 class="font-semibold  w-1/4 lg:w-1/4 md:w-2/5 sm:w-1/4">Code</h3>
					<h3 class="font-medium  w-3/4 lg:w-3/4 md:w-3/3 sm:w-3/4 ml-4">{carePlanCode}</h3>
				</div>
				<div class="flex flex-row text-xl mb-2 text-primary tracking-wide">
					<h3 class="font-semibold w-1/4 lg:w-1/4 md:w-2/5 sm:w-1/4">Category</h3>
					<h3 class="font-medium w-3/4 lg:w-3/4  md:w-3/3 sm:w-3/4 ml-4">{carePlanType}</h3>
				</div>
			</div>
		</div>
	</div>

	{#if show}
		<form
			method="post"
			action="?/createCarePlanActivityAction"
			class="table-container border border-secondary-100 dark:!border-surface-700 my-2"
		>
			<table class="table">
				<thead class="!variant-soft-secondary">
					<tr>
						<th>Schedule New Activity</th>
						<th class="text-end">
							<button class="absolute right-0 pr-3" on:click={hideForm}>
								<Icon icon="material-symbols:close-rounded" class="text-lg" />
							</button>
						</th>
					</tr>
				</thead>
				<tbody class="!bg-white dark:!bg-inherit">
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>Assets Type *</td>
						<td>
							<select name="assetType" class="select" on:change={onSelectAssetType}>
								{#each types as val}
									<option value={val}>
										{val}
									</option>
								{/each}
							</select>
						</td>
					</tr>
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>Asset*</td>
						<td>
							<Select name="assetId" class="select select-primary w-full" {items} bind:value />
						</td>
					</tr>
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>Scheduled Day*</td>
						<td>
							<input
								type="text"
								name="day"
								required
								placeholder="Enter scheduled day here..."
								class="input "
							/>
						</td>
					</tr>
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>Slot of the Day*</td>
						<td>
							<select name="timeSlot" class="select">
								{#each timeSlot as val}
									<option value={val}>
										{val}
									</option>
								{/each}
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex p-2 justify-end">
				<button type="submit" class="btn variant-filled-secondary">Submit</button>
			</div>
		</form>
	{:else if hide}
		<div class="mb-16 relative">
			<button
				class=" btn btn-md btn-primary pr-3 absolute xl:right-14 2xl:right-14 lg:right-1 md:right-14 sm:right-14 min-[270px]:right-14 capitalize"
				id="btn"
				on:click|preventDefault={() => (show = !show)}>Schedule New Activity</button
			>
		</div>
	{/if}
	<Careplanscheduleform
		{classifiedByDay}
		{classifiedByWeek}
		{userId}
		{careplanId}
		on:deleteActivity={async (e) => {
			await handleSchedulingDelete(e.detail.careplanActivityId);
		}}
	/>
</div>
