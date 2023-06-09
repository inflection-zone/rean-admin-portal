<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import PieChart from './charts/pie-chart.svelte';
	import BarChart from './charts/bar-chart.svelte';
	import HorizontalBarChart from './charts/horizontal-bar-chart.svelte';
	import HealthPillarChart from './charts/health-pillar-chart.svelte';
	import BiometricsChart from './charts/biometrics-chart.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let totalUsers;
	export let activeUsers;
	export let genderWiseUsers;
	export let ageWiseUsers;
	export let maritalStatusWiseUsers;
	export let countryWiseUsers;
	export let majorAilment;
	export let obesityDistribution;
	export let addictionDistribution;
	export let healthPillarDistribution;
	export let healthPillarDistributionMonthly;
	export let roleDistribution;
	export let biometricsDistribution;
	export let biometricsDistributionMonthly;
	export let usersCount;
	export let deviceDetailWiseUsers;

	let androidUsers = deviceDetailWiseUsers.AndroidUsers;
	let iOSUsers = deviceDetailWiseUsers.IOSUsers;
	let missingDeviceDetails = deviceDetailWiseUsers.MissingDeviceDetails;

	$: ageWiseUsers;
	$: genderWiseUsers;
	$: countryWiseUsers;

	const usersData = [
		{
			usersDetail: 'Non Deleted Users',
			count: usersCount.NonDeletedUsers.Count,
			ratio: `${Math.ceil(usersCount.NonDeletedUsers.Ratio)}`
		},
		{
			usersDetail: 'Active Users',
			count: usersCount.ActiveUsers.Count,
			ratio: `${Math.ceil(usersCount.ActiveUsers.Ratio)}`
		},
		{
			usersDetail: 'Deleted Users',
			count: usersCount.DeletedUsers.Count,
			ratio: `${Math.ceil(usersCount.DeletedUsers.Ratio)}`
		},
		{
			usersDetail: 'Enrollment Users',
			count: usersCount.EnrollmentUsers.Count,
			ratio: `${Math.ceil(usersCount.EnrollmentUsers.Ratio)}`
		}
	];

	console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);

	const deviceDetailData = [
		{
			usersDetail: 'Android Users',
			count: androidUsers.Count,
			ratio: `${Math.ceil(androidUsers.Ratio)}`
		},
		{
			usersDetail: 'IOS Users',
			count: iOSUsers.Count,
			ratio: `${Math.ceil(iOSUsers.Ratio)}`
		},
		{
			usersDetail: 'Missing Device Detail Users',
			count: missingDeviceDetails.Count,
			ratio: `${Math.ceil(missingDeviceDetails.Ratio)}`
		}
	];
	const userId = $page.params.userId;
	const homeRoute = `/users/${userId}/home`;

	const breadCrumbs = [
		{
			name: 'Users',
			path: homeRoute
		}
	];

	let genderDistributionLabels = genderWiseUsers.map((x) => x.Status);
	let genderDistributionData = genderWiseUsers.map((x) => x.Ratio);

	let ageDistributionLabels = ageWiseUsers.map((x) => x.Status);
	let ageDistributionData = ageWiseUsers.map((x) => x.Ratio);

	let maritalStatusDistributionLabels = maritalStatusWiseUsers.map((x) => x.status);
	let maritalStatusDistributionData = maritalStatusWiseUsers.map((x) => x.count);

	let cuntryDistributionData = countryWiseUsers.map((x) => x.Ratio);
	let cuntryDistributionLabels = countryWiseUsers.map((x) => x.Country);

	$: cuntryDistributionData;
	$: cuntryDistributionLabels;

	let majorAilmentDistributionData = majorAilment.map((x) => x.Count);
	let majorAilmentDistributionLabels = majorAilment.map((x) => x.MajorAilment);

	let obesityDistributionData = obesityDistribution.map((x) => x.Count);
	let obesityDistributionLabels = obesityDistribution.map((x) => x.Status);

	let addictionDistributionData = addictionDistribution.map((x) => x.Count);
	let addictionDistributionLabels = addictionDistribution.map((x) => x.Status);

	let healthPillarDistributionData = healthPillarDistribution.map((x) => x.Count);
	let healthPillarDistributionLabels = healthPillarDistribution.map((x) => x.Status);

	let roleDistributionData = roleDistribution.map((x) => x.Ratio);
	let roleDistributionLabels = roleDistribution.map((x) => x.Role);

	let biometricsDistributionData = biometricsDistribution.map((x) => x.Count);
	let biometricsDistributionLabels = biometricsDistribution.map((x) => x.Biometrics);

	const dispatch = createEventDispatcher();

	const handlelSelectYearForAge = (year) => {
		dispatch('selectAgeWiseUsersDividionYearly', {
			year: year
		});
	};

	const handlelSelectYearForGender = (year) => {
		dispatch('selectGenderWiseUsersDividionYearly', {
			year: year
		});
	};

	const handlelSelectYearForCountry = (year) => {
		dispatch('selectCountryDistributionYearly', {
			year: year
		});
	};
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<div class="flex flex-col justify-center ">
	<div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8 ">
		<div
			class="grid grid-cols-1 overflow-x-auto justify-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 px-4 py-4 w-full h-full"
		>
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 sm:pl-3"
										>
											Users
										</th>
										<th
											scope="col"
											class="px-3 py-3 text-left text-lg font-semibold text-primary-500"
										>
											Count
										</th>
										<th
											scope="col"
											class="px-3 py-3 text-left text-lg font-semibold text-primary-500"
										>
											Percentage
										</th>
									</tr>
								</thead>
								<tbody class="">
									<tr class="hover:bg-tertiary-500 transition">
										<td
											style="width:10%;"
											class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 sm:pl-3"
											>Total Users</td
										>
										<td
											style="width:10%;"
											class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500"
											>{usersCount.TotalUsers.Count}</td
										>
										<td
											style="width:15%;"
											class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500"
											>-
										</td>
									</tr>
									{#each usersData as data}
										<tr class="hover:bg-tertiary-500 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
												>{data.usersDetail}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
											>
												{data.count}
											</td>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.ratio}%"
														/>
													</div>
													<span class="text-primary-500 ">{data.ratio}</span>
													<span class="text-primary-500 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
									{#each deviceDetailData as data}
										<tr class="hover:bg-tertiary-500 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
												>{data.usersDetail}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
												>{data.count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.ratio}%"
														/>
													</div>
													<span class="text-primary-500 ">{data.ratio}</span>
													<span class="text-primary-500 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-primary-50 sm:px-4 w-full h-full gap-3"
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 sm:pl-3"
											>Age</th
										>
									</tr>
								</thead>
								<tbody class="">
									{#each ageWiseUsers as data}
										<tr class="hover:bg-tertiary-500 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
												>{data.Status}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 ">{data.Ratio}</span>
													<span class="text-primary-500 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="w-64 h-64">
				<PieChart labels={ageDistributionLabels} data={ageDistributionData} title="Age" />
				<!-- <select name="year" id="" class="select w-2/3" on:change={handlelSelectYearForAge}>
				<option>All the years</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
			</select> -->
			</div>
		</div>

		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-full h-full gap-3 "
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 sm:pl-3"
											>Gender</th
										>
									</tr>
								</thead>
								<tbody class="">
									{#each genderWiseUsers as data}
										<tr class="hover:bg-tertiary-500 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
												>{data.Status}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 ">{data.Ratio}</span>
													<span class="text-primary-500 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="w-64 h-64">
				<PieChart labels={genderDistributionLabels} data={genderDistributionData} title="Gender" />
				<!-- <select name="year" id="" class="select w-2/3" on:change={handlelSelectYearForGender}>
					<option>All the years</option>
					<option value="2021">2021</option>
					<option value="2022">2022</option>
					<option value="2023">2023</option>
				</select> -->
			</div>
		</div>

		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-full h-full gap-3 "
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 sm:pl-3"
											>Country</th
										>
									</tr>
								</thead>
								<tbody class="">
									{#each countryWiseUsers as data}
										<tr class="hover:bg-tertiary-500 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
												>{data.Country}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 ">{data.Ratio}</span>
													<span class="text-primary-500 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="w-64 h-64">
				<PieChart labels={cuntryDistributionLabels} data={cuntryDistributionData} title="Country" />
				<!-- <select name="year" id="" class="select w-2/3 " on:change={handlelSelectYearForCountry}>
			<option>All the years</option>
			<option value="2021">2021</option>
			<option value="2022">2022</option>
			<option value="2023">2023</option>
		</select>
		 -->
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<BarChart
					dataSource={maritalStatusDistributionData}
					labels={maritalStatusDistributionLabels}
					title="Marital Status"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BarChart
					dataSource={majorAilmentDistributionData}
					labels={majorAilmentDistributionLabels}
					title="Major Ailments"
				/>
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<BarChart
					dataSource={obesityDistributionData}
					labels={obesityDistributionLabels}
					title="Obesity"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BarChart
					dataSource={addictionDistributionData}
					labels={addictionDistributionLabels}
					title="Addiction"
				/>
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={healthPillarDistributionData}
					labels={healthPillarDistributionLabels}
					title="Health Pillar Utilization (Total)"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<HealthPillarChart {healthPillarDistributionMonthly} />
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={biometricsDistributionData}
					labels={biometricsDistributionLabels}
					title="Biometrics (Total)"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-primary-50 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BiometricsChart {biometricsDistributionMonthly} />
			</div>
		</div>
	</div>
</div>
