<script lang="ts">
	import type { PageServerData } from './$types';
	import PlatformBasedChart from '$lib/components/users-stats/charts/platform-based-chart.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	// let tabSet: number = 0;
	let totalUsers = data.totalUsers;
	let activeUsers = data.activeUsers.ActiveUsers;
	let deletedUsers = data.deletedUsers;
	let androidUsers = data.deviceDetailWiseUsers.AndroidUsers;
	let iOSUsers = data.deviceDetailWiseUsers.IOSUsers;
	let genderWiseUsers;
	let ageWiseUsers;
	let totalUsersData = data.totalUsersArray;
	let androidUsersData = data.androidUsersArray;
	let iOSUsersData = data.iOSUsersArray;
	let lables = data.years;

	$: genderWiseUsers;
	$: ageWiseUsers;
	genderWiseUsers = data.genderWiseUsers ?? undefined;
	ageWiseUsers = data.ageWiseUsers;

</script>

<div class = 'mx-10'>
  <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3> -->
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">App Downloads</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{totalUsers.Count}</dd>
    </div>
    <div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">Total Users</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{totalUsers.Count}</dd>
    </div>
    <div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">Active Users</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{activeUsers.Count} ({activeUsers.Ratio}%)</dd>
    </div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">Android Users</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{androidUsers.Count} ({androidUsers.Ratio}%)</dd>
    </div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">IOS Users</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{iOSUsers.Count} ({iOSUsers.Ratio}%)</dd>
    </div>
    <div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-md font-medium text-primary-500">Deleted Users</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-500">{deletedUsers.Count} ({deletedUsers.Ratio}%)</dd>
    </div>
  </dl>
</div>
<div class="h-1/3 w-1/3 flex flex-col items-center justify-center ml-10 mt-16">
<PlatformBasedChart {totalUsersData} {androidUsersData} {iOSUsersData} {lables}/>
<h3 class="text-primary-500 mt-3">Platform based users</h3>
</div>