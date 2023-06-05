<script lang="ts">
	import type { PageServerData } from './$types';
	import PlatformBasedChart from '$lib/components/users-stats/charts/platform-based-chart.svelte';
	import Funnel from '$lib/components/users-stats/charts/funnel.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let overallUsersData = data.overallUsersData;
	let totalUsers = overallUsersData.TotalUsers;
	let activeUsers = overallUsersData.ActiveUsers;
	let deletedUsers = overallUsersData.DeletedUsers;
	let nonDeletedUsers = overallUsersData.NonDeletedUsers;
	let androidUsers = data.deviceDetailWiseUsers.AndroidUsers;
	let iOSUsers = data.deviceDetailWiseUsers.IOSUsers;
	let totalUsersData = data.totalUsersArray;
	let androidUsersData = data.androidUsersArray;
	let iOSUsersData = data.iOSUsersArray;
	let lables = data.years;
	let totalEnrollment = overallUsersData.EnrollmentUsers;

	let labels = ['Downloads', 'Onboarded','Non-Deleted ', 'Active Users', 'Enrollment'];
	let funnelChartData = [totalUsers.Count, totalUsers.Count, nonDeletedUsers.Count, activeUsers.Count, totalEnrollment.Count];

</script>

<div class="mx-10 mb-20">
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">App Downloads</dt>
			<dd class="mt-2 text-5xl font-semibold tracking-tight text-primary-500">
				{totalUsers.Count}
			</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Onboarded Users</dt>
			<dd class="mt-1 text-5xl font-semibold tracking-tight text-primary-500">
				{totalUsers.Count}
			</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Non Deleted Users</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{nonDeletedUsers.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
						{nonDeletedUsers.Ratio}
					<div class="text-xs">
						%
					</div>
				</div>
			</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Active Users</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{activeUsers.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
					{activeUsers.Ratio} 
					<div class="text-xs">%</div>
				</div>
			</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Deleted Users</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{deletedUsers.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
					{deletedUsers.Ratio} 
					<div class="text-xs">%</div>
				</div>
			</dd>
		</div>

		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Enrollments</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{totalEnrollment.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
					{totalEnrollment.Ratio}
					<div class="text-xs">%</div>
				</div>
			</dd>
		</div>

		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">Android Users</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{androidUsers.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
					{androidUsers.Ratio}
					<div class="text-xs">%</div>
				</div>
			</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-tertiary-200 px-4 shadow-xl h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500">IOS Users</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500">{iOSUsers.Count}</div>
				<div class="ml-2 flex items-baseline text-md font-normal text-primary-500">
					{iOSUsers.Ratio}
					<div class="text-xs">%</div>
				</div>
			</dd>
		</div>	
	</dl>

	<div class="flex h-80 gap-10 w-full mt-5">
		<div class="mt-5 flex overflow-x-auto rounded-lg bg-tertiary-200 shadow-xl sm:p-6 w-1/2 h-auto">
			<div class="pb-4 w-2/3 gap-6 justify-center ">
				<h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500">App Users</h4>
				<div class="">
					<Funnel {labels} dataSource={funnelChartData} />
				</div>
			</div>
			<div class="mt-10">
				<div class="flex justify-start items-center gap-4 ">
					<div class="h-3 w-3 mt-1 border bg-primary-700" />
					<div class="text-sm font-normal text-primary-500">Downloads</div>
					<div class="text-sm font-normal text-primary-500">{totalUsers.Count}</div>
				</div>
				<div class="flex justify-start gap-4">
					<div class="h-3 w-3 mt-1 border bg-primary-500" />
					<div class="text-sm font-normal text-primary-500">Onboarded Users</div>
					<div class="text-sm font-normal text-primary-500">{totalUsers.Count}</div>
				</div>
				<div class="flex justify-start gap-4">
					<div class="h-3 w-3 mt-1 border bg-secondary-500" />
					<div class="text-sm font-normal text-primary-500">Non Deleted Users</div>
					<div class="text-sm font-normal text-primary-500">{nonDeletedUsers.Count}</div>
				</div>
				<div class="flex justify-start gap-4">
					<div class="h-3 w-3 mt-1 border bg-tertiary-500" />
					<div class="text-sm font-normal text-primary-500">Active Users</div>
					<div class="text-sm font-normal text-primary-500">{activeUsers.Count}</div>
				</div>
				<div class="flex justify-start gap-4">
					<div class="h-3 w-3 mt-1 border bg-primary-700" />
					<div class="text-sm  font-normal text-primary-500">Enrollments</div>
					<div class="text-sm font-normal text-primary-500">{totalEnrollment.Count}</div>
				</div>
			</div>
		</div>
		<div class="mt-5 flex overflow-x-auto rounded-lg bg-tertiary-200 shadow-xl sm:p-6 w-1/2 h-auto">
			<div class="pb-8 w-full">
				<h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500">Platform Based Users</h4>
				<div class="w-full h-full">
					<PlatformBasedChart {totalUsersData} {androidUsersData} {iOSUsersData} {lables} />
				</div>
			</div>
		</div>
	</div>
</div>
